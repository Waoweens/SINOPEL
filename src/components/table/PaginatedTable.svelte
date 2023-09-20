<script lang="ts">
	import {
		collection,
		query,
		orderBy,
		limit,
		startAfter,
		endBefore,
		limitToLast,
		Query
	} from 'firebase/firestore';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { collectionStore, docStore } from 'sveltefire';
	import { firestore } from '$lib/firebase/firebase';
	import type { Readable } from 'svelte/store';
	import { DataHandler, type Row } from '@vincjo/datatables';

	export let parentDocPath: string;
	export let collectionPath: string[];
	export let paginationSettings: PaginationSettings;
	export let order: string;
	// export let dataType: any;
	// dataType; // to make the linter happy

	const parentDoc = docStore(firestore, parentDocPath);
	$: if ($parentDoc) paginationSettings.size = $parentDoc.count;

	let handler;
	let rows: Readable<Record<string, any>[]>;
	let colStartAt: any;
	let colEndAt: any;
	let currentPage: number = paginationSettings.page;
	let currentLimit: number = paginationSettings.limit;
	let colQuery: Query;
	let col: any;

	let out: {
		rows: Record<string, any>[]
	};

	onMount(() => {
		colQuery = query(
			collection(firestore, ...(collectionPath as [string, ...string[]])),
			orderBy(order),
			limit(currentLimit)
		);

		col = collectionStore(firestore, colQuery);
	});

	$: if ($col) {
		handler = new DataHandler($col as Record<string, any>[]);
		rows = handler.getRows();
	}

	$: {
		console.log('parent', $parentDoc, 'col', $col, 'rows', $rows);
		out = {
			rows: $rows
		};
	}

	function updateQuery(direction?: 'next' | 'prev'): void {
		console.log('call new query');

		colEndAt = $col[$col.length - 1];
		console.log('colStartAt', colStartAt);
		colStartAt = $col[0];
		console.log('colEndAt', colEndAt);

		paginationSettings.size = $parentDoc.count;

		if (direction === 'next') {
			colQuery = query(
				collection(firestore, ...(collectionPath as [string, ...string[]])),
				orderBy('name'),
				limit(currentLimit),
				startAfter(colEndAt.name)
			);
		} else if (direction === 'prev') {
			colQuery = query(
				collection(firestore, ...(collectionPath as [string, ...string[]])),
				orderBy('name'),
				limitToLast(currentLimit),
				endBefore(colStartAt.name)
			);
		} else {
			colQuery = query(
				collection(firestore, ...(collectionPath as [string, ...string[]])),
				orderBy('name'),
				limit(currentLimit)
			);
		}

		col = collectionStore(firestore, colQuery);
	}

	function onAmountChange(e: CustomEvent): void {
		currentLimit = e.detail;
		paginationSettings.page = 0;
		currentPage = 0;
		updateQuery();
	}

	function onPageChange(e: CustomEvent): void {
		let newPage = e.detail;

		if (newPage > currentPage) {
			updateQuery('next');
		} else {
			updateQuery('prev');
		}

		currentPage = newPage;
	}
</script>

<!-- <Paginator on:page={onPageChange} on:amount={onAmountChange} bind:settings={paginationSettings} /> -->

<!-- Expose the `col` as a slot prop so it can be used in parent component -->
{#if $col && $col.length > 0}
	<div class="table-container max-w-5xl">
		<table class="table table-hover">
			<thead>
				<slot name="head" />
			</thead>
			<tbody>
				<slot name="body" {out} {currentPage} {currentLimit} />
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
	<slot name="loading" />
{/if}
