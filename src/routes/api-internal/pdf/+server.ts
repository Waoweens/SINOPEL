import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import pako from 'pako';

export const POST: RequestHandler = async ({ request, fetch }): Promise<Response> => {
	// compress request body to gzip, send to pdf server at /api/pdf
	try {
		const body = await request.text();
		const origin = request.headers.get('x-origin-baseurl');

		console.log(origin)

		console.log(`${origin}`, typeof origin); // http://localhost:3000 string

		const gzipBody = pako.gzip(body);

		const response = await fetch(`${origin}/api/pdf`, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/html',
				'Content-Encoding': 'gzip',
			},
			body: gzipBody,
		});

		if (!response.ok) {
			return json({ message: 'Failed to send compressed data', error: response.statusText }, { status: 500 });
		}

		return new Response(response.body, {
			status: 200,
			headers: {
				...response.headers,
				// 'Content-Disposition': 'attachment; filename="download.pdf"',
			}
		})
	} catch (error) {
		console.error(error)
		return json({ message: 'Failed to compress data', error }, { status: 500 });
	}
};
