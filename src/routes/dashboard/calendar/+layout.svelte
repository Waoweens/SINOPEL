<script lang="ts">
	import { appname } from "$stores/static";
</script>

<svelte:head>
	<title>Dashboard - {appname}</title>
</svelte:head>

<slot />