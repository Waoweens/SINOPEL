<script lang="ts">
	import Signature from '$components/letter/elements/editor/Signature.svelte';
	import EmployeeSearch from '$components/letter/elements/editor/EmployeeSearch.svelte';
	import type { LetterTypes } from '$lib/letter';
	import type { CollectionStore } from '$lib/sveltefire-types';
	import { createEventDispatcher, onMount } from 'svelte';
	import IconClose from '~icons/ic/baseline-close';

	export let employees: CollectionStore<unknown[]>;
	export let form: HTMLFormElement;
	export let letter: { name: string; value: string }[];
	export let containerWidth: number;
	export let signatureImg: string;

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

	function addParticipant(): void {
		if (participantBind.trim()) {
			participants = [...participants, participantBind.trim()];
			participantBind = '';
		}
	}

	function removeParticipant(i: number): void {
		console.log('call removeParticipant', i)
		participants = participants.filter((_, index) => index !== i);
		pesertaHiddenValue = JSON.stringify(participants);
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
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form bind:this={form} on:submit|preventDefault={handleSubmit} on:keydown={preventEnterSubmit}>
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
					<input bind:this={pesertaHiddenInput} type="hidden" name="peserta" bind:value={pesertaHiddenValue} />
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
			<textarea class="textarea" rows="2" name="jam-penutupan" />
		</label>
	</section>

	<hr class="my-2" />

	<section id="form-tanda-tangan">
		<Signature {containerWidth} {signatureImg} />
	</section>

	<section id="form-submit">
		<button type="submit" class="btn variant-filled-primary mt-2">Save</button>
	</section>
</form>
