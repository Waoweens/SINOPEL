<script lang="ts">
	import type { CollectionStore } from '$lib/sveltefire-types';
	import { Autocomplete, popup, type AutocompleteOption } from '@skeletonlabs/skeleton';

	export let employees: CollectionStore<unknown[]>;
	export let name: string;
	let selected: AutocompleteOption;

	let searchBind: string = '';
	let employeeData: AutocompleteOption[] = [];

	// Generate a unique ID for each component instance
	let id = Date.now().toString(36) + Math.random().toString(36).substring(2);

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
	name={name}
	placeholder="Nama..."
	bind:value={searchBind}
	use:popup={{ event: 'focus-click', target: `ac-employees-${id}`, placement: 'bottom' }}
/>
<div class="card flex-grow min-w-32 max-h-48 p-3 overflow-y-auto" data-popup={`ac-employees-${id}`}>
	<Autocomplete
		bind:input={searchBind}
		options={employeeData}
		on:selection={(event) => {
			searchBind = event.detail.label;
			selected = event.detail;
		}}
	/>
</div>

<input type="hidden" name="{name}-nis" value={selected?.value ?? ''} />
