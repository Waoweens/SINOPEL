<script lang="ts">
	import { AppBar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { appname } from '$stores/static';
	import IconAccount from '~icons/ic/baseline-account-circle';
	import IconApps from '~icons/ic/baseline-apps';
	import { navrailState } from '$stores/states';
	import { SignedIn } from 'sveltefire';
	import LightSwitchX from './elements/LightSwitchX.svelte';

	const popupUser: PopupSettings = {
		event: 'click',
		target: 'popupUser',
		placement: 'bottom-end'
	};

	let email: string;
	// authStore.subscribe((curr) => {
	// 	email = curr?.currentUser?.email || '';
	// });
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<button
			class="btn p-0 -my-2"
			on:click={() => {
				$navrailState.toggle = !$navrailState.toggle;
			}}
		>
			<IconApps class="text-2xl" />
		</button>
	</svelte:fragment>
	{appname}
	<svelte:fragment slot="trail">

		<LightSwitchX />

		<button class="btn p-0 -my-2" use:popup={popupUser}>
			<IconAccount class="text-3xl" />
		</button>

		<div class="card p-4 w-60 shadow-xl" data-popup="popupUser">
			<p>{email}</p>
			<hr class="my-3" />
			<nav class="list-nav m-0 p-0">
				<ul class="m-0 p-0">
					<li class="m-0 p-0">
						<a href="/dashboard">Dashboard</a>
					</li>
					<li>
						<a href="/settings">Settings</a>
					</li>
					<li>
						<SignedIn let:signOut>
							<a href="#logout" on:click={signOut}>Logout</a>
						</SignedIn>
					</li>
				</ul>
			</nav>
		</div>
	</svelte:fragment>
</AppBar>
