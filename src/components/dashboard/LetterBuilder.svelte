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
		<div class="p-2 border-8 border-surface-900-50-token">
			{#if !bookmanAvailable}
				<aside aria-live="assertive" role="alert" class="bg-error-500 text-surface-50 p-2">
					<h1>Cek font gagal</h1>
					<p>
						Font "Bookman Old Style" tidak tersedia di sistem operasi Anda. Silakan instal font
						tersebut terlebih dahulu. Menggunakan font Serif default sebagai gantinya.
					</p>
				</aside>
			{/if}
			<div class="paper-container">
				<article class="paper-F4 bg-white paper-scale">
					<header class="p-2" />
					<section>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper urna eu
						arcu eleifend rutrum. Vivamus ultrices porta sem id semper. Curabitur ac eleifend eros.
						Donec venenatis, metus placerat suscipit auctor, lectus est volutpat ipsum, id semper
						dui metus eu nunc. Duis vulputate posuere metus, quis pretium justo sodales a.
						Vestibulum dolor arcu, vestibulum ac tincidunt id, rhoncus quis purus. Vivamus
						vestibulum efficitur molestie. Sed ac interdum tellus. Vivamus aliquam consequat
						malesuada. Curabitur lectus ipsum, ullamcorper id euismod ac, molestie sit amet nunc.
						Donec eu urna rutrum, egestas libero vel, venenatis eros. Vivamus dictum et sem vitae
						laoreet. Vivamus accumsan, est in sollicitudin fringilla, diam libero porttitor purus,
						ut ullamcorper magna justo vitae ipsum. Vivamus fermentum nulla nec sapien facilisis
						suscipit. Cras laoreet eros eget fringilla tempor. Sed et sagittis velit. Quisque
						ornare, arcu et eleifend mollis, mi magna semper leo, eget mollis turpis nisi commodo
						metus. Ut ultricies, risus eget tincidunt pretium, eros ligula porta velit, ac
						sollicitudin nulla felis sit amet turpis. Duis convallis efficitur dui eu malesuada. Sed
						ac consectetur felis. Integer augue elit, venenatis ut cursus vel, vehicula nec lorem.
						Proin libero nibh, tempus a congue in, laoreet non nisi. Sed scelerisque arcu nec erat
						iaculis, nec interdum lorem rhoncus. Cras a efficitur erat, quis posuere ipsum. Nulla
						sit amet sodales purus. Pellentesque dignissim mi pretium purus efficitur ultricies.
						Praesent et mi blandit, tempor quam malesuada, sagittis mauris. Suspendisse auctor nisl
						quis nisl dictum, a placerat mauris pellentesque. Nullam nec nulla vel nisi varius
						molestie ut sit amet elit. Vestibulum vel eros eget lorem vestibulum iaculis. Sed
						congue, libero sit amet interdum ullamcorper, nulla arcu vulputate neque, sed aliquam
						odio lorem eget ex. Donec posuere justo eget velit cursus viverra. Donec aliquet id mi
						nec commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
						ac turpis egestas. Quisque euismod lorem eleifend ipsum luctus fringilla. Fusce interdum
						neque dolor, a viverra ipsum semper non. Duis nisi risus, rhoncus sed rutrum id, aliquet
						ut tortor. Maecenas iaculis justo eget lacinia fringilla. Donec sit amet nunc at risus
						dictum ornare. In ac mauris eu nunc viverra rhoncus et at sapien. Nam venenatis sapien
						felis, ut eleifend lorem condimentum non. Proin rhoncus sagittis lorem, a feugiat dui
						tempus dapibus. Etiam iaculis ac risus sit amet bibendum. Phasellus at nisl vel ante
						vehicula malesuada. Cras eu augue tellus. Ut non lacinia turpis, condimentum volutpat
						libero. Sed laoreet lorem quis fermentum commodo. Nam ut finibus ex, eget eleifend nibh.
						Vivamus molestie vitae nibh in fringilla. Praesent laoreet placerat est, et ornare elit.
						In bibendum lorem vel lacus pharetra, ut rutrum tortor pulvinar. Praesent accumsan
						imperdiet euismod. Suspendisse id nulla quis lectus luctus ultricies. Proin sed leo
						nulla. Morbi semper nisl nec tempus condimentum.
					</section>
					<footer />
				</article>
			</div>
		</div>
	</div>
</div>
