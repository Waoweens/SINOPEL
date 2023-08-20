<script lang="ts">
	import { authStore } from "$stores/authStore";
	import { ProgressRadial } from "@skeletonlabs/skeleton";

</script>

{#if $authStore.currentUser}
	<slot />
{:else}
	<div class="flex h-screen">
		<div class="m-auto">
			<ProgressRadial stroke={100} />
		</div>
	</div>
{/if}