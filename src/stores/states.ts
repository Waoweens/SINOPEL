import { writable } from 'svelte/store';

export const navrailState = writable<{
	small: boolean;
	toggle: boolean;
}>({
	small: false,
	toggle: false,
});