<script lang="ts">
	import IconDownload from '~icons/ic/baseline-download';
	import IconPrint from '~icons/ic/baseline-print';
	import IconDelete from '~icons/ic/baseline-delete';
	import type { ComponentType } from 'svelte';
	import NotulenRapat from '$components/letter/editor/NotulenRapat.svelte';
	import LaporanKegiatan from '$components/letter/editor/LaporanKegiatan.svelte';
	import NotulenRapatView from '$components/letter/viewer/NotulenRapatView.svelte';
	import LaporanKegiatanView from '$components/letter/viewer/LaporanKegiatanView.svelte';
	import type { LetterType } from '$lib/letter';
	import { collectionStore, docStore, userStore } from 'sveltefire';
	import { auth, firestore } from '$lib/firebase/firebase';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

	export let type: LetterType;
	export let id: string = '';

	let pdf: any;
	let containerWidth: number;
	let signatureImg: string;

	let letterInput: ComponentType;
	let letterView: ComponentType;
	let letterType: string;

	$: switch (type) {
		case 'NotulenRapat':
			letterInput = NotulenRapat;
			letterView = NotulenRapatView;
			letterType = 'Notulen Rapat';
			break;
		case 'LaporanKegiatan':
			letterInput = LaporanKegiatan;
			letterView = LaporanKegiatanView;
			letterType = 'Laporan Kegiatan';
			break;
	}

	const user = userStore(auth);

	const users = collectionStore(firestore, 'users');

	const displayName = (id: string): string => {
		const user: any = $users.find((user: any) => user.id === id);
		return user ? user.displayName : 'Unknown';
	};

	const employees = collectionStore(firestore, 'employees/dkpb/entries');

	let letterDoc: any;
	$: if (id) {
		console.log('call', id);
		letterDoc = docStore(firestore, `letters/${type}/entries/${id}`);
	}

	let dateCreated: string, dateModified: string;
	$: if ($letterDoc) {
		console.log($letterDoc);

		if ($letterDoc.created?.date && $letterDoc.modified?.date) {
			const created: Date = $letterDoc.created.date.toDate();
			const modified: Date = $letterDoc.modified.date.toDate();

			const options: Intl.DateTimeFormatOptions = {
				hour12: false,
				year: 'numeric',
				month: 'numeric',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			};

			// en-GB because our country uses a stupid format
			dateCreated = created.toLocaleDateString('en-GB', options);
			dateModified = modified.toLocaleDateString('en-GB', options);
		} else {
			dateCreated = 'Loading'
			dateModified = 'Loading'
		}
	}

	let form: HTMLFormElement;

	async function handleSubmit(
		e: CustomEvent<{ formInputs: { name: string; value: string }[]; submitter: HTMLElement }>
	) {
		await updateDoc(doc(firestore, 'letters', type, 'entries', id), {
			modified: {
				date: serverTimestamp(),
				user: $user?.uid
			},
			letter: e.detail.formInputs
		});
	}
</script>

{#if $letterDoc}
	<section class="flex flex-col gap-4" bind:offsetWidth={containerWidth}>
		<h1 class="h1">Edit letter</h1>
		<section class="card p-3">
			<div class="mb-3">
				<p>ID: <span><pre class="inline whitespace-nowrap">{id}</pre></span></p>
				<p>Type: {letterType}</p>
				<p>Created: {dateCreated} by {displayName($letterDoc.created.user)}</p>
				<p>Modified: {dateModified} by {displayName($letterDoc.created.user)}</p>
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

		<div class="md:flex gap-4">
			<section class="p-3 card flex-grow basis-0">
				<h2 class="h2">Edit</h2>
				<hr class="my-2" />
				<svelte:component
					this={letterInput}
					on:submit={handleSubmit}
					letter={$letterDoc.letter}
					{employees}
					{containerWidth}
					{signatureImg}
					bind:pdf
					bind:form
				/>
			</section>
			<section class="p-3 card flex-grow basis-0">
				<h2 class="h2">Preview</h2>
				<svelte:component this={letterView} letter={$letterDoc.letter} />
				<!-- <iframe title="Preview Surat" class="w-full h-full" src={pdf} /> -->
			</section>
		</div>
	</section>
{:else}
	<div class="w-100 flex justify-center items-center p-4">
		<ProgressRadial
			width="w-36"
			stroke={100}
			meter="stroke-primary-500"
			track="stroke-primary-500/30"
		/>
	</div>
{/if}
