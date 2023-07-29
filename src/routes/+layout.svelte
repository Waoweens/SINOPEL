<script lang="ts">
	import '../app.postcss';
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import '../app.css'

	import { AppBar, AppShell } from '@skeletonlabs/skeleton';

	import {onMount} from 'svelte';
	import { auth } from '$lib/firebase/firebase.client';
	import { authStore } from '../stores/authStore';
	import Navbar from '../components/Navbar.svelte';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			console.log(user)

			authStore.update((curr) => {
				return {...curr, isLoading: false, currentUser: user}
			})
		});
	});

</script>


<AppShell>
	<svelte:fragment slot="header"> 	
		<Navbar />
	</svelte:fragment>
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
	<!-- Router Slot -->
	<div class="m-2">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>
