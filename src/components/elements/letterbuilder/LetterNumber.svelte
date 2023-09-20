<script lang="ts">
	export let data: {
		format: string[];
		seperator: string;
	};

	export let content: string[] = [];
</script>

<div class="sm:input max-sm:card max-sm:p-5 focus-within:border-transparent">
	<div class="flex max-sm:flex-col">
		{#each data.format as format, i}
			<input
				class="max-sm:input bg-transparent border-none input-multi-border w-0 grow shrink basis-auto
					{i == 0 ? 'rounded-l-full' : ''}
					{i == data.format.length - 1 ? 'rounded-r-full' : ''}"
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
