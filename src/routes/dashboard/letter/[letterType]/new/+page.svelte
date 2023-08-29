<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import LetterBuilder from '$components/dashboard/LetterBuilder.svelte';
	import { auth, firestore } from '$lib/firebase/firebase';
	import {
		notulenRapat,
		type Letter,
		type LetterTypes,
		type LetterTypesMin,
		type Packet,
		laporanKegiatan,
		splitArray
	} from '$lib/letter';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { Timestamp, addDoc, collection } from 'firebase/firestore';
	import { userStore } from 'sveltefire';
	import type { PageData } from './$types';

	export let data: PageData;

	const modalStore = getModalStore();
	const user = userStore(auth);

	let chosenLetter: () => Letter = (): Letter => {
		switch (data.letter.type) {
			case 'meeting':
				return notulenRapat;
			case 'event':
				return laporanKegiatan;
			default:
				return notulenRapat;
		}
	};

	function handleSubmit(event: CustomEvent<Letter>) {
		const packet: Packet = {
			created: {
				user: $user?.uid,
				date: Timestamp.now()
			},
			modified: {
				user: $user?.uid,
				date: Timestamp.now()
			},
			content: {
				head: splitArray(chosenLetter().head),
				content: splitArray(chosenLetter().content)
			},
			metadata: {}
		};

		addDoc(collection(firestore, 'letters', data.letter.type, 'entries'), packet)
			.then(() => {
				modalStore.trigger({
					type: 'alert',
					buttonTextCancel: 'Ok',
					title: 'Berhasil',
					body: 'Surat berhasil dibuat',
					response: () => {
						if (browser) goto('.');
					}
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<LetterBuilder letter={chosenLetter()} on:submit={handleSubmit}>
	<svelte:fragment slot="title">
		Buat surat - {chosenLetter().title}
	</svelte:fragment>
	<svelte:fragment slot="submit">
		Buat surat
	</svelte:fragment>
</LetterBuilder>
