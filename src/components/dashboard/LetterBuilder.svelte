<script lang="ts">
	import type { AutocompletePopupType, Letter, LetterTypes } from '$lib/letter';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import { createEventDispatcher, onMount } from 'svelte';
	import LetterView from './LetterView.svelte';

	let bookmanAvailable: boolean = false;

	onMount(() => {
		// TODO: doesn't work on mac
		bookmanAvailable = document.fonts.check('1rem Bookman Old Style');

		// let shadowRoot = document.getElementById('shadowDom').attachShadow({mode: 'open'});
	});

	export let letter: Letter;

	let vw: number;
	let vh: number;
	let paperScale: number = 1;
	let paperMarginX: number;
	let paperMarginY: number;

	$: if (vw) {
		let desiredWidth = vw * 0.5;
		paperScale = desiredWidth / (210 * 3.7795);
		paperMarginX = (210 * 3.7795 - 210 * 3.7795 * paperScale) / 2;
		paperMarginY = (210 * 1.5714 * 3.7795 - 210 * 1.5714 * 3.7795 * paperScale) / 2;
	}

	// autocomplete selection workaround
	function autocompleteSelection(event: CustomEvent, item: LetterTypes) {
		const curItem = item as AutocompletePopupType;
		const index = letter.head.indexOf(item);

		letter = {
			...letter,
			head: [
				...letter.head.slice(0, index),
				{
					...curItem,
					content: {
						...curItem.content,
						value: event.detail.value
					}
				},
				...letter.head.slice(index + 1)
			]
		};
	}

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		dispatch('submit', letter);
	}
</script>

<div bind:offsetWidth={vw} bind:offsetHeight={vh}>
	<div class="lg:flex flex-grow-0">
		<div class="w-full p-3 border-8 max-lg:border-b-0 lg:border-r-0 border-surface-900-50-token">
			<h1 class="text-2xl pb-2 font-bold">Buat surat - {letter.title}</h1>

			<!--! Letter Head !-->

			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<form
				on:keydown={(e) => {
					if (e.key == 'Enter') e.preventDefault();
				}}
				on:submit|preventDefault={handleSubmit}
			>
				<h2 class="text-xl mb-2">Kepala Surat</h2>
				<div class="2xl:grid grid-cols-2 gap-4">
					{#each letter.head as item (item)}
						{#if item.type !== 'static'}
							<label class="label {item.spanFull ? 'col-span-2' : ''}">
								{item.name}
								{#if item.type === 'text'}
									<input class="input" type="text" bind:value={item.content} />
								{:else if item.type === 'textarea'}
									<textarea class="textarea" bind:value={item.content} />
								{:else if item.type === 'select'}
									<select class="select" bind:value={item.content}>
										{#each item.data as data}
											{#if typeof data === 'string'}
												<option value={data}>{data}</option>
											{:else}
												<option value={data.value}>{data.name}</option>
											{/if}
										{/each}
									</select>
								{:else if item.type === 'autocomplete-popup'}
									<!--HERE-->
									<div class="flex flex-col">
										<input
											class="input"
											type="search"
											placeholder="Cari..."
											bind:value={item.content.search}
											use:popup={{ event: 'focus-click', target: item.name, placement: 'bottom' }}
										/>
										<div
											class="card flex-grow min-w-32 max-h-48 p-3 overflow-y-auto"
											data-popup={item.name}
										>
											<Autocomplete
												bind:input={item.content.search}
												options={item.data}
												on:selection={(event) => {
													// because of JS-TS weirdness,
													// @ts-ignore
													item.content.value = event.detail.value;
													// @ts-ignore
													item.content.search = event.detail.label;
												}}
											/>
										</div>
									</div>
								{:else if item.type === 'date'}
									<input class="input" type="date" bind:value={item.content} />
								{:else if item.type === 'file'}
									<input class="input" type="file" bind:value={item.content} />
								{:else if item.type === 'custom'}
									<svelte:component
										this={item.componentIn}
										data={item.data}
										bind:content={item.content}
									/>
								{/if}
							</label>
						{/if}
					{/each}
				</div>

				<!--! Letter Content !-->

				<h2 class="text-xl my-2">Isi Surat</h2>
				<div>
					{#each letter.content as item}
						{#if item.type !== 'static'}
							<label class="label">
								{item.name}
								{#if item.type === 'text'}
									<input class="input" type="text" bind:value={item.content} />
								{:else if item.type === 'textarea'}
									<textarea class="textarea" bind:value={item.content} />
								{:else if item.type === 'select'}
									<select class="select" bind:value={item.content}>
										{#each item.data as data}
											{#if typeof data === 'string'}
												<option value={data}>{data}</option>
											{:else}
												<option value={data.value}>{data.name}</option>
											{/if}
										{/each}
									</select>
								{:else if item.type === 'date'}
									<input class="input" type="date" bind:value={item.content} />
								{:else if item.type === 'file'}
									<input class="input" type="file" bind:value={item.content} />
								{:else if item.type === 'custom'}
									<svelte:component
										this={item.componentIn}
										data={item.data}
										bind:content={item.content}
									/>
								{/if}
							</label>
						{/if}
					{/each}
				</div>
				<div class="pt-4">
					<button class="btn variant-filled w-full" type="submit">Buat Surat</button>
				</div>
			</form>
		</div>

		<!--! Letter Preview !-->

		<div class="p-2 border-8 border-surface-900-50-token">
			<h1 class="text-2xl pb-2">Preview Surat</h1>
			{#if !bookmanAvailable}
				<aside aria-live="assertive" role="alert" class="bg-error-500 text-surface-50 p-2">
					<h1>Cek font gagal</h1>
					<p>
						Font "Bookman Old Style" tidak tersedia di sistem operasi Anda. Silakan instal font
						tersebut terlebih dahulu. Menggunakan font Serif default sebagai gantinya.
					</p>
				</aside>
			{/if}
			<LetterView
				{letter}
				style="--paper-scale: {paperScale}; --paper-margin-x: {paperMarginX}; --paper-margin-y: {paperMarginY}"
			/>
		</div>
	</div>
</div>

<style lang="scss">
</style>
