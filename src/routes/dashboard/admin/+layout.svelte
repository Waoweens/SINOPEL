<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { Doc, SignedIn } from 'sveltefire';
</script>

<SignedIn let:user>
	<Doc ref={'/users/' + user.uid} let:data>
		{#if data.role == 'admin'}
			<AppRail>
				<AppRailAnchor href="/dashboard/admin" selected={$page.url.pathname === '/dashboard/admin'}>
					<span>Admin</span>
				</AppRailAnchor>
			</AppRail>
			<slot />
		{:else}
			<h1>403</h1>
			{goto('/dashboard')}
		{/if}
	</Doc>
</SignedIn>
