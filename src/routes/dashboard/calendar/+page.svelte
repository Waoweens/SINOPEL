<script lang="ts">
	import { ProgressRadial, Step, Stepper } from '@skeletonlabs/skeleton';
	import { authHandlers, authStore } from '$stores/authStore';
	import Calendar from '$components/dashboard/Calendar.svelte';
	import { appname } from '$stores/static';

	let email: string;
	authStore.subscribe((curr) => {
		email = curr?.currentUser?.email || '';
	});
</script>

<svelte:head>
	<title>Kalender - {appname}</title>
</svelte:head>

{#if $authStore.currentUser}
	<h1 class="text-2xl font-bold">Selamat datang, {'{'}username{'}'}</h1>
	<div class="max-w-3xl mt-2 max-h-none rounded-lg p-4 bg-surface-50-900-token">
		<Calendar />
	</div>
{:else}
	<div class="flex h-screen">
		<div class="m-auto">
			<ProgressRadial stroke={100} />
		</div>
	</div>
{/if}
