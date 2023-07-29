<script lang="ts">
	import { authStore } from "../../stores/authStore";

	let email: string;
	authStore.subscribe(curr => {	
		email = curr?.currentUser?.email || "";
	});
</script>

<p>Hello, {email}</p>

<button on:click={() => {
	
}}>Logout</button>