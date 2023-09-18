<script lang="ts">
	import PaginatedTable from '$components/table/PaginatedTable.svelte';
	import type { Employee } from '$lib/letter';
	import { ProgressRadial, type PaginationSettings } from '@skeletonlabs/skeleton';

	// ... (your existing code)

	const parentDocPath = 'employees/dkpb';
	const collectionPath = ['employees', 'dkpb', 'entries'];

	let paginationSettings: PaginationSettings = {
		page: 0,
		limit: 5,
		size: 0,
		amounts: [1, 3, 5, 10]
	};
</script>

<PaginatedTable {parentDocPath} {collectionPath} {paginationSettings}>
	<svelte:fragment slot="head">
		<tr>
			<th>No</th>
			<th>ID</th>
			<th>Nama</th>
			<th>NIS</th>
			<th>Jabatan</th>
		</tr>
	</svelte:fragment>
	<svelte:fragment slot="body" let:out let:currentPage let:currentLimit>
		<!-- {console.log(out)} -->
		{#each out.rows as row, i}
			<tr>
				<td>{currentPage * currentLimit + i + 1}</td>
				<pre><td>{row.id}</td></pre>
				<td>{row.name}</td>
				<td>{row.number}</td>
				<td>{row.position}</td>
			</tr>
		{/each}
	</svelte:fragment>
	<svelte:fragment slot="loading">
		<div class="w-100 flex justify-center items-center p-4">
			<ProgressRadial
				width="w-36"
				stroke={100}
				meter="stroke-primary-500"
				track="stroke-primary-500/30"
			/>
		</div>
	</svelte:fragment>
</PaginatedTable>
