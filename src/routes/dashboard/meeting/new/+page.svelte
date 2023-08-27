<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import LetterBuilder from '$components/dashboard/LetterBuilder.svelte';
	import LetterNumber from '$components/elements/letterbuilder/LetterNumber.svelte';
	import LetterNumberDisplay from '$components/elements/letterbuilder/LetterNumberDisplay.svelte';
	import { auth, firestore } from '$lib/firebase/firebase';
	import type { Letter, LetterTypes } from '$lib/letter';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { addDoc, collection, updateDoc } from 'firebase/firestore';
	import { userStore } from 'sveltefire';

	const modalStore = getModalStore();
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
				name: 'Hari / Tanggal',
				type: 'date',
				content: ''
			},
			{
				name: 'Tempat',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Pemimpin Rapat',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Peserta Rapat',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Hasil Rapat',
				type: 'textarea',
				content: ''
			},
			{
				name: 'Dokumentasi',
				type: 'file',
				content: {}
			}
		]
	};

	function handleSubmit(event: CustomEvent<Letter>) {
		// console.log(event.detail);

		const transformArray = (arr: LetterTypes[]) => {
			return arr.map((item) => {
				return {
					name: item.name,
					content: item.content
				};
			});
		};

		const newHeadArray = transformArray(notulenRapat.head);
		const newContentArray = transformArray(notulenRapat.content);

		console.log('New Head Array:', newHeadArray);
		console.log('New Content Array:', newContentArray);

		const packet = {
			user: $user?.uid,
			dateCreated: new Date(),
			dateModified: new Date(),
			content: {
				head: newHeadArray,
				content: newContentArray
			}
		};

		const doc = addDoc(collection(firestore, 'letters', 'notulenRapat', 'entries'), packet).then(() => {
			modalStore.trigger({
				type: 'alert',
				buttonTextCancel: 'Ok',
				title: 'Berhasil',
				body: 'Surat berhasil dibuat',
				response: () => {if (browser) goto('.')}
			});
		}).catch((error) => {
			console.log(error);
		});
	}
</script>

<LetterBuilder letter={notulenRapat} on:submit={handleSubmit} />
