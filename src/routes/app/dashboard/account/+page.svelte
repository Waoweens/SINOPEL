<script lang="ts">
	import { auth } from '$src/lib/firebase/firebase';
	import { FirebaseError } from 'firebase/app';
	import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
	import IconSave from '~icons/ic/baseline-save';

	let updatePasswordInput = {
		currentPassword: '',
		password: '',
		confirmPassword: '',
		btnDisabled: false,
		error: ''
	};
	async function updatePass() {
		if (
			!updatePasswordInput.currentPassword ||
			!updatePasswordInput.password ||
			!updatePasswordInput.confirmPassword
		) {
			updatePasswordInput.error = 'Semua field harus diisi';
			return;
		}

		if (updatePasswordInput.password !== updatePasswordInput.confirmPassword) {
			updatePasswordInput.error = 'Password tidak sama';
			return;
		}

		updatePasswordInput.btnDisabled = true;
		updatePasswordInput.error = '';

		try {
			const credential = EmailAuthProvider.credential(
				auth.currentUser!.email ?? '',
				updatePasswordInput.currentPassword
			);

			await reauthenticateWithCredential(auth.currentUser!, credential);
		} catch (err) {
			if (err instanceof FirebaseError) {
				console.error(err);
				updatePasswordInput.btnDisabled = false;
				updatePasswordInput.error = err.message;
			}
			return;
		}

		if (auth.currentUser) {
			try {
				await updatePassword(auth.currentUser, updatePasswordInput.password);

				updatePasswordInput = {
					currentPassword: '',
					password: '',
					confirmPassword: '',
					btnDisabled: false,
					error: ''
				};
			} catch (error) {
				if (error instanceof FirebaseError) {
					console.error(error);
					updatePasswordInput.btnDisabled = false;
					updatePasswordInput.error = error.message;
				}
				return;
			}
		}
	}
</script>

<h2 class="h2">Kelola akun</h2>

<section class="card p-4 max-w-xl">
	<h3 class="h3 mb-4">Profile</h3>
	<form on:submit|preventDefault={updatePass}>
		<label class="label mb-2">
			<span>Current password</span>
			<input type="password" class="input" bind:value={updatePasswordInput.currentPassword} />
		</label>
		<label class="label mb-2">
			<span>Password</span>
			<input type="password" class="input" bind:value={updatePasswordInput.password} />
		</label>
		<label class="label mb-2">
			<span>Confirm Password</span>
			<input type="password" class="input" bind:value={updatePasswordInput.confirmPassword} />
		</label>
		<button
			type="submit"
			disabled={updatePasswordInput.btnDisabled}
			class="btn variant-filled-primary"
		>
			<span><IconSave /></span>
			<span>Save</span>
		</button>
		<p class="mt-2 text-error-500">{updatePasswordInput.error}</p>
	</form>
</section>
