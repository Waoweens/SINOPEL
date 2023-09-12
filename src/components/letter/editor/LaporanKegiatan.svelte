<script lang="ts">
	import Signature from '$components/letter/elements/editor/Signature.svelte';
	import EmployeeSearch from '$components/letter/elements/editor/EmployeeSearch.svelte';
	import type { FormInput, LetterType } from '$lib/letter';
	import type { CollectionStore } from '$lib/sveltefire-types';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import IconClose from '~icons/ic/baseline-close';
	import LetterNumber from '$components/letter/elements/editor/LetterNumber.svelte';

	export let employees: CollectionStore<unknown[]>;
	export let form: HTMLFormElement;
	export let letter: { name: string; value: string }[];
	export let containerWidth: number;
	export let signatureImg: string;
	export let liveLetter: { [key: string]: FormDataEntryValue };

	onMount(() => {
		loadFormData(form, letter);
	});

	function loadFormData(form: HTMLFormElement, formDataArray: { name: string; value: string }[]) {
		formDataArray.forEach(({ name, value }) => {
			const element = form.querySelector(`[name="${name}"]`) as HTMLInputElement;
			if (element) {
				if (element.type === 'checkbox' || element.type === 'radio') {
					const inputGroup = form.querySelectorAll(`[name="${name}"]`) as NodeListOf<HTMLInputElement>;
					inputGroup.forEach(input => {
						if (input.value === value) {
							input.checked = true;
						}
					});
				} else {
					element.value = value;
				}
			} else {
				console.warn(`Element with name "${name}" not found`);
			}
		});

		updatePreview();
	}

	async function imgAsArrayBuffer(img: string) {
		const response = await fetch(img);
		return await response.arrayBuffer();
	}

	function preventEnterSubmit(e: KeyboardEvent): void {
		const target = e.target as HTMLElement;
		if (e.key === 'Enter' && target.tagName !== 'TEXTAREA') {
			e.preventDefault();
		}
	}

	const dispatch = createEventDispatcher();
	function handleSubmit(e: SubmitEvent): void {
		const formData = new FormData(form);
		const valuesArray = Array.from(formData.entries()).map(([name, value]) => ({
			name,
			value
		}));
		dispatch('submit', { formInputs: valuesArray, submitter: e.submitter });
	}

	// peserta
	let participants: string[] = [];
	let participantBind: string;
	let pesertaHiddenInput: HTMLInputElement;
	let pesertaHiddenValue: string;

	async function addParticipant(): Promise<void> {
		if (participantBind.trim()) {
			participants = [...participants, participantBind.trim()];
			participantBind = '';
			pesertaHiddenValue = JSON.stringify(participants);

			await tick();
			updatePreview();
		}
	}

	async function removeParticipant(i: number): Promise<void> {
		console.log('call removeParticipant', i)
		participants = participants.filter((_, index) => index !== i);
		pesertaHiddenValue = JSON.stringify(participants);

		await tick();
		updatePreview();
	}

	function updateParticipants(): void {
		console.log('call updateParticipants');
		const currentValue: string[] = JSON.parse(
			pesertaHiddenInput.value
		);
		participants = currentValue;
	}

	
	$: if (pesertaHiddenInput) {
		if (pesertaHiddenInput.value) {
			updateParticipants();
		}
	}

	function updatePreview(): void {
		const formData = new FormData(form);
		liveLetter = Object.fromEntries(formData.entries());
		console.log('liveLetter', liveLetter);
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form bind:this={form} on:submit|preventDefault={handleSubmit} on:input={updatePreview} on:keydown={preventEnterSubmit}>
	<section id="form-kepala">
		<h3 class="h3 mb-2">Kepala</h3>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Kepada</span>
			<EmployeeSearch name="kepada" {employees} on:select={updatePreview} />
		</label>

		<label class="label mb-2">
			<span>Tanggal</span>
			<input type="date" name="date" class="input" />
		</label>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Nomor</span>
			<LetterNumber name="nomorSurat" />
		</label>

		<label class="label mb-2">
			<span>Sifat</span>
			<input type="text" disabled name="sifat" class="input" placeholder="Error..." />
		</label>

		<label class="label mb-2">
			<span>Lampiran</span>
			<input type="text" name="sifat" class="input" />
		</label>
	</section>

	<hr class="my-2" />

	<section id="form-isi">
		<h3 class="h3 mb-2">Isi surat</h3>

		<label class="label mb-2">
			<span>Dasar hukum</span>
			<textarea class="textarea" rows="5" name="dasarHukum"/>
		</label>
		<label class="label mb-2">
			<span>Peserta kegiatan</span>
			<textarea class="textarea" rows="5" name="pesertaKegiatan"/>
		</label>
		<label class="label mb-2">
			<span>Jumlah peserta</span>
			<div class="flex">
				<label class="label flex items-center">
					<span class="mr-2">Laki&#8209;Laki</span>
					<input class="input" type="number" name="jumlahPesertaMale" />
				</label>
				<label class="label flex items-center">
					<span class="mx-2">Perempuan</span>
					<input class="input" type="number" name="jumlahPesertafeale" />
				</label>
			</div>
		</label>
		<label class="label mb-2">
			<span>Narasumber</span>
			<textarea class="textarea" rows="2" name="dasarHukum"/>
		</label>
		<label class="label mb-2">
			<span>Materi</span>
			<textarea class="textarea" rows="5" name="dasarHukum"/>
		</label>
		<label class="label mb-2">
			<span>Hasil kegiatan</span>
			<textarea class="textarea" rows="5" name="dasarHukum"/>
		</label>
	</section>

	<hr class="my-2" />

	<section id="form-tanda-tangan">
		<h3 class="h3 mb-2">Tanda tangan</h3>

		<Signature name="ttdPad" {containerWidth} {signatureImg} on:change={updatePreview} />
		<EmployeeSearch name="ttd" {employees} on:select={updatePreview} />
	</section>

	<section id="form-submit">
		<button type="submit" class="btn variant-filled-primary mt-2">Save</button>
	</section>
</form>
