import React, { WheelEvent, WheelEventHandler, useRef, useState } from "react";
import {
	ScrollMenu,
	type publicApiType,
} from "react-horizontal-scrolling-menu";

const HorizontalScrollContainer = ({
	children,
	className,
	props,
}: {
	props?: any;
	children: React.ReactNode;
	className: string;
}) => {
	return (
		<ScrollMenu
			{...props}
			onWheel={onWheel}
			scrollContainerClassName={className}
		>
			{children as any}
		</ScrollMenu>
	);
};

function onWheel(apiObj: publicApiType, ev: React.WheelEvent): void {
	// NOTE: no good standard way to distinguish touchpad scrolling gestures
	// but can assume that gesture will affect X axis, mouse scroll only Y axis
	// of if deltaY too small probably is it touchpad
	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

	if (isThouchpad) {
		ev.stopPropagation();
		return;
	}

	if (ev.deltaY < 0) {
		apiObj.scrollPrev();
	} else {
		apiObj.scrollNext();
	}
}

export default HorizontalScrollContainer;
