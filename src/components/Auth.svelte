<script lang="ts">
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import { firestore } from '$src/lib/firebase/firebase';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { redirect } from '@sveltejs/kit';
	import {
		signInWithEmailAndPassword,
		type Auth,
		setPersistence,
		browserLocalPersistence
	} from 'firebase/auth';
	import { collection, getDocs, query, where } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let auth: Auth;

	let loading: boolean = true;
	let email: string;
	let loginWithEmail: boolean = false;
	let nip: string;
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

	async function handleSubmit(): Promise<void> {
		error = {
			username: '',
			password: '',
			all: ''
		};

		pressed = true;
		let loginCred: string;

		if (!email && !nip) {
			error.all = 'Kosong';
			pressed = false;
			return;
		}

		if (loginWithEmail) {
		} else {
			const q = query(
				collection(firestore, 'users', 'sinopel', 'entries'),
				where("nip", "==", nip)
			)

			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				error.all = 'NIP tidak ditemukan';
				pressed = false;
				return;
			}

			if (querySnapshot.size > 1) {
				error.all = 'Beberapa akun mempunyai NIP yang sama';
				pressed = false;
				return;
			}

			loginCred = querySnapshot.docs[0].data().email;
			console.log(loginCred)
		}

		setPersistence(auth, browserLocalPersistence)
			.then(() => {
				signInWithEmailAndPassword(auth, loginCred, password).catch((err) => {
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
			{#if loginWithEmail}
				<label class="label">
					<span>Email</span>
					<input
						class="input variant-filled {error.username ? 'input-error' : ''}"
						type="text"
						autocomplete="email"
						bind:value={email}
					/>
					<span aria-live="assertive" class="text-error-400">{error.username}</span>
				</label>
			{:else}
				<label class="label">
					<span>NIP</span>
					<input
						class="input variant-filled {error.username ? 'input-error' : ''}"
						type="text"
						autocomplete="username"
						bind:value={nip}
					/>
					<span aria-live="assertive" class="text-error-400">{error.username}</span>
				</label>
			{/if}
			<label class="label">
				<span>Password</span>
				<input
					class="input variant-filled {error.password ? 'input-error' : ''}"
					type="password"
					autocomplete="current-password"
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
		<div class="flex flex-col gap-1">
			<button
				type="button"
				class="mt-2 text-left"
				on:click={() => (loginWithEmail = !loginWithEmail)}
			>
				{loginWithEmail ? 'Login dengan NIP' : 'Login dengan email'}
			</button>
			<button type="button" class="mt-2 text-left">Lupa password</button>
		</div>
	{/if}
</div>
