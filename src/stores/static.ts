// import { writable } from "svelte/store";

import { writable } from "svelte/store";

// import type { DrawerSettings } from "@skeletonlabs/skeleton";

export const appname = writable<string>('SINOPEL');
export const appnameLong = writable<string>('Sistem Notulensi dan Pelaporan Digital');

export const gsRoot = 'gs://notulensi-digital.appspot.com'

// export const DrawerEntries: {[key: string]: DrawerSettings} = {
// 	navrail: {

// 	}
// }