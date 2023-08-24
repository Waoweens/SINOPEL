<script lang="ts">
	import LetterBuilder from "$components/dashboard/LetterBuilder.svelte";
	import NomorSurat from "$components/elements/NomorSurat.svelte";
	import NomorSuratDisplay from "$components/elements/NomorSuratDisplay.svelte";
	import type { Surat } from "$lib/surat";

	// TODO: load data from database
	// let data = {
	// 	namaPejabat: [],
	// 	formatNomor: ['Sifat', 'Klasifikasi', 'Nomor Naskah', 'Dinas', 'Bulan', 'Tahun'],
	// 	sifat: ['Biasa', 'Segera', 'Rahasia', 'Sangat Rahasia', 'Penting', 'Konfidensial'],
	// 	lampiran: ['Tidak ada (-)', '1 (satu) berkas']
	// };

	// let kepalaSurat = {
	// 	kepada: '',
	// 	dari: email,
	// 	tanggal: '',
	// 	nomor: [],
	// 	sifat: '',
	// 	lampiran: '',
	// 	perihal: ''
	// };

	// let isiSurat = [
	// 	{ name: 'Dasar Hukum', content: '', type: 'text' },
	// 	{ name: 'Peserta Kegiatan', content: '', type: 'text' },
	// 	{ name: 'Narasumber', content: '', type: 'text' },
	// 	{ name: 'Materi', content: '', type: 'text' },
	// 	{ name: 'Hasil Kegiatan', content: '', type: 'text' },
	// 	{ name: 'Dokumentasi Kegiatan', content: {}, type: 'multimedia' }
	// ];

	let notaDinas: Surat = {
		title: "NOTA DINAS",
		head: [
			{
				name: 'Kepada',
				type: 'select',
				data: [
					'Nama 1',
					'Nama 2',
					'Nama 3',
					'Nama 4'
				],
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
				elementIn: NomorSurat,
				elementOut: NomorSuratDisplay,
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
				data: [
					'Biasa',
					'Segera',
					'Rahasia',
					'Sangat Rahasia',
					'Penting',
					'Konfidensial'
				],
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
	}

</script>

<h1>Halaman Tes Surat</h1>

<LetterBuilder surat={notaDinas}/>