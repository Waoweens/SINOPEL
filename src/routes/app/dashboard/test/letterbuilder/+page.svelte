<script lang="ts">
	import LetterBuilder from '$components/letter/LetterBuilder.svelte';
	import type { LetterType } from '$lib/letter';

	let suratBind: LetterType;
	let idBind: string = 'testdoc';
	let id: string = 'testdoc';

	function submitId() {
		id = idBind.trim();
	}
</script>

<h1 class="text-2xl">Halaman Tes Surat</h1>

<label class="label my-2 mb-4">
	<span>Surat</span>
	<select class="select" bind:value={suratBind}>
		<option value="NotulenRapat">Notulen Rapat</option>
		<option value="LaporanKegiatan">Laporan Kegiatan</option>
	</select>
	<div class="input-group input-group-divider grid-cols-[2fr_auto]">
		<input type="text" placeholder="Letter ID" bind:value={idBind} />
		<button type="button" class="variant-filled-primary" on:click={submitId}>Submit</button>
	</div>
</label>

<LetterBuilder type={suratBind} id={id} />
