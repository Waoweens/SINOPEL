<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { appname } from '../stores/static';
</script>

<AppBar>
	<svelte:fragment slot="lead">(icon)</svelte:fragment>
	{appname}
	<svelte:fragment slot="trail">(actions)</svelte:fragment>
</AppBar>
