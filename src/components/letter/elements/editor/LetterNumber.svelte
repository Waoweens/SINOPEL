<script lang="ts">
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

	let prevHiddenInputValue: string;

	$: {
		if (hiddenInputValue !== prevHiddenInputValue) {
			hiddenInputValue = JSON.stringify([zero, one, two, three, four, five]);
			console.log('letternumber', hiddenInputValue);
		}
	}

	$: if (hiddenInput) {
		if (hiddenInputValue) {
			hiddenInputValue = hiddenInput.value;
			updateValues();
			prevHiddenInputValue = hiddenInputValue;
		}
	}

	function updateValues() {
		const values = JSON.parse(hiddenInputValue);
		[zero, one, two, three, four, five] = values;
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
