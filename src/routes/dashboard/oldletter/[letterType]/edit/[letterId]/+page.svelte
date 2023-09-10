<script lang="ts">
	import { collectionStore, docStore, userStore } from 'sveltefire';
	import type { PageData } from './$types';
	import { auth, firestore } from '$lib/firebase/firebase';
	import type { Readable, Writable } from 'svelte/store';
	import {
		type Packet,
		notulenRapat,
		type LetterTypes,
		type LetterTypesMin,
		type Letter,
		laporanKegiatan,
		mergeArrays,
		splitArray
	} from '$lib/letter';
	import LetterBuilder from '$components/letter/LetterBuilder.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { Timestamp, doc, updateDoc } from 'firebase/firestore';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

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

	const docObj = docStore<Packet>(
		firestore,
		`letters/${data.letter.type}/entries/${data.letter.id}`
	);

	$: console.log('doc', $docObj);

	let letter: Letter;
	$: if ($docObj) {
		letter = {
			...chosenLetter(),
			head: mergeArrays(chosenLetter().head, $docObj.content.head),
			content: mergeArrays(chosenLetter().content, $docObj.content.content)
		};
	}

	function handleSubmit(event: CustomEvent<Letter>) {
		if ($docObj) {
			const packet: Packet = {
				...$docObj,
				modified: {
					user: $user?.uid,
					date: Timestamp.now()
				},
				content: {
					head: splitArray(letter.head),
					content: splitArray(letter.content),
					foot: letter.foot
				}
			};

			updateDoc(doc(firestore, 'letters', data.letter.type, 'entries', data.letter.id), packet)
				.then(() => {
					modalStore.trigger({
						type: 'alert',
						buttonTextCancel: 'Ok',
						title: 'Berhasil',
						body: 'Surat berhasil diedit',
						response: () => {
							if (browser) goto('../');
						}
					});
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
</script>

{#if $docObj}
	<LetterBuilder {letter} on:submit={handleSubmit}>
		<svelte:fragment slot="title">
			Edit surat - {letter.title}
		</svelte:fragment>
		<svelte:fragment slot="submit">Edit surat</svelte:fragment>
	</LetterBuilder>
{:else}
	<p>Loading...</p>
{/if}
