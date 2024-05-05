import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const tabVariants = cva("flex items-center text-blue-500", {
	variants: {
		variant: {
			default: "text-gray-50 bg-gray-800 gap-1 text-xs",
			environment: "",
			collection: "",
		},
		size: {
			default:
				"h-5 py-4 px-[0.5rem] rounded-md max-h-[25px] w-52 max-w-[209px]",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export interface TabsProps
	extends HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof tabVariants> {
	/** For tabs of request type */
	itemId?: string;
}

type TabMethodsProps = HTMLAttributes<HTMLSpanElement> & {
	method: string;
};

type TabLabelProps = HTMLAttributes<HTMLSpanElement> & {
	label: string;
};

type TabButton = HTMLAttributes<HTMLSpanElement> & {
	children: React.ReactNode;
};

const TabMethod = ({ className, method, ...props }: TabMethodsProps) => {
	return (
		<span className={cn("font-semibold leading-4", className)} {...props}>
			{method}
		</span>
	);
};

const TabLabel = ({ className, label, ...props }: TabLabelProps) => (
	<span className={cn("font-medium", className)} {...props}>
		{label}
	</span>
);

const TabRightIcon = ({ className, children, ...props }: TabButton) => {
	return (
		<span className={className} {...props}>
			{children}
		</span>
	);
};

const TabLeftIcon = ({ className, children, ...props }: TabButton) => {
	return (
		<span className={cn("leading-4", className)} {...props}>
			{children}
		</span>
	);
};

const TabContent = ({
	className,
	variant,
	size,
	children,
	itemId,
}: TabsProps) => {
	return (
		<div
			itemID={itemId}
			className={cn(tabVariants({ className, variant, size }))}
		>
			{children}
		</div>
	);
};

export {
	TabContent,
	TabLabel,
	TabLeftIcon,
	TabMethod,
	TabRightIcon,
	tabVariants,
};
