<script lang="ts">
	import { FileDropzone, ProgressBar, ProgressRadial, getModalStore } from '@skeletonlabs/skeleton';
	import IconUploadFile from '~icons/ic/round-upload-file';
	import IconClose from '~icons/ic/baseline-close';
	import IconWarning from '~icons/ic/baseline-warning';
	import { getFileExt, getFileSize } from '$lib/letter';
	import { ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
	import { storage } from '$lib/firebase/firebase';
	import { gsRoot } from '$stores/static';
	import { v4 as uuidv4 } from 'uuid';
	import { getDocument } from 'pdfjs-dist';
	import 'pdfjs-dist/build/pdf.worker.entry';

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
	let progress: number = 0;
	let uploading: boolean = false;

	$: if (files) {
		console.log(files);
		file = files[0];

		alert.head = '';
		alert.body = '';
		disabled = false;

		// 5 MiB
		if (file.size > 5242880) {
			alert.head = 'File terlalu besar';
			alert.body = 'Ukuran file maksimal 5 MiB';
			disabled = true;
		}

		if (!file.type.match(/(application\/pdf|image\/(jpeg|png|gif))/)) {
			alert.head = 'File tidak didukung';
			alert.body = 'Hanya file JPG, PNG, GIF dan PDF yang didukung';
			disabled = true;
		}
	}

	async function upload(): Promise<void> {
		if (file) {
			let curFile: File;

			if (file.type === 'application/pdf') {
				// convert to jpg

				const pdfBytes = await file.arrayBuffer();
				const pdf = await getDocument(pdfBytes).promise;

				const page = await pdf.getPage(1);
				const viewport = page.getViewport({ scale: 1.0 });

				const canvas = document.createElement('canvas');
				const context = canvas.getContext('2d')!;
				canvas.height = viewport.height;
				canvas.width = viewport.width;
				const renderContext = {
					canvasContext: context,
					viewport: viewport
				};

				await page.render(renderContext).promise;

				const img = canvas.toDataURL('image/jpeg', 1.0);

				const blob = await (await fetch(img)).blob();

				curFile = new File([blob], file.name.replace(/\.pdf$/, '.jpg'), {
					type: 'image/jpeg'
				});
			} else {
				curFile = file;
			}

			// repalce file name with name.ext
			// const fileName = $modalStore[0].meta?.name + getFileExt(file.type);
			const fileName = uuidv4() + getFileExt(curFile.type);
			console.log(fileName);

			const storageRef = ref(
				storage,
				`${gsRoot}/letters/${$modalStore[0].meta?.letterType}/${$modalStore[0].meta?.letterId}/${fileName}`
			);

			const uploadTask = uploadBytesResumable(storageRef, curFile);
			uploading = true;
			disabled = true;

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const percentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

					console.log('Upload is ' + percentage + '% done');
					progress = percentage;
				},
				(error) => {
					console.error(error);
				},
				() => {
					console.log('Upload is complete');

					if ($modalStore[0].response)
						$modalStore[0]?.response({
							name: fileName,
							url: uploadTask.snapshot.ref.toString()
						});

					modalStore.close();
				}
			);
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
			<svelte:fragment slot="meta">JPG, PNG, GIF, dan PDF. Maksimal 5 MiB</svelte:fragment>
		</FileDropzone>
		<div class="flex gap-3 items-center variant-ghost-surface p-2">
			{#if file}
				{#if uploading}
					<div class="btn-icon btn-icon-sm variant-filled-secondary p-1">
						<ProgressRadial stroke={150} />
					</div>
				{:else}
					<button type="button" class="btn-icon btn-icon-sm variant-filled-error" on:click={clear}>
						<IconClose />
					</button>
				{/if}
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
		<ProgressBar meter="variant-filled-primary" value={progress} />
	</section>
	<section class="flex items-center gap-3 ml-auto">
		{#if uploading}
			<p class="text-xl">{progress}%</p>
		{/if}
		<button type="button" class="btn variant-filled-primary" {disabled} on:click={upload}>
			Upload
		</button>
	</section>
</aside>

<slot />
