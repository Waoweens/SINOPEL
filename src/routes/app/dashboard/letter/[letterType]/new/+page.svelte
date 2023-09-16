<script lang="ts">
	import { auth, firestore } from "$lib/firebase/firebase";
	import { ProgressRadial } from "@skeletonlabs/skeleton";
	import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
	import type { PageData } from "./$types";
	import { docStore, userStore } from "sveltefire";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	// this page creates a letter document with a unique ID and the 'created' field
	// then redirect to the edit page with the ID as the [letterId] slug

	export let data: PageData;

	const user = userStore(auth);
	const parentDoc = docStore(firestore, `letters/${data.letter.type}`);

	let called: boolean = false;
	$: if ($user && $parentDoc) {
		if (!called) createLetter();
	}

	async function createLetter() {
		called = true;
		console.log('parentDoc', $parentDoc);
		console.log('user', $user?.uid);
		const docRef = await addDoc(collection(firestore, 'letters', data.letter.type, 'entries'), {
			created: {
				date: serverTimestamp(),
				user: $user?.uid
			},
			modified: {
				date: serverTimestamp(),
				user: $user?.uid
			},
			letter: []
		});

		await updateDoc(doc(firestore, 'letters', data.letter.type), {
			count: $parentDoc.count + 1
		});

		console.log('Document written with ID: ', docRef.id);
		goto(`./edit/${docRef.id}`);
	}
</script>

<div class="w-100 flex justify-center items-center p-4">
	<ProgressRadial
		width="w-36"
		stroke={100}
		meter="stroke-primary-500"
		track="stroke-primary-500/30"
	/>
</div>