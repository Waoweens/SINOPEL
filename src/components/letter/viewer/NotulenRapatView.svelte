<script lang="ts">
	import pemkot from '$lib/assets/Lambang_Kota_Bandung.svg';
	import { storage } from '$lib/firebase/firebase';
	import { isJson, type FormInput, fromJson } from '$lib/letter';
	import { getDownloadURL, ref } from 'firebase/storage';
	import SignaturePad from 'signature_pad';
	import { onMount, tick } from 'svelte';
	import dayjs, { Dayjs } from 'dayjs';
	import 'dayjs/locale/id';
	import customParseFormat from 'dayjs/plugin/customParseFormat';

	export let liveLetter: { [key: string]: string };

	export let article: HTMLElement;

	let date: dayjs.Dayjs;
	let time: dayjs.Dayjs;
	// $: date = new Date(Date.parse(`${liveLetter?.tanggal ?? ''}T${liveLetter?.jam ?? ''}Z`));

	let jamPenutupan: dayjs.Dayjs;
	// $: jamPenutupan = new Date(Date.parse(`1970-01-01T${liveLetter?.jamPenutupan ?? ''}Z`));

	dayjs.extend(customParseFormat);

	$: date = dayjs(`${liveLetter?.tanggal ?? ''}`, 'YYYY-MM-DD');
	$: time = dayjs(`${liveLetter?.jam ?? ''}`, 'HH:mm');
	$: jamPenutupan = dayjs(`${liveLetter?.jamPenutupan ?? ''}`, 'HH:mm');

	$: {
		console.log(jamPenutupan.format('HH:mm'));
	}

	console.log('view', liveLetter);
	console.log('pimpinan', liveLetter?.pimpinan);

	let employeeSearches: { [key: string]: string } = {};

	// let signature: HTMLCanvasElement;
	// let pad: SignaturePad;
	// let signatureImg: string;

	// onMount(() => {
	// 	pad = new SignaturePad(signature);
	// });

	// async function updateSignature(): Promise<void> {
	// 	console.log('signature', liveLetter?.ttdPad);
	// 	console.log(fromJson(liveLetter?.ttdPad));
	// 	pad.fromData(fromJson(liveLetter?.ttdPad));
	// 	await tick();
	// 	signatureImg = pad.toDataURL();
	// 	console.log('signatureImg', signatureImg);
	// }

	// $: if (pad) {
	// 	if (liveLetter?.ttdPad) {
	// 		updateSignature();
	// 	}
	// }

	let uploadOne: string,
		uploadTwo: string,
		uploadThree: string,
		uploadFour: string,
		uploadDaftarHadir: string;
	let _uploadOne: string,
		_uploadTwo: string,
		_uploadThree: string,
		_uploadFour: string,
		_uploadDaftarHadir: string;
	let _prevUploadOne: string,
		_prevUploadTwo: string,
		_prevUploadThree: string,
		_prevUploadFour: string,
		_prevUploadDaftarHadir: string;

	// upload one
	$: if (liveLetter) _uploadOne = liveLetter?.uploadOne;
	$: if (_uploadOne) {
		if (_uploadOne !== _prevUploadOne) {
			const pathRef = ref(storage, liveLetter?.uploadOne);

			getDownloadURL(pathRef)
				.then((url) => {
					console.log('getDownloadUrl ONE', url);
					uploadOne = url;
				})
				.catch((err) => console.error(err));

			_prevUploadOne = _uploadOne;
		}
	}

	// upload two
	$: if (liveLetter) _uploadTwo = liveLetter?.uploadTwo;
	$: if (_uploadTwo) {
		if (_uploadTwo !== _prevUploadTwo) {
			const pathRef = ref(storage, liveLetter?.uploadTwo);

			getDownloadURL(pathRef)
				.then((url) => {
					console.log('getDownloadUrl TWO', url);
					uploadTwo = url;
				})
				.catch((err) => console.error(err));

			_prevUploadTwo = _uploadTwo;
		}
	}

	// upload three
	$: if (liveLetter) _uploadThree = liveLetter?.uploadThree;
	$: if (_uploadThree) {
		if (_uploadThree !== _prevUploadThree) {
			const pathRef = ref(storage, liveLetter?.uploadThree);

			getDownloadURL(pathRef)
				.then((url) => {
					console.log('getDownloadUrl THREE', url);
					uploadThree = url;
				})
				.catch((err) => console.error(err));

			_prevUploadThree = _uploadThree;
		}
	}

	// upload four
	$: if (liveLetter) _uploadFour = liveLetter?.uploadFour;
	$: if (_uploadFour) {
		if (_uploadFour !== _prevUploadFour) {
			const pathRef = ref(storage, liveLetter?.uploadFour);

			getDownloadURL(pathRef)
				.then((url) => {
					console.log('getDownloadUrl FOUR', url);
					uploadFour = url;
				})
				.catch((err) => console.error(err));

			_prevUploadFour = _uploadFour;
		}
	}

	// upload daftar hadir
	$: if (liveLetter) _uploadDaftarHadir = liveLetter?.uploadDaftarHadir;
	$: if (_uploadDaftarHadir) {
		if (_uploadDaftarHadir !== _prevUploadDaftarHadir) {
			const pathRef = ref(storage, liveLetter?.uploadDaftarHadir);

			getDownloadURL(pathRef)
				.then((url) => {
					console.log('getDownloadUrl DAFTAR HADIR', url);
					uploadDaftarHadir = url;
				})
				.catch((err) => console.error(err));

			_prevUploadDaftarHadir = _uploadDaftarHadir;
		}
	}
</script>

{#if liveLetter}
	<div>
		<article bind:this={article} class="letter-view">
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
					<hr class="border mb-0.5" style="border-color: black;" />
					<hr class="border-[3px] mb-0.5" style="border-color: black;" />
					<hr class="border" style="border-color: black;" />
				</div>
			</header>
			<section>
				<h1 class="text-center text-[14pt] mb-4 font-bold">NOTULEN</h1>

				<h2 class="mt-4 font-bold">RAPAT</h2>
				<ul class="list-style items-center list-none">
					<li>
						<span class="list-title">Hari/Tanggal</span>: {date
							.locale('id')
							.format('dddd, DD MMMM YYYY') ?? ''}
					</li>
					<li>
						<span class="list-title">Jam</span>: {time.format('HH:mm') ?? ''}
					</li>
					<li><span class="list-title">Tempat</span>: {liveLetter?.tempat ?? ''}</li>
					<li><span class="list-title">Acara</span>: {liveLetter?.acara ?? ''}</li>
					<!-- </ul> -->

					<h2 class="mt-4 font-bold">PIMPINAN RAPAT</h2>
					<!-- <ul class="list-style items-center list-none"> -->
					<li>
						<span class="list-title">Pimpinan</span>: {#if fromJson(liveLetter.pimpinan)?.position === 'other'}
							{fromJson(liveLetter.pimpinanOther)?.name ?? ''}
						{:else}
							{fromJson(liveLetter.pimpinan)?.name ?? ''}
						{/if}
					</li>
					<li>
						<span class="list-title">Moderator</span>: {#if fromJson(liveLetter.moderator)?.position === 'other'}
							{fromJson(liveLetter.moderatorOther).name ?? ''}
						{:else}
							{fromJson(liveLetter.moderator)?.name ?? ''}
						{/if}
					</li>
					<li>
						<span class="list-title">Pencatat</span>: {#if fromJson(liveLetter.pencatat)?.position === 'other'}
							{fromJson(liveLetter.pencatatOther)?.name ?? ''}
						{:else}
							{fromJson(liveLetter.pencatat)?.name ?? ''}
						{/if}
					</li>
				</ul>

				<h2 class="mt-4 font-bold">PESERTA</h2>
				<!-- <ul class="list-style items-center list-none"> -->
				<!-- <li> -->
				<ul class="list-style items-center list-disc">
					{#each fromJson(liveLetter.peserta) ?? [] as peserta, i (i)}
						<li>{i + 1}. {peserta}</li>
					{/each}
				</ul>
				<!-- </li> -->
				<!-- </ul> -->

				<h2 class="mt-4 font-bold">KEGIATAN RAPAT</h2>
				<ul class="list-style items-center list-none">
					<li>
						<span class="list-title font-semibold">Pembahasan:</span>
					</li>
					<p>{@html (liveLetter?.pembahasan ?? '').replaceAll('\n', '<br />')}</p>
					<li>
						<span class="list-title font-semibold">Keputusan:</span>
					</li>
					<p>{@html (liveLetter?.keputusan ?? '').replaceAll('\n', '<br />')}</p>
					<li>
						<span class="font-semibold pr-1">Jam penutupan:</span>
						<span>{jamPenutupan.format('HH:mm') ?? ''}</span>
					</li>
				</ul>

				<h2 class="mt-4 font-bold">DOKUMENTASI</h2>
				<section class="flex flex-col">
					<div class="flex flex-row mb-2">
						<div class="mr-2">
							{#if uploadOne}
								<img src={uploadOne} alt="Upload One" class="h-auto max-w-full" />
							{/if}
						</div>
						<div>
							{#if uploadTwo}
								<img src={uploadTwo} alt="Upload Two" class="h-auto max-w-full" />
							{/if}
						</div>
					</div>
					<div class="flex flex-row">
						<div class="mr-2">
							{#if uploadThree}
								<img src={uploadThree} alt="Upload Three" class="h-auto max-w-full" />
							{/if}
						</div>
						<div>
							{#if uploadFour}
								<img src={uploadFour} alt="Upload Four" class="h-auto max-w-full" />
							{/if}
						</div>
					</div>
				</section>
			</section>
			<footer>
				<div class="flex flex-row justify-end">
					<div class="flex-1" />
					<div class="flex-1" />
					<div class="text-center flex-1">
						<p>
							{(fromJson(liveLetter.ttd)?.position ?? '') === 'other'
								? 'Notulen'
								: fromJson(liveLetter.ttd)?.position ?? ''}
						</p>
						<img alt="Signature" src={liveLetter?.ttdPadImg ?? ''} />
						<p class="font-bold">
							{#if fromJson(liveLetter.ttd)?.position === 'other'}
								{fromJson(liveLetter.ttdOther)?.name ?? ''}
							{:else}
								{fromJson(liveLetter.ttd)?.name ?? ''}
							{/if}
						</p>
						{#if fromJson(liveLetter.ttd)?.position === 'other'}
							{#if fromJson(liveLetter.ttdOther)?.number != 0}
								<p>NIP: {fromJson(liveLetter.ttdOther)?.number ?? ''}</p>
							{/if}
						{:else if fromJson(liveLetter.ttd)?.number != 0}
							<p>NIP: {fromJson(liveLetter.ttd)?.number ?? ''}</p>
						{/if}
					</div>
				</div>
			</footer>
			<section style="page-break-before: always;">
				<div>
					{#if uploadDaftarHadir}
						<img src={uploadDaftarHadir} alt="Upload Daftar Hadir" class="h-auto max-w-full" />
					{/if}
				</div>
			</section>
		</article>
	</div>
{/if}

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
