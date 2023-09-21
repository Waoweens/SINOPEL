<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AppBar,
		popup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import { appname } from '$stores/static';
	import IconAccount from '~icons/ic/baseline-account-circle';
	import IconApps from '~icons/ic/baseline-apps';
	import IconInfo from '~icons/ic/baseline-info';
	import IconCode from '~icons/ic/baseline-code';
	import IconBugReport from '~icons/ic/baseline-bug-report';
	import IconCopyright from '~icons/ic/baseline-copyright';
	import IconPerson from '~icons/ic/baseline-person';
	import IconSourceBranch from '~icons/mdi/source-branch';
	import { navrailState } from '$stores/states';
	import { Doc, SignedIn, SignedOut } from 'sveltefire';
	import LightSwitchX from './elements/LightSwitchX.svelte';
	import { limitToLast } from 'firebase/firestore';
	import { page } from '$app/stores';

	const popupUser: PopupSettings = {
		event: 'click',
		target: 'popupUser',
		placement: 'bottom-end'
	};

	const popupInfo: PopupSettings = {
		event: 'click',
		target: 'popupInfo',
		placement: 'bottom-end',
		closeQuery: '#closes-popup'
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
	{$appname}
	<svelte:fragment slot="trail">
		<button type="button" class="btn p-0 -my-2" use:popup={popupInfo}>
			<IconInfo class="text-3xl" />
		</button>

		<div class="card p-4 w-64 shadow-xl" data-popup="popupInfo">
			<p class="flex items-center gap-2">
				<span class="text-2xl font-bold">SINOPEL</span><a
					target="_blank"
					href="https://github.com/Waoweens/SINOPEL/releases/tag/v1.0-rc2"
					class="chip variant-filled-secondary">v1.0-rc2</a
				>
			</p>
			<hr class="my-3" />
			<nav class="list-nav m-0 p-0">
				<ul class="m-0 p-0">
					<li>
						<a target="_blank" href="https://github.com/Waoweens/SINOPEL">
							<span><IconCode /></span>
							<span>Repository</span>
						</a>
						<a target="_blank" href="https://github.com/Waoweens/SINOPEL">
							<span><IconBugReport /></span>
							<span>Report bug<span /></span></a
						>
					</li>
				</ul>
			</nav>

			<hr class="my-3" />

			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="lead"><IconSourceBranch /></svelte:fragment>
					<svelte:fragment slot="summary">Change branch</svelte:fragment>
					<svelte:fragment slot="content">
						<nav class="list-nav m-0 p-0">
							<ul class="m-0 p-0">
								<li>
									<a
										href="https://sinopel.id"
										class={$page.url.hostname === 'sinopel.id' ? '!bg-primary-500 text-black' : ''}
									>
										Stable
									</a>
									<a
										href="https://dev.sinopel.id"
										class={$page.url.hostname === 'dev.sinopel.id' ? '!bg-primary-500 text-black' : ''}
									>
										Dev
									</a>
									{#if $page.url.hostname.match(/^(localhost|local|192\.168|127\.0\.0\.1|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|::1|fc00::|fd[0-9a-f]{2}:)/)}
										<a href={$page.url.origin} class="!bg-primary-500 text-black">Local</a>
									{/if}
								</li>
							</ul>
						</nav>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>

			<hr class="my-3" />

			<nav class="list-nav m-0 p-0">
				<ul class="m-0 p-0">
					<li>
						<a target="_blank" href="https://github.com/Waoweens">
							<span><IconPerson /></span>
							<span>View Developer</span>
						</a>
					</li>
					<li>
						<a target="_blank" href="https://www.gnu.org/licenses/gpl-3.0.en.html">
							<span><IconCopyright /></span>
							<span>GNU GPL v3.0</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
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
						<li>
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
