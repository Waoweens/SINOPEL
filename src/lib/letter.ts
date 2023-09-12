/* eslint-disable @typescript-eslint/no-explicit-any */
// // new branch

// import type { AutocompleteOption } from '@skeletonlabs/skeleton';
import type { Timestamp } from 'firebase/firestore';
// import type { ComponentType } from 'svelte';
// import { auth } from './firebase/firebase';
// import { writable } from 'svelte/store';
// import LetterNumber from '$components/elements/letterbuilder/LetterNumber.svelte';
// import LetterNumberDisplay from '$components/elements/letterbuilder/LetterNumberDisplay.svelte';
// import ParticipantCount from '$components/elements/letterbuilder/ParticipantCount.svelte';
// import ParticipantCountDisplay from '$components/elements/letterbuilder/ParticipantCountDisplay.svelte';
// import SignatureIn from '$components/elements/letterbuilder/SignatureIn.svelte';
// import SignatureDisplay from '$components/elements/letterbuilder/SignatureDisplay.svelte';

// interface BaseType {
// 	name: string;
// 	type:
// 		| 'static'
// 		| 'text'
// 		| 'textarea'
// 		| 'select'
// 		| 'autocomplete-popup'
// 		| 'date'
// 		| 'file'
// 		| 'custom';
// 	data?: unknown;
// 	content?: unknown;
// 	metadata?: unknown;
// 	placeholder?: unknown;
// 	disabled?: boolean;
// 	spanFull?: boolean;
// }

// interface StaticType extends BaseType {
// 	type: 'static';
// 	content: unknown;
// }

// interface TextType extends BaseType {
// 	type: 'text';
// 	data?: string;
// 	content: string;
// }

// interface TextAreaType extends BaseType {
// 	type: 'textarea';
// 	data?: string;
// 	content: string;
// }

// interface SelectType extends BaseType {
// 	type: 'select';
// 	data: (string | { name: string; value: string })[];
// 	content: string;
// }

// export interface AutocompletePopupType extends BaseType {
// 	type: 'autocomplete-popup';
// 	data: AutocompleteOption[];
// 	content: {
// 		search: string;
// 		value: string;
// 	};
// }

// interface DateType extends BaseType {
// 	type: 'date';
// 	data?: string;
// 	content: string;
// }

// interface FileType extends BaseType {
// 	type: 'file';
// 	data?: File;
// 	content: File | undefined | object;
// }

// interface CustomType extends BaseType {
// 	type: 'custom';
// 	componentIn: ComponentType;
// 	componentOut: ComponentType;
// 	data?: any;
// 	content?: any;
// }

// export type LetterTypes =
// 	| StaticType
// 	| TextType
// 	| TextAreaType
// 	| SelectType
// 	| AutocompletePopupType
// 	| DateType
// 	| FileType
// 	| CustomType;

// export type LetterTypesMin = {
// 	name: string;
// 	content: any;
// };

// export type Letter = {
// 	title: string;
// 	type: string;
// 	head: LetterTypes[];
// 	content: LetterTypes[];
// 	foot: any;
// };

// // export interface Employee {
// // 	name: string;
// // 	number: number;
// // 	position: string;
// // 	id?: string; // generated by database, do not use
// // }

// // Using class
// export class Employee {
// 	constructor(
// 		public name: string,
// 		public number: number,
// 		public position: string,
// 		public id?: string
// 	) {}
// }

// // Using interface
// export interface IEmployee {
// 	name: string;
// 	number: number;
// 	position: string;
// 	id?: string;
// }

// export {};

// // export const userDisplayName = writable<string>('');

// export let notulenRapat: Letter;
// export let laporanKegiatan: Letter;

// // auth.onAuthStateChanged((user) => {
// // 	if (user) {
// // eslint-disable-next-line prefer-const
// notulenRapat = {
// 	title: 'Notulen Rapat',
// 	type: 'NOTA DINAS',
// 	head: [
// 		{
// 			name: 'Kepada',
// 			type: 'static',
// 			content: 'Kepala Dinas Kebakaran dan Penanggulangan Bencana'
// 		},
// 		{
// 			name: 'Dari',
// 			type: 'autocomplete-popup',
// 			metadata: 'pejabat',
// 			data: [{ label: 'pending', value: '1234' }],
// 			content: {
// 				search: '',
// 				value: ''
// 			}
// 		},
// 		{
// 			name: 'Tanggal',
// 			type: 'date',
// 			content: ''
// 		},
// 		{
// 			name: 'Nomor',
// 			type: 'custom',
// 			componentIn: LetterNumber,
// 			componentOut: LetterNumberDisplay,
// 			data: {
// 				format: ['Sifat', 'Klasifikasi', 'Nomor Naskah', 'Dinas', 'Bulan', 'Tahun'],
// 				seperator: '/'
// 			},
// 			content: [],
// 			spanFull: true
// 		},
// 		{
// 			name: 'Sifat',
// 			type: 'select',
// 			data: ['Biasa', 'Segera', 'Rahasia', 'Sangat Rahasia', 'Penting', 'Konfidensial'],
// 			content: ''
// 		},
// 		{
// 			name: 'Lampiran',
// 			type: 'select',
// 			data: [
// 				{
// 					name: 'Tidak ada (-)',
// 					value: '-'
// 				},
// 				'1 (satu) berkas'
// 			],
// 			content: ''
// 		},
// 		{
// 			name: 'Perihal',
// 			type: 'text',
// 			content: '',
// 			spanFull: true
// 		}
// 	],
// 	content: [
// 		{
// 			name: 'Dasar Hukum',
// 			type: 'textarea',
// 			content: ''
// 		},
// 		{
// 			name: 'Hari / Tanggal',
// 			type: 'date',
// 			content: ''
// 		},
// 		{
// 			name: 'Tempat',
// 			type: 'textarea',
// 			content: ''
// 		},
// 		{
// 			name: 'Pemimpin Rapat',
// 			type: 'textarea',
// 			content: ''
// 		},
// 		{
// 			name: 'Peserta Rapat',
// 			type: 'textarea',
// 			content: ''
// 		},
// 		{
// 			name: 'Hasil Rapat',
// 			type: 'textarea',
// 			content: ''
// 		},
// 		{
// 			name: 'Dokumentasi',
// 			type: 'file',
// 			content: {}
// 		}
// 	],
// 	foot: {
// 		signature: {
// 			svg: '',
// 			employee: {}
// 		}
// 	}
// };

// // eslint-disable-next-line prefer-const
// laporanKegiatan = {
// 	title: 'Laporan Pelaksanaan Kegiatan',
// 	type: 'NOTA DINAS',
// 	head: [
// 		{
// 			name: 'Kepada',
// 			type: 'autocomplete-popup',
// 			data: [{ label: 'pending', value: '1234' }],
// 			content: {
// 				search: '',
// 				value: ''
// 			}
// 		},
// 		{
// 			name: 'Dari',
// 			type: 'static',
// 			data: 'userDisplayName',
// 			content: 'pending'
// 		},
// 		{
// 			name: 'Tanggal',
// 			type: 'date',
// 			content: ''
// 		},
// 		{
// 			name: 'Nomor',
// 			type: 'custom',
// 			componentIn: LetterNumber,
// 			componentOut: LetterNumberDisplay,
// 			data: {
// 				format: ['Sifat', 'Klasifikasi', 'Nomor Naskah', 'Dinas', 'Bulan', 'Tahun'],
// 				seperator: '/'
// 			},
// 			content: [],
// 			spanFull: true
// 		},
// 		{
// 			name: 'Sifat',
// 			type: 'select',
// 			data: ['Biasa', 'Segera', 'Rahasia', 'Sangat Rahasia', 'Penting', 'Konfidensial'],
// 			content: ''
// 		},
// 		{
// 			name: 'Lampiran',
// 			type: 'select',
// 			data: [
// 				{
// 					name: 'Tidak ada (-)',
// 					value: '-'
// 				},
// 				'1 (satu) berkas'
// 			],
// 			content: ''
// 		},
// 		{
// 			name: 'Perihal',
// 			type: 'text',
// 			content: '',
// 			spanFull: true
// 		}
// 	],
// 	content: [
// 		{
// 			name: 'Dasar Hukum',
// 			type: 'textarea',
// 			content: ''
// 		},
// 		{
// 			name: 'Peserta Kegiatan',
// 			type: 'textarea',
// 			content: ''
// 		},
// 		{
// 			name: 'Jumlah Peserta',
// 			type: 'custom',
// 			componentIn: ParticipantCount,
// 			componentOut: ParticipantCountDisplay,
// 			content: {}
// 		},
// 		{
// 			name: 'Narasumber',
// 			type: 'textarea',
// 			content: ''
// 		},
// 		{
// 			name: 'Materi',
// 			type: 'textarea',
// 			content: ''
// 		},
// 		{
// 			name: 'Hasil Kegiatan',
// 			type: 'textarea',
// 			content: ''
// 		},
// 		{
// 			name: 'Dokumentasi Kegiatan',
// 			type: 'file',
// 			content: {}
// 		}
// 	],
// 	foot: {
// 		signature: {
// 			svg: '',
// 			employee: {}
// 		}
// 	}
// };
// // });

const letterTypes = ['NotulenRapat', 'LaporanKegiatan'] as const;

/**
 * Letter type
 */
export type LetterType = (typeof letterTypes)[number];

/**
 * Check if value is a letter type
 * @param {any} x
 */
export const isLetterType = (x: any): x is LetterType => letterTypes.includes(x);

export type Employee = {
	name: string;
	number: number;
	position: string;
	id?: string; // generated by database, do not use
};

export const splitArray = (arr: any) => {
	return arr.map((item: any) => {
		return {
			name: item.name,
			content: item.content
		};
	});
};

export const mergeArrays = (originalArray: any, newArray: any) => {
	return originalArray.map((originalItem: any, index: any) => {
		return {
			...originalItem,
			...newArray[index]
		};
	});
};

export type FormInput = { name: string; value: string };

export type Packet = {
	created: {
		user: string | undefined;
		date: Timestamp;
	};
	modified: {
		user: string | undefined;
		date: Timestamp;
	};
	letter: FormInput[];
	metadata?: object;
	id?: string; // generated by database, do not use
};

export const isJson = (item: string) => {
	let value = typeof item !== 'string' ? JSON.stringify(item) : item;
	try {
		value = JSON.parse(value);
	} catch (e) {
		return false;
	}

	return typeof value === 'object' && value !== null;
};

// takes a json string and returns an object
export const fromJson = (input: string): any => {
	if (!isJson(input)) return {};
	try {
		const result = JSON.parse(input);
		return result;
	} catch (error) {
		console.error('Invalid JSON:', error);
		return {};
	}
};
