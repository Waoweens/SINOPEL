<script lang="ts">
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import { appname } from '../stores/static';
	import IconAccount from '~icons/ic/baseline-account-circle'
	import IconApps from '~icons/ic/baseline-apps'
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<IconApps class="text-2xl -my-2" />
	</svelte:fragment>
	{appname}
	<svelte:fragment slot="trail">
		<button>
			<IconAccount class="text-3xl -my-2" />
		</button>
	</svelte:fragment>
</AppBar>
