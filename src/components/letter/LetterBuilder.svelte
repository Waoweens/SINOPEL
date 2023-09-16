<script lang="ts">
	import IconDownload from '~icons/ic/baseline-download';
	import IconPrint from '~icons/ic/baseline-print';
	import IconDelete from '~icons/ic/baseline-delete';
	import type { ComponentType } from 'svelte';
	import NotulenRapat from '$components/letter/editor/NotulenRapat.svelte';
	import LaporanKegiatan from '$components/letter/editor/LaporanKegiatan.svelte';
	import NotulenRapatView from '$components/letter/viewer/NotulenRapatView.svelte';
	import LaporanKegiatanView from '$components/letter/viewer/LaporanKegiatanView.svelte';
	import { snapshotElement, type LetterType } from '$lib/letter';
	import { collectionStore, docStore, userStore } from 'sveltefire';
	import { auth, firestore } from '$lib/firebase/firebase';
	import { ProgressRadial, getModalStore } from '@skeletonlabs/skeleton';
	import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let type: LetterType;
	export let id: string = '';

	let article: HTMLElement;

	let pdf: any;
	let containerWidth: number;
	let signatureImg: string;

	let letterInput: ComponentType;
	let letterView: ComponentType;
	let letterType: string;

	let liveLetter: { [key: string]: FormDataEntryValue };

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

	const modalStore = getModalStore();

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
			dateCreated = 'Loading';
			dateModified = 'Loading';
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

	// linked to button

	let downloadAnchor: HTMLAnchorElement;
	let pdfDownloading: boolean = false;
	async function downloadPdf() {
		pdfDownloading = true;	
		try {
			console.log('download pdf');
			const snapshot = snapshotElement(article);

			console.log(snapshot);

			const origin = $page.url.origin;
			console.log(origin);

			const pdf = await fetch('/api-internal/pdf', {
				method: 'POST',
				headers: {
					'Content-Type': 'text/html',
					'X-Origin-Baseurl': origin
				},
				body: snapshot
			});

			if (!pdf.ok) {
				console.error('Failed to generate PDF');
				return;
			}

			console.log('request done'); // logs

			const blob = await pdf.blob();
			console.log('blob done'); // does not log
			console.log('blob', blob); // does not log

			const url = URL.createObjectURL(blob);
			console.log('url done'); // does not log
			console.log('url', url); // does not log

			downloadAnchor.href = url;
			downloadAnchor.download = `${id}.pdf`;
			downloadAnchor.click(); // nothing happens
		} catch (err) {
			console.error(err);
		}
		pdfDownloading = false;
	}

	async function deleteLtr() {
		modalStore.trigger({
			type: 'confirm',
			title: 'Hapus dokumen',
			body: 'Apakah anda yakin ingin menghapus dokumen ini?',

			response: async (r: boolean) => {
				if (r) {
					await deleteDoc(doc(firestore, 'letters', type, 'entries', id));
					goto('./../');
				}
			}
		})
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<a bind:this={downloadAnchor} />

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
				<button
					type="button"
					disabled={pdfDownloading}
					class="btn variant-filled"
					on:click={downloadPdf}
				>
					<span>
						{#if pdfDownloading}
							<ProgressRadial width="w-6" stroke={150} meter="stroke-primary-500" />
						{:else}
							<IconDownload />
						{/if}
					</span>
					<span>Download PDF</span>
				</button>
				<!-- <button type="button" class="btn variant-filled">
					<span><IconPrint /></span>
					<span>Print</span>
				</button> -->
				<button type="button" class="btn variant-filled-error" on:click={deleteLtr}>
					<span><IconDelete /></span>
					<span>Delete</span>
				</button>
			</div>
		</section>

		<div class="flex flex-col lg:flex-row gap-4">
			<section class="p-3 card">
				<h2 class="h2">Edit</h2>
				<hr class="my-2" />
				<svelte:component
					this={letterInput}
					on:submit={handleSubmit}
					letter={$letterDoc.letter}
					{employees}
					{containerWidth}
					{signatureImg}
					{id}
					bind:liveLetter
					bind:pdf
					bind:form
				/>
			</section>
			<section class="p-3 card overflow-auto">
				<h2 class="h2">Preview</h2>
				<svelte:component this={letterView} {liveLetter} bind:article />
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
