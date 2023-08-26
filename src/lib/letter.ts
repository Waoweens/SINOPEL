import type { AutocompleteOption } from '@skeletonlabs/skeleton';
import type { ComponentType } from 'svelte';

interface BaseType {
	name: string;
	type:
		| 'static'
		| 'text'
		| 'textarea'
		| 'select'
		| 'autocomplete-popup'
		| 'date'
		| 'file'
		| 'custom';
	data?: unknown;
	content?: unknown;
	placeholder?: unknown;
	disabled?: boolean;
	spanFull?: boolean;
}

interface StaticType extends BaseType {
	type: 'static';
	content: unknown;
}

interface TextType extends BaseType {
	type: 'text';
	data?: string;
	content: string;
}

interface TextAreaType extends BaseType {
	type: 'textarea';
	data?: string;
	content: string;
}

interface SelectType extends BaseType {
	type: 'select';
	data: (string | { name: string; value: string })[];
	content: string;
}

export interface AutocompletePopupType extends BaseType {
	type: 'autocomplete-popup';
	data: AutocompleteOption[];
	content: {
		search: string;
		value: string;
	};
}

interface DateType extends BaseType {
	type: 'date';
	data?: string;
	content: string;
}

interface FileType extends BaseType {
	type: 'file';
	data?: File;
	content: File | undefined;
}

interface CustomType extends BaseType {
	type: 'custom';
	componentIn: ComponentType;
	componentOut: ComponentType;
	data?: unknown;
	content?: unknown;
}

export type LetterTypes =
	| StaticType
	| TextType
	| TextAreaType
	| SelectType
	| AutocompletePopupType
	| DateType
	| FileType
	| CustomType;

export type Letter = {
	title: string;
	type: string;
	head: LetterTypes[];
	content: LetterTypes[];
};

export {};
