<script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import IconCalendar from '~icons/ic/baseline-calendar-month';
	import IconDescription from '~icons/ic/outline-description';
	import IconDashboard from '~icons/ic/round-dashboard';
	import IconPerson from '~icons/ic/baseline-person';
	import IconAdmin from '~icons/ic/outline-admin-panel-settings';
	import { Doc, SignedIn } from 'sveltefire';

	export let display: string;
</script>

<SignedIn let:user>
	<AppRail class={'' + display}>
		<AppRailAnchor href="/app/dashboard" selected={$page.url.pathname === '/app/dashboard'}>
			<IconDashboard class="text-2xl block m-auto md:text-start" />
			<span>Dasbor</span>
		</AppRailAnchor>
		<AppRailAnchor
			href="/app/dashboard/calendar"
			selected={$page.url.pathname.startsWith('/app/dashboard/calendar')}
		>
			<IconCalendar class="text-2xl block m-auto md:text-start" />
			<span>Kalender</span>
		</AppRailAnchor>
		<AppRailAnchor
			href="/app/dashboard/letter/NotulenRapat"
			selected={$page.url.pathname.startsWith('/app/dashboard/letter/NotulenRapat')}
		>
			<IconDescription class="text-2xl block m-auto" />
			<span>Notulen<br />Rapat</span>
		</AppRailAnchor>
		<AppRailAnchor
			href="/app/dashboard/letter/LaporanKegiatan"
			selected={$page.url.pathname.startsWith('/app/dashboard/letter/LaporanKegiatan')}
		>
			<IconDescription class="text-2xl block m-auto" />
			<span>Laporan<br />Kegiatan</span>
		</AppRailAnchor>
		<svelte:fragment slot="trail">
			<Doc ref={'/users/' + user.uid} let:data>
				{#if data.role == 'admin'}
					<AppRailAnchor
						href="/app/dashboard/admin"
						selected={$page.url.pathname.startsWith('/app/dashboard/admin')}
					>
						<IconAdmin class="text-2xl block m-auto" />
						<span>Admin</span>
					</AppRailAnchor>
				{/if}
			</Doc>
			<AppRailAnchor
				href="/app/dashboard/account"
				selected={$page.url.pathname.startsWith('/app/dashboard/account')}
			>
				<IconPerson class="text-2xl block m-auto" />
				<span>Akun</span>
			</AppRailAnchor>
		</svelte:fragment>
	</AppRail>

	<slot prop="extra" />
</SignedIn>
