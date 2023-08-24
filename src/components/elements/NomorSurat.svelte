<script lang="ts">
	export let data: {
		format: string[],
		seperator: string
	};

	export let content: string[] = [];
</script>

<div class="input focus-within:border-transparent">
	<div class="flex">
		{#each data.format as format, i}
			<input
				class="bg-transparent border-none input-multi-border {i == 0
					? 'rounded-l-full'
					: ''} {i == data.format.length - 1
					? 'rounded-r-full'
					: ''} w-0 grow shrink basis-auto"
				type="text"
				placeholder={format}
				title={format}
				bind:value={content[i]}
			/>
			{#if i < data.format.length - 1}
				<span role="separator" class="text-lg my-2 mx-1 leading-6">{data.seperator}</span>
			{/if}
		{/each}
	</div>
</div>