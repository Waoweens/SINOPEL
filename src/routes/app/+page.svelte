<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Auth from '$components/Auth.svelte';
	import { appname, appnameLong } from '$stores/static';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { SignedIn, SignedOut } from 'sveltefire';

	function gotoDashboard() {
		console.log('called');
		if (browser) goto('/app/dashboard');
	}
</script>

<!--
	TODO: Use Semantic HTML for all pages
	currently, <div>s are used everywhere
-->

<div class="w-full h-full pb-32 flex flex-col items-center justify-center">
	<div class="text-center text-white">
		<h1 class="text-6xl font-extrabold">{appname}</h1>
		<p class="text-2xl font-semibold">{appnameLong}</p>
		<p></p>
	</div>

	<div class="mt-4">
		<SignedIn>
			{gotoDashboard()}
		</SignedIn>

		<SignedOut let:auth>
			<Auth {auth} />
		</SignedOut>
	</div>
</div>
