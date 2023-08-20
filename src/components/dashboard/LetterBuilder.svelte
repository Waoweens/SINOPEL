<script lang="ts">
	import pemkot from '$lib/assets/Lambang_Kota_Bandung.svg';
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

	// TODO: load data from database
	let data = {
		namaPejabat: [],
		sifat: ['Biasa', 'Segera', 'Rahasia', 'Sangat Rahasia', 'Penting', 'Konfidensial']
	};

	let kepalaSurat = {
		kepada: '',
		dari: email,
		tanggal: '',
		nomor: '',
		sifat: '',
		lampiran: '',
		hal: ''
	};

	let isiSurat = [
		{ name: 'Dasar Hukum', content: '', type: 'text' },
		{ name: 'Peserta Kegiatan', content: '', type: 'text' },
		{ name: 'Narasumber', content: '', type: 'text' },
		{ name: 'Materi', content: '', type: 'text' },
		{ name: 'Hasil Kegiatan', content: '', type: 'text' },
		{ name: 'Dokumentasi Kegiatan', content: '', type: 'multimedia' }
	];

	let dateBind: string;

	let vw: number;
	let vh: number;
	let paperScale: number = 1;
	let paperMarginX: number;
	let paperMarginY: number;

	$: if (vw) {
		let desiredWidth = vw * 0.5;
		paperScale = desiredWidth / (210 * 3.7795)
		paperMarginX = ((210 * 3.7795) - ((210 * 3.7795) * paperScale)) / 2;
		paperMarginY = (((210 * 1.5714) * 3.7795) - (((210 * 1.5714) * 3.7795) * paperScale)) / 2;
	}

	$: if (dateBind) {
		const date: Date = new Date(dateBind);
		// format: 01 Januari 1970 (id-ID)

		kepalaSurat.tanggal = date.toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: '2-digit'
		});
	}

	function handleSubmit() {}
</script>

<div bind:offsetWidth={vw} bind:offsetHeight={vh}>
	<div class="lg:flex flex-grow-0">
		<div class="w-full p-3 border-8 max-lg:border-b-0 lg:border-r-0 border-surface-900-50-token">
			<h1 class="text-2xl pb-2">Buat surat</h1>

			<form on:submit|preventDefault={handleSubmit}>

				<h2 class="text-xl">Kepala Surat</h2>
				<div class="2xl:grid grid-cols-2 gap-4">
					<label class="label">
						<span>Kepada</span>
						<select class="select" bind:value={kepalaSurat.kepada}>
							<option value="1">Nama 1</option>
							<option value="2">Nama 2</option>
							<option value="3">Nama 3</option>
							<option value="4">Nama 4</option>
						</select>
					</label>

					<label class="label">
						<span>Tanggal</span>
						<input class="input" type="date" bind:value={dateBind} />
					</label>

					<label class="label">
						<span>Nomor</span>
						<div class="md:flex">
							<input class="input" type="text">
							<input class="input" type="text">
							<input class="input" type="text">
							<input class="input" type="text">
							<input class="input" type="text">
							<input class="input" type="text">
						</div>
					</label>

					<label class="label">
						<span>Sifat</span>
						<select class="select" bind:value={kepalaSurat.sifat}>
							{#each data.sifat as sifat}
								<option value={sifat}>{sifat}</option>
							{/each}
						</select>
					</label>
				</div>

				<h2 class="text-xl">Isi Surat</h2>
				<div>

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
			<article class="paper-scale-desktop paper-F4 bg-white" style="--paper-scale: {paperScale}; --paper-margin-x: {paperMarginX}; --paper-margin-y: {paperMarginY}">
				<header>
					<div class="flex text-center justify-center items-center">
						<div class="inline-block w-24">
							<img src={pemkot} alt="Lambang Kota Bandung" />
						</div>
						<div>
							<h1 style="font-size: 14pt">PEMERINTAH KOTA BANDUNG</h1>
							<h2 style="font-size: 15pt">DINAS KEBAKARAN DAN PENANGGULANGAN BENCANA</h2>
							<address class="not-italic" style="font-size: 10pt">
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
					<h1 class="text-center" style="font-size: 12pt">NOTA - DINAS</h1>

					<ul class="kepala-surat items-center">
						<li><span>Kepada</span>: {kepalaSurat.kepada}</li>
						<li><span>Dari</span>: {kepalaSurat.dari}</li>
						<li><span>Tanggal</span>: {kepalaSurat.tanggal}</li>
						<li><span>Nomor</span>: {kepalaSurat.nomor}</li>
						<li><span>Sifat</span>: {kepalaSurat.sifat}</li>
						<li><span>Lampiran</span>: {kepalaSurat.lampiran}</li>
						<li><span>Hal</span>: {kepalaSurat.hal}</li>
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

					<ol class="list-bold list-decimal">
						{#each isiSurat as isi}
							<li>
								<span>{isi.name}:</span>
								{#if isi.type === 'text'}
									<p>{isi.content}</p>
								{:else if isi.type === 'multimedia'}
									<div>{@html isi.content}</div>
								{/if}
							</li>
						{/each}
					</ol>
				</section>
				<footer />
			</article>
		</div>
	</div>
</div>

<style lang="scss">
</style>
