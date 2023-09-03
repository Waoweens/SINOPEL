<script lang="ts">
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { redirect } from '@sveltejs/kit';
	import {
		signInWithEmailAndPassword,
		type Auth,
		setPersistence,
		browserLocalPersistence
	} from 'firebase/auth';
	import { onMount } from 'svelte';
	import { userStore } from 'sveltefire';

	export let auth: Auth;

	let loading: boolean = true;
	let email: string;
	let password: string;
	let pressed: boolean = false;
	let error = {
		username: '',
		password: '',
		all: ''
	};

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			loading = false;
		});
	});

	function handleSubmit(): void {
		pressed = true;

		setPersistence(auth, browserLocalPersistence)
			.then(() => {
				signInWithEmailAndPassword(auth, email, password).catch((err) => {
					error.all = err.code;
					console.error(err.code);
					pressed = false;
				});

				invalidateAll();
			})
			.catch((err) => {
				error.all = err.message;
				pressed = false;
			});
	}
</script>

<div class="card p-4 md:max-w-md">
	{#if loading}
		<div class="m-8">
			<ProgressRadial
				width="w-40"
				stroke={100}
				meter="stroke-primary-500"
				track="stroke-primary-500/30"
			/>
		</div>
	{:else}
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
		<button type="button" class="mt-2">Lupa password?</button>
	{/if}
</div>
