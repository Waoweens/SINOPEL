<script lang="ts">
	import { Step, Stepper } from "@skeletonlabs/skeleton";
	import { authHandlers, authStore } from "../../stores/authStore";

	let email: string;
	authStore.subscribe(curr => {	
		email = curr?.currentUser?.email || "";
	});

</script>

{#if $authStore.currentUser}
	<h1>Welcome, {email}</h1>

	<button on:click={authHandlers.logout} class="btn variant-filled">Logout</button>
{:else}
	<h1>Loading...</h1>
{/if}