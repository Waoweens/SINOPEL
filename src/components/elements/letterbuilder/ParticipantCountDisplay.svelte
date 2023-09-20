<script lang="ts">
	export let content: {
		male: number;
		female: number;
	};
</script>

<p>
	{#if content.male}
		Laki-laki:
		{content.male}
	{/if}
	{#if content.male && content.female}
		<br />
	{/if}
	{#if content.female}
		Perempuan:
		{content.female}
	{/if}
</p>
