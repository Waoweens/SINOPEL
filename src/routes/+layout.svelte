<script lang="ts">
	import '../app.postcss';
	// Your selected Skeleton theme:
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// This contains the bulk of Skeletons required styles:
	// import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.scss';

	import { AppShell, Modal, Toast, getDrawerStore, initializeStores, setInitialClassState, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { onMount } from 'svelte';
	import { auth, firestore, storage } from '$lib/firebase/firebase.client';
	import Navbar from '$components/Navbar.svelte';
	import { browser } from '$app/environment';
	import { appname } from '$stores/static';
	import Navrail from '$components/Navrail.svelte';
	import { navrailState } from '$stores/states';
	import Drawers from '$components/Drawers.svelte';
	import { FirebaseApp, SignedIn } from 'sveltefire';

	initializeStores();
	const drawerStore = getDrawerStore();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	// $: isLoggedIn = $authStore.currentUser !== null;

	// onMount(() => {
	// 	const unsubscribe = auth.onAuthStateChanged((user) => {
	// 		console.log(user);

	// 		authStore.update((curr) => {
	// 			return { ...curr, isLoading: false, currentUser: user };
	// 		});
	// 	});

	// 	return unsubscribe;
	// });

	let railStyle: string;
	let innerWidth: number;

	let lastNavState: boolean;
	$: {
		$navrailState.small = innerWidth < 768;
		if (lastNavState !== $navrailState.small) {
			$navrailState.toggle = !$navrailState.small;
			lastNavState = $navrailState.small;
		}
		if ($navrailState.toggle) {
			if ($navrailState.small) {
				drawerStore.open({ id: 'navrail' });
			} else {
				railStyle = 'grid';
			}
		} else {
			railStyle = 'hidden';
		}
	}

	$: drawerStore.subscribe((curr) => {
		if (curr.id == 'navrail' && !curr.open) $navrailState.toggle = false;
	});
</script>

<svelte:head>
	<title>{appname}</title>
</svelte:head>

<svelte:window bind:innerWidth />

<FirebaseApp {auth} {firestore} {storage}>
	<!-- Overlays -->
	<Modal />
	<Toast />
	<Drawers />

	<AppShell>
		<svelte:fragment slot="header">
			<Navbar />
		</svelte:fragment>
		<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
		<svelte:fragment slot="sidebarLeft">
			<SignedIn>
				<Navrail display={railStyle} />
			</SignedIn>
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
</FirebaseApp>
