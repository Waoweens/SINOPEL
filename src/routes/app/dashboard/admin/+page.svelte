<script lang="ts">
	import { page } from '$app/stores';
	import { appname, appnameLong } from '$stores/static';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import IconSave from '~icons/ic/baseline-save';

	let renameAppInput = {
		name: $appname,
		nameLong: $appnameLong
	};

	function renameApp() {}
</script>

<h2 class="h2 mb-4">Admin Home</h2>

<section class="card p-4 max-w-xl">
	<h3 class="h3">Nama aplikasi</h3>
	<form on:submit|preventDefault={renameApp}>
		<label class="label mb-2">
			<span>Nama</span>
			<input disabled type="text" class="input" bind:value={renameAppInput.name} />
		</label>
		<label class="label mb-2">
			<span>Nama Panjang</span>
			<input disabled type="text" class="input" bind:value={renameAppInput.nameLong} />
		</label>
		<button disabled type="submit" class="btn variant-filled-primary">
			<span><IconSave /></span>
			<span>Save</span>
		</button>
	</form>
</section>
