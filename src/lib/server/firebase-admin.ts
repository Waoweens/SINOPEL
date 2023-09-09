import { credential } from 'firebase-admin';
import { initializeApp, getApps, type ServiceAccount, type App } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { type Firestore, getFirestore } from 'firebase-admin/firestore';

export let admin: App;
export let adminAuth: Auth;
export let adminFirestore: Firestore;
if (!getApps().length) {
	admin = initializeApp({
		credential: credential.cert({
			type: import.meta.env.VITE_FBA_TYPE,
			project_id: import.meta.env.VITE_FBA_PROJECT_ID,
			private_key_id: import.meta.env.VITE_FBA_PRIVATE_KEY_ID,
			private_key: import.meta.env.VITE_FBA_PRIVATE_KEY,
			client_email: import.meta.env.VITE_FBA_CLIENT_EMAIL,
			client_id: import.meta.env.VITE_FBA_CLIENT_ID,
			auth_uri: import.meta.env.VITE_FBA_AUTH_URI,
			token_uri: import.meta.env.VITE_FBA_TOKEN_URI,
			auth_provider_x509_cert_url: import.meta.env.VITE_FBA_AUTH_PROVIDER_X509_CERT_URL,
			client_x509_cert_url: import.meta.env.VITE_FBA_CLIENT_X509_CERT_URL,
			universe_domain: import.meta.env.VITE_FBA_UNIVERSE_DOMAIN
		} as ServiceAccount)
	});
	adminAuth = getAuth(admin);
	adminFirestore = getFirestore(admin);
}
