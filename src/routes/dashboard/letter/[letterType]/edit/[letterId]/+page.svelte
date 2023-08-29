<script lang="ts">
	import { docStore, userStore } from 'sveltefire';
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
	import LetterBuilder from '$components/dashboard/LetterBuilder.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { Timestamp, doc, updateDoc } from 'firebase/firestore';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

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
					content: splitArray(letter.content)
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
		<svelte:fragment slot="submit">
			Edit surat
		</svelte:fragment>
	</LetterBuilder>
{:else}
	<p>Loading...</p>
{/if}
