<script lang="ts">
	import { browser } from '$app/environment';
	import {
		LightSwitch,
		SlideToggle,
		getModeUserPrefers,
		setModeCurrent,
		setModeUserPrefers
	} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	onMount(() => {
        if (!getModeUserPrefers()) return;
        setModeUserPrefers(true);
        setModeCurrent(true);
    });
</script>

<div>
	<LightSwitch />
</div>
