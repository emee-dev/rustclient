import { ChevronLeft, ChevronRight, TestTubeDiagonal } from "lucide-react";

export type SideBarProps = {
	isCollapsed: boolean;
	expandSideBar: () => void;
	collapseSideBar: () => void;
};

const SideBar = ({
	isCollapsed,
	collapseSideBar,
	expandSideBar,
}: SideBarProps) => {
	{
		/* Full sidebar should collapse to 56px matching width of fixed sidebar */
	}
	return (
		<aside
			className={`${
				isCollapsed ? "min-w-[56px] w-[56px]" : "flex relative min-w-[300px]"
			}`}
		>
			{/* Fixed */}
			<div className="z-50 flex flex-col items-center h-full gap-3 pt-10 rounded-lg bg-violet-100 min-w-14">
				<span className="flex items-center justify-center bg-transparent rounded-md size-8 hover:bg-slate-400">
					{isCollapsed ? (
						<ChevronRight onClick={() => expandSideBar()} />
					) : (
						<ChevronLeft onClick={() => collapseSideBar()} />
					)}
				</span>
				<span className="relative flex items-center justify-center bg-transparent rounded-md size-8 hover:bg-slate-400 group">
					<TestTubeDiagonal size="1.1rem" />
					<p
						className={`absolute z-50 left-full rounded-md px-2 py-1 ml-6 bg-neutral-800/90 text-white
						text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible 
						group-hover:opacity-100 group-hover:translate-x-0 [white-space:no-wrap] min-w-max font-medium`}
					>
						Tests
					</p>
				</span>
			</div>

			{/* History bar */}
			<div
				className={
					isCollapsed
						? "w-0 h-0 invisible cursor-none hidden"
						: "flex left-[56px] min-w-[245px] flex-col absolute h-full rounded-lg bg-emerald-400"
				}
			>
				Request History
			</div>
		</aside>
	);
};

export default SideBar;
