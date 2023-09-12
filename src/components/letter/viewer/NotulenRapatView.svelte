<script lang="ts">
	import pemkot from '$lib/assets/Lambang_Kota_Bandung.svg';
	import type { FormInput } from '$lib/letter';

	export let letter: FormInput[];

	let formValues: any;

	for (const { name, value } of letter) {
		formValues = {
			...formValues,
			[name]: value
		};
	}

	const date = new Date(Date.parse(`${formValues?.tanggal ?? ''} ${formValues?.jam ?? ''}`));

	console.log(formValues);
</script>

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
			<h1 class="text-center text-[14pt] mb-8 font-bold">NOTULEN</h1>

			<p>Dipermaklumkan dengan hormat. Berikut kami sampaikan notulensi rapat sebagai berikut:</p>

			<h2 class="mt-4 font-bold">RAPAT</h2>
			<ul class="list-style items-center list-none">
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
				<li><span class="list-title">Tempat</span>: {formValues?.tempat ?? ''}</li>
				<li><span class="list-title">Acara</span>: {formValues?.acara ?? ''}</li>
			</ul>

			<h2 class="mt-4 font-bold">PIMPINAN RAPAT</h2>
			<ul class="list-style items-center list-none">
				<li><span class="list-title">Pimpinan</span>: {JSON.parse(formValues?.pimpinan ?? '{}')?.name ?? ''}</li>
				<li><span class="list-title">Moderator</span>: {JSON.parse(formValues?.moderator ?? '{}')?.name ?? ''}</li>
				<li><span class="list-title">Pencatat</span>: {JSON.parse(formValues?.pencatat ?? '{}')?.name ?? ''}</li>
			</ul>

			<h2 class="mt-4 font-bold">PESERTA</h2>
			<ul class="list-style items-center list-none" />

			<h2 class="mt-4 font-bold">KEGIATAN RAPAT</h2>
			<ul class="list-style items-center list-none">
				<li><span class="list-title">Pembahasan</span>: {formValues?.pembahasan ?? ''}</li>
				<li><span class="list-title">Keputusan</span>: {formValues?.keputusan ?? ''}</li>
				<li><span class="list-title">Jam penutupan</span>: {formValues?.jamPenutupan ?? ''}</li>
			</ul>

			<h2 class="mt-4 font-bold">DOKUMENTASI</h2>
			<div />

			<p class="mt-4">
				Demikian nota dinas ini kami sampaikan. Atas perhatian dan perkenan Bapak, kami ucapkan
				terima kasih.
			</p>
		</section>
		<footer class="grid grid-cols-3">
			<div />
			<div />
			<!--<SignatureView />-->
		</footer>
	</article>
</div>

<style>
	.letter-view {
		all: initial;
		display: block;
		box-sizing: border-box;
		background-color: white;
		width: 210mm;
		min-height: 330mm;
		font-family: 'Bookman Old Style', Georgia, Cambria, serif !important;
	}

	.letter-view > header {
		padding-top: 5mm;
		padding-right: 15mm;
		padding-left: 15mm;
	}

	.letter-view > section {
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
		font-size: 12pt;
	}

	.list-style li {
		display: table-row;
	}

	.list-style .list-title {
		display: table-cell;
		padding-right: 1rem;
	}
</style>
