<script lang="ts">
	import LetterBuilder from '$components/letter/LetterBuilder.svelte';
	import type { LetterTypes } from '$lib/letter';

	let suratBind: LetterTypes;
</script>

<h1 class="text-2xl">Halaman Tes Surat</h1>

<label class="label my-2 mb-4">
	<span>Tipe surat</span>
	<select class="select" bind:value={suratBind}>
		<option value="NotaDinas">Nota Dinas</option>
		<option value="LaporanKegiatan">Laporan Pelaksanaan Kegiatan</option>
	</select>
</label>

<LetterBuilder type={suratBind} />
