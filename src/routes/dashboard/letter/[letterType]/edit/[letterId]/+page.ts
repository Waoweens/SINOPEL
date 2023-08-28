import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	return {
		letter: {
			letterType: params.letterType,
			letterId: params.letterId,
		}
	}
};