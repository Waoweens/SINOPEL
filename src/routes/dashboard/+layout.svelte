<script lang="ts">
	import { ProgressRadial } from "@skeletonlabs/skeleton";
	import { SignedIn } from "sveltefire";

</script>

<SignedIn>
	<slot />
</SignedIn>

	<!-- <div class="flex h-screen">
		<div class="m-auto">
			<ProgressRadial stroke={100} />
		</div>
	</div> -->