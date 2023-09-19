<script lang="ts">
	import { appname, appnameLong } from '$stores/static';
</script>

<svelte:head>
	<title>Dasbor - {appname}</title>
</svelte:head>

<div class="w-full h-full pb-32 flex flex-col items-center justify-center text-center">
	<h1 class="text-6xl lg:text-8xl font-extrabold">{appname}</h1>
	<p class="text-2xl md:text-4xl font-semibold">{appnameLong}</p>
</div>
