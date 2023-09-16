<script lang="ts">
	import pemkot from '$lib/assets/Lambang_Kota_Bandung.svg';
	import { storage } from '$lib/firebase/firebase';
	import { isJson, type FormInput, fromJson } from '$lib/letter';
	import { getDownloadURL, ref } from 'firebase/storage';
	import SignaturePad from 'signature_pad';
	import { onMount, tick } from 'svelte';

	export let liveLetter: { [key: string]: string };

	const date = new Date(Date.parse(`${liveLetter?.tanggal ?? ''}T${liveLetter?.jam ?? ''}Z`));

	const jamPenutupan = new Date(Date.parse(`1970-01-01T${liveLetter?.jamPenutupan ?? ''}Z`));

	console.log('view', liveLetter);
	console.log('pimpinan', liveLetter?.pimpinan);

	let employeeSearches: { [key: string]: string } = {};
	let signature: HTMLCanvasElement;
	let pad: SignaturePad;
	let signatureImg: string;

	onMount(() => {
		pad = new SignaturePad(signature);
	});

	async function updateSignature(): Promise<void> {
		console.log('signature', liveLetter?.ttdPad);
		console.log(fromJson(liveLetter?.ttdPad));
		pad.fromData(fromJson(liveLetter?.ttdPad));
		await tick();
		signatureImg = pad.toDataURL();
		console.log('signatureImg', signatureImg);
	}

	$: if (pad) {
		if (liveLetter?.ttdPad) {
			updateSignature();
		}
	}

	let uploadOne: string, uploadTwo: string, uploadThree: string, uploadFour: string;
	$: if (liveLetter?.uploadOne) {
		const pathRef = ref(storage, liveLetter?.uploadOne);

		getDownloadURL(pathRef)
			.then((url) => {
				console.log('getDownloadUrl', url);
				uploadOne = url;
			})
			.catch((err) => console.error(err));
	}
</script>

{#if liveLetter}
	<div>
		<article class="letter-view">
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
				<div role="separator" class="mt-2">
					<hr class="!border-black border mb-0.5" />
					<hr class="!border-black border-[3px] mb-0.5" />
					<hr class="!border-black border" />
				</div>
			</header>
			<section>
				<h1 class="text-center text-[14pt] mb-4 font-bold">NOTULEN</h1>

				<ul class="list-style items-center list-none">
					<h2 class="mt-4 font-bold">RAPAT</h2>
					<li>
						<span class="list-title">Hari/Tanggal</span>: {date.toLocaleDateString('id-ID', {
							year: 'numeric',
							month: 'long',
							day: '2-digit',
							weekday: 'long'
						}) ?? ''}
					</li>
					<li>
						<span class="list-title">Jam</span>: {date.toLocaleTimeString('en-GB', {
							hour: '2-digit',
							minute: '2-digit'
						}) ?? ''}
					</li>
					<li><span class="list-title">Tempat</span>: {liveLetter?.tempat ?? ''}</li>
					<li><span class="list-title">Acara</span>: {liveLetter?.acara ?? ''}</li>
					<!-- </ul> -->

					<h2 class="mt-4 font-bold">PIMPINAN RAPAT</h2>
					<!-- <ul class="list-style items-center list-none"> -->
					<li>
						<span class="list-title">Pimpinan</span>:
						{#if fromJson(liveLetter.pimpinan)?.position === 'other'}
							{fromJson(liveLetter.pimpinanOther)?.name ?? ''}
						{:else}
							{fromJson(liveLetter.pimpinan)?.name ?? ''}
						{/if}
					</li>
					<li>
						<span class="list-title">Moderator</span>:
						{#if fromJson(liveLetter.moderator)?.position === 'other'}
							{fromJson(liveLetter.moderatorOther).name ?? ''}
						{:else}
							{fromJson(liveLetter.moderator)?.name ?? ''}
						{/if}
					</li>
					<li>
						<span class="list-title">Pencatat</span>:
						{#if fromJson(liveLetter.pencatat)?.position === 'other'}
							{fromJson(liveLetter.pencatatOther)?.name ?? ''}
						{:else}
							{fromJson(liveLetter.pencatat)?.name ?? ''}
						{/if}
					</li>
					<!-- </ul> -->

					<h2 class="mt-4 font-bold">PESERTA</h2>
					<!-- <ul class="list-style items-center list-none" /> -->
					<li>
						<span class="list-title" />
						<ul class="list-disc">
							{#each fromJson(liveLetter.peserta) ?? [] as peserta, i (i)}
								<li>{i + 1}. {peserta}</li>
							{/each}
						</ul>
					</li>

					<h2 class="mt-4 font-bold">KEGIATAN RAPAT</h2>
					<!-- <ul class="list-style items-center list-none"> -->
					<li>
						<span class="list-title">Pembahasan</span>: {liveLetter?.pembahasan ?? ''}
					</li>
					<li><span class="list-title">Keputusan</span>: {liveLetter?.keputusan ?? ''}</li>
					<li>
						<span class="list-title">Jam penutupan</span>:
						{jamPenutupan.toLocaleTimeString('en-GB', {
							hour: '2-digit',
							minute: '2-digit'
						}) ?? ''}
					</li>
				</ul>

				<h2 class="mt-4 font-bold">DOKUMENTASI</h2>
				<div>
					<section class="grid grid-cols-2 gap-4">
						<div>
							{#if uploadOne}
								<img src={uploadOne} alt="Upload One" class="h-auto max-w-full" />
							{/if}
						</div>
						<div>
							{#if uploadTwo}
								<img src={uploadTwo} alt="Upload Two" class="h-auto max-w-full" />
							{/if}
						</div>
						<div>
							{#if uploadThree}
								<img src={uploadThree} alt="Upload Three" class="h-auto max-w-full" />
							{/if}
						</div>
						<div>
							{#if uploadFour}
								<img src={uploadFour} alt="Upload Four" class="h-auto max-w-full" />
							{/if}
						</div>
					</section>
				</div>
			</section>
			<footer class="grid grid-cols-3">
				<div />
				<div />
				<div class="text-center">
					<p>
						{fromJson(liveLetter.ttd)?.position ?? ''}
					</p>
					<img alt="Signature" src={signatureImg} />
					<p class="font-bold">{fromJson(liveLetter.ttd)?.name ?? ''}</p>
					<p>NIP: {fromJson(liveLetter.ttd)?.number ?? ''}</p>
				</div>
			</footer>
		</article>
	</div>
{/if}

<canvas bind:this={signature} class="hidden" width="100" height="100" />

<style>
	.letter-view {
		all: initial;
		display: block;
		box-sizing: border-box;
		background-color: white;
		width: 210mm;
		min-height: 330mm;
		font-family: 'Bookman Old Style', Georgia, Cambria, serif !important;
		font-size: 11 pt;
	}

	.letter-view > header {
		padding-top: 5mm;
		padding-right: 15mm;
		padding-left: 15mm;
	}

	.letter-view > section,
	.letter-view > footer {
		padding-left: 20mm;
		padding-right: 20mm;
		padding-top: 5mm;
		padding-bottom: 10mm;
		line-height: 1.5;
		font-size: 11pt;
	}

	.list-style {
		list-style-type: none;
		display: table;
		/* font-size: 12pt; */
	}

	.list-style li {
		display: table-row;
	}

	.list-style .list-title {
		display: table-cell;
		padding-right: 1rem;
	}
</style>
