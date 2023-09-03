<script lang="ts">
	import { browser } from '$app/environment';
	import { firestore } from '$lib/firebase/firebase';
	import type { Employee, Letter } from '$lib/letter';
	import { Autocomplete, popup, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import SignaturePad from 'signature_pad';
	import { onMount } from 'svelte';
	import { collectionStore } from 'sveltefire';

	// export let parent: HTMLDivElement;
	export let containerWidth: number;
	export let svg: string;
	export let letter: Letter;
	let vw: number;

	let canvas: HTMLCanvasElement;
	let signaturePad: SignaturePad;

	let searchBind: string;
	let employeeData: AutocompleteOption[];
	
	const employees = collectionStore(firestore, 'employees/dkpb/entries');

	$: if ($employees) {
		employeeData = $employees.map((item: any) => {
			return {
				label: item.name,
				value: item.number,
				meta: { position: item.position }
			};
		});
		console.log('e', employeeData);
	}

	onMount(() => {
		console.log('Mounted');
		signaturePad = new SignaturePad(canvas, {
			minWidth: 2,
			maxWidth: 4
		});

		signaturePad.addEventListener('endStroke', () => {
			console.log('Changed');
			svg = signaturePad.toDataURL();
		});
	});

	let newWidth: number, newHeight: number;
	$: if (canvas && vw) {

		if (vw > 1400) {
			newWidth = containerWidth / 2;
			newHeight = newWidth / 2;
		} else {
			newWidth = containerWidth - 25;
			newHeight = newWidth / 2;
		}

		// Update the canvas size
		canvas.width = newWidth;
		canvas.height = newHeight;

		// Calculate scaling factors based on canvas dimensions
		const scalingFactor = newWidth / 250; // 400 can be some base dimension

		// Update SignaturePad settings
		if (signaturePad) {
			signaturePad.minWidth = 2 * scalingFactor;
			signaturePad.maxWidth = 4 * scalingFactor;
		}
	}

	function clear() {
		console.log('Clearing');
		signaturePad.clear();
		svg = signaturePad.toDataURL();
	}

	function undo() {
		let data = signaturePad.toData();
		if (data) {
			data.pop(); // remove the last dot or line
			signaturePad.fromData(data);
		}
		svg = signaturePad.toDataURL();
	}

</script>

<svelte:window bind:innerWidth={vw} />

<canvas class="bg-white rounded-t-lg" bind:this={canvas} />

<div class="!rounded-t-none !rounded-b-lg x-btn-group-aria variant-filled" style="width: {newWidth}px">
	<div
		class="w-full"
		role="button"
		tabindex="0"
		aria-label="Clear"
		on:click={undo}
		on:keydown={(e) => {
			if (e.code === 'Space' || e.code === 'Enter') {
				undo();
			}
		}}
	>
		Undo
	</div>
	<div
		class="w-full"
		role="button"
		tabindex="0"
		aria-label="Clear"
		on:click={clear}
		on:keydown={(e) => {
			if (e.code === 'Space' || e.code === 'Enter') {
				clear();
			}
		}}
	>
		Clear
	</div>
</div>

<div class="flex flex-col mt-2" style="width: {newWidth}px">
	<input
		class="input"
		type="search"
		placeholder="Nama"
		bind:value={searchBind}
		use:popup={{ event: 'focus-click', target: 'ac-signature', placement: 'bottom' }}
	/>
	<div
		class="card flex-grow min-w-32 max-h-48 p-3 overflow-y-auto"
		data-popup='ac-signature'
	>
		<Autocomplete
			bind:input={searchBind}
			options={employeeData}
			on:selection={(event) => {
				// @ts-ignore
				searchBind = event.detail.label;
				letter.foot.signature.employee = event.detail;
			}}
		/>
	</div>
</div>

<!-- <div on:click={save}>save</div> -->