<script lang="ts">
	import IconDownload from '~icons/ic/baseline-download';
	import IconPrint from '~icons/ic/baseline-print';
	import LetterView from './LetterView.svelte';
	import LetterInput from './LetterInput.svelte';
</script>

<section class="flex flex-col gap-4">
	<h2 class="h2">Edit letter</h2>
	<section class="card p-3">
		<div>
			Name:
			ID:
			Date:
		</div>
		<div class="flex gap-3">
			<button type="button" class="btn variant-filled">
				<span><IconDownload /></span>
				<span>Download PDF</span>
			</button>
			<button type="button" class="btn variant-filled">
				<span><IconPrint /></span>
				<span>Print</span>
			</button>
		</div>
	</section>

	<div class="flex gap-4">
		<section class="p-3 card flex-grow">
			<h3 class="h3">Edit</h3>
			<!-- <LetterInput /> -->
		</section>
		<section class="p-3 card flex-grow">
			<h3 class="h3">Preview</h3>
			<!-- <LetterView /> -->
		</section>
	</div>
</section>
