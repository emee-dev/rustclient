import {
	Completion,
	autocompletion,
	completionKeymap,
} from "@codemirror/autocomplete";
import MonacoEditor, { useMonaco, Editor, Monaco } from "@monaco-editor/react";
// import { EditorView, basicSetup } from "codemirror";
import { syntaxTree } from "@codemirror/language";
import { ViewUpdate, ViewPlugin, DecorationSet } from "@codemirror/view";

import { EditorState } from "@codemirror/state";
import { Decoration, WidgetType, keymap } from "@codemirror/view";

import ReactCodeMirror, {
	EditorView,
	basicSetup,
	ReactCodeMirrorRef,
	useCodeMirror,
} from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { ChevronsUpDown, Minimize, Trash, Delete } from "lucide-react";
import {
	RefObject,
	Suspense,
	createRef,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button } from "../ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectTriggerIcon,
	SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import useRequestCtx from "@/context/requestCtx";
import { ReactJsonViewProps } from "react-json-view";
import JsonViewer from "../json-viewer";

let arr = [
	{
		_id: 8,
		isbn: "9781484242216",
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		published: "2019-05-11T00:00:00.000Z",
		publisher: "Apress",
		pages: 310,
		description:
			"Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 'Dagstuhl' seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.",
		website: "https://doi.org/10.1007/978-1-4842-4221-6",
	},
	{
		_id: 8,
		isbn: "9781484242216",
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		published: "2019-05-11T00:00:00.000Z",
		publisher: "Apress",
		pages: 310,
		description:
			"Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 'Dagstuhl' seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.",
		website: "https://doi.org/10.1007/978-1-4842-4221-6",
	},
	{
		_id: 8,
		isbn: "9781484242216",
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		published: "2019-05-11T00:00:00.000Z",
		publisher: "Apress",
		pages: 310,
		description:
			"Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 'Dagstuhl' seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.",
		website: "https://doi.org/10.1007/978-1-4842-4221-6",
	},
	{
		_id: 8,
		isbn: "9781484242216",
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		published: "2019-05-11T00:00:00.000Z",
		publisher: "Apress",
		pages: 310,
		description:
			"Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 'Dagstuhl' seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.",
		website: "https://doi.org/10.1007/978-1-4842-4221-6",
	},
	{
		_id: 8,
		isbn: "9781484242216",
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		published: "2019-05-11T00:00:00.000Z",
		publisher: "Apress",
		pages: 310,
		description:
			"Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 'Dagstuhl' seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.",
		website: "https://doi.org/10.1007/978-1-4842-4221-6",
	},
];

let requestMethods = [
	{
		label: "GET",
		icon: <Minimize />,
	},
	{
		label: "HEAD",
		icon: <Minimize />,
	},
	{
		label: "POST",
		icon: <Minimize />,
	},
	{
		label: "PUT",
		icon: <Minimize />,
	},
	{
		label: "PATCH",
		icon: <Minimize />,
	},
	{
		label: "DELETE",
		icon: <Minimize />,
	},
	{
		label: "OPTIONS",
		icon: <Minimize />,
	},
];

const JsonViewerProps: ReactJsonViewProps = {
	src: arr,
	name: false,
	enableClipboard: false,
	displayDataTypes: false,
	iconStyle: "triangle",
	collapsed: true,
	sortKeys: true,
	quotesOnKeys: true,
	theme: "twilight",
	style: {
		alignItems: "center",
		zIndex: 0,
	},
};

const HttpView = () => {
	return (
		<>
			<HttpRequestHandler />
			<section className="grid h-full grid-cols-1 grid-rows-2 gap-y-3 sm:grid-rows-1 [variable-row] md:grid-cols-[1fr_4px_1fr] text-white rounded-lg font-Roboto_Flex ">
				<div className="relative h-full rounded-lg w-full px-[0.5rem] pt-2 border-y-0 bg-victoria-700">
					<HttpRequest />
					<div className="absolute bottom-0 left-0 flex items-center w-full px-2 h-9 ">
						Absolute
					</div>
				</div>
				<Separator orientation="vertical" />
				<div className="relative h-full rounded-lg w-full px-[0.5rem] pt-2 border-y-0 bg-victoria-700">
					<HttpResponse />
					<div className="absolute bottom-0 left-0 flex items-center w-full px-2 h-9 ">
						Absolute
					</div>
				</div>
			</section>
		</>
	);
};

const HttpRequestHandler = () => {
	const divRef = useRef<HTMLParagraphElement>(null);
	const ctx = useRequestCtx();

	return (
		<section className=" grid place-content-center grid-cols-[auto_1fr_auto] gap-2 py-1 items-center w-full border bg-victoria-700 border-victoria-700  rounded-[16px] min-h-[48px]">
			<div className="p-[0.5rem]">
				<HttpMethod />
			</div>

			<div className="rounded-sm text-[#FFA24E] text-lg overflow-hidden whitespace-nowrap sm:overflow-auto sm:whitespace-normal">
				<p
					// Get cursor position
					// https://dev.to/phuocng/calculate-the-coordinates-of-the-current-cursor-in-a-text-area-cle#:~:text=It's%20a%20simple%20process.,%22)%3B%20const%20cursorPos%20%3D%20textarea.
					onInput={(e) => ctx.setUrl(e.currentTarget.innerText)}
					ref={divRef}
					contentEditable
					spellCheck={false}
					data-placeholder="https://aspen.io/hello"
					className="w-full min-h-full py-3 overflow-auto before:empty:content-[attr(data-placeholder)] before:text-orange-400/55 focus-within:outline-none"
				></p>
			</div>

			<div className="p-[0.5rem] ">
				<Button
					variant="default"
					size="sm"
					className="px-6 bg-green-400 hover:bg-green-300"
					onClick={() => console.log("Url", ctx.req)}
				>
					Send
				</Button>
			</div>
		</section>
	);
};

const HttpMethod = () => {
	const ctx = useRequestCtx();

	return (
		<Select defaultValue="GET" onValueChange={(val) => ctx.setMethod(val)}>
			<SelectTrigger className="h-8 px-3 gap-3 font-bold text-[#73DCAC] bg-transparent hover:bg-victoria-400 focus:outline-none focus-within:ring-0 focus-within:outline-none">
				<SelectValue
					placeholder="GET"
					className="flex items-center justify-between h-10 font-semibold text-white bg-transparent border-none rounded-md outline-none w-fit ring-0 focus:outline-none focus-within:ring-0 focus-within:outline-none"
				/>
				<SelectTriggerIcon>
					<ChevronsUpDown className="w-4 h-4 font-bold text-green-400 " />
				</SelectTriggerIcon>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup className="border-0 border-none outline-none ring-0 focus-within:ring-0 focus-within:outline-none">
					{requestMethods.map(({ icon, label }, index) => {
						return (
							<SelectItem
								key={index}
								value={label}
								lefticon={icon}
								className="flex items-center gap-3 px-4"
							>
								{label}
							</SelectItem>
						);
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

const HttpRequest = () => {
	const [headers, setHeaders] = useState([
		"Params",
		"Headers",
		"Auth",
		"Body",
	] as const);

	return (
		<Tabs
			defaultValue={headers[0]}
			className={"w-full grid gap-y-2 grid-rows-[45px,1fr]"}
		>
			<TabsList className="flex items-center justify-start gap-1 font-semibold bg-transparent focus-within:outline-none focus:ring-0">
				{headers.map((header) => {
					return (
						<TabsTrigger
							value={header}
							key={crypto.randomUUID()}
							className="px-[0.8rem] group flex font-semibold items-center gap-3 outline-none text-neutral-200 text-sm rounded-[0.5rem] hover:bg-victoria-400 aria-selected:bg-green-100/30 aria-selected:text-neutral-800"
						>
							{header}
							<div className="hidden rounded-full group-aria-selected:block group-aria-selected:bg-green-300 group-aria-selected:size-2"></div>
						</TabsTrigger>
					);
				})}
			</TabsList>

			{headers.map((header) => {
				return (
					<TabsContent
						value={header}
						key={crypto.randomUUID()}
						className="flex-1 overflow-x-scroll rounded-[0.5rem] h-[550px] max-h-[551px]"
					>
						<InputParams />
					</TabsContent>
				);
			})}
		</Tabs>
	);
};

class CheckboxWidget extends WidgetType {
	constructor(readonly checked: boolean) {
		super();
	}

	eq(other: CheckboxWidget) {
		return other.checked == this.checked;
	}

	toDOM() {
		let wrap = document.createElement("span");
		wrap.setAttribute("aria-hidden", "true");
		wrap.className = "cm-boolean-toggle";
		let box = wrap.appendChild(document.createElement("input"));
		box.type = "checkbox";
		box.checked = this.checked;
		return wrap;
	}

	ignoreEvent() {
		return false;
	}
}

function checkboxes(view: EditorView) {
	let widgets = [] as any[];
	for (let { from, to } of view.visibleRanges) {
		syntaxTree(view.state).iterate({
			from,
			to,
			enter: (node) => {
				if (node.name == "BooleanLiteral") {
					let isTrue = view.state.doc.sliceString(node.from, node.to) == "true";
					let deco = Decoration.widget({
						widget: new CheckboxWidget(isTrue),
						side: 1,
					});
					widgets.push(deco.range(node.to));
				}

				if (node.type.name == "Property") {
					console.log("True", node);
				}
			},
		});
	}
	return Decoration.set(widgets);
}

function toggleBoolean(view: EditorView, pos: number) {
	let before = view.state.doc.sliceString(Math.max(0, pos - 5), pos);
	let change;
	if (before == "false") change = { from: pos - 5, to: pos, insert: "true" };
	else if (before.endsWith("true"))
		change = { from: pos - 4, to: pos, insert: "false" };
	else return false;
	view.dispatch({ changes: change });
	return true;
}

const checkboxPlugin = ViewPlugin.fromClass(
	class {
		decorations: DecorationSet;

		constructor(view: EditorView) {
			this.decorations = checkboxes(view);
		}

		update(update: ViewUpdate) {
			if (
				update.docChanged ||
				update.viewportChanged ||
				syntaxTree(update.startState) != syntaxTree(update.state)
			)
				this.decorations = checkboxes(update.view);
		}
	},
	{
		decorations: (v) => v.decorations,

		eventHandlers: {
			mousedown: (e, view) => {
				let target = e.target as HTMLElement;
				if (
					target.nodeName == "INPUT" &&
					target.parentElement!.classList.contains("cm-boolean-toggle")
				)
					return toggleBoolean(view, view.posAtDOM(target));
			},
		},
	}
);

const HttpResponse = () => {
	const [headers, setHeaders] = useState(["Request", "Response"] as const);
	const codeRef = useRef<ReactCodeMirrorRef>(null);

	const myTheme = EditorView.theme(
		{
			"&": {
				color: "#d4d4d4", // Text color
				// backgroundColor: "#1e1e1e", // Editor background color
			},
			// ".cm-content": {
			// 	caretColor: "#d4d4d4", // Caret color
			// },
			// ".cm-gutters": {
			// 	backgroundColor: "#1e1e1e", // Gutter background color
			// 	color: "#858585", // Gutter text color
			// },
			// ".cm-lineNumbers .cm-gutterElement": {
			// 	color: "#858585", // Line number color
			// },
			// ".cm-activeLine": {
			// 	background: "rgb(220 252 231 / 0.3)",
			// 	borderRadius: "0.3rem",
			// },
			// ".cm-line:hover": {
			// 	background: "rgb(220 252 231 / 0.3)",
			// 	borderRadius: "0.3rem",
			// },
			// ".cm-activeLineGutter": {
			// 	backgroundColor: "#2c2c2c", // Active line gutter background color
			// },
		},
		{ dark: false }
	);

	function myCompletions(context: any) {
		let word = context.matchBefore(/[_\w]+/);
		if (!word || (word.from === word.to && !context.explicit)) return null;

		return {
			from: word.from, // Start of the matched text
			to: word.to, // End of the matched text
			options: [
				{ label: "match", type: "keyword" },
				{
					label: "_.API_KEY",
					type: "variable",
					// detail: "UIIS189202",
				},
				{
					label: "_.API_SECRET",
					type: "variable",
					// info: "secret",
					detail: "secret",
				},
				{ label: "hello", type: "variable", info: "special" },
				{ label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro" },
			] as Completion[],
		};
	}

	return (
		<Tabs
			defaultValue={headers[0]}
			className={"w-full h-full grid gap-y-2 grid-rows-[45px,1fr]"}
		>
			<TabsList className="flex items-center justify-start gap-1 font-semibold bg-transparent focus-within:outline-none focus:ring-0">
				{headers.map((header) => {
					return (
						<TabsTrigger
							value={header}
							key={crypto.randomUUID()}
							className="px-[0.8rem] group flex font-semibold items-center gap-3 outline-none text-neutral-200 text-sm rounded-[0.5rem] hover:bg-victoria-400 aria-selected:bg-green-100/30 aria-selected:text-neutral-800"
						>
							{header}
							<div className="hidden rounded-full group-aria-selected:block group-aria-selected:bg-green-300 group-aria-selected:size-2"></div>
						</TabsTrigger>
					);
				})}
			</TabsList>

			{headers.map((header) => {
				return (
					<TabsContent
						value={header}
						key={crypto.randomUUID()}
						className="flex-1 overflow-scroll rounded-[0.5rem] h-[550px] max-h-[551px]"
					>
						<div className="bg-[rgb(30,_30,_30)] min-h-full p-2 overflow-y-scroll">
							{/* <div className="h-[150px] bg-orange-400">Hello</div> */}
							{/* <JsonViewer {...JsonViewerProps} /> */}

							{/*  */}
							<div className="[&>*]:h-full">
								{/* <Suspense fallback={<div>Loading Check</div>}>
									<MonacoEditor
										// height="200px"
										height="500px"
										className="bg-red-500"
										theme="vs-dark"
										defaultLanguage="javascript"
										defaultValue="let name = 'emee';"
										options={{
											readOnly: true,
											contextmenu: false,
											minimap: { enabled: false },
											automaticLayout: true,
											scrollBeyondLastLine: false,
											wordWrap: "on",
										}}

										// onMount={handleEditorDidMount}
									/>
								</Suspense> */}

								<ReactCodeMirror
									value={JSON.stringify({ name: "jsjs" }, null, 2)}
									height="500px"
									theme={"dark"}
									lang="javascript"
									// lang="json"
									// theme={myTheme}
									ref={codeRef}
									style={{
										background: "transparent",
									}}
									extensions={[
										javascript({ jsx: true }),
										// checkboxPlugin,
										autocompletion({
											override: [myCompletions],
											icons: true,
										}),
									]}
									onChange={(val) => console.log(val)}
								/>
							</div>
						</div>
					</TabsContent>
				);
			})}
		</Tabs>
	);
};

interface Initialized {
	id: string;
	defaultKey: string;
	defaultValue: string;
	checkBoxRef: RefObject<HTMLInputElement>;
	nameInputRef: RefObject<HTMLInputElement>;
	valueInputRef: RefObject<HTMLInputElement>;
}

type ListValues = {
	defaultKey: string | undefined;
	defaultValue: string | undefined;
};

const InputParams = () => {
	const [activeRow, setActiveRow] = useState({
		id: "",
		active: true,
	});

	const {
		inputList,
		listValues,
		firstRow,
		removeRow,
		insertEmptyRow,
		serializeParams,
		initializeParams,
	} = useInputParamsHandler();

	useEffect(() => {
		// const headers = [
		// 	{
		// 		defaultKey: "Accept",
		// 		defaultValue: "application/jsoon",
		// 	},
		// 	{
		// 		defaultKey: "x-rate-limit",
		// 		defaultValue: "200",
		// 	},
		// 	{
		// 		defaultKey: "Content-Type",
		// 		defaultValue: "application/json",
		// 	},
		// 	{
		// 		defaultKey: "Powered By",
		// 		defaultValue: "Express",
		// 	},
		// ];

		// initializeParams(headers);

		let uuid = firstRow();
		setActiveRow({ id: uuid, active: true });
	}, []);

	return (
		<div className="flex flex-col h-full px-2 py-1 overflow-y-scroll bg-[rgb(30,_30,_30)] ">
			{inputList.map(
				({
					id,
					defaultKey,
					defaultValue,
					checkBoxRef,
					nameInputRef,
					valueInputRef,
				}: Initialized) => {
					const deleteBtnRef = createRef<HTMLSpanElement>();

					return (
						<div
							key={id}
							className={`relative grid items-center hover:bg-[rgba(65,65,65,0.78)] w-full max-w-full grid-cols-8 grid-rows-1 gap-2 py-2 mx-auto rounded-lg even:mt-1 odd:mt-1 first:mt-0 ${
								activeRow.active && activeRow.id === id
									? "bg-[rgba(65,65,65,0.78)]"
									: ""
							}`}
						>
							<div className="flex items-center col-span-4 gap-2 pl-3">
								<input ref={checkBoxRef} type="checkbox" className="size-5" />
								<input
									className="w-full py-1 font-mono text-sm bg-transparent rounded-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
									type="text"
									placeholder="name"
									spellCheck={false}
									ref={nameInputRef}
									defaultValue={defaultKey || ""}
									onFocus={(e) => setActiveRow({ id, active: true })}
									onBlur={(e) => setActiveRow({ id, active: false })}
									onChange={(e) => {
										const nameInput = e.currentTarget;
										const deleteBtn = deleteBtnRef.current!;

										if (nameInputRef!.current) {
											nameInputRef!.current.value = nameInput.value;
										}

										listValues.current.set(id, {
											defaultKey: nameInputRef?.current?.value,
											defaultValue: valueInputRef?.current?.value,
										});

										insertEmptyRow(id);

										if (nameInput.value.length > 0) {
											deleteBtn.className = "block text-xs cursor-pointer";
										}
									}}
								/>
							</div>

							<div className="flex items-center col-span-4 gap-2 pr-2">
								<input
									className="w-full py-1 font-mono text-sm bg-transparent rounded-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
									type="text"
									placeholder="value"
									spellCheck={false}
									ref={valueInputRef}
									defaultValue={defaultValue || ""}
									onFocus={(e) => setActiveRow({ id, active: true })}
									onBlur={(e) => setActiveRow({ id, active: false })}
									onChange={(e) => {
										const valueInput = e.currentTarget;
										const deleteBtn = deleteBtnRef.current;
										const currentInputRef = valueInputRef.current!;

										if (currentInputRef) {
											currentInputRef.value = e.currentTarget.value;
										}

										listValues.current.set(id, {
											defaultKey: nameInputRef?.current?.value,
											defaultValue: currentInputRef.value,
										});

										insertEmptyRow(id);

										if (valueInput.value.length > 0) {
											deleteBtn!.className = "block text-xs cursor-pointer";
										}
									}}
								/>

								<span
									className={`${
										defaultKey || defaultValue ? "block" : "hidden"
									}`}
									ref={deleteBtnRef}
									onClick={() => removeRow(id)}
								>
									<Delete size="1.2rem" />
								</span>
							</div>
						</div>
					);
				}
			)}
			{/* <button onClick={serializeParams}>Save Data</button> */}
		</div>
	);
};

const useInputParamsHandler = () => {
	const [inputList, setInputList] = useState<Initialized[]>([]);
	const listValues = useRef<Map<string, ListValues>>(new Map());

	const insertRow = () => {
		const uuid = crypto.randomUUID();

		const inputCheckBoxRef = createRef<HTMLInputElement>();
		const inputNameRef = createRef<HTMLInputElement>();
		const inputValueRef = createRef<HTMLInputElement>();

		const newRow = {
			id: uuid,
			defaultKey: "",
			defaultValue: "",
			checkBoxRef: inputCheckBoxRef,
			nameInputRef: inputNameRef,
			valueInputRef: inputValueRef,
		};

		setInputList((prev) => [...prev, newRow]);

		return uuid;
	};

	/** Only append a new row after the last one */
	const insertEmptyRow = (id: string) => {
		const lastItem = inputList.at(-1);
		if (lastItem && lastItem.id === id) {
			insertRow();
		}
	};

	const removeRow = (id: string) => {
		const filteredList = inputList.filter((list) => list.id !== id);
		listValues.current.delete(id);
		setInputList(filteredList);

		// Prevents the user from completely deleting all rows
		if (inputList.length === 1) {
			insertEmptyRow(id);
		}
	};

	const initializeParams = (arr: ListValues[]) => {
		const initialData = arr.map((item) => {
			const obj = {
				id: crypto.randomUUID(),
				defaultKey: item.defaultKey || "",
				defaultValue: item.defaultValue || "",
				checkBoxRef: createRef<HTMLInputElement>(),
				nameInputRef: createRef<HTMLInputElement>(),
				valueInputRef: createRef<HTMLInputElement>(),
			} as Initialized;

			listValues.current.set(obj.id, {
				defaultKey: obj.defaultKey,
				defaultValue: obj.defaultValue,
			});

			return obj;
		});

		setInputList(initialData);
	};

	const serializeParams = () => {
		console.log(listValues.current.entries());
	};

	return {
		inputList,
		listValues,
		firstRow: insertRow,
		removeRow,
		insertEmptyRow,
		serializeParams,
		initializeParams,
	} as const;
};

export default HttpView;
