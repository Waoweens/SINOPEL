import { isLetterType } from '$lib/letter';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (!isLetterType(params.letterType) && !params.letterId) {
		throw error(404, 'Not found');
	}

	return {
		letter: {
			type: params.letterType,
			id: params.letterId
		}
	};
};
