<script>
	import { goto } from '$app/navigation';
	import Auth from '$components/Auth.svelte';
	import { appname, appnameLong } from '$stores/static';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { SignedIn, SignedOut } from 'sveltefire';
</script>

<!--
	TODO: Use Semantic HTML for all pages
	currently, <div>s are used everywhere
-->

<div class="flex flex-col justify-center items-center">
	<h1 class="h1 font-[600]">{appname}</h1>
	<p>{appnameLong}</p>

	<br />

	<SignedIn>
		{goto('/dashboard')}
	</SignedIn>

	<SignedOut let:auth>
		<Auth {auth} />
	</SignedOut>
</div>
