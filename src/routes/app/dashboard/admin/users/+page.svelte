<script lang="ts">
	import UserModal from '$components/admin/UserModal.svelte';
	import PaginatedTable from '$components/table/PaginatedTable.svelte';
	import {
		ProgressRadial,
		type PaginationSettings,
		getModalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import IconEdit from '~icons/mdi/square-edit-outline';
	import IconLock from '~icons/ic/baseline-lock';

	const parentDocPath = 'users/sinopel';
	const collectionPath = ['users', 'sinopel', 'entries'];
	const order = 'displayName';

	const modalStore = getModalStore();

	let paginationSettings: PaginationSettings = {
		page: 0,
		limit: 10,
		size: 0,
		amounts: [5, 10, 20, 40]
	};

	function manageUser(action: 'add' | 'modify', row: Record<string, any> = {}) {
		console.log('ROWROW', row)
		const modalComponent: ModalComponent = { ref: UserModal, props: { action } };
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

<h2 class="h2 mb-4">Kelola user</h2>

<div class="mb-2">
	<button type="button" class="btn variant-filled-primary" on:click={() => manageUser('add')}>
		Tambah
	</button>
</div>

<PaginatedTable {parentDocPath} {collectionPath} {order} {paginationSettings}>
	<svelte:fragment slot="head">
		<tr>
			<th />
			<th>No.</th>
			<th>User ID</th>
			<th>Nama</th>
			<th>Email</th>
			<th>NIS</th>
			<th>Role</th>
		</tr>
	</svelte:fragment>
	<svelte:fragment slot="body" let:out let:currentPage let:currentLimit>
		{#each out.rows as row, i}
			<tr>
				<td class="w-1">
					{#if row.locked}
						<button
							type="button"
							disabled
							title="Akun ini tidak bisa diedit (root account)"
							class="btn btn-icon rounded-lg variant-filled-secondary"
						>
							<IconLock class="text-xl" />
						</button>
					{:else}
						<button
							type="button"
							class="btn-icon rounded-lg variant-filled-secondary"
							on:click={() => manageUser('modify', row)}
						>
							<IconEdit class="text-xl" />
						</button>
					{/if}
				</td>
				<td>{currentPage * currentLimit + i + 1}</td>
				<td>{row.id}</td>
				<td>{row.displayName ?? ''}</td>
				<td>{row.email ?? ''}</td>
				<td>{row.nip ?? ''}</td>
				<td>{row.role?.toUpperCase() ?? ''}</td>
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
