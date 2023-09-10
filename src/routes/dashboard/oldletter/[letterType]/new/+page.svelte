<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import LetterBuilder from '$components/letter/LetterBuilder.svelte';
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
	import { collectionStore, userStore } from 'sveltefire';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	const modalStore = getModalStore();
	const user = userStore(auth);

	const employees = collectionStore(firestore, 'employees/dkpb/entries');
	let notulenRapatFilled: Letter, laporanKegiatanFilled: Letter;

	$: if ($employees.length > 0) {
		console.log('call', $employees)
		notulenRapatFilled = {
			...notulenRapat,
			head: notulenRapat.head.map((item) => {
				if (item.type === 'autocomplete-popup') {
					if (item.metadata === 'pejabat') {
						return {
							...item,
							data: $employees.map((item: any) => {
								return {
									label: item.name,
									value: item.name
								};
							})
						};
					}
				}

				return item;
			})
		};

		laporanKegiatanFilled = {
			...laporanKegiatan,
			head: laporanKegiatan.head.map((item) => {
				if (item.type === 'static') {
					if (item.metadata === 'userDisplayName') {
						return {
							...item,
							content: $user?.displayName
						};
					}
				}

				if (item.type === 'autocomplete-popup') {
					if (item.metadata === 'pejabat') {
						return {
							...item,
							data: [{ label: 'test', value: 'test' }]
						};
					}
				}

				return item;
			})
		};
	}

	let chosenLetter: () => Letter = (): Letter => {
		switch (data.letter.type) {
			case 'meeting':
				return notulenRapatFilled;
			case 'event':
				return laporanKegiatanFilled;
			default:
				return notulenRapatFilled;
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
				content: splitArray(chosenLetter().content),
				foot: chosenLetter().foot
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

{#if $employees.length > 0}
	<LetterBuilder letter={chosenLetter()} on:submit={handleSubmit}>
		<svelte:fragment slot="title">
			Buat surat - {chosenLetter().title}
		</svelte:fragment>
		<svelte:fragment slot="submit">Buat surat</svelte:fragment>
	</LetterBuilder>
{/if}
