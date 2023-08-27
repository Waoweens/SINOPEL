<script lang="ts">
	import LetterBuilder from '$components/dashboard/LetterBuilder.svelte';
	import ParticipantCount from '$components/elements/letterbuilder/ParticipantCount.svelte';
	import ParticipantCountDisplay from '$components/elements/letterbuilder/ParticipantCountDisplay.svelte';
	import LetterNumber from '$components/elements/letterbuilder/LetterNumber.svelte';
	import LetterNumberDisplay from '$components/elements/letterbuilder/LetterNumberDisplay.svelte';
	import type { Letter } from '$lib/letter';
	import { userStore } from 'sveltefire';
	import { auth } from '$lib/firebase/firebase';

	const user = userStore(auth);

	let notulenRapat: Letter = {
		title: 'Notulen Rapat',
		type: 'NOTA DINAS',
		head: [
			{
				name: 'Kepada',
				type: 'autocomplete-popup',
				data: [
					{ label: 'Name 1', value: '1234' },
					{ label: 'Name 2', value: '5678' },
					{ label: 'Name 3', value: '9101' },
					{ label: 'Name 4', value: '1121' }
				],
				content: {
					search: '',
					value: ''
				}
			},
			{
				name: 'Dari',
				type: 'static',
				content: $user?.displayName
			},
			{
				name: 'Tanggal',
				type: 'date',
				content: ''
			},
			{
				name: 'Nomor',
				type: 'custom',
				componentIn: LetterNumber,
				componentOut: LetterNumberDisplay,
				data: {
					format: ['Sifat', 'Klasifikasi', 'Nomor Naskah', 'Dinas', 'Bulan', 'Tahun'],
					seperator: '/'
				},
				content: [],
				spanFull: true
			},
			{
				name: 'Sifat',
				type: 'select',
				data: ['Biasa', 'Segera', 'Rahasia', 'Sangat Rahasia', 'Penting', 'Konfidensial'],
				content: ''
			},
			{
				name: 'Lampiran',
				type: 'select',
				data: [
					{
						name: 'Tidak ada (-)',
						value: '-'
					},
					'1 (satu) berkas'
				],
				content: ''
			},
			{
				name: 'Perihal',
				type: 'text',
				content: '',
				spanFull: true
			}
		],
		content: [
			{
				name: 'Dasar Hukum',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Peserta Kegiatan',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Peserta Kegiatan',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Pemimpin Rapat',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Materi',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Hasil Kegiatan',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Dokumentasi Kegiatan',
				type: 'file',
				content: undefined
			}
		]
	};

	let laporanPelaksanaanKegiatan: Letter = {
		title: 'Laporan Pelaksanaan Kegiatan',
		type: 'NOTA DINAS',
		head: [
			{
				name: 'Kepada',
				type: 'select',
				data: ['Nama 1', 'Nama 2', 'Nama 3', 'Nama 4'],
				content: ''
			},
			{
				name: 'Dari',
				type: 'static',
				content: 'Pending'
			},
			{
				name: 'Tanggal',
				type: 'date',
				content: ''
			},
			{
				name: 'Nomor',
				type: 'custom',
				componentIn: LetterNumber,
				componentOut: LetterNumberDisplay,
				data: {
					format: ['Sifat', 'Klasifikasi', 'Nomor Naskah', 'Dinas', 'Bulan', 'Tahun'],
					seperator: '/'
				},
				content: [],
				spanFull: true
			},
			{
				name: 'Sifat',
				type: 'select',
				data: ['Biasa', 'Segera', 'Rahasia', 'Sangat Rahasia', 'Penting', 'Konfidensial'],
				content: ''
			},
			{
				name: 'Lampiran',
				type: 'select',
				data: [
					{
						name: 'Tidak ada (-)',
						value: '-'
					},
					'1 (satu) berkas'
				],
				content: ''
			},
			{
				name: 'Perihal',
				type: 'text',
				content: '',
				spanFull: true
			}
		],
		content: [
			{
				name: 'Dasar Hukum',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Peserta Kegiatan',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Jumlah Peserta',
				type: 'custom',
				componentIn: ParticipantCount,
				componentOut: ParticipantCountDisplay,
				content: {}
			},
			{
				name: 'Narasumber',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Materi',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Hasil Kegiatan',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Dokumentasi Kegiatan',
				type: 'file',
				content: undefined
			}
		]
	};

	let suratBind: number = 0;
	let surat: Letter = notulenRapat;

	$: surat = suratBind === 0 ? notulenRapat : laporanPelaksanaanKegiatan;
</script>

<h1 class="text-2xl">Halaman Tes Surat</h1>

<label class="label my-2">
	<span>Tipe surat</span>
	<select class="select" bind:value={suratBind}>
		<option value={0}>Nota Dinas</option>
		<option value={1}>Laporan Pelaksanaan Kegiatan</option>
	</select>
</label>

<LetterBuilder {surat} />
