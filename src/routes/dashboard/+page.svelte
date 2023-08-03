<script lang="ts">
	import { ProgressRadial, Step, Stepper } from '@skeletonlabs/skeleton';
	import { authHandlers, authStore } from '$stores/authStore';
	import Calendar from '$components/dashboard/Calendar.svelte';

	let email: string;
	authStore.subscribe((curr) => {
		email = curr?.currentUser?.email || '';
	});
</script>

{#if $authStore.currentUser}
	<Calendar />
{:else}
	<div class="flex h-screen">
		<div class="m-auto">
			<ProgressRadial stroke={100} />
		</div>
	</div>
{/if}
