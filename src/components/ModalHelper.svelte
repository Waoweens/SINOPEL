<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	export function alert(title: string, body: string) {
		modalStore.trigger({
			type: 'alert',
			buttonTextCancel: 'Ok',
			title: title,
			body: body
		});
	}
</script>
