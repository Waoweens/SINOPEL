<script lang="ts">
	export let content: {
		male: number;
		female: number;
	};
</script>

<div class="flex">
	<label class="label flex items-center">
		<span class="mr-2">Laki&#8209;Laki</span>
		<input class="input" type="number" bind:value={content.male} />
	</label>
	<label class="label flex items-center">
		<span class="mx-2">Perempuan</span>
		<input class="input" type="number" bind:value={content.female} />
	</label>
</div>
