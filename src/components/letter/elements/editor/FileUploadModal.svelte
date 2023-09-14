<script lang="ts">
	import { FileDropzone, ProgressBar, getModalStore } from '@skeletonlabs/skeleton';
	import IconUploadFile from '~icons/ic/round-upload-file';
	import IconClose from '~icons/ic/baseline-close';
	import IconWarning from '~icons/ic/baseline-warning';
	import { getFileExt, getFileSize } from '$lib/letter';
	import { ref, uploadBytes } from 'firebase/storage';
	import { storage } from '$lib/firebase/firebase';

	const modalStore = getModalStore();
	// export let parent: unknown;
	// export let name: string;

	$: console.log('info', $modalStore[0]);

	let disabled: boolean = true;
	let alert = {
		head: '',
		body: ''
	};

	let files: FileList | undefined;
	let file: File | undefined;

	$: if (files) {
		console.log(files);
		file = files[0];

		alert.head = '';
		alert.body = '';
		disabled = false;

		if (file.size > 1048576) {
			alert.head = 'File terlalu besar';
			alert.body = 'Ukuran file maksimal 1 MiB';
			disabled = true;
		}

		if (!file.type.match(/image\/(jpeg|png|gif)/)) {
			alert.head = 'File tidak didukung';
			alert.body = 'Hanya file JPG, PNG, dan GIF yang didukung';
			disabled = true;
		}
	}

	function upload(): void {
		if (file) {
			// repalce file name with name.ext
			const fileName = $modalStore[0].meta?.name + getFileExt(file.type);
			console.log(fileName);

			const storageRef = ref(
				storage,
				`letters/${$modalStore[0].meta?.letterType}/${$modalStore[0].meta?.letterId}/${fileName}`
			);

			console.log(storageRef);

			uploadBytes(storageRef, file).then((snapshot) => {
				console.log('Uploaded a blob or file!', snapshot);
				clear();
				// modalStore.close();
			});
		}
	}

	function clear(): void {
		files = undefined;
		file = undefined;
		alert.head = '';
		alert.body = '';
		disabled = true;
	}
</script>

<aside class="flex flex-col gap-3 card p-5 w-full max-w-2xl">
	<section class="flex">
		<h1 class="h3 font-bold">Upload Dokumentasi</h1>
		<div class="ml-auto">
			<button type="button" class="btn-icon btn-icon-sm" on:click={() => modalStore.close()}>
				<IconClose class="text-2xl" />
			</button>
		</div>
	</section>
	<section>
		<FileDropzone name="tst" bind:files>
			<svelte:fragment slot="lead">
				<div class="flex justify-center">
					<IconUploadFile class="text-5xl" />
				</div>
			</svelte:fragment>
			<svelte:fragment slot="message">
				<span class="font-bold">Klik atau drag</span> untuk upload file
			</svelte:fragment>
			<svelte:fragment slot="meta">JPG, PNG, dan GIF. Maksimal 1 MiB</svelte:fragment>
		</FileDropzone>
		<div class="flex gap-3 items-center variant-ghost-surface p-2">
			{#if file}
				<button type="button" class="btn-icon btn-icon-sm variant-filled-error" on:click={clear}>
					<IconClose />
				</button>
				<p>{file.name} ({getFileSize(file.size)})</p>
			{/if}
		</div>
		{#if alert.head || alert.body}
			<aside class="alert variant-filled-error">
				<div><IconWarning class="text-3xl" /></div>
				<div class="alert-message">
					<h3 class="h3">{alert.head}</h3>
					<p>{alert.body}</p>
				</div>
			</aside>
		{/if}
		<ProgressBar value={0} />
	</section>
	<section class="flex ml-auto">
		<button type="button" class="btn variant-filled-primary" {disabled} on:click={upload}>
			Upload
		</button>
	</section>
</aside>

<slot />
