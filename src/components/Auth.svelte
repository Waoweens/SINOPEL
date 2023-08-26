<script lang="ts">
	import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';
	import { userStore } from 'sveltefire';

	export let auth: Auth;

	let email: string;
	let password: string;
	let error = {
		username: '',
		password: 'Required',
		all: 'Invalid'
	};

	async function handleSubmit(): Promise<void> {
		await signInWithEmailAndPassword(auth, email, password);
	}
</script>

<div class="card p-4 md:max-w-md">
	<h2 class="h3 font-bold text-center">Login</h2>
	<form class="flex flex-col" on:submit|preventDefault={handleSubmit}>
		<label class="label">
			<span>E-mail</span>
			<input
				class="input variant-filled {error.username ? 'input-error' : ''}"
				type="email"
				bind:value={email}
			/>
			<span aria-live="assertive" class="text-error-400">{error.username}</span>
		</label>
		<label class="label">
			<span>Password</span>
			<input
				class="input variant-filled {error.password ? 'input-error' : ''}"
				type="password"
				bind:value={password}
			/>
			<span aria-live="assertive" class="text-error-400">{error.password}</span>
		</label>
		<button class="btn variant-filled mt-5" type="submit">Login</button>
		<span aria-live="assertive" class="text-error-400 mt-1">{error.all}</span>
	</form>
	<button class="mt-2">Lupa password?</button>
</div>
