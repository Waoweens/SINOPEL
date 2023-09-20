<script lang="ts">
	import type { CollectionStore } from '$lib/sveltefire-types';
	import { Autocomplete, popup, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { writable } from 'svelte/store';

	export let employees: CollectionStore<unknown[]>;
	export let name: string;

	let selected: AutocompleteOption;
	// const selected = writable<AutocompleteOption | null>(null);

	let searchBind: string = '';
	let employeeData: AutocompleteOption[] = [];

	let hiddenInput: HTMLInputElement;
	let hiddenInputBind: string;

	let otherHiddenInput: HTMLInputElement;
	let otherShowInput: boolean = false;
	let otherInputValue: string = '';
	let otherInputDetails: string;

	// Generate a unique ID for each component instance
	const id = Date.now().toString(36) + Math.random().toString(36).substring(2);

	const dispatch = createEventDispatcher();

	async function onSelect(e: CustomEvent<AutocompleteOption>) {
		searchBind = e.detail.label;
		selected = e.detail;
		hiddenInputBind = JSON.stringify({
			name: e.detail.label,
			number: e.detail.value,
			position: e.detail.meta.position
		});

		otherShowInput = selected?.meta?.position === 'other';
		if (otherShowInput) {
			otherInputDetails = JSON.stringify({ name: '', number: 0, position: 'other' }); // Initialize otherInputDetails with a default value
		}

		await tick();
		dispatch('select');
	}

	async function updateValue(input: HTMLInputElement, other?: boolean) {
		const currentValue: { name: string; number: number; position: string } = JSON.parse(
			input.value
		);
		console.log(id, 'call updatevalue', currentValue);
		if (!other) searchBind = currentValue.name;
		if (!other)
			selected = {
				label: currentValue.name,
				value: currentValue.number,
				meta: { position: currentValue.position }
			};

		if (other) otherInputValue = currentValue.name;

		otherShowInput = currentValue.position === 'other';

		await tick();

		dispatch('select');
	}

	$: if (hiddenInput) {
		if (hiddenInput.value) {
			updateValue(hiddenInput);
		}
	}

	$: if (otherHiddenInput) {
		if (otherHiddenInput.value) {
			updateValue(otherHiddenInput, true);
		}
	}

	$: if (otherShowInput) {
		otherInputDetails = JSON.stringify({ name: otherInputValue, number: 0, position: 'other' });
	}

	$: otherShowInput = selected?.meta?.position === 'other';

	$: if ($employees) {
		console.log(id, 'call if employees');
		employeeData = [
			{ label: 'Lainnya...', value: 0, meta: { position: 'other' } }, // Add an "other" option to the array
			...$employees.map((item: any) => {
				return {
					label: item.name,
					value: item.number,
					meta: { position: item.position }
				};
			})
		];
	}

	$: {
		console.log(id, 'selected 34243', selected);
	}
</script>

<input
	class="input"
	type="search"
	placeholder="Nama..."
	bind:value={searchBind}
	use:popup={{ event: 'focus-click', target: `ac-employees-${id}`, placement: 'bottom-start' }}
	on:input={() => dispatch('select')}
/>
<div class="card flex-grow min-w-32 max-h-48 p-3 overflow-y-auto" data-popup={`ac-employees-${id}`}>
	<Autocomplete bind:input={searchBind} options={employeeData} on:selection={onSelect} />
</div>

{#if otherShowInput}
	<!-- Conditionally display the "other" input field -->
	<input bind:value={otherInputValue} class="input" type="text" placeholder="Please specify" />
{/if}
<input
	bind:this={otherHiddenInput}
	type="hidden"
	name="{name}Other"
	bind:value={otherInputDetails}
/>

<input bind:this={hiddenInput} type="hidden" {name} bind:value={hiddenInputBind} />
