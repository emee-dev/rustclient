import { create } from "zustand";

type Object = { [x: string]: string };

interface Ctx {
	req: {
		url: string;
		method: string;
		headers?: Object | null;
		body?: Object | null;
	};

	// Setter Methods
	setUrl: (url: string) => void;
	setMethod: (str: string) => void;
	setHeader?: (str: Object) => void;
	setRequestBody?: (str: Object) => void;
}

const useRequestCtx = create<Ctx>((set) => ({
	req: {
		url: "",
		method: "GET",
		body: null,
		headers: null,
	},
	setUrl: (url: string) => set((state) => ({ req: { ...state.req, url } })),
	setMethod: (method: string) =>
		set((state) => ({ req: { ...state.req, method } })),
	setHeader: (headers: Object) =>
		set((state) => ({ req: { ...state.req, headers } })),
}));

export default useRequestCtx;
