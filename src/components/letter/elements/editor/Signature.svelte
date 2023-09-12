<script lang="ts">
	import SignaturePad from 'signature_pad';
	import { onMount } from 'svelte';

	export let containerWidth: number;
	export let signatureImg: string;
	let vw: number;

	let canvas: HTMLCanvasElement;
	let signaturePad: SignaturePad;

	onMount(() => {
		console.log('Mounted');
		signaturePad = new SignaturePad(canvas, {
			minWidth: 2,
			maxWidth: 4
		});

		signaturePad.addEventListener('endStroke', () => {
			console.log('Changed');
			signatureImg = signaturePad.toDataURL();
		});
	});

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
		signatureImg = signaturePad.toDataURL();
	}

	function undo() {
		let data = signaturePad.toData();
		if (data) {
			data.pop(); // remove the last dot or line
			signaturePad.fromData(data);
		}
		signatureImg = signaturePad.toDataURL();
	}

</script>

<svelte:window bind:innerWidth={vw} />

<canvas class="bg-white rounded-t-lg" bind:this={canvas} />

<div class="!rounded-t-none !rounded-b-lg x-btn-group-aria variant-filled-secondary" style="width: {newWidth}px">
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
