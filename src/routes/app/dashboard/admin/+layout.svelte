<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { Doc, SignedIn } from 'sveltefire';
</script>

<SignedIn let:user>
	<Doc ref={'/users/' + user.uid} let:data>
		{#if data.role == 'admin'}
			<TabGroup class="mb-3">
				<TabAnchor href="/dashboard/admin" selected={$page.url.pathname === '/dashboard/admin'}>
					<span>Home</span>
				</TabAnchor>
				<TabAnchor
					href="/dashboard/admin/users"
					selected={$page.url.pathname === '/dashboard/admin/users'}
				>
					<span>Akun</span>
				</TabAnchor>
				<TabAnchor
					href="/dashboard/admin/employees"
					selected={$page.url.pathname === '/dashboard/admin/employees'}
				>
					<span>Pejabat</span>
				</TabAnchor>
			</TabGroup>
			<slot />
		{:else}
			<h1>403</h1>
			{goto('/app/dashboard')}
		{/if}
	</Doc>
</SignedIn>
