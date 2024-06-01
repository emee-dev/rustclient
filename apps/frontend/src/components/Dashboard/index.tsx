import { Layers3, MinusIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import HttpView from "../../components/HttpRequest";
import {
	TabContent,
	TabLabel,
	TabLeftIcon,
	TabMethod,
} from "../../components/custom-tab";
import HorizontalScrollContainer from "../../components/horizontalScroll";
import { GraphQL, HTTP, SocketIO, WS } from "../../components/icons";
import SideBar, { SideBarProps } from "./sidebar";
import { Button } from "../../components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import useRequestCtx from "../../context/requestCtx";
import { useNavigate } from "react-router-dom";

let requestTypes = [
	{
		label: "HTTP",

		icon: <HTTP className="size-5" />,
	},
	{
		label: "GraphQL",
		icon: <GraphQL className="size-5" />,
	},

	{
		label: "WebSocket",
		// icon: <WS size={"0.8rem"} />,
		icon: <WS className="size-4" />,
	},
	{
		label: "Socket.IO",
		// icon: <Minimize size={"0.8rem"} />,
		icon: <SocketIO className="size-4" />,
	},
];

const getItems = () =>
	Array(1)
		.fill(0)
		.map((_, ind) => ({ id: `element-${ind}` }));

function Dashboard() {
	const [isCollapsed, setIsCollapsed] =
		useState<SideBarProps["isCollapsed"]>(false);

	const [selected, setSelected] = useState([]);

	const isItemSelected = (id: number) => !!selected.find((el) => el === id);

	const collapseSideBar = () => {
		setIsCollapsed(true);
	};

	const expandSideBar = () => {
		setIsCollapsed(false);
	};

	return (
		<main className="relative flex h-full py-1 bg-victoria-200 ">
			<SideBar />

			<div
				className={`flex flex-col gap-2 w-full px-2 py-1 ${
					isCollapsed
						? "max-w-[calc(100vw_-_58px)]"
						: "max-w-[calc(100vw_-_300px)]"
				}`}
			>
				<BrowserTab />
				<HttpView />
			</div>
		</main>
	);
}

const BrowserTab = () => {
	const [items, setItems] = useState(getItems);

	return (
		<nav className="flex items-center justify-between w-full h-9">
			<div className="flex flex-grow overflow-hidden rounded-md">
				<HorizontalScrollContainer className="flex gap-2">
					{items.map(({ id }) => (
						<BrowserTabItem itemId={id} key={id} />
					))}
				</HorizontalScrollContainer>
			</div>
			<div className="flex items-center gap-1 px-1 rounded-md h-9">
				<Select>
					<SelectTrigger className="focus-within:outline-none">
						<Button
							asChild
							className="rounded-lg bg-victoria-700 hover:bg-victoria-300 size-8 min-w-8"
							variant={"outline"}
							size={"icon"}
						>
							<Plus size="1rem" color="#fff" className="p-[0.3rem]" />
						</Button>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup className="border-0 border-none outline-none ring-0 focus-within:ring-0 focus-within:outline-none">
							{requestTypes.map(({ icon, label }, index) => {
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

				<Separator orientation="vertical" />
				<EnvironmentTab />
			</div>
		</nav>
	);
};

const BrowserTabItem = (props: { itemId: string }) => {
	const [localState, setLocalState] = useState<string>("");
	const ctx = useRequestCtx((state) => state.req);

	useEffect(() => {
		let url = ctx.url;

		if (!url || url.length === 0) {
			setLocalState("untitled");
		} else {
			setLocalState(ctx.url);
		}

		// let urlString = "http://localhost:3000/books";
		// let url = new URL(localState);
		// let host = url.host;
		// let path = url.pathname;

		// let hostPathname = `${host}${path}`;

		// Output: 28 with hostname
		// Output: 21 without hostname
	}, [ctx.url]);

	return (
		<TabContent
			itemId={props.itemId}
			variant={"default"}
			className="border select-none bg-victoria-300 border-neutral-800 text-violet-800"
		>
			<TabMethod method={ctx.method} className="mr-1" />
			<TabLabel
				// label="http://localhost:3000/books"
				label={localState}
				className="w-full mr-2 text-sm font-medium truncate font-Roboto_Flex"
			/>
			<Button
				variant={"addTab"}
				children={<MinusIcon size={"1rem"} />}
				size={"addTab"}
			/>
		</TabContent>
	);
};

const EnvironmentTab = () => {
	return (
		<TabContent className="gap-3 px-3 bg-victoria-700 w-fit">
			<TabLeftIcon>
				<Layers3 size={"1rem"} />
			</TabLeftIcon>
			<TabLabel label="Environment" className="hidden text-xs md:flex" />
		</TabContent>
	);
};

export default Dashboard;
