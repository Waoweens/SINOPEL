<script lang="ts">
	import '$src/app.postcss';
	// Your selected Skeleton theme:
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// This contains the bulk of Skeletons required styles:
	// import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '$src/app.scss';

	import {
		AppShell,
		Modal,
		ProgressBar,
		Toast,
		getDrawerStore,
		initializeStores,
		setInitialClassState,
		storePopup,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { onMount } from 'svelte';
	import { auth, firestore, storage } from '$lib/firebase/firebase';
	import Navbar from '$components/Navbar.svelte';
	import { browser } from '$app/environment';
	import { appname } from '$stores/static';
	import Navrail from '$components/Navrail.svelte';
	import { navrailState } from '$stores/states';
	import Drawers from '$components/Drawers.svelte';
	import { FirebaseApp, SignedIn } from 'sveltefire';
	import { navigating, page } from '$app/stores';
	import FileUploadModal from '$components/letter/elements/editor/FileUploadModal.svelte';
	import type { PageData } from './$types';
	import bgImg from '$lib/assets/bg.jpg';
	import pemkot from '$lib/assets/Lambang_Kota_Bandung.svg';
	import damkar from '$lib/assets/damkar.png';

	export let data: PageData;

	initializeStores();
	const drawerStore = getDrawerStore();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const modalComponentRegistry: Record<string, ModalComponent> = {
		fileUploadBox: {
			ref: FileUploadModal
			// params: {}
		}
	};

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
	<Modal components={modalComponentRegistry} />
	<Toast />
	<Drawers />

	<AppShell>
		<svelte:fragment slot="header">
			{#if $navigating}
				<ProgressBar />
			{/if}
			<Navbar />
		</svelte:fragment>
		<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
		<svelte:fragment slot="sidebarLeft">
			<Navrail display={railStyle} />
		</svelte:fragment>
		<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
		<!-- Router Slot -->
		{#if $page.url.pathname === '/app/dashboard' || $page.url.pathname === '/app'}
			<div
				class="w-full h-full bg-center bg-cover backdrop-brightness-50"
				style="background-image: url({bgImg}); content: 'test';"
			>
				<div class="w-full h-full backdrop-brightness-50">
					<div class="absolute m-4">
						<img src={pemkot} alt="Pemkot" class="h-[7.5rem]" />
					</div>
					<div class="absolute mx-4 my-3 right-0">
						<img src={damkar} alt="Damkar" class="h-[7.5rem]" />
					</div>
					<slot />
				</div>
			</div>
		{:else}
			<div class="m-3">
				<slot />
			</div>
		{/if}

		<!-- ---- / ---- -->
		<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
		<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
	</AppShell>
</FirebaseApp>
