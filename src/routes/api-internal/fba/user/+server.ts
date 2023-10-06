import { adminAuth, adminFirestore } from '$src/lib/firebase/firebase-admin';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
	// Content-Type: application/json
	console.log('Received POST at user')

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

		await adminFirestore.collection('users/sinopel/entries').doc(user.uid).set({
			email: body.email,
			displayName: body.displayName,
			nip: body.nip,
			role: body.role
		});

		// update count
		const currentCount = (await adminFirestore.doc('users/sinopel').get()).data()?.count || 0;
		await adminFirestore.doc('users/sinopel').set({ count: currentCount + 1 });

		return json({ message: 'User added', user }, { status: 200 });
	} catch (error) {

		console.error(error);
		return json({ message: 'Failed to add user', error }, { status: 500 });
	}
}

export const PUT: RequestHandler = async ({ request }): Promise<Response> => {
	// Content-Type: application/json
	console.log('Received PUT at user')

	const body = await request.json();

	if (!body || !body.email || !body.displayName || !body.nip || !body.role || !body.id) {
		return json({ message: 'Invalid input' }, { status: 400 });
	}

	try {
		const user = await adminAuth.updateUser(body.id, {
			email: body.email,
			displayName: body.displayName,
			password: body.password,
		});

		await adminFirestore.collection('users/sinopel/entries').doc(user.uid).set({
			email: body.email,
			displayName: body.displayName,
			nip: body.nip,
			role: body.role
		});

		return json({ message: 'User updated', user }, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ message: 'Failed to update user', error }, { status: 500 });
	}
}

export const DELETE: RequestHandler = async ({ request }): Promise<Response> => {
	// Content-Type: application/json
	console.log('Received DELETE at user')

	const body = await request.json();

	if (!body || !body.id) {
		return json({ message: 'Invalid input' }, { status: 400 });
	}

	try {
		await adminAuth.deleteUser(body.id);

		await adminFirestore.collection('users/sinopel/entries').doc(body.id).delete();

		return json({ message: 'User deleted' }, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ message: 'Failed to delete user', error }, { status: 500 });
	}
}