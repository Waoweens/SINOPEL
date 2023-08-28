<script lang="ts">
	import { browser } from '$app/environment';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { auth, firestore } from '$lib/firebase/firebase';
	import { ProgressRadial, getModalStore } from '@skeletonlabs/skeleton';
	import { updateProfile } from 'firebase/auth';
	import { doc, setDoc, updateDoc } from 'firebase/firestore';
	import {
		Collection,
		Doc,
		SignedIn,
		SignedOut,
		User,
		collectionStore,
		docStore,
		userStore
	} from 'sveltefire';

	const modalStore = getModalStore();
	interface UserDoc {
		role: string;
	}

	const user = userStore(auth);

	let signedOut: boolean = false;
	let signedIn: boolean = false;
	let loading = true;

	auth.onAuthStateChanged((user) => {
		if (user) {
			loading = false;
			signedIn = true;
		} else {
			signedOut = true;
		}
	});

	let collStore;
	let userDoc;
	function initFirestore(): void {
		collStore = collectionStore<UserDoc[]>(firestore, '/users');
		userDoc = docStore<UserDoc>(firestore, `/users/${$user?.uid}`);
	}

	function checkDisplayName(): void {
		if (!$user?.displayName) {
			console.log('no display name', $user?.displayName);
			modalStore.trigger({
				type: 'prompt',
				title: 'Input nama anda',
				body: 'Nama anda tidak ditemukan, silahkan registrasi nama anda.',
				valueAttr: {
					type: 'text',
					placeholder: 'Display name',
					required: true
				},
				response: (res: string) => {
					updateProfile($user!, {
						displayName: res
					})
						.then(() => {
							updateDoc(doc(firestore, 'users', $user?.uid ?? 'invalid-user'), {
								displayName: res
							})
								.then(() => {
									modalStore.trigger({
										type: 'alert',
										buttonTextCancel: 'Ok',
										title: 'Berhasil',
										body: `Nama anda berhasil diupdate menjadi: ${res}<br>Jika anda ingin mengubahnya, silahkan ke menu settings.`,
										response: () => {
											if (browser) location.reload();
										}
									});
								})
								.catch((err) => {
									throw err;
								});
						})
						.catch((error) => {
							console.error(error);
							modalStore.trigger({
								type: 'alert',
								buttonTextCancel: 'Ok',
								title: 'Gagal',
								body: 'Terjadi kesalahan saat mengupdate nama anda, silahkan refresh dan coba lagi.',
								response: () => {
									if (browser) location.reload();
								}
							});
						});
				}
			});
		}
	}

	$: if (signedIn) initFirestore();
	$: if ($collStore && $userDoc !== undefined) {
		const val: UserDoc[] = $collStore;
		if (val.length > 0) {

			if ($userDoc == null) {
				console.log('doc not found');
				setDoc(doc(firestore, 'users', $user?.uid ?? 'invalid-user'), {
					email: $user?.email ?? 'invalid-user',
					displayName: $user?.displayName ?? 'invalid-user',
					role: 'user'
				})
					.then(() => {
						console.log('success');
					})
					.catch((error) => {
						console.error(error);
					});
			}
		}
	}
	$: if (!loading) checkDisplayName();
</script>

<SignedIn>
	<slot />
</SignedIn>

{#if signedOut}
	<SignedOut>
		{goto('/')}
	</SignedOut>
{/if}
