<script lang="ts">
	import LetterBuilder from "$components/letter/LetterBuilder.svelte";
	import type { LetterType } from "$lib/letter";
	import type { PageData } from "./$types";

	export let data: PageData;

	let type = data.letter.type as LetterType;
	let id = data.letter.id;
</script>
<LetterBuilder {type} {id} />