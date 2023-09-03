<script lang="ts">
	import type { Letter } from "$lib/letter";

	export let letter: Letter;
	export let svg: string;

	let name: string;
	let number: number;
	let position: string;

	$: if (letter.foot.signature.employee.meta) {
		name = letter.foot.signature.employee.label;
		number = letter.foot.signature.employee.value;
		position = letter.foot.signature.employee.meta.position;
	}
</script>

<div class="text-center">
	<p>{position ?? ''}</p>
	<div>
		<img class="w-full text-[0]" src={svg} alt="Signature" />
	</div>
	<p class="font-bold">{name ?? ''}</p>
	<p>NIP: {number ?? ''}</p>
</div>