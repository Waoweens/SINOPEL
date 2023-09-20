import { initializeApp, cert, getApps, deleteApp, type App } from 'firebase-admin/app';
import { FBA_PROJECT_ID, FBA_CLIENT_EMAIL, FBA_PRIVATE_KEY } from '$env/static/private';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

console.log(FBA_PRIVATE_KEY)

let admin: App;

if (getApps().length === 0) {
	admin = initializeApp({
		credential: cert({
			projectId: FBA_PROJECT_ID,
			clientEmail: FBA_CLIENT_EMAIL,
			privateKey: JSON.parse(FBA_PRIVATE_KEY as string)
		})
	});
} else {
	// deleteApp(getApps()[0]);
	// admin = initializeApp({
	// 	credential: cert({
	// 		projectId: FBA_PROJECT_ID,
	// 		clientEmail: FBA_CLIENT_EMAIL,
	// 		privateKey: JSON.parse(FBA_PRIVATE_KEY as string)
	// 	})
	// });
	admin = getApps()[0];
}

export const adminAuth = getAuth(admin);

export const adminFirestore = getFirestore(admin);
