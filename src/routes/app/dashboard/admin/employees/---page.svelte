<script lang="ts">
	import { firestore } from '$lib/firebase/firebase';
	import type { Employee } from '$lib/letter';
	import { Paginator, ProgressRadial, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { DataHandler } from '@vincjo/datatables';
	import {
		Query,
		collection,
		endBefore,
		limit,
		limitToLast,
		orderBy,
		query,
		startAfter
	} from 'firebase/firestore';
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { collectionStore, docStore } from 'sveltefire';

	let employeeType: 'dummy' | 'dkpb' = 'dummy'

	let paginationSettings: PaginationSettings = {
		page: 0,
		limit: 5,
		size: 0,
		amounts: [1, 2, 5, 10]
	};

	const parentDoc = docStore(firestore, 'employees/' + employeeType);
	$: if ($parentDoc) paginationSettings.size = $parentDoc.count;

	let colStartAt: Employee;
	let colEndAt: Employee;
	let currentPage: number = paginationSettings.page;
	let currentLimit: number = paginationSettings.limit;
	let previousPage: number = 0;

	let colQuery: Query;
	let col: any;

	onMount(() => {
		colQuery = query(
			collection(firestore, 'employees', employeeType, 'entries'),
			orderBy('name'),
			limit(currentLimit)
		);

		col = collectionStore(firestore, colQuery);
	});

	function updateQuery(direction?: 'next' | 'prev'): void {
		console.log('call new query');
		console.log('start', colEndAt);

		colEndAt = $col[$col.length - 1];
		console.log('colStartAt', colStartAt);
		colStartAt = $col[0];
		console.log('colEndAt', colEndAt);

		paginationSettings.size = $parentDoc.count;

		if (direction === 'next') {
			if (colEndAt) {
				colQuery = query(
					collection(firestore, 'employees', employeeType, 'entries'),
					orderBy('name'),
					limit(currentLimit),
					startAfter(colEndAt.name)
				);
			}
		} else if (direction === 'prev') {
			if (colStartAt) {
				colQuery = query(
					collection(firestore, 'employees', employeeType, 'entries'),
					orderBy('name'),
					limitToLast(currentLimit),
					endBefore(colStartAt.name)
				);
			}
		} else {
			colQuery = query(
				collection(firestore, 'employees', employeeType, 'entries'),
				orderBy('name'),
				limit(currentLimit)
			);
		}

		col = collectionStore(firestore, colQuery);
	}

	$: console.log($col);

	let handler;
	let rows: Readable<Employee[]>;
	$: if ($col) {
		console.log('call update values');
		handler = new DataHandler($col as Employee[]);
		rows = handler.getRows();
	}

	function onAmountChange(e: CustomEvent): void {
		currentLimit = e.detail;
		paginationSettings.page = 0;
		currentPage = 0;
		previousPage = 0; // reset the previousPage as well
		updateQuery();
	}

	function onPageChange(e: CustomEvent): void {
		let newPage = e.detail;

		if (newPage > previousPage) {
			updateQuery('next');
		} else if (newPage < previousPage) {
			updateQuery('prev');
		} else {
			updateQuery();
		}

		previousPage = newPage;
		currentPage = newPage;
	}

	$: console.log(
		`Page: ${currentPage + 1}
	Limit: ${currentLimit}
	Overall: ${currentPage * currentLimit + 1}-${(currentPage + 1) * currentLimit}`
	);
</script>

<h1 class="h2 font-bold mb-3">Pejabat</h1>

{#if $col && $col.length > 0}
	<div class="table-container max-w-5xl">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>No</th>
					<th>ID</th>
					<th>Nama</th>
					<th>NIS</th>
					<th>Jabatan</th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row, i}
					<tr>
						<td>{currentPage * currentLimit + i + 1}</td>
						<td>{row.id}</td>
						<td>{row.name}</td>
						<td>{row.number}</td>
						<td>{row.position}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<section>
			<Paginator
				on:page={onPageChange}
				on:amount={onAmountChange}
				bind:settings={paginationSettings}
			/>
		</section>
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
