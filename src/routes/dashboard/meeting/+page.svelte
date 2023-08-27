<script lang="ts">
	import { auth, firestore } from '$lib/firebase/firebase';
	import { appname } from '$stores/static';
	import { DataHandler, type Row } from '@vincjo/datatables';
	import { Timestamp, collection, query, where } from 'firebase/firestore';
	import type { Readable } from 'svelte/store';
	import { Collection, Doc, SignedIn, collectionStore } from 'sveltefire';

	const col = collectionStore(firestore, '/letters/notulenRapat/entries');

	let handler;
	let rows: Readable<Row[]>;
	$: if (col) {
		handler = new DataHandler($col as Row[]);
		rows = handler.getRows();
		console.log('rows', $rows);
	}
</script>

<svelte:head>
	<title>Notulen Rapat - {appname}</title>
</svelte:head>

<h2 class="h2 font-bold">Notulen Rapat</h2>

<a href="/dashboard/meeting/new" class="btn variant-filled">Buat surat</a>

<SignedIn let:user>
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>ID</th>
					<!-- <th>Nomor<br />Surat</th> -->
					<!-- <th>Perangkat<br />Daerah</th> -->
					<!-- <th>Kategori</th> -->
					<!-- <th>Perihal</th> -->
					<th>Notulen</th>
					<!-- <th>Tanggal<br />Dibuat</th> -->
				</tr>
			</thead>
			<tbody>
				<Collection ref={'users'} let:data>
					{#each $rows as row}
						<tr>
							<td>{row.id}</td>
							<td>{data.find((obj) => obj.id == row.user)?.displayName ?? 'invalid account'}</td>
						</tr>
					{/each}
				</Collection>
			</tbody>
		</table>
	</div>
</SignedIn>
