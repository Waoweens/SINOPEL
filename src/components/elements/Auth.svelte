<script lang="ts">
	import { FirebaseError } from 'firebase/app';
	import { authHandlers, authStore } from '../../stores/authStore';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	// let register: boolean = false;
	// let email: string;
	// let password: string;
	// let confirmPassword: string;
	// let authError: string;
	// let validationError: string;
	let auth: {
		register: boolean;
		loading: boolean;
		email: string;
		password: string;
		confirmPassword: string;
		error: {
			all: string;
			element: string[];
			fail: boolean;
		};
	} = {
		register: false,
		loading: false,
		email: '',
		password: '',
		confirmPassword: '',
		error: {
			all: '',
			element: [],
			fail: false
		}
	};

	$: if ($authStore.currentUser !== null) {
		window.location.href = '/dashboard';
	}

	async function handleSubmit() {
		console.log(auth.email, auth.password, auth.confirmPassword);

		// clear errors
		auth.error.all = '';
		auth.error.element = [];

		// check if email and password is filled
		// if email is blank
		if (!auth.email) {
			auth.error.element.push('email');
			auth.error.fail = true;
		}

		// if password is blank
		if (!auth.password) {
			auth.error.element.push('password');
			auth.error.fail = true;
		}

		// register
		if (auth.register) {
			// if password and confirm password doesn't match
			if (auth.password !== auth.confirmPassword) {
				auth.error.element.push('passmatch');
				auth.error.all = 'Password does not match.';
				auth.error.fail = true;
			}

			if (auth.error.fail) return;

			// do register
			try {
				auth.loading = true;
				await authHandlers.register(auth.email, auth.password);
			} catch (err: unknown) {
				if (err instanceof FirebaseError) {
					console.log(err.message);
					handleErrors(err);
				}
			}

			// login
		} else {
			// if confirm password is somehow filled
			if (auth.confirmPassword) {
				auth.error.all =
					"This error should not happen. Please refresh the page and try again.<br>Details: Confirm password is filled when it shouldn't be.";
				auth.error.fail = true;
			}

			if (auth.error.fail) return;

			// do login
			try {
				auth.loading = true;
				await authHandlers.login(auth.email, auth.password);
			} catch (err: unknown) {
				if (err instanceof FirebaseError) {
					console.log(err.message);
					handleErrors(err);
				}
			}
		}

		auth.loading = false;

		// if (!email || !password || (register && !confirmPassword)) {
		// 	return;
		// }

		// if (register && password === confirmPassword) {
		// 	try {
		// 		await authHandlers.register(email, password);
		// 	} catch (err: unknown) {
		// 		if (err instanceof FirebaseError) {
		// 			console.log(err.message);
		// 			handleErrors(err);
		// 		}
		// 	}
		// } else {
		// 	try {
		// 		await authHandlers.login(email, password);
		// 	} catch (err: unknown) {
		// 		if (err instanceof FirebaseError) {
		// 			console.log(err.message);
		// 			handleErrors(err);
		// 		}
		// 	}
		// }
	}

	function handleErrors(err: any) {
		switch (err.code) {
			case 'auth/user-not-found':
				auth.error.all = 'Account not found';
				break;
			case 'auth/wrong-password':
				auth.error.all = 'Incorrect password';
				break;
			case 'auth/email-already-in-use':
				auth.error.all = 'Account already exists';
				break;
			default:
				auth.error.all = `An unknown error has occured<br>Code: ${err.code}`;
				break;
		}
	}
</script>

<div class="bg-surface-50-900-token p-3 rounded-lg max-w-sm">
	<h1 class="text-2xl font-bold mb-2">
		{auth.register ? 'Register' : 'Login'}
	</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<label class="label">
			<div class="flex">
				<span class="flex-grow">Email</span>
				{#if auth.error.element.includes('email')}
					<span class="text-error-500">Required</span>
				{/if}
			</div>
			<input
				bind:value={auth.email}
				class="input"
				class:input-error={auth.error.element.includes('email')}
				name="email"
				type="email"
				placeholder="user@example.com"
			/>
		</label>

		<label class="label">
			<div class="flex">
				<span class="flex-grow">Password</span>
				{#if auth.error.element.includes('password')}
					<span class="text-error-500">Required</span>
				{/if}
			</div>
			<input
				bind:value={auth.password}
				class="input"
				class:input-error={auth.error.element.includes('password')}
				name="password"
				type="password"
				placeholder="Enter password"
			/>
		</label>

		{#if auth.register}
			<label class="label">
				<div class="flex">
					<span class="flex-grow">Confirm Password</span>
					{#if auth.error.element.includes('passmatch')}
						<span class="text-error-500">Must match</span>
					{/if}
				</div>
				<input
					bind:value={auth.confirmPassword}
					class="input"
					class:input-error={auth.error.element.includes('passmatch')}
					name="confirmPassword"
					type="password"
					placeholder="Enter passowrd again"
				/>
			</label>
		{/if}

		{#if auth.error.all}
			<p class="text-error-500 mt-2">{@html auth.error.all}</p>
		{/if}

		<div class="flex my-2">
			<button type="submit" class="btn variant-filled">
				{auth.register ? 'Register' : 'Login'}
			</button>
			{#if auth.loading}
				<ProgressRadial stroke={200} width="w-10" class="mx-3" />
			{/if}
		</div>
	</form>

	{#if auth.register}
		<p>
			Already have an account?
			<button
				class="underline"
				on:click={() => {
					auth.register = false;
				}}
			>
				Login
			</button>
		</p>
	{:else}
		<p>
			Don't have an account?
			<button
				class="underline"
				on:click={() => {
					auth.register = true;
				}}
			>
				Register
			</button>
		</p>
	{/if}
</div>
