<script lang="ts">
	import Signature from '$components/letter/elements/editor/Signature.svelte';
	import EmployeeSearch from '$components/letter/elements/editor/EmployeeSearch.svelte';
	import { getFileName, type FormInput, type LetterType } from '$lib/letter';
	import type { CollectionStore } from '$lib/sveltefire-types';
	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
	import IconClose from '~icons/ic/baseline-close';
	import IconUploadFile from '~icons/ic/round-upload-file';
	import IconSave from '~icons/ic/baseline-save';
	import IconCheck from '~icons/ic/baseline-check';
	import {
		FileDropzone,
		getModalStore,
		ProgressRadial,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { ref } from 'firebase/storage';
	import { storage } from '$lib/firebase/firebase';
	import LetterNumber from '$components/letter/elements/editor/LetterNumber.svelte';
	import { letterSaving } from '$stores/states';
	import { fade } from 'svelte/transition';

	export let employees: CollectionStore<unknown[]>;
	export let form: HTMLFormElement;
	export let letter: { name: string; value: string }[];
	export let containerWidth: number;
	export let liveLetter: { [key: string]: FormDataEntryValue };
	export let id: string;

	const modalStore = getModalStore();

	let loading: boolean = true;

	onMount(() => {
		loadFormData(form, letter);
	});

	async function loadFormData(
		form: HTMLFormElement,
		formDataArray: { name: string; value: string }[]
	) {
		formDataArray.forEach(({ name, value }) => {
			const element = form.querySelector(`[name="${name}"]`) as HTMLInputElement;
			if (element) {
				if (element.type === 'checkbox' || element.type === 'radio') {
					const inputGroup = form.querySelectorAll(
						`[name="${name}"]`
					) as NodeListOf<HTMLInputElement>;
					inputGroup.forEach((input) => {
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

		await tick();
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
		letterSaving.set(true);
		const formData = new FormData(form);
		const valuesArray = Array.from(formData.entries()).map(([name, value]) => ({
			name,
			value
		}));
		dispatch('submit', { formInputs: valuesArray, submitter: e.submitter });
	}

	function updatePreview(): void {
		const formData = new FormData(form);
		liveLetter = Object.fromEntries(formData.entries());
		console.log('liveLetter', liveLetter);
	}

	let uploadOne: string, uploadTwo: string, uploadThree: string, uploadFour: string;
	let uploadDaftarHadir: string;
	let uploadOneInput: HTMLInputElement,
		uploadTwoInput: HTMLInputElement,
		uploadThreeInput: HTMLInputElement,
		uploadFourInput: HTMLInputElement;
	let uploadDaftarHadirInput: HTMLInputElement;
	function openUploadBox(name: string) {
		const tmp = {};
		// modalStore.trigger(modalSettings)
		new Promise<{ name: string; url: string }>((resolve) => {
			const modalSettings: ModalSettings = {
				type: 'component',
				component: 'fileUploadBox',
				meta: {
					name,
					letterType: 'NotulenRapat',
					letterId: id
				},
				response: (r: { name: string; url: string }) => resolve(r)
			};

			modalStore.trigger(modalSettings);
		}).then(async (res) => {
			console.log('res', res);
			console.log('name', name);
			switch (name) {
				case 'uploadOne':
					uploadOne = res.url;
					break;
				case 'uploadTwo':
					uploadTwo = res.url;
					break;
				case 'uploadThree':
					uploadThree = res.url;
					break;
				case 'uploadFour':
					uploadFour = res.url;
					break;
				case 'uploadDaftarHadir':
					uploadDaftarHadir = res.url;
					break;
			}
			await tick();
			updatePreview();
		});
	}

	// upload one
	$: if (uploadOneInput) {
		if (uploadOneInput.value) {
			uploadOne = uploadOneInput.value;
		}
	}

	// upload two
	$: if (uploadTwoInput) {
		if (uploadTwoInput.value) {
			uploadTwo = uploadTwoInput.value;
		}
	}
	// upload three
	$: if (uploadThreeInput) {
		if (uploadThreeInput.value) {
			uploadThree = uploadThreeInput.value;
		}
	}
	// upload four
	$: if (uploadFourInput) {
		if (uploadFourInput.value) {
			uploadFour = uploadFourInput.value;
		}
	}
	// upload daftar hadir
	$: if (uploadDaftarHadirInput) {
		if (uploadDaftarHadirInput.value) {
			uploadDaftarHadir = uploadDaftarHadirInput.value;
		}
	}

	let fadeTimeout: NodeJS.Timeout;
	let wasSaving = false;

	$: {
		if ($letterSaving) {
			wasSaving = true;
			fadeTimeout = setTimeout(() => {
				wasSaving = false;
			}, 3000);
		}
	}

	onDestroy(() => {
		clearTimeout(fadeTimeout);
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form
	bind:this={form}
	on:submit|preventDefault={handleSubmit}
	on:input={updatePreview}
	on:keydown={preventEnterSubmit}
>
	<section id="form-rapat">
		<h3 class="h3 mb-2">Kepala</h3>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Kepada</span>
			<EmployeeSearch name="kepada" {employees} on:select={updatePreview} />
		</label>

		<label class="label mb-2">
			<span>Tanggal</span>
			<input type="date" name="tanggal" class="input" />
		</label>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Nomor surat</span>
			<LetterNumber name="nomorSurat" />
		</label>

		<label class="label mb-2">
			<span>Sifat</span>
			<select class="select" name="sifat">
				<option value="Biasa">Biasa</option>
				<option value="Segera">Segera</option>
				<option value="Rahasia">Rahasia</option>
				<option value="Sangat Rahasia">Sangat Rahasia</option>
				<option value="Penting">Penting</option>
				<option value="Konfidensial">Konfidensial</option>
			</select>
		</label>

		<label class="label mb-2">
			<span>Lampiran</span>
			<select class="select" name="lampiran">
				<option value="-">Tidak ada (-)</option>
				<option value="1 (satu) berkas">1 (satu) berkas</option>
			</select>
		</label>

		<label>
			<span>Perihal</span>
			<input type="text" name="perihal" class="input" />
		</label>
	</section>

	<hr class="my-2" />

	<section id="form-isi-surat">
		<h3 class="h3 mb-2">Isi</h3>

		<label class="label mb-2">
			<span>Dasar Hukum</span>
			<textarea name="dasarHukum" class="textarea" rows="5" />
		</label>

		<label class="label mb-2">
			<span>Peserta Kegiatan</span>
			<textarea name="pesertaKegiatan" class="textarea" rows="5" />
		</label>

		<label class="label mb-2">
			<span>Jumlah peserta</span>
			<div class="label flex items-center gap-3">
				<span>Laki&#8209;laki</span>
				<input type="number" class="input" name="jumlahPesertaMale" />
			</div>
			<label class="label flex items-center gap-3">
				<span>Perempuan</span>
				<input type="number" class="input" name="jumlahPesertaFemale" />
			</label>
		</label>

		<label class="label mb-2">
			<span>Narasumber</span>
			<textarea name="narasumber" class="textarea" rows="5" />
		</label>

		<label class="label mb-2">
			<span>Materi</span>
			<textarea name="materi" class="textarea" rows="5" />
		</label>

		<label class="label mb-2">
			<span>Hasil Kegiatan</span>
			<textarea name="hasilKegiatan" class="textarea" rows="5" />
		</label>
	</section>

	<hr class="my-2" />

	<section>
		<h2 class="h3 mb-2">Dokumentasi</h2>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Upload file</span>
		</label>

		<div>
			<div class="flex gap-3 items-center variant-ghost-secondary p-2 mb-2">
				<button
					type="button"
					class="btn variant-filled"
					on:click={() => openUploadBox('uploadOne')}
				>
					Upload
				</button>
				<p class="text-xl">{getFileName(uploadOne) ?? 'Belum ada gambar'}</p>
				<input bind:this={uploadOneInput} type="hidden" name="uploadOne" bind:value={uploadOne} />
			</div>

			<div class="flex gap-3 items-center variant-ghost-secondary p-2 mb-2">
				<button
					type="button"
					class="btn variant-filled"
					on:click={() => openUploadBox('uploadTwo')}
				>
					Upload
				</button>
				<p class="text-xl">{getFileName(uploadTwo) ?? 'Belum ada gambar'}</p>
				<input bind:this={uploadTwoInput} type="hidden" name="uploadTwo" bind:value={uploadTwo} />
			</div>

			<div class="flex gap-3 items-center variant-ghost-secondary p-2 mb-2">
				<button
					type="button"
					class="btn variant-filled"
					on:click={() => openUploadBox('uploadThree')}
				>
					Upload
				</button>
				<p class="text-xl">{getFileName(uploadThree) ?? 'Belum ada gambar'}</p>
				<input
					bind:this={uploadThreeInput}
					type="hidden"
					name="uploadThree"
					bind:value={uploadThree}
				/>
			</div>

			<div class="flex gap-3 items-center variant-ghost-secondary p-2 mb-2">
				<button
					type="button"
					class="btn variant-filled"
					on:click={() => openUploadBox('uploadFour')}
				>
					Upload
				</button>
				<p class="text-xl">{getFileName(uploadFour) ?? 'Belum ada gambar'}</p>
				<input
					bind:this={uploadFourInput}
					type="hidden"
					name="uploadFour"
					bind:value={uploadFour}
				/>
			</div>
		</div>
	</section>

	<hr class="my-2" />

	<section id="form-tanda-tangan">
		<h3 class="h3 mb-2">Tanda tangan</h3>

		<Signature name="ttdPad" {containerWidth} on:change={updatePreview} />
		<EmployeeSearch name="ttd" {employees} on:select={updatePreview} />
	</section>

	<hr class="my-2" />

	<section id="form-daftar-hadir">
		<h3 class="h3 mb-2">Daftar hadir</h3>
		<div class="flex gap-3 items-center variant-ghost-secondary p-2 mb-2">
			<button
				type="button"
				class="btn variant-filled"
				on:click={() => openUploadBox('uploadDaftarHadir')}
			>
				Upload
			</button>
			<p class="text-xl">{getFileName(uploadDaftarHadir) ?? 'Belum ada gambar'}</p>
			<input
				bind:this={uploadDaftarHadirInput}
				type="hidden"
				name="uploadDaftarHadir"
				bind:value={uploadDaftarHadir}
			/>
		</div>
	</section>

	<section id="form-submit flex flex-row">
		<button type="submit" disabled={$letterSaving} class="btn variant-filled-primary mt-2">
			<span>
				{#if $letterSaving}
					<ProgressRadial width="w-6" stroke={150} meter="stroke-primary-500" />
				{/if}
				{#if wasSaving}
					<div>
						<IconCheck />
					</div>
				{:else}
					<div>
						<IconSave />
					</div>
				{/if}
			</span>
			<span>Save</span>
		</button>
	</section>
</form>
