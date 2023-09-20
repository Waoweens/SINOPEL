import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { adminFirestore } from '$src/lib/firebase/firebase-admin';

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
	// Content-Type: application/json
	console.log('Received POST at employee');

	const body = await request.json();

	if (!body || !body.name || !body.number || !body.position) {
		return json({ message: 'Invalid input' }, { status: 400 });
	}

	try {
		await adminFirestore.collection('employees/dkpb/entries').add({
			name: body.name,
			number: body.number,
			position: body.position
		});

		return json({ message: 'Employee added' }, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ message: 'Failed to add employee', error }, { status: 500 });
	}
};

export const PUT: RequestHandler = async ({ request }): Promise<Response> => {
	// Content-Type: application/json
	console.log('Received PUT at employee');

	const body = await request.json();

	if (!body || !body.name || !body.number || !body.position || !body.id) {
		return json({ message: 'Invalid input' }, { status: 400 });
	}

	try {
		await adminFirestore.collection('employees/dkpb/entries').doc(body.id).set({
			name: body.name,
			number: body.number,
			position: body.position
		});

		return json({ message: 'Employee updated' }, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ message: 'Failed to update employee', error }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request }): Promise<Response> => {
	// Content-Type: application/json
	console.log('Received DELETE at employee');

	const body = await request.json();

	if (!body || !body.id) {
		return json({ message: 'Invalid input' }, { status: 400 });
	}

	try {
		await adminFirestore.collection('employees/dkpb/entries').doc(body.id).delete();

		return json({ message: 'Employee deleted' }, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ message: 'Failed to delete employee', error }, { status: 500 });
	}
}