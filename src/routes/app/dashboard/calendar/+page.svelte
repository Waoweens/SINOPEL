<script lang="ts">
	import Calendar from '$components/dashboard/Calendar.svelte';
	import { appname } from '$stores/static';
	import { SignedIn, User } from 'sveltefire';
</script>

<svelte:head>
	<title>Kalender - {$appname}</title>
</svelte:head>

<SignedIn let:user>
	<h1 class="text-2xl font-bold">Selamat datang, {user.displayName}</h1>
	<div class="max-w-3xl mt-2 max-h-none rounded-lg p-4 bg-surface-50-900-token">
		<Calendar />
	</div>
</SignedIn>