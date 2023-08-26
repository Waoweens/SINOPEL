<script lang="ts">
	import { signInWithEmailAndPassword, type Auth } from "firebase/auth";
	import { userStore } from "sveltefire";

	export let auth: Auth;

	let email: string;
	let password: string;
	
	async function handleSubmit(): Promise<void> {
		await signInWithEmailAndPassword(auth, email, password);
	}
</script>

<div class="card p-4 md:max-w-md">
	<h2 class="h3 font-bold text-center">Login</h2>
	<form class="flex flex-col gap-3" on:submit|preventDefault={handleSubmit}>
		<label class="label">
			<span>E-mail</span>
			<input class="input" type="email" bind:value={email} />
		</label>
		<label class="label">
			<span>Password</span>
			<input class="input" type="password" bind:value={password} />
		</label>
		<button class="btn variant-filled" type="submit">Login</button>
	</form>
	<button class="mt-2">Lupa pas(skeleton v2 RC)sword?</button>
</div>