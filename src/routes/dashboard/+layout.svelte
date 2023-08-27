<script lang="ts">
	import { browser } from '$app/environment';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { auth, firestore } from '$lib/firebase/firebase';
	import { ProgressRadial, getModalStore } from '@skeletonlabs/skeleton';
	import { updateProfile } from 'firebase/auth';
	import { doc, setDoc } from 'firebase/firestore';
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

	auth.onAuthStateChanged((user) => {
		if (!user) signedOut = true;

		if (user !== null) {
			signedIn = true;

			if (!$user?.displayName) {
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
								modalStore.trigger({
									type: 'alert',
									buttonTextCancel: 'Ok',
									title: 'Berhasil',
									body: `Nama anda berhasil diupdate menjadi: ${res}<br>Jika anda ingin mengubahnya, silahkan ke menu settings.`,
									response: () => {if (browser) location.reload()}
								});
								
							})
							.catch((error) => {
								console.error(error);
								modalStore.trigger({
									type: 'alert',
									buttonTextCancel: 'Ok',
									title: 'Gagal',
									body: 'Terjadi kesalahan saat mengupdate nama anda, silahkan refr esh dan coba lagi.',
									response: () => {if (browser) location.reload()}
								});
							});
					}
				});
			}
		}
	});

	let collStore;
	let userDoc;
	function initFirestore(): void {
		console.log('called', $user?.uid);
		collStore = collectionStore<UserDoc[]>(firestore, '/users');
		userDoc = docStore<UserDoc>(firestore, `/users/${$user?.uid}`);
	}

	$: if (signedIn) initFirestore();
	$: if ($collStore && $userDoc !== undefined) {
		const val: UserDoc[] = $collStore;
		if (val.length > 0) {
			console.log('coll', val, 'doc', $userDoc);

			if ($userDoc == null) {
				console.log('doc not found');
				setDoc(doc(firestore, 'users', $user?.uid ?? 'invalid-user'), {
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
</script>

<SignedIn let:user>
	<Doc ref={`users/${user.uid}`} let:data>
		<h1>Welcome {user.displayName}, you are {data.role}</h1>
	</Doc>
	<slot />
</SignedIn>

{#if signedOut}
	<SignedOut>
		{goto('/')}
	</SignedOut>
{/if}
