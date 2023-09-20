<script lang="ts">
	import { ProgressRadial, getModalStore } from '@skeletonlabs/skeleton';
	import IconWarning from '~icons/ic/baseline-warning';
	import IconTrash from '~icons/ic/baseline-delete';

	const modalStore = getModalStore();

	export let formData = {
		id: '',
		email: '',
		displayName: '',
		nip: '',
		role: 'user',
		password: ''
	};

	export let action: 'add' | 'modify';

	let error = '';
	let loading = false;

	async function addUser() {
		console.log(formData);
		loading = true;

		let method: string;

		switch (action) {
			case 'add':
				method = 'POST';
				break;
			case 'modify':
				if (!formData.id) return;
				method = 'PUT';
				break;
			default:
				return;
		}

		console.log(method);

		const res = await fetch('/api-internal/fba/user', {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		if (res.ok) {
			console.log(await res.json());
			loading = false;
			modalStore.close();
		} else {
			loading = false;
			error = await res.text();
		}
	}

	async function deleteUser() {
		if (!formData.id) return;

		loading = true;

		const res = await fetch('/api-internal/fba/user', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: formData.id })
		});

		if (res.ok) {
			console.log(await res.json());
			loading = false;
			modalStore.close();
		} else {
			loading = false;
			error = await res.text();
		}
	}
</script>

<div class="w-modal flex flex-col gap-3 card p-3">
	<header>
		<h3 class="h3">{action === 'add' ? 'Tambah' : 'Edit'} user</h3>
	</header>
	<section>
		<form
			id="formAddUser"
			class="variant-outline-surface rounded-lg p-4 flex flex-col gap-2"
			autocomplete="off"
			on:submit|preventDefault={addUser}
		>
			<label class="label">
				<span>Email</span>
				<input
					required
					type="email"
					class="input"
					autocomplete="new-password"
					bind:value={formData.email}
				/>
			</label>
			<label class="label">
				<span>Nama</span>
				<input required type="text" class="input" bind:value={formData.displayName} />
			</label>
			<label class="label">
				<span>NIP</span>
				<input required type="number" class="input" bind:value={formData.nip} />
			</label>
			<label class="label">
				<span>Role</span>
				<select required class="input" bind:value={formData.role}>
					<option value="user">USER</option>
					<option value="admin">ADMIN</option>
				</select>
			</label>

			<hr class="my-1" />

			<label class="label">
				<span>{action === 'add' ? 'Initial ' : ''}Password</span>
				<input
					required={action === 'add'}
					type="password"
					class="input"
					autocomplete="new-password"
					bind:value={formData.password}
				/>
			</label>

			{#if action === 'add'}
				<aside class="alert variant-ghost-warning">
					<div><IconWarning /></div>
					<div class="alert-message">
						<p>User diharapkan mengganti password setelah pembuatan akun.</p>
					</div>
				</aside>
			{/if}
		</form>
	</section>
	<footer class="flex">
		<div class="flex flex-col items-start gap-2">
			{#if action === 'modify'}
				<button type="button" class="btn variant-filled-error" on:click={deleteUser}>
					<span><IconTrash /></span>
					<span>Hapus</span>
				</button>
			{/if}
		</div>
		<div class="flex flex-col items-end ml-auto gap-2">
			<div class="flex gap-3">
				{#if loading}
					<div class="flex items-center">
						<ProgressRadial
							stroke={100}
							width="w-8"
							meter="stroke-primary-500"
							track="stroke-primary-500/30"
						/>
					</div>
				{/if}
				<button
					type="button"
					class="btn variant-ghost-surface"
					disabled={loading}
					on:click={() => modalStore.close()}
				>
					Batal
				</button>
				<button
					type="submit"
					form="formAddUser"
					class="btn variant-filled-primary"
					disabled={loading}
				>
					{action === 'add' ? 'Tambah' : 'Edit'}
				</button>
			</div>
			<div>
				{#if error}
					<p class="text-error-500">
						Failed to {action === 'add' ? 'add' : 'modify'} user: {error}
					</p>
				{/if}
			</div>
		</div>
	</footer>
</div>
