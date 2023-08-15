<script lang="ts">
	import { Drawer, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import Navrail from './Navrail.svelte';
</script>

<Drawer width="w-20">
	{#if $drawerStore.id === 'navrail'}
		<Navrail display="grid" />
	{:else}
		<h1>Drawer fallback contents</h1>
		<p>If you see this, this is a bug. Please <a href="https://github.com/Waoweens/notulensi-digital/issues">report</a> to developers.</p>
	{/if}
</Drawer>
