<script lang="ts">
	import { Drawer, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
</script>

<Drawer>
	{#if $drawerStore.id === 'navrail'}
		test
	{:else}
		<h1>Drawer fallback contents</h1>
		<p>If you see this, this is a bug. Please report to developers.</p>
	{/if}
</Drawer>
