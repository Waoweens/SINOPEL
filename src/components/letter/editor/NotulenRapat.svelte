<script lang="ts">
	import EmployeeSearch from '$components/dashboard/EmployeeSearch.svelte';
	import type { CollectionStore } from '$lib/sveltefire-types';
	import LetterNumber from '../elements/LetterNumber.svelte';

	export let letter: unknown;
	export let employees: CollectionStore<unknown[]>;

	let timeout: NodeJS.Timeout;

	function updatePreview() {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			console.log('update preview');
		}, 1000);
	}

	function handleSubmit() {}
</script>

<form on:submit|preventDefault={handleSubmit} on:input={updatePreview}>
	<section id="input-rapat">
		<h3 class="h3 mb-2">Rapat</h3>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Letter Number</span>
			<LetterNumber />
		</label>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Dari</span>
			<EmployeeSearch {employees} />
		</label>

		<label class="label mb-2">
			<span>Hari/Tanggal</span>
			<input type="date" class="input" />
		</label>

		<label class="label mb-2">
			<span>Jam</span>
			<input type="time" class="input" />
		</label>

		<label class="label mb-2">
			<span>Tempat</span>
			<input type="text" class="input" />
		</label>

		<label class="label mb-2">
			<span>Acara</span>
			<input type="text" class="input" />
		</label>
		
	</section>

	<hr class="my-2" />

	<section id="input-pimpinan-rapat">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Pimpinan</span>
			<EmployeeSearch {employees} />
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Moderator</span>
			<EmployeeSearch {employees} />
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mb-2">
			<span>Pencatat</span>
			<EmployeeSearch {employees} />
		</label>
	</section>

	<hr class="my-2" />

	<section id="input-foot" />

	<hr class="my-2" />

	<section>
		<button type="submit" class="btn variant-filled-primary mt-2">Save</button>
	</section>
</form>
