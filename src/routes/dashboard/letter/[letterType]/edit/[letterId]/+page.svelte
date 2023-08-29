<script lang="ts">
	import { docStore } from 'sveltefire';
	import type { PageData } from './$types';
	import { auth, firestore } from '$lib/firebase/firebase';
	import type { Readable, Writable } from 'svelte/store';
	import {
		type Packet,
		notulenRapat,
		type LetterTypes,
		type LetterTypesMin,
		type Letter,
		laporanKegiatan
	} from '$lib/letter';
	import LetterBuilder from '$components/dashboard/LetterBuilder.svelte';

	export let data: PageData;

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

	const doc = docStore<Packet>(
		firestore,
		`letters/${data.letter.type}/entries/${data.letter.id}`
	);

	$: console.log('doc', $doc);

	const mergeArrays = (originalArray: LetterTypes[], newArray: LetterTypesMin[]) => {
		return originalArray.map((originalItem, index) => {
			return {
				...originalItem,
				...newArray[index]
			};
		});
	};

	let mergedHeadArray;
	let mergedContentArray;
	let letter: Letter;
	$: if ($doc) {
		mergedHeadArray = mergeArrays(chosenLetter().head, $doc.content.head);
		mergedContentArray = mergeArrays(chosenLetter().content, $doc.content.content);
		console.log('Merged Head Array:', mergedHeadArray);
		console.log('Merged Content Array:', mergedContentArray);

		letter = {
			...chosenLetter(),
			head: mergedHeadArray,
			content: mergedContentArray
		};
	}
</script>

{#if $doc}
	<LetterBuilder {letter} />
{:else}
	<p>Loading...</p>
{/if}
