import { redirect, type LoadEvent } from '@sveltejs/kit';
import { authStore } from '$stores/authStore';
import { get } from 'svelte/store';

export function load({ url }: LoadEvent) {
	console.log('url', url);
	
	const authValue = get(authStore);
	console.log('authValue', authValue);
}
