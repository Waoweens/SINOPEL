import type { AutocompleteOption } from "@skeletonlabs/skeleton";
import type { ComponentType } from "svelte";

interface BaseType {
	name: string;
	type: 'static' | 'text' | 'textarea' | 'select' | 'autocomplete' | 'date' | 'file' | 'custom';
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
	data: (string | { name: string, value: string })[];
	content: string;
}

interface AutocompleteType extends BaseType {
	type: 'autocomplete';
	data: AutocompleteOption[];
	content: unknown;
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
	data?: any;
	content?: any;
}

type AllTypes = StaticType | TextType | TextAreaType | SelectType | DateType | FileType | CustomType;

export type Surat = {
	title: string;
	type: string;
	head: AllTypes[];
	content: AllTypes[];
};

export {}