<script lang="ts">
	import type { CollectionStore } from '$lib/sveltefire-types';
	import { Autocomplete, popup, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let employees: CollectionStore<unknown[]>;
	export let name: string;

	let selected: AutocompleteOption;

	let searchBind: string = '';
	let employeeData: AutocompleteOption[] = [];

	let hiddenInput: HTMLInputElement;
	let hiddenInputBind: string;

	// Generate a unique ID for each component instance
	const id = Date.now().toString(36) + Math.random().toString(36).substring(2);

	function onSelect(e: CustomEvent<AutocompleteOption>) {
		searchBind = e.detail.label;
		selected = e.detail;
		hiddenInputBind = JSON.stringify({
			name: e.detail.label,
			number: e.detail.value,
			position: e.detail.meta.position
		});
	}

	function updateValue() {
		console.log('call 2');
		const currentValue: { name: string; number: number; position: string } = JSON.parse(
			hiddenInput.value
		);
		searchBind = currentValue.name;
		selected = {
			label: currentValue.name,
			value: currentValue.number,
			meta: { position: currentValue.position }
		};
	}

	$: if (hiddenInput) {
		if (hiddenInput.value) {
			updateValue();
		}
	}

	$: if ($employees) {
		console.log('call');
		employeeData = $employees.map((item: any) => {
			return {
				label: item.name,
				value: item.number,
				meta: { position: item.position }
			};
		});
	}
</script>

<input
	class="input"
	type="search"
	placeholder="Nama..."
	bind:value={searchBind}
	use:popup={{ event: 'focus-click', target: `ac-employees-${id}`, placement: 'bottom-start' }}
/>
<div class="card flex-grow min-w-32 max-h-48 p-3 overflow-y-auto" data-popup={`ac-employees-${id}`}>
	<Autocomplete bind:input={searchBind} options={employeeData} on:selection={onSelect} />
</div>

<input bind:this={hiddenInput} type="hidden" {name} bind:value={hiddenInputBind} />
