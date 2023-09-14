<script lang="ts">
	export let name: string;
</script>

<div class="grid grid-cols-[1fr_auto] gap-y-1 lg:flex lg:flex-row">
	<input class="input rounded-r-none" placeholder="[0]" />
	<span class="x-input-group-seperator">/</span>

	<input class="input lg:rounded-l-none rounded-r-none" placeholder="[1]" />
	<span class="x-input-group-seperator">/</span>

	<input class="input lg:rounded-l-none rounded-r-none" placeholder="[2]" />
	<span class="x-input-group-seperator">-</span>

	<input class="input lg:rounded-l-none rounded-r-none" placeholder="[3]" />
	<span class="x-input-group-seperator">/</span>

	<input class="input lg:rounded-l-none rounded-r-none" placeholder="[4]" />
	<span class="x-input-group-seperator">/</span>

	<input class="input lg:rounded-l-none col-span-2" placeholder="[5]" />
</div>
