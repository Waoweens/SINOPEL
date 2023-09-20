import { adminAuth, adminFirestore } from '$src/lib/firebase/firebase-admin';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
	// Content-Type: application/json

	const body = await request.json();

	if (!body || !body.email || !body.displayName || !body.password || !body.nip || !body.role) {
		return json({ message: 'Invalid input' }, { status: 400 });
	}

	try {
		const user = await adminAuth.createUser({
			email: body.email,
			displayName: body.displayName,
			password: body.password,
		});

		const docRef = await adminFirestore.collection('users/sinopel/entries').doc(user.uid).set({
			email: body.email,
			displayName: body.displayName,
			nip: body.nip,
			role: body.role
		});

		return json({ message: 'User added', user, docRef }, { status: 200 });
	} catch (error) {

		console.error(error);
		return json({ message: 'Failed to add user', error }, { status: 500 });
	}
}

export const PUT: RequestHandler = async ({ request }): Promise<Response> => {
	// Content-Type: application/json

	const body = await request.json();

	if (!body || !body.email || !body.displayName || !body.password || !body.nip || !body.role || !body.uid) {
		return json({ message: 'Invalid input' }, { status: 400 });
	}

	try {
		const user = await adminAuth.updateUser(body.uid, {
			email: body.email,
			displayName: body.displayName,
			password: body.password,
		});

		const docRef = await adminFirestore.collection('users/sinopel/entries').doc(user.uid).set({
			email: body.email,
			displayName: body.displayName,
			nip: body.nip,
			role: body.role
		});

		return json({ message: 'User updated', user, docRef }, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ message: 'Failed to update user', error }, { status: 500 });
	}
}