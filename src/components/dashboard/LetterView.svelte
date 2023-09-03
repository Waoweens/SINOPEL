<script lang="ts">
	import SignatureDisplay from '$components/elements/letterbuilder/SignatureDisplay.svelte';
	import pemkot from '$lib/assets/Lambang_Kota_Bandung-282x240.png';
	import type { Letter } from '$lib/letter';
	import sanitizeHtml from 'sanitize-html';
	import { jsPDF } from "jspdf";

	export let style: string;
	export let letter: Letter;

	let styleApplied = style;

	let letterObject: HTMLElement;

	console.log('ltr', letter);

	async function downloadPdf() {
		styleApplied = '';
		const pdf = new jsPDF({
			orientation: 'portrait',
			unit: 'px',
			format: [letterObject.offsetWidth, letterObject.offsetWidth * 1.5714 ]
		});

		await pdf.html(letterObject);

		await pdf.save('surat.pdf');
		styleApplied = style;
	}
</script>

<button type="button" class="btn variant-filled mb-4" on:click={downloadPdf}>Download PDF</button>

<article id="letter" bind:this={letterObject}>
	<section class="paper-scale-desktop paper-F4" style={styleApplied}>
		<header>
			<div class="flex text-center justify-center items-center">
				<div class="inline-block w-24">
					<img src={pemkot} alt="Lambang Kota Bandung" />
				</div>
				<div>
					<h1 class="text-[14pt] font-bold">PEMERINTAH KOTA BANDUNG</h1>
					<h2 class="text-[15pt] font-bold">DINAS KEBAKARAN DAN PENANGGULANGAN BENCANA</h2>
					<address class="not-italic text-[10pt]">
						Jalan Sukabumi Nomor 17, Bandung, Telepon 022-7207113
						<br />
						e - mail: diskarbandung@gmail.com
					</address>
				</div>
			</div>
			<!-- <svg
				role="separator"
				class="mt-2"
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="10"
				viewBox="0 0 100 10"
				preserveAspectRatio="none"
			>
				<!-- Top thin line --
				<line x1="0" y1="1" x2="100" y2="1" stroke="black" stroke-width="1.5" />
				<!-- Middle thick line --
				<line x1="0" y1="5" x2="100" y2="5" stroke="black" stroke-width="3" />
				<!-- Bottom thin line --
				<line x1="0" y1="9" x2="100" y2="9" stroke="black" stroke-width="1.5" />
			</svg>
			<h1>testtt</h1> -->
			<div role="separator" class="mt-2">
				<hr class="!border-black border mb-0.5" />
				<hr class="!border-black border-[3px] mb-0.5" />
				<hr class="!border-black border" />
			</div>
		</header>
		<section>
			<h1 class="text-center text-[14pt] font-bold">{letter.type}</h1>
			<ul class="kepala-surat items-center list-none">
				{#each letter.head as item (item)}
					{#if ['static', 'text', 'textarea', 'select'].includes(item.type)}
						<li>
							<span class="list-title">{item.name}</span>: {@html sanitizeHtml(
								item.content.replaceAll('\n', '<br>')
							)}
						</li>
					{:else if item.type === 'autocomplete-popup'}
						<li><span class="list-title">{item.name}</span>: {item.content.value}</li>
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
							<svelte:component this={item.componentOut} data={item.data} content={item.content} />
						</li>
					{/if}
				{/each}
			</ul>

			<!-- <svg
				role="separator"
				class="my-2"
				style="margin-left: -5mm; width: calc(100% + 10mm);"
				xmlns="http://www.w3.org/2000/svg"
				height="5"
				viewBox="0 0 100 10"
				preserveAspectRatio="none"
			>
				<!-- Top thin line --
				<line x1="0" y1="1" x2="100" y2="1" stroke="black" stroke-width="10" />
			</svg> -->
			<hr class="!border-black border my-2" style="margin-left: -5mm; width: calc(100% + 10mm);" />

			<ol class="list-bold list-decimal ml-3.5">
				{#each letter.content as item}
					<li class="mb-4">
						<span>{item.name}:</span>
						{#if ['static', 'text', 'textarea', 'select'].includes(item.type)}
							<p>{@html sanitizeHtml(item.content.replaceAll('\n', '<br>'))}</p>
						{:else if item.type === 'date'}
							<p>
								{new Date(item.content).toLocaleDateString('id-ID', {
									year: 'numeric',
									month: 'long',
									day: '2-digit',
									weekday: 'long'
								})}
							</p>
						{:else if item.type === 'file'}
							<!-- <div>{@html isi.content}</div> -->
							<div>WIP</div>
						{:else if item.type === 'custom'}
							<svelte:component this={item.componentOut} data={item.data} content={item.content} />
						{/if}
					</li>
				{/each}
			</ol>
		</section>
		<footer>
			<div class="grid grid-cols-3">
				<div></div>
				<div></div>
				<SignatureDisplay {letter} svg={letter.foot.signature.svg} />
			</div>
		</footer>
	</section>
</article>
