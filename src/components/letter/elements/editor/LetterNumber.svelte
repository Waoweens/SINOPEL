<script lang="ts">
	import { fromJson } from '$src/lib/letter';

	export let name: string;

	let hiddenInput: HTMLInputElement;
	let hiddenInputValue: string = JSON.stringify([]);

	let zero: string = '';
	let one: string = '';
	let two: string = '';
	let three: string = '';
	let four: string = '';
	let five: string = '';

	$: {
		hiddenInputValue = JSON.stringify([zero, one, two, three, four, five]);
		console.log('letternumber', hiddenInputValue);
	}

	$: {
		hiddenInputValue = JSON.stringify([zero, one, two, three, four, five]);
		console.log('letternumber', hiddenInputValue);
	}

	$: if (hiddenInput) {
		if (hiddenInput.value) {
			hiddenInputValue = hiddenInput.value;
			updateValues();
		}
	}

	function updateValues() {
		const values = fromJson(hiddenInputValue);
		zero = values[0];
		one = values[1];
		two = values[2];
		three = values[3];
		four = values[4];
		five = values[5];
	}
</script>

<div class="grid grid-cols-[1fr_auto] gap-y-1 lg:flex lg:flex-row">
	<input class="input rounded-r-none" placeholder="[0]" bind:value={zero} />
	<span class="x-input-group-seperator">/</span>

	<input class="input lg:rounded-l-none rounded-r-none" placeholder="[1]" bind:value={one} />
	<span class="x-input-group-seperator">/</span>

	<input class="input lg:rounded-l-none rounded-r-none" placeholder="[2]" bind:value={two} />
	<span class="x-input-group-seperator">-</span>

	<input class="input lg:rounded-l-none rounded-r-none" placeholder="[3]" bind:value={three} />
	<span class="x-input-group-seperator">/</span>

	<input class="input lg:rounded-l-none rounded-r-none" placeholder="[4]" bind:value={four} />
	<span class="x-input-group-seperator">/</span>

	<input class="input lg:rounded-l-none col-span-2" placeholder="[5]" bind:value={five} />
</div>

<input bind:this={hiddenInput} type="hidden" {name} bind:value={hiddenInputValue} />
