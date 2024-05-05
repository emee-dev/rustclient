import { ChevronsUpDown, Minimize } from "lucide-react";
import {
	RefObject,
	createRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectTriggerIcon,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { ReactJsonViewProps } from "react-json-view";
import JsonViewer from "./json-viewer";
import useRequestCtx from "@/context/requestCtx";
import { useShallow } from "zustand/react/shallow";

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

interface InputList {
	id: string;
	checkBoxRef: null | RefObject<HTMLInputElement>;
	nameInputRef: null | RefObject<HTMLInputElement>;
	valueInputRef: null | RefObject<HTMLInputElement>;
}

interface InputRow {
	id: string;
	name: string;
	value: string;
}

type ListValues = Partial<Pick<InputRow, "name" | "value">>;

let listValues = new Map<string, ListValues>();

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
						className="flex-1 overflow-scroll rounded-[0.5rem] h-[550px] max-h-[551px]"
					>
						{/* <div className="bg-[rgb(30,_30,_30)] h-full p-2 overflow-y-scroll">
							<JsonViewer {...JsonViewerProps} />
						</div> */}
						<DynamicInputForms />
					</TabsContent>
				);
			})}
		</Tabs>
	);
};

const HttpResponse = () => {
	const [headers, setHeaders] = useState(["Request", "Response"] as const);

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
							<div className="h-[150px] bg-orange-400">Hello</div>
							<JsonViewer {...JsonViewerProps} />
						</div>
					</TabsContent>
				);
			})}
		</Tabs>
	);
};

const DynamicInputForms = () => {
	const [inputList, setInputList] = useState<InputList[]>([]);

	const newRowData = () => {
		let initialId = crypto.randomUUID();

		const inputCheckBoxRef = createRef<HTMLInputElement>();
		const inputNameRef = createRef<HTMLInputElement>();
		const inputValueRef = createRef<HTMLInputElement>();

		let newRow = {
			id: initialId,
			name: "",
			value: "",
			checkBoxRef: inputCheckBoxRef,
			nameInputRef: inputNameRef,
			valueInputRef: inputValueRef,
		};

		setInputList((prev) => [...prev, newRow]);
	};

	const addNewRow = (id: string) => {
		let lastItem = inputList.at(-1);

		if (lastItem && lastItem.id === id) {
			newRowData();
		}
	};
	const deleteRow = (id: string) => {
		let filteredList = inputList.filter((list) => list.id !== id);
		setInputList(filteredList);
	};

	useEffect(() => {
		newRowData();
	}, []);

	return (
		<div className="bg-[rgb(30,_30,_30)] h-full p-2 overflow-y-scroll flex flex-col">
			{inputList.map(({ id, checkBoxRef, nameInputRef, valueInputRef }) => {
				const deleteBtnRef = createRef<HTMLSpanElement>();

				return (
					<div
						key={id}
						className="flex items-center w-full gap-2 px-1 py-2 rounded-lg bg-[rgba(65,65,65,0.78)] before:w-[95%] before:translate-x-[calc(100%-97%)] before:items-center before: before:h-[0.7px] before:bg-yellow-500/85 before:absolute relative before:bottom-0 before:left-0"
					>
						<input ref={checkBoxRef} type="checkbox" className="p-8 size-6" />
						<input
							className="basis-[40%] p-[0.1rem] rounded-sm bg-transparent"
							type="text"
							placeholder="name"
							ref={nameInputRef}
							defaultValue={nameInputRef!.current?.value || ""}
							onChange={(e) => {
								let nameInput = e.currentTarget;
								let deleteBtn = deleteBtnRef.current;

								if (nameInputRef!.current) {
									nameInputRef!.current.value = nameInput.value;
								}

								listValues.set(id, {
									name: nameInputRef?.current?.value,
									value: valueInputRef?.current?.value,
								});

								addNewRow(id);

								if (nameInput.value.length > 0) {
									deleteBtn!.className = "block text-xs cursor-pointer";
								}
							}}
						/>
						<input
							className="basis-[60%] p-[0.1rem] rounded-sm bg-transparent"
							type="text"
							placeholder="value"
							ref={valueInputRef}
							defaultValue={valueInputRef!.current?.value || ""}
							onChange={(e) => {
								let valueInput = e.currentTarget;
								let deleteBtn = deleteBtnRef.current;

								if (valueInputRef!.current) {
									valueInputRef!.current.value = e.currentTarget.value;
								}

								listValues.set(id, {
									name: nameInputRef?.current?.value,
									value: valueInputRef?.current?.value,
								});
								addNewRow(id);

								if (valueInput.value.length > 0) {
									deleteBtn!.className = "block text-xs cursor-pointer";
								}
							}}
						/>
						<span
							className="hidden"
							ref={deleteBtnRef}
							onClick={() => deleteRow(id)}
						>
							DEL
						</span>
					</div>
				);
			})}
			<button onClick={() => console.log(listValues.entries())}>
				Save Data
			</button>
		</div>
	);
};

export default HttpView;
