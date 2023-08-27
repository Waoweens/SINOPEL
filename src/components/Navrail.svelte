<script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import IconCalendar from '~icons/ic/baseline-calendar-month';
	import IconDescription from '~icons/ic/outline-description';
	import IconDashboard from '~icons/ic/round-dashboard';
	import IconPerson from '~icons/ic/baseline-person';
	import IconAdmin from '~icons/ic/outline-admin-panel-settings';

	export let display: string;
</script>

<AppRail class={'' + display}>
	<AppRailAnchor href="/dashboard" selected={$page.url.pathname === '/dashboard'}>
		<IconDashboard class="text-2xl block m-auto md:text-start" />
		<span>Dasbor</span>
	</AppRailAnchor>
	<AppRailAnchor href="/dashboard/calendar" selected={$page.url.pathname === '/dashboard/calendar'}>
		<IconCalendar class="text-2xl block m-auto md:text-start" />
		<span>Kalender</span>
	</AppRailAnchor>
	<AppRailAnchor href="/dashboard/meeting" selected={$page.url.pathname === '/dashboard/meeting'}>
		<IconDescription class="text-2xl block m-auto" />
		<span>Notulen<br />Rapat</span>
	</AppRailAnchor>
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/dashboard/admin" selected={$page.url.pathname === '/admin'}>
			<IconAdmin class="text-2xl block m-auto" />
			<span>Admin</span>
		</AppRailAnchor>
		<AppRailAnchor href="/dashboard/account" selected={$page.url.pathname === '/account'}>
			<IconPerson class="text-2xl block m-auto" />
			<span>Akun</span>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>
