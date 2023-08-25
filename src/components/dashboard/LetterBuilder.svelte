<script lang="ts">
	import pemkot from '$lib/assets/Lambang_Kota_Bandung.svg';
	import type { Surat } from '$lib/surat';
	import { authStore } from '$stores/authStore';
	import { onMount } from 'svelte';

	let bookmanAvailable: boolean = false;

	onMount(() => {
		// TODO: doesn't work on mac
		bookmanAvailable = document.fonts.check('1rem Bookman Old Style');

		// let shadowRoot = document.getElementById('shadowDom').attachShadow({mode: 'open'});
	});

	// TODO: load name instead of email
	let email: string = '';
	authStore.subscribe((curr) => {
		email = curr?.currentUser?.email || '';
	});

	export let surat: Surat;
	$: console.log(surat);

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

	// $: if () {
	// 	// const date: Date = new Date(dateBind);
	// 	// // format: 01 Januari 1970 (id-ID)

	// 	// kepalaSurat.tanggal = new Date(dateBind).toLocaleDateString('id-ID', {
	// 	// 	year: 'numeric',
	// 	// 	month: 'long',
	// 	// 	day: '2-digit'
	// 	// });
	// }

	function handleSubmit() {}
</script>

<div bind:offsetWidth={vw} bind:offsetHeight={vh}>
	<div class="lg:flex flex-grow-0">
		<div class="w-full p-3 border-8 max-lg:border-b-0 lg:border-r-0 border-surface-900-50-token">
			<h1 class="text-2xl pb-2">Buat surat</h1>

			<form on:submit|preventDefault={handleSubmit}>
				<h2 class="text-xl mb-2">Kepala Surat</h2>
				<div class="2xl:grid grid-cols-2 gap-4">
					{#each surat.head as item}
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

				<h2 class="text-xl my-2">Isi Surat</h2>
				<div>
					{#each surat.content as item}
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
			</form>
		</div>
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
			<article
				class="paper-scale-desktop paper-F4 bg-white"
				style="--paper-scale: {paperScale}; --paper-margin-x: {paperMarginX}; --paper-margin-y: {paperMarginY}"
			>
				<header>
					<div class="flex text-center justify-center items-center">
						<div class="inline-block w-24">
							<img src={pemkot} alt="Lambang Kota Bandung" />
						</div>
						<div>
							<h1 class="text-[14pt]">PEMERINTAH KOTA BANDUNG</h1>
							<h2 class="text-[15pt]">DINAS KEBAKARAN DAN PENANGGULANGAN BENCANA</h2>
							<address class="not-italic text-[10pt]">
								Jalan Sukabumi Nomor 17, Bandung, Telepon 022-7207113
								<br />
								e - mail: diskarbandung@gmail.com
							</address>
						</div>
					</div>
					<svg
						role="separator"
						class="mt-2"
						xmlns="http://www.w3.org/2000/svg"
						width="100%"
						height="10"
						viewBox="0 0 100 10"
						preserveAspectRatio="none"
					>
						<!-- Top thin line -->
						<line x1="0" y1="1" x2="100" y2="1" stroke="black" stroke-width="1.5" />
						<!-- Middle thick line -->
						<line x1="0" y1="5" x2="100" y2="5" stroke="black" stroke-width="3" />
						<!-- Bottom thin line -->
						<line x1="0" y1="9" x2="100" y2="9" stroke="black" stroke-width="1.5" />
					</svg>
				</header>
				<section>
					<h1 class="text-center text-[14pt]">{surat.title}</h1>
					<ul class="kepala-surat items-center list-none">
						{#each surat.head as item}
							{#if ['static', 'text', 'textarea', 'select'].includes(item.type)}
								<li><span class="list-title">{item.name}</span>: {item.content}</li>
							{:else if item.type === 'date'}
								<li>
									<span class="list-title">{item.name}</span>:
									{new Date(item.content).toLocaleDateString('id-ID', {
										year: 'numeric',
										month: 'long',
										day: '2-digit'
									})}
								</li>
							{:else if item.type === 'file'}
								Unsupported
							{:else if item.type === 'custom'}
								<li>
									<span class="list-title">{item.name}</span>:
									<svelte:component
										this={item.componentOut}
										data={item.data}
										content={item.content}
									/>
								</li>
							{/if}
						{/each}
					</ul>

					<svg
						role="separator"
						class="my-2"
						style="margin-left: -5mm; width: calc(100% + 10mm);"
						xmlns="http://www.w3.org/2000/svg"
						height="5"
						viewBox="0 0 100 10"
						preserveAspectRatio="none"
					>
						<!-- Top thin line -->
						<line x1="0" y1="1" x2="100" y2="1" stroke="black" stroke-width="10" />
					</svg>

					<ol class="list-bold list-decimal ml-3.5">
						{#each surat.content as item}
							<li>
								<span>{item.name}:</span>
								{#if ['static', 'text', 'textarea', 'select'].includes(item.type)}
									<p>{item.content}</p>
								{:else if item.type === 'file'}
									<!-- <div>{@html isi.content}</div> -->
									<div>WIP</div>
								{:else if item.type === 'custom'}
									<svelte:component
										this={item.componentOut}
										data={item.data}
										content={item.content}
									/>
								{/if}
							</li>
						{/each}
					</ol>

					<!-- <ol class="list-bold list-decimal ml-3.5">
						{#each isiSurat as isi}
							<li>
								<span>{isi.name}:</span>
								{#if isi.type === 'text'}
									<p>{isi.content}</p>
								{:else if isi.type === 'multimedia'}
									<!-- <div>{@html isi.content}</div> --
									<div>WIP</div>
								{/if}
							</li>
						{/each}
					</ol> -->
				</section>
				<footer />
			</article>
		</div>
	</div>
</div>

<style lang="scss">
</style>
