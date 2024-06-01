import {
	Bell,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Ellipsis,
	Folders,
	LayoutDashboard,
	LayoutGrid,
	Settings,
	TestTubeDiagonal,
	TvIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import "react-complex-tree/lib/style-modern.css";

import {
	UncontrolledTreeEnvironment,
	Tree,
	StaticTreeDataProvider,
	TreeItem,
	TreeItemIndex,
	TreeRef,
	TreeEnvironmentRef,
} from "react-complex-tree";
import { useRef } from "react";
import { Input } from "../ui/input";

export type SideBarProps = {
	isCollapsed: boolean;
	expandSideBar: () => void;
	collapseSideBar: () => void;
};

const truncateText = (text: any, maxLength: any) => {
	if (text.length <= maxLength) return text;
	let truncated = text.slice(0, maxLength + 1); // +1 to ensure there's room to check for word boundary
	const lastSpaceIndex = truncated.lastIndexOf(" ");
	if (lastSpaceIndex > 0) {
		truncated = truncated.slice(0, lastSpaceIndex); // Truncate at the last whole word
	}
	return truncated + "..."; // Append ellipsis
};

const readTemplate = (template: any, data: any = { items: {} }) => {
	for (const [key, value] of Object.entries(template)) {
		// Truncate the key to a maximum length of 150 characters
		// const truncatedKey = truncateText(key, 150);

		// console.log(truncatedKey);

		data.items[key] = {
			index: key,
			canMove: true,
			isFolder: value !== null,
			children: value !== null ? Object.keys(value as object) : undefined,
			data: key,
			// data: `${key}-${crypto.randomUUID().slice(0, 6)}`,
			canRename: true,
		};

		if (value !== null) {
			readTemplate(value, data);
		}
	}
	return data;
};

const file = {
	root: {
		"get request": null,
		"post request": null,
		"delete request": null,
		"pokemon request": {
			"private collection for all my requests friends": {
				inner0: null,
				inner1: null,
				inner2: null,
				inner3: null,
			},
			"get ditto": null,
			"delete ditto": null,
		},
		"pokemon accessment": {
			"private collection requests": {
				inner0: null,
				inner1: null,
				inner2: null,
				inner3: null,
			},
			"get ditto": null,
			"delete ditto": null,
		},
		"pokemon forgive": {
			"private collection requests": {
				inner0: null,
				inner1: null,
				inner2: null,
				inner3: null,
			},
			"get ditto": null,
			"delete ditto": null,
		},
	},
};

// const converted = {
// 	items: {
// 		root: {
// 			index: "root",
// 			canMove: true,
// 			isFolder: true,
// 			children: [
// 				"get request",
// 				"post request",
// 				"delete request",
// 				"pokiemon request",
// 			],
// 			data: "root",
// 			canRename: true,
// 		},
// 		"get request": {
// 			index: "get request",
// 			canMove: true,
// 			isFolder: false,
// 			data: "get request",
// 			canRename: true,
// 		},
// 		"post request": {
// 			index: "post request",
// 			canMove: true,
// 			isFolder: false,
// 			data: "post request",
// 			canRename: true,
// 		},
// 		"delete request": {
// 			index: "delete request",
// 			canMove: true,
// 			isFolder: false,
// 			data: "delete request",
// 			canRename: true,
// 		},
// 		"pokiemon request": {
// 			index: "pokiemon request",
// 			canMove: true,
// 			isFolder: true,
// 			children: ["private collection requests", "get ditto", "delete ditto"],
// 			data: "pokiemon request",
// 			canRename: true,
// 		},
// 		"private collection requests": {
// 			index: "private collection requests",
// 			canMove: true,
// 			isFolder: true,
// 			children: ["inner0", "inner1", "inner2", "inner3"],
// 			data: "private collection requests",
// 			canRename: true,
// 		},
// 		inner0: {
// 			index: "inner0",
// 			canMove: true,
// 			isFolder: false,
// 			data: "inner0",
// 			canRename: true,
// 		},
// 		inner1: {
// 			index: "inner1",
// 			canMove: true,
// 			isFolder: false,
// 			data: "inner1",
// 			canRename: true,
// 		},
// 		inner2: {
// 			index: "inner2",
// 			canMove: true,
// 			isFolder: false,
// 			data: "inner2",
// 			canRename: true,
// 		},
// 		inner3: {
// 			index: "inner3",
// 			canMove: true,
// 			isFolder: false,
// 			data: "inner3",
// 			canRename: true,
// 		},
// 		"get ditto": {
// 			index: "get ditto",
// 			canMove: true,
// 			isFolder: false,
// 			data: "get ditto",
// 			canRename: true,
// 		},
// 		"delete ditto": {
// 			index: "delete ditto",
// 			canMove: true,
// 			isFolder: false,
// 			data: "delete ditto",
// 			canRename: true,
// 		},
// 	},
// } as const;

const data = [
	{ id: "1", name: "Unread" },
	{ id: "2", name: "Threads" },
	{
		id: "3",
		name: "Chat Rooms",
		children: [
			{ id: "c1", name: "General" },
			{ id: "c2", name: "Random" },
			{ id: "c3", name: "Open Source Projects" },
		],
	},
	{
		id: "4",
		name: "Direct Messages",
		children: [
			{ id: "d1", name: "Alice" },
			{ id: "d2", name: "Bob" },
			{ id: "d3", name: "Charlie" },
		],
	},
];

const SideBar = () => {
	const longTree = readTemplate(file);
	const treeContainerRef = useRef<TreeEnvironmentRef<any, never>>(null);
	const treeRef = useRef<TreeRef>(null);

	return (
		<aside className="max-w-[261px] w-[260px] px-4 relative flex flex-col h-screen">
			<div className="flex items-center justify-between mt-2">
				<Button
					className="h-8 text-sm text-white bg-victoria-700"
					size="sm"
					variant="default"
					onClick={() => {
						if (treeContainerRef.current) {
							console.log(treeContainerRef.current);
						}
					}}
				>
					Development
				</Button>

				<div className="">
					<Ellipsis size={"1.3rem"} />
				</div>
			</div>

			<div className="flex items-center h-8 gap-2 py-2 pl-2 mt-4 text-sm text-black rounded bg-victoria-300 border-neutral-800">
				<Folders size="1.2rem" />
				<span className="font-semibold">Collections</span>
			</div>

			<div className="mt-5 max-w-[245px] relative min-h-[30rem] h-[30rem] max-h-[32rem]">
				<UncontrolledTreeEnvironment
					canRename={true}
					ref={treeContainerRef}
					dataProvider={
						new StaticTreeDataProvider(longTree.items as any, (item, data) => ({
							...item,
							data,
						}))
					}
					getItemTitle={(item) => item.data}
					canDragAndDrop={true}
					canDropOnFolder={true}
					canReorderItems={true}
					onFocusItem={(item) => console.log(item)}
					viewState={{
						["tree-1"]: {
							focusedItem: "get request",
							selectedItems: ["get request", "Europe", "Asia"],
							expandedItems: [
								"pokemon request",
								"pokemon accessment",
								"pokemon forgive",
								"private collection requests",
							],
						},
					}}
					renderItemTitle={({ item, title, context, info }) => {
						return (
							<span
								className={`flex max-w-md leading-3 tracking-tight truncate gap-1  ${
									context.isFocused ? "bg-purple-50 rounded-sm" : ""
								}`}
							>
								{/* {!item.isFolder && <span>Post</span>} */}
								{title}
							</span>
						);
					}}

					// renderItemTitle={({ item, title, context, info }) => {
					// 	return (
					// 		<span
					// 			className={`flex w-full  leading-3 tracking-tight py-[8px] truncate gap-1  ${
					// 				context.isFocused ? "bg-purple-50 rounded-sm" : ""
					// 			}`}
					// 		>
					// 			{/* {!item.isFolder && <span>Post</span>} */}
					// 			{title}
					// 		</span>
					// 	);
					// }}
					// renderItemArrow={({ item, context }) =>
					// 	item.isFolder ? (
					// 		<span {...context.arrowProps}>
					// 			{context.isExpanded ? (
					// 				<ChevronDown size={"1rem"} />
					// 			) : (
					// 				<ChevronRight size={"1rem"} />
					// 			)}
					// 		</span>
					// 	) : null
					// }
					// renderItem={({
					// 	item,
					// 	title,
					// 	arrow,
					// 	depth,
					// 	context,
					// 	children,
					// 	info,
					// }) => {
					// 	return (
					// 		<div
					// 			{...context.itemContainerWithChildrenProps}
					// 			className="flex flex-col items-start w-full m-0 my-2 font-mono text-sm"
					// 		>
					// 			<span
					// 				{...context.itemContainerWithoutChildrenProps}
					// 				{...context.interactiveElementProps}
					// 				// style={{ marginLeft: depth * 10 + "px" }}
					// 				// style={{ marginLeft: depth * 10 + "px" }}
					// 				className={`flex items-center w-[215px]  rounded-md`}
					// 			>
					// 				{arrow}
					// 				{title}
					// 			</span>
					// 			{children}
					// 		</div>
					// 	);
					// }}
					// renderTreeContainer={({ children, containerProps }) => (
					// 	<div {...containerProps}>{children}</div>
					// )}
					// renderItemsContainer={({ children, containerProps, depth }) => (
					// 	<ul
					// 		className="min-w-full bg-yellow-500"
					// 		style={{ marginLeft: depth * 10 + "px" }}
					// 		{...containerProps}
					// 	>
					// 		{children}
					// 	</ul>
					// )}
				>
					<Tree
						treeId="tree-1"
						rootItem="root"
						treeLabel="Tree Example"
						ref={treeRef}
					/>
				</UncontrolledTreeEnvironment>
			</div>

			{/* <div className="flex items-center justify-between w-full h-9"> */}
			{/* <div className="flex items-center justify-between w-full md:mt-auto h-9"> */}
			<div className="absolute bottom-0 left-0 flex items-center w-full bg-red-500 h-9">
				<div className="flex items-center gap-2">
					<Settings size="1.1rem" />
					<Bell size="1.1rem" />
				</div>

				<span className="ml-auto">v1.0.0</span>
			</div>
		</aside>
	);
};

export default SideBar;

{
	/* <UncontrolledTreeEnvironment
					canDragAndDrop={true}
					canDropOnFolder={true}
					canReorderItems={true}
					dataProvider={
						new StaticTreeDataProvider(longTree.items, (item, data) => ({
							...item,
							data,
						}))
					}
					getItemTitle={(item) => item.data}
					viewState={{
						["tree-1"]: {
							expandedItems: ["container"],
						},
					}}
					renderItemTitle={({ title }) => <span>{title}</span>}
					renderItemArrow={({ item, context }) =>
						item.isFolder ? (
							<span {...context.arrowProps}>
								{context.isExpanded ? (
									<ChevronDown size={"1rem"} />
								) : (
									<ChevronRight size={"1rem"} />
								)}
							</span>
						) : null
					}
					renderItem={({ title, arrow, depth, context, children }) => {
						console.log(context);
						return (
							<div
								{...context.itemContainerWithChildrenProps}
								className="flex flex-col items-start gap-2 m-0 font-mono text-sm bg-yellow-50"
							>
								<span
									{...context.itemContainerWithoutChildrenProps}
									{...context.interactiveElementProps}
									className="flex items-center"
								>
									{arrow}
									{title}
								</span>
								{children}
							</div>
						);
					}}
					renderTreeContainer={({ children, containerProps }) => (
						<div {...containerProps}>{children}</div>
					)}
					renderItemsContainer={({ children, containerProps }) => (
						<ul {...containerProps}>{children}</ul>
					)}
				>
					<Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
				</UncontrolledTreeEnvironment> */
}
