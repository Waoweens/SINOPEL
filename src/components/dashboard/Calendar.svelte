<script lang="ts">
	import FullCalendar from '$lib/fullcalendar/FullCalendar.svelte';
	import type { CalendarOptions } from '@fullcalendar/core';
	import daygridPlugin from '@fullcalendar/daygrid';

	let calendarRef;

	let options: CalendarOptions = {
		plugins: [daygridPlugin],
		initialView: 'dayGridMonth',
		events: [
			{ title: 'event 1', date: '2023-08-05' },
			{ title: 'event 2', date: '2019-08-04' }
		]
	};
</script>

<FullCalendar bind:this={calendarRef} {options} />