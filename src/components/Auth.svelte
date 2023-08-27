<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import {
		signInWithEmailAndPassword,
		type Auth,
		setPersistence,
		browserSessionPersistence
	} from 'firebase/auth';
	import { userStore } from 'sveltefire';

	export let auth: Auth;

	let email: string;
	let password: string;
	let pressed: boolean = false;
	let error = {
		username: '',
		password: 'Required',
		all: 'Invalid'
	};

	function handleSubmit(): void {
		pressed = true;

		setPersistence(auth, browserSessionPersistence)
			.then(() => {
				signInWithEmailAndPassword(auth, email, password);
			})
			.catch((error) => {
				error.all = error.message;
			});
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
		{#if !pressed}
			<button class="btn variant-filled mt-5" type="submit">Login</button>
		{:else}
			<div class="btn variant-filled mt-5">
				<ProgressRadial
					width="w-6"
					stroke={100}
					meter="stroke-primary-500"
					track="stroke-primary-500/30"
				/>
			</div>
		{/if}
		<span aria-live="assertive" class="text-error-400 mt-1">{error.all}</span>
	</form>
	<button class="mt-2">Lupa password?</button>
</div>
