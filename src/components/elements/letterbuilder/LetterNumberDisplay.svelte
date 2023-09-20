<script lang="ts">
	export let data: {
		// format: string[],
		seperator: string;
	};
	export let content: string[];
</script>

{#each content as num, i}
	{#if num}
		<span>{num}</span>{#if i < content.length - 1 && content[i + 1]}<span>{data.seperator}</span>
		{/if}
	{/if}
{/each}
