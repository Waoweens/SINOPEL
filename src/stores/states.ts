import { writable } from 'svelte/store';

export const navrailState = writable<{
	small: boolean;
	toggle: boolean;
}>({
	small: false,
	toggle: false
});

export const menuNavLinks = {
	'/dashboard/admin': {
		title: 'Admin',
		list: [
			{ name: 'Akun', href: '/dashboard/admin/users' },
			{ name: 'Pejabat', href: '/dashboard/admin/employees' },
		]
	}
};
