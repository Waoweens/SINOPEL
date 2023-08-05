<script lang="ts">
	import FullCalendar from '$lib/fullcalendar/FullCalendar.svelte';
	import type { CalendarOptions } from '@fullcalendar/core';
	import daygridPlugin from '@fullcalendar/daygrid';
	import idLocale from '@fullcalendar/core/locales/id'

	let calendarRef;

	let options: CalendarOptions = {
		locales: [ idLocale ],
		plugins: [daygridPlugin],
		initialView: 'dayGridMonth',
		events: [
			{ title: 'event 1', date: '2023-08-05' },
			{ title: 'event 2', date: '2019-08-04' }
		],
		contentHeight: '56rem',
		headerToolbar: {
			left: 'prev,next,today',
			center: 'title',
			right: 'dayGridMonth,dayGridWeek'
		}
	};
</script>

<div>
	<FullCalendar class="max-h-none" bind:this={calendarRef} {options} />
</div>