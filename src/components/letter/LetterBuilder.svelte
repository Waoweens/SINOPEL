<script lang="ts">
	import IconDownload from '~icons/ic/baseline-download';
	import IconPrint from '~icons/ic/baseline-print';
	import IconDelete from '~icons/ic/baseline-delete';
	import type { ComponentType } from 'svelte';
	import ENotaDinas from './editor/ENotaDinas.svelte';
	import VNotaDinas from './viewer/VNotaDinas.svelte';
	import ELaporanKegiatan from './editor/ELaporanKegiatan.svelte';
	import VLaporanKegiatan from './viewer/VLaporanKegiatan.svelte';
	import type { LetterTypes } from '$lib/letter';

	export let type: LetterTypes;

	let LetterInput: ComponentType;
	let LetterView: ComponentType;

	switch(type) {
		case 'NotaDinas':
			LetterInput = ENotaDinas;
			LetterView = VNotaDinas;
			break;
		case 'LaporanKegiatan':
			LetterInput = ELaporanKegiatan;
			LetterView = VLaporanKegiatan;
			break;
	}
</script>

<section class="flex flex-col gap-4">
	<h2 class="h2">Edit letter</h2>
	<section class="card p-3">
		<div class="mb-3">
			<p>ID:</p>
			<p>Type: {type}</p>
			<p>Created:</p>
			<p>Modified:</p>
		</div>
		<div class="flex gap-3">
			<button type="button" class="btn variant-filled">
				<span><IconDownload /></span>
				<span>Download PDF</span>
			</button>
			<button type="button" class="btn variant-filled">
				<span><IconPrint /></span>
				<span>Print</span>
			</button>
			<button type="button" class="btn variant-filled-error">
				<span><IconDelete /></span>
				<span>Delete</span>
			</button>
		</div>
	</section>

	<div class="flex gap-4">
		<section class="p-3 card flex-grow">
			<h3 class="h3">Edit</h3>
			<svelte:component this={LetterInput} />
		</section>
		<section class="p-3 card flex-grow">
			<h3 class="h3">Preview</h3>
			<svelte:component this={LetterView} />
		</section>
	</div>
</section>
