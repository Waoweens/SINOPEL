<script lang="ts">
	import { appname } from '$stores/static';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

	let tableSelected: Array<any> = [];

	function tableSelectedHandler(meta: CustomEvent): void {
		tableSelected = meta && meta.detail ? meta.detail : [];
	}

	const tableTestData = [
	];

	const tableData: TableSource = {
		// A list of heading labels.
		head: ['ID', 'Nomor<br>Surat', 'Bidang', 'Kategori', 'Perihal', 'Pembuat<br>Surat', 'Pengedit<br>Terakhir', 'Siap<br>Dikirim', 'Posisi<br>Surat'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(tableTestData, ['names', 'symbol', 'weight']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(tableTestData, ['position', 'name', 'symbol', 'weight']),
		// Optional: A list of footer labels.
		foot: ['Showing X of X', '', '', '', '', '', '', 'prev-next']
	};
</script>

<svelte:head>
	<title>Notulen Rapat - {appname}</title>
</svelte:head>

<p>{tableSelected.length > 1 ? `${tableSelected[0]}. ${tableSelected[1]}` : "Select an entry"}</p>

<Table source={tableData} interactive={true} on:selected={tableSelectedHandler} />
