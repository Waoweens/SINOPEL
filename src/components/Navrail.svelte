<script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import IconCalendar from '~icons/ic/baseline-calendar-month';
	import IconDescription from '~icons/ic/outline-description';

	export let display: string;
</script>

<AppRail class={"" + display}>
	<AppRailAnchor href="/dashboard/calendar" selected={$page.url.pathname === '/dashboard/calendar'}>
		<IconCalendar class="text-2xl block m-auto md:text-start" />
		<span>Kalender</span>
	</AppRailAnchor>
	<AppRailAnchor
		href="/dashboard/documents"
		selected={$page.url.pathname === '/dashboard/documents'}
	>
		<IconDescription class="text-2xl block m-auto" />
		<span>Dokumen</span>
	</AppRailAnchor>
</AppRail>
