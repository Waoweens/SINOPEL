<script lang="ts">
	import EmployeeSearch from '$components/dashboard/EmployeeSearch.svelte';
	import type { CollectionStore } from '$lib/sveltefire-types';
	import LetterNumber from '../elements/LetterNumber.svelte';
	import { PDFDocument, rgb } from 'pdf-lib';
	import pemkot from '$lib/assets/Lambang_Kota_Bandung-282x240.png';
	import { onMount } from 'svelte';

	export let letter: unknown;
	export let employees: CollectionStore<unknown[]>;

	export let pdf: string;

	let timeout: NodeJS.Timeout;

	onMount(() => {
		updatePreview();
	});
	
	async function imgAsArrayBuffer(img: string) {
		const response = await fetch(img);
		return await response.arrayBuffer();
	}

	function updatePreview() {
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			console.log('update preview');

			const pdfDoc = await PDFDocument.create();
			const page = pdfDoc.addPage();

			const pngImage = await pdfDoc.embedPng(await imgAsArrayBuffer(pemkot));

			page.drawImage(pngImage, {
				x: 0,
				y: page.getHeight() - 240,
				width: 282,
				height: 240,
			});

			pdf = await pdfDoc.saveAsBase64({ dataUri: true });
		}, 1000);
	}

	function handleSubmit() {}
</script>

<form on:submit|preventDefault={handleSubmit} on:input={updatePreview}>
	<section id="input-rapat">
		<h3 class="h3 mb-2">Rapat</h3>

		<label class="label mb-2">
			<span>Hari/Tanggal</span>
			<input type="date" class="input" />
		</label>

		<label class="label mb-2">
			<span>Jam</span>
			<input type="time" class="input" />
		</label>

		<label class="label mb-2">
			<span>Tempat</span>
			<input type="text" class="input" />
		</label>

		<label class="label mb-2">
			<span>Acara</span>
			<input type="text" class="input" />
		</label>
		
	</section>

	<hr class="my-2" />

	<section id="input-pimpinan-rapat">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Pimpinan</span>
			<EmployeeSearch {employees} />
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Moderator</span>
			<EmployeeSearch {employees} />
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Pencatat</span>
			<EmployeeSearch {employees} />
		</label>
	</section>

	<hr class="my-2" />

	<section id="input-foot" />

	<hr class="my-2" />

	<section>
		<button type="submit" class="btn variant-filled-primary mt-2">Save</button>
	</section>
</form>
