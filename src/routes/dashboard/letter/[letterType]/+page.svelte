<script lang="ts">
	import LetterNumberDisplay from '$components/elements/letterbuilder/LetterNumberDisplay.svelte';
	import { firestore } from '$lib/firebase/firebase';
	import type { Packet } from '$lib/letter';
	import { appname } from '$stores/static';
	import { DataHandler } from '@vincjo/datatables';
	import type { Readable, Writable } from 'svelte/store';
	import { Collection, SignedIn, collectionStore } from 'sveltefire';
	import IconEdit from '~icons/ic/baseline-edit';
	import type { PageData } from './$types';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data: PageData;
	let letterType: string;
	$: letterType = data.letter.type;

	let col: any;
	let vw: number;

	$: col = collectionStore(firestore, `/letters/${data.letter.type}/entries`);

	let pageName: () => string;
	$: pageName = (): string => {
		switch (data.letter.type) {
			case 'meeting':
				return 'Notulen Rapat';
			case 'event':
				return 'Laporan Kegiatan';
			default:
				return 'Surat';
		}
	};

	let handler;
	let rows: Readable<Packet[]>;
	$: if ($col) {
		handler = new DataHandler($col as Packet[]);
		rows = handler.getRows();
	}
</script>

<svelte:head>
	<title>{pageName()} - {appname}</title>
</svelte:head>

<svelte:window bind:innerWidth={vw} />

<h2 class="h2 font-bold">{pageName()}</h2>

<a class="btn variant-filled-primary my-3" href="./{data.letter.type}/new">Buat surat</a>

<SignedIn let:user>
	<Collection ref={'users'} let:data>
		{#if $col.length > 0}
			<div class="table-container">
				<table class="table table-hover">
					<thead>
						<tr>
							<th />
							<th>ID</th>
							<th>Nomor<br />Surat</th>
							<th>Perangkat<br />Daerah</th>
							<th>Sifat</th>
							<th>Perihal</th>
							<th>Notulen</th>
							<th>Terakhir<br />Diedit</th>
						</tr>
					</thead>
					<tbody>
						{#each $rows as row}
							<tr>
								<td>
									<a
										class="btn-icon variant-filled-secondary !rounded-md"
										href="/dashboard/letter/{letterType}/edit/{row.id}"
									>
										<IconEdit class="text-xl" />
									</a>
								</td>
								<td>{row.id}</td>
								<td>
									<LetterNumberDisplay
										data={{ seperator: '/' }}
										content={row.content.head.find((obj) => obj.name == 'Nomor')?.content}
									/>
								</td>
								<td>Dinas Kebakaran dan<br />Penanggulangan Bencana</td>
								<td>
									{row.content.head.find((obj) => obj.name == 'Sifat')?.content ?? ''}
								</td>
								<td>
									{row.content.head.find((obj) => obj.name == 'Perihal')?.content ?? ''}
								</td>
								<td>
									{data.find((obj) => obj.id == row.created.user)?.displayName ??
										'Akun tidak valid'}
									<br />
									{row.created.date.toDate().toLocaleDateString('en-GB', {
										year: 'numeric',
										month: '2-digit',
										day: '2-digit',
										hour: '2-digit',
										minute: '2-digit',
										second: '2-digit'
									})}
								</td>
								<td>
									{data.find((obj) => obj.id == row.modified.user)?.displayName ??
										'Akun tidak valid'}
									<br />
									{row.modified.date.toDate().toLocaleDateString('en-GB', {
										year: 'numeric',
										month: '2-digit',
										day: '2-digit',
										hour: '2-digit',
										minute: '2-digit',
										second: '2-digit'
									})}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
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
	</Collection>
</SignedIn>
