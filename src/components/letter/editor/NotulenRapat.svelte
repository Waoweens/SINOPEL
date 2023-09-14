<script lang="ts">
	import Signature from '$components/letter/elements/editor/Signature.svelte';
	import EmployeeSearch from '$components/letter/elements/editor/EmployeeSearch.svelte';
	import type { FormInput, LetterType } from '$lib/letter';
	import type { CollectionStore } from '$lib/sveltefire-types';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import IconClose from '~icons/ic/baseline-close';
	import IconUploadFile from '~icons/ic/round-upload-file';
	import { FileDropzone, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	export let employees: CollectionStore<unknown[]>;
	export let form: HTMLFormElement;
	export let letter: { name: string; value: string }[];
	export let containerWidth: number;
	export let signatureImg: string;
	export let liveLetter: { [key: string]: FormDataEntryValue };
	export let id: string;

	const modalStore = getModalStore();

	onMount(() => {
		loadFormData(form, letter);
	});

	function loadFormData(form: HTMLFormElement, formDataArray: { name: string; value: string }[]) {
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
		console.log('call removeParticipant', i);
		participants = participants.filter((_, index) => index !== i);
		pesertaHiddenValue = JSON.stringify(participants);

		await tick();
		updatePreview();
	}

	function updateParticipants(): void {
		console.log('call updateParticipants');
		const currentValue: string[] = JSON.parse(pesertaHiddenInput.value);
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

	function openUploadBox(name: string) {
		const modalSettings: ModalSettings = {
			type: 'component',
			component: 'fileUploadBox',
			meta: {
				name,
				letterType: 'NotulenRapat',
				letterId: id
			}
		};

		modalStore.trigger(modalSettings);
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form
	bind:this={form}
	on:submit|preventDefault={handleSubmit}
	on:input={updatePreview}
	on:keydown={preventEnterSubmit}
>
	<section id="form-rapat">
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

	<section id="form-pimpinan-rapat">
		<h3 class="h3 mb-2">Pimpinan Rapat</h3>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Pimpinan</span>
			<EmployeeSearch name="pimpinan" {employees} on:select={updatePreview} />
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Moderator</span>
			<EmployeeSearch name="moderator" {employees} on:select={updatePreview} />
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Pencatat</span>
			<EmployeeSearch name="pencatat" {employees} on:select={updatePreview} />
		</label>
	</section>

	<hr class="my-2" />

	<section id="form-peserta">
		<h3 class="h3 mb-2">Peserta</h3>

		<div class="2xl:w-1/2 label mb-2">
			<ul class="list p-3 card !variant-soft-secondary">
				{#each participants as participant, i (i)}
					<li class="mb-2">
						<button
							type="button"
							class="btn-icon btn-icon-sm variant-filled"
							on:click={() => {
								removeParticipant(i);
							}}
						>
							<IconClose class="text-xl" />
						</button>
						<span class="flex-auto text-lg">{participant}</span>
					</li>
				{/each}
			</ul>
			<label class="label">
				<span>Tambah peserta</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input
						type="text"
						class="input"
						bind:value={participantBind}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								addParticipant();
							}
						}}
					/>
					<button type="button" class="variant-filled-secondary" on:click={addParticipant}
						>Tambah</button
					>
					<input
						bind:this={pesertaHiddenInput}
						type="hidden"
						name="peserta"
						bind:value={pesertaHiddenValue}
					/>
				</div>
			</label>
		</div>
	</section>

	<hr class="my-2" />

	<section id="form-kegiatan-rapat">
		<h3 class="h3 mb-2">Kegiatan Rapat</h3>

		<label class="label mb-2">
			<span>Pembahasan</span>
			<textarea class="textarea" rows="5" name="pembahasan" />
		</label>

		<label class="label mb-2">
			<span>Keputusan</span>
			<textarea class="textarea" rows="5" name="keputusan" />
		</label>

		<label class="label mb-2">
			<span>Jam penutupan</span>
			<input type="time" name="jamPenutupan" class="input" />
		</label>
	</section>

	<hr class="my-2" />

	<section>
		<h2 class="h3 mb-2">Dokumentasi</h2>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Upload file</span>
		</label>

		<ul class="lg:columns-2">
			<li>
				<div>
					<button
						type="button"
						class="btn variant-filled"
						on:click={() => openUploadBox('uploadOne')}
					>
						Upload
					</button>
				</div>
			</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
		</ul>
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
