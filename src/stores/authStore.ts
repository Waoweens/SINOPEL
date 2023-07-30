import { writable } from 'svelte/store';
import { auth } from '$lib/firebase/firebase.client';
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	type User
} from 'firebase/auth';

interface AuthState {
    isLoading: boolean;
    currentUser: Partial<User> | null;
}

export const authStore = writable<AuthState>({
    isLoading: true,
    currentUser: null
});

export const authHandlers = {
	login: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	register: async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
	resetPassword: async (email: string) => {
		await sendPasswordResetEmail(auth, email);
	},
	updateEmail: async (email: string) => {
		authStore.update((curr) => {
			return {
				...curr,
				currentUser: {
					...curr.currentUser, email: email
				}
			}
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await updateEmail(auth as any, email);
	},
	updatePassword: async (password: string) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await updatePassword(auth as any, password);
	}
};
