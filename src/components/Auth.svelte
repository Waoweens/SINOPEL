<script lang="ts">
	import { authHandlers, authStore } from '../stores/authStore';

	let register: boolean = false;
	let email: string;
	let password: string;
	let confirmPassword: string;

	async function handleSubmit() {
		console.log(email, password, confirmPassword);

		if (!email || !password || (register && !confirmPassword)) {
			return;
		}

		if (register && password === confirmPassword) {
			try {
				await authHandlers.register(email, password);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				await authHandlers.login(email, password);
			} catch (err) {
				console.log(err);
			}
		}
	}

	if ($authStore.currentUser !== null) {
		window.location.href='/dashboard'
	}
</script>

<div class="bg-white p-3 rounded-lg max-w-md">
	<h1 class="text-2xl font-bold mb-2">
		{register ? 'Register' : 'Login'}
	</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<label class="label">
			<span>Email</span>
			<input
				bind:value={email}
				class="input"
				name="email"
				type="email"
				placeholder="user@example.com"
			/>
		</label>

		<label class="label">
			<span>Password</span>
			<input
				bind:value={password}
				class="input"
				name="password"
				type="password"
				placeholder="At least 8 characters"
			/>
		</label>

		{#if register}
			<label class="label">
				<span>Confirm Password</span>
				<input
					bind:value={confirmPassword}
					class="input"
					name="confirmPassword"
					type="password"
					placeholder="Confirm password"
				/>
			</label>
		{/if}

		<button type="submit" class="btn variant-filled mt-2">
			{register ? 'Register' : 'Login'}
		</button>
	</form>

	{#if register}
		<p>
			Already have an account?
			<button
				class="underline"
				on:click={() => {
					register = false;
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
					register = true;
				}}
			>
				Register
			</button>
		</p>
	{/if}
</div>
