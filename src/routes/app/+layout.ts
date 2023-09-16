// import { redirect, type LoadEvent } from '@sveltejs/kit';
// import { authStore } from '$stores/authStore';
// import { get } from 'svelte/store';

import type { PageLoad } from "./dashboard/letter/[letterType]/edit/[letterId]/$types";

// // TODO: this doesn't work
// export function load({ url }: LoadEvent) {
// 	console.log('url', url);
	
// 	const authValue = get(authStore);
// 	console.log('authValue', authValue);
// }

export const load: PageLoad = ({ params }) => {
	return {
		letter: {
			type: params.letterType,
			id: params.letterId
		}
	};
};
