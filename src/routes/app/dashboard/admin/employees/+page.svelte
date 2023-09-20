<script lang="ts">
	import EmployeeModal from '$components/admin/EmployeeModal.svelte';
	import PaginatedTable from '$components/table/PaginatedTable.svelte';
	import { ProgressRadial, type PaginationSettings, type ModalComponent, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import IconEdit from '~icons/mdi/square-edit-outline';

	const parentDocPath = 'employees/dkpb';
	const collectionPath = ['employees', 'dkpb', 'entries'];
	const order = 'name';

	const modalStore = getModalStore();

	let paginationSettings: PaginationSettings = {
		page: 0,
		limit: 10,
		size: 0,
		amounts: [5, 10, 20, 40]
	};

	function manageUser(action: 'add' | 'modify', row: Record<string, any> = {}) {
		console.log('ROWROW', row)
		const modalComponent: ModalComponent = { ref: EmployeeModal, props: { action } };
		if (action === 'modify') modalComponent.props!.formData = row;
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,

			response: (response) => {
				console.log(response);
			}
		};

		modalStore.trigger(modal);
	}
</script>

<h2 class="h2 mb-4">Kelola pejabat</h2>

<div class="mb-2">
	<button type="button" class="btn variant-filled-primary" on:click={() => manageUser('add')}>
		Tambah
	</button>
</div>

<PaginatedTable {parentDocPath} {collectionPath} {order} {paginationSettings}>
	<svelte:fragment slot="head">
		<tr>
			<th />
			<th>No</th>
			<th>ID</th>
			<th>Nama</th>
			<th>NIP</th>
			<th>Jabatan</th>
		</tr>
	</svelte:fragment>
	<svelte:fragment slot="body" let:out let:currentPage let:currentLimit>
		<!-- {console.log(out)} -->
		{#each out.rows as row, i}
			<tr>
				<td>
					<button type="button" class="btn btn-icon rounded-lg variant-filled-secondary" on:click={() => manageUser('modify', row)}>
						<span><IconEdit /></span>
					</button>
				</td>
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
