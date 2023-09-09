<script lang="ts">
	import EmployeeSearch from '$components/dashboard/EmployeeSearch.svelte';
	import type { CollectionStore } from '$lib/sveltefire-types';
	import LetterNumber from '../elements/LetterNumber.svelte';
	import { PDFDocument, rgb } from 'pdf-lib';
	import pemkot from '$lib/assets/Lambang_Kota_Bandung-282x240.png';
	import { createEventDispatcher, onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { userStore } from 'sveltefire';
	import { auth } from '$lib/firebase/firebase';
	import { getIdToken } from 'firebase/auth';

	export let letter: unknown;
	export let employees: CollectionStore<unknown[]>;

	export let pdf: string;

	export let form: HTMLFormElement;

	const user = userStore(auth);
	
	onMount(() => {
		updatePreview();
	});
	
	async function imgAsArrayBuffer(img: string) {
		const response = await fetch(img);
		return await response.arrayBuffer();
	}
	
	let timeout: NodeJS.Timeout;
	const pt = (n: number) => (n / 25.4) * 72;
	function updatePreview() {
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			console.log('update preview');

			const pdfDoc = await PDFDocument.create();
			const page = pdfDoc.addPage([pt(210), pt(330)]);

			const pngImage = await pdfDoc.embedPng(await imgAsArrayBuffer(pemkot));

			const margin = {
				top: pt(20),
				bottom: pt(20),
				left: pt(20),
				right: pt(20)
			};

			page.drawImage(pngImage, {
				x: page.getWidth() - margin.right - pt(50),
				y: page.getHeight() - margin.top - pt(50),
				width: pt(50),
				height: pt(50)
			});

			pdf = await pdfDoc.saveAsBase64({ dataUri: true });
		}, 1000);
	}

</script>

<form bind:this={form} method="POST" action="?/save" use:enhance={async ({ formData, action,  submitter }) => {
	formData.append('userToken', await $user?.getIdToken() ?? '')
}} on:input={updatePreview}>
	<section id="input-rapat">
		<h3 class="h3 mb-2">Rapat</h3>

		<label class="label mb-2">
			<span>Hari/Tanggal</span>
			<input type="date" name="tanggal" class="input" />
		</label>

		<label class="label mb-2">
			<span>Jam</span>
			<input type="time" name="jam" class="input" />
		</label>

		<label class="label mb-2">
			<span>Tempat</span>
			<input type="text" name="tempat" class="input" />
		</label>

		<label class="label mb-2">
			<span>Acara</span>
			<input type="text" name="acara" class="input" />
		</label>
	</section>

	<hr class="my-2" />

	<section id="input-pimpinan-rapat">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Pimpinan</span>
			<EmployeeSearch name="pimpinan" {employees} />
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Moderator</span>
			<EmployeeSearch name="moderator" {employees} />
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Pencatat</span>
			<EmployeeSearch name="pencatat" {employees} />
		</label>
	</section>

	<hr class="my-2" />

	<section id="input-foot" />

	<hr class="my-2" />

	<section>
		<button type="submit" class="btn variant-filled-primary mt-2">Save</button>
	</section>
</form>
