import { admin, adminFirestore } from '$lib/server/firebase-admin';
import type { Actions } from '@sveltejs/kit';
import { getAuth } from 'firebase-admin/auth';
import type { User } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export const actions: Actions = {
	save: async ({ request }) => {
		const formData = await request.formData();
		const token = formData.get('userToken');

		getAuth(admin).verifyIdToken(token as string)
		.then(async (decodedToken) => {
			const user = decodedToken;

			if (user) {
				const userdoc = await adminFirestore.doc(`users/${user.uid}`).get()
				console.log(userdoc.data());
			}
		});
	},
	getPDF: () => {
		console.log('Hello, world! 2');
	}
};
