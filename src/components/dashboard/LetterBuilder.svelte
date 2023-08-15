<script lang="ts">
	import { onMount } from 'svelte';

	let bookmanAvailable: boolean = false;

	onMount(() => {
		// bookmanAvailable = document.fonts.check('1rem Bookman Old Style');
	});
</script>

<div>
	<div class="lg:flex flex-grow-0">
		<div class="w-full p-3 border-8 max-lg:border-b-0 lg:border-r-0 border-surface-900-50-token">
			WIP
		</div>
		<div class="p-3 border-8 border-surface-900-50-token">
			{#if !bookmanAvailable}
				<aside aria-live="assertive" role="alert" class="bg-error-500 p-2">
					<h1>Cek font gagal</h1>
					<ol class="list-decimal">
						<!-- TODO: make these actual checks -->
						<li>FontFaceSet: TIDAK TERDETEKSI</li>
						<li>Font Detector: TIDAK TERDETEKSI</li>
					</ol>
					<p>
						Font "Bookman Old Style" tidak tersedia di sistem operasi Anda. Silakan instal font
						tersebut terlebih dahulu. Menggunakan font Serif default sebagai gantinya.
					</p>
				</aside>
			{/if}
			<article class="paper-F4 bg-white">
				<header class="p-2" />
				<section />
				<footer />
			</article>
		</div>
	</div>
</div>
