<script>

	import Auth from "../components/Auth.svelte";
	import { authStore } from "../stores/authStore";

	if ($authStore.currentUser !== null) {
		window.location.href = '/dashboard';
	}

</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<br />

<!-- <a href="/login" class="btn variant-filled">Login</a>
<br />
<a href="/register" class="btn variant-filled mt-2">Register</a> -->

<Auth/>
<br />

<!--scroll test-->
{#each Array(50) as _, i}
	<div class="bg-gray-100 p-4 mt-2">
		<p>Scroll test {i+1}</p>
	</div>
{/each}