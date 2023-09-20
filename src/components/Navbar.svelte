<script lang="ts">
	import { AppBar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { appname } from '$stores/static';
	import IconAccount from '~icons/ic/baseline-account-circle';
	import IconApps from '~icons/ic/baseline-apps';
	import { navrailState } from '$stores/states';
	import { Doc, SignedIn, SignedOut } from 'sveltefire';
	import LightSwitchX from './elements/LightSwitchX.svelte';
	import { limitToLast } from 'firebase/firestore';

	const popupUser: PopupSettings = {
		event: 'click',
		target: 'popupUser',
		placement: 'bottom-end'
	};
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<button
			type="button"
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

		<button type="button" class="btn p-0 -my-2" use:popup={popupUser}>
			<IconAccount class="text-3xl" />
		</button>

		<div class="card p-4 w-60 shadow-xl" data-popup="popupUser">
			<SignedIn let:user>
				<Doc ref={'users/sinopel/entries/' + user.uid} let:data>
					<span class="text-xl">{user.displayName}</span>
					<br />
					<span>{data.nip}</span>
					<br />
					<span>{user.email}</span>
					<br />
					<span class="text-xs">{data.role.toUpperCase()}</span>
				</Doc>
				<hr class="my-3" />
				<nav class="list-nav m-0 p-0">
					<ul class="m-0 p-0">
						<li class="m-0 p-0">
							<a href="/app/dashboard">Dasbor</a>
						</li>
						<li>
							<a href="/app/dashboard/account">Akun</a>
						</li>
						<li>
							<SignedIn let:signOut>
								<a href="#logout" on:click={signOut}>Logout</a>
							</SignedIn>
						</li>
					</ul>
				</nav>
			</SignedIn>
			<SignedOut>
				<span>Belum login</span>
				<hr class="my-3" />
				<nav class="list-nav m-0 p-0">
					<ul class="m-0 p-0">
						<li class="m-0 p-0">
							<a href="/">Login</a>
						</li>
					</ul>
				</nav>
			</SignedOut>
		</div>
	</svelte:fragment>
</AppBar>
