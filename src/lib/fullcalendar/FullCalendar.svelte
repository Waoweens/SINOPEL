<script lang="ts">
	import { Calendar } from '@fullcalendar/core';
	import type { CalendarOptions } from '@fullcalendar/core';
	import { onMount } from 'svelte';

	let classes: string | null = null;
	export { classes as class };

	export let style: string | null = null;
	export let options: CalendarOptions;

	export function getAPI() {
		return calendar;
	}

	let calendarEl: HTMLElement;
	let calendar: Calendar;

	onMount(() => {
		if (!canBeInitialized) return;

		initCalendar();

		return () => {
			calendar && calendar.destroy();
		};
	});

	$: canBeInitialized =
		options && options.plugins && options.plugins.length && calendarEl && !calendar;

	$: {
		if (options && options && options.plugins && options.plugins.length) updateCalendarOptions();

		if (canBeInitialized) {
			initCalendar();
		}
	}

	async function initCalendar() {
		calendar = new Calendar(calendarEl, options);
		await calendar.render();
	}

	async function updateCalendarOptions() {
		if (calendar) {
			await calendar.pauseRendering();
			await calendar.resetOptions(options);
			await calendar.resumeRendering();
		}
	}
</script>

<div bind:this={calendarEl} class={classes} {style} />
