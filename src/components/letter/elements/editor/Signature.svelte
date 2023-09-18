<script lang="ts">
	import { fromJson } from '$lib/letter';
	import SignaturePad, { type PointGroup } from 'signature_pad';
	import { createEventDispatcher, onMount, tick } from 'svelte';

	export let containerWidth: number;
	export let name: string;
	let signatureImg: string;
	let signatureData: PointGroup[];
	let vw: number;

	let canvas: HTMLCanvasElement;
	let signaturePad: SignaturePad;

	let hiddenInputData: HTMLInputElement;
	let hiddenInputDataValue: string;
	let hiddenInputImg: HTMLInputElement;
	let hiddenInputImgValue: string;

	let isUpdatingCanvas = false;

	const dispatch = createEventDispatcher();

	onMount(() => {
		console.log('Mounted');
		signaturePad = new SignaturePad(canvas, {
			minWidth: 2,
			maxWidth: 4
		});

		signaturePad.addEventListener('endStroke', async () => {
			// if (!isUpdatingCanvas) {
				console.log('Changed');
				updateCanvas();
			// }
		});
	});

	async function updateCanvas() {
		isUpdatingCanvas = true;
		signatureImg = signaturePad.toDataURL();
		signatureData = signaturePad.toData();

		hiddenInputDataValue = JSON.stringify(signatureData);
		hiddenInputImgValue = signatureImg;
		console.log('SIGNATURE DATA', signatureData);

		await tick();
		dispatch('change');
	}

	$: if (hiddenInputData) {
		if (hiddenInputData.value && !isUpdatingCanvas) {
			signatureData = fromJson(hiddenInputData.value);
			if (signaturePad) {
				console.log('Updating canvas from hidden input', hiddenInputData.value, signatureData)
				isUpdatingCanvas = true;
				signaturePad.fromData(signatureData);
				isUpdatingCanvas = false;
			}

			updateCanvas();
		}
	}

	$: if (hiddenInputImg) {
		if (hiddenInputImg.value) {
			signatureImg = hiddenInputImg.value;
			// hiddenInputValue = signatureImg;
		}
	}

	let newWidth: number, newHeight: number;
	$: if (canvas && vw) {
		// if (vw > 1400) {
		newWidth = containerWidth / 2;
		newHeight = newWidth / 2;
		// } else {
		// 	newWidth = containerWidth - 25;
		// 	newHeight = newWidth / 2;
		// }

		// Update the canvas size
		canvas.width = newWidth;
		canvas.height = newHeight;

		// Calculate scaling factors based on canvas dimensions
		const scalingFactor = newWidth / 250; // can be some base dimension

		// Update SignaturePad settings
		if (signaturePad) {
			signaturePad.minWidth = 2 * scalingFactor;
			signaturePad.maxWidth = 4 * scalingFactor;

			// updateCanvas();
		}
	}

	function clear() {
		console.log('Clearing');
		signaturePad.clear();

		updateCanvas();
	}

	function undo() {
		let data = signaturePad.toData();
		if (data) {
			data.pop(); // remove the last dot or line
			signaturePad.fromData(data);
		}

		updateCanvas();
	}
</script>

<svelte:window bind:innerWidth={vw} />

<canvas class="bg-white rounded-t-lg" bind:this={canvas} />

<div
	class="!rounded-t-none !rounded-b-lg x-btn-group-aria variant-filled-secondary"
	style="width: {newWidth}px"
>
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

<input
	type="hidden"
	bind:this={hiddenInputData}
	name="{name}Data"
	bind:value={hiddenInputDataValue}
/>
<input type="hidden" bind:this={hiddenInputImg} name="{name}Img" bind:value={hiddenInputImgValue} />
