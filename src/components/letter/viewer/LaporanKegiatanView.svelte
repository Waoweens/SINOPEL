<script lang="ts">
	import pemkot from '$lib/assets/Lambang_Kota_Bandung.svg';
	import { storage } from '$lib/firebase/firebase';
	import { isJson, type FormInput, fromJson } from '$lib/letter';
	import { getDownloadURL, ref } from 'firebase/storage';
	import SignaturePad from 'signature_pad';
	import { onMount, tick } from 'svelte';
	import dayjs, { Dayjs } from 'dayjs';
	import 'dayjs/locale/id'

	export let liveLetter: { [key: string]: string };

	export let article: HTMLElement;

	let date: dayjs.Dayjs;
	$: date = dayjs(`${liveLetter?.tanggal ?? ''}`, 'YYYY-MM-DD')

	let nomorSurat: string[];
	$: nomorSurat = fromJson(liveLetter?.nomorSurat);

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
				<h1 class="text-center text-[14pt] mb-4 font-bold">NOTA DINAS</h1>

				<ul class="list-style items-center list-none">
					<li>
						<span class="list-title">Kepada:</span>:
						{#if fromJson(liveLetter.kepada)?.position === 'other'}
							{fromJson(liveLetter.kepadaOther)?.name ?? ''}
						{:else}
							{fromJson(liveLetter.kepada)?.name ?? ''}
						{/if}
					</li>
					<li>
						<span class="list-title">Jam</span>: {date.locale('id').format('dddd, DD MMMM YYYY') ?? ''}
					</li>
					<li><span class="list-title">Nomor surat</span>: {nomorSurat.slice(0, 3).join('/')}-{nomorSurat.slice(3).join('/')}</li>
					<li><span class="list-title">Sifat</span>: {liveLetter?.sifat ?? ''}</li>
					<li><span class="list-title">Lampiran</span>: {liveLetter?.lampiran ?? ''}</li>
					<li><span class="list-title">Perihal</span>: {liveLetter?.perihal ?? ''}</li>
				</ul>

				<hr class="my-2 border-[2px] -mx-[15px]" style="border-color: black;" />

				<ol class="list-bold list-decimal">
					<li>
						<span class="font-bold">Dasar Hukum</span>:
						<p>{@html (liveLetter?.dasarHukum ?? '').replaceAll('\n', '<br />')}</p>
					</li>
					<li>
						<span class="font-bold">Peserta Kegiatan</span>:
						<p>{@html (liveLetter?.pesertaKegiatan ?? '').replaceAll('\n', '<br />')}</p>
					</li>
					<li>
						<span class="font-bold">Jumlah Peserta</span>:
						<p>Laki&#8209;laki: {liveLetter?.jumlahPesertaMale}</p>
						<p>Perempuan: {liveLetter?.jumlahPesertaFemale}</p>
					</li>
					<li>
						<span class="font-bold">Narasumber</span>:
						<p>{@html (liveLetter?.narasumber ?? '').replaceAll('\n', '<br />')}</p>
					</li>
					<li>
						<span class="font-bold">Materi</span>:
						<p>{@html (liveLetter?.materi ?? '').replaceAll('\n', '<br />')}</p>
					</li>
					<li>
						<span class="font-bold">Hasil Kegiatan</span>:
						<p>{@html (liveLetter?.hasilKegiatan ?? '').replaceAll('\n', '<br />')}</p>
					</li>
				</ol>

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
			<footer class="flex flex-row justify-end">
				<div class="text-center">
					<p>
						{fromJson(liveLetter.ttd)?.position ?? ''}
					</p>
					<img alt="Signature" src={liveLetter?.ttdPadImg ?? ''} />
					<p class="font-bold">{fromJson(liveLetter.ttd)?.name ?? ''}</p>
					<p>NIP: {fromJson(liveLetter.ttd)?.number ?? ''}</p>
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

	.list-bold ::marker {
		font-weight: 800;
	}
</style>
