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
		type Letter
	} from '$lib/letter';
	import LetterBuilder from '$components/dashboard/LetterBuilder.svelte';

	export let data: PageData;

	const doc = docStore<Packet>(
		firestore,
		`letters/${data.letter.letterType}/entries/${data.letter.letterId}`
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

	notulenRapat;

	let mergedHeadArray;
	let mergedContentArray;
	let letter: Letter;
	$: if ($doc) {
		mergedHeadArray = mergeArrays(notulenRapat.head, $doc.content.head);
		mergedContentArray = mergeArrays(notulenRapat.content, $doc.content.content);
		console.log('Merged Head Array:', mergedHeadArray);
		console.log('Merged Content Array:', mergedContentArray);

		letter = {
			...notulenRapat,
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