<script lang="ts">
	import '../app.postcss';
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import '../app.css';

	import { AppBar, AppShell, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase/firebase.client';
	import { authStore } from '$stores/authStore';
	import Navbar from '$components/Navbar.svelte';
	import { browser } from '$app/environment';
	import { appname } from '$stores/static';
	import Navrail from '$components/Navrail.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	$: isLoggedIn = $authStore.currentUser !== null;

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			console.log(user);

			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});

			if (browser) {
				console.log($authStore);
				if (!$authStore?.currentUser && !$authStore.isLoading && window.location.pathname !== '/') {
					window.location.href = '/';
				}
			}
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<title>{appname}</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<Navbar />
	</svelte:fragment>
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<svelte:fragment slot="sidebarLeft">
		{#if isLoggedIn}
			<Navrail />
		{/if}
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
	<!-- Router Slot -->
	<div class="m-3">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>
