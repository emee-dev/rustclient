import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {};

export const HTTP = (props: IconProps) => {
	return (
		<svg
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			viewBox="0 0 24 24"
			height="1em"
			width="1em"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" />
			<path d="M4 13h5M12 16V8h3a2 2 0 012 2v1a2 2 0 01-2 2h-3M20 8v8M9 16v-5.5a2.5 2.5 0 00-5 0V16" />
		</svg>
	);
};

export const GraphQL = (props: IconProps) => {
	return (
		<svg
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="currentColor"
				d="m12 5.37l-.44-.06L6 14.9c.24.21.4.48.47.78h11.06c.07-.3.23-.57.47-.78l-5.56-9.59zM6.6 16.53l4.28 2.53c.29-.27.69-.43 1.12-.43s.83.16 1.12.43l4.28-2.53zM12 22a1.68 1.68 0 0 1-1.68-1.68l.09-.56l-4.3-2.55c-.31.36-.76.58-1.27.58a1.68 1.68 0 0 1-1.68-1.68c0-.79.53-1.45 1.26-1.64V9.36c-.83-.11-1.47-.82-1.47-1.68A1.68 1.68 0 0 1 4.63 6c.55 0 1.03.26 1.34.66l4.41-2.53l-.06-.45c0-.93.75-1.68 1.68-1.68s1.68.75 1.68 1.68l-.06.45l4.41 2.53c.31-.4.79-.66 1.34-.66a1.68 1.68 0 0 1 1.68 1.68c0 .86-.64 1.57-1.47 1.68v5.11c.73.19 1.26.85 1.26 1.64a1.68 1.68 0 0 1-1.68 1.68c-.51 0-.96-.22-1.27-.58l-4.3 2.55l.09.56A1.68 1.68 0 0 1 12 22M10.8 4.86L6.3 7.44l.02.24c0 .71-.44 1.32-1.06 1.57l.03 5.25zm2.4 0l5.51 9.64l.03-5.25c-.62-.25-1.06-.86-1.06-1.57l.02-.24z"
			></path>
		</svg>
	);
};

// Thanks ChatGPT
export const WS = (props: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			width="1em"
			height="1em"
			viewBox="0 0 100 100"
			{...props}
		>
			{/* Letter W */}
			<path d="M10 90 L30 20 L50 40 L70 20 L90 90" fill="none" stroke="black" />

			{/* Letter S */}
			<path
				d="M10 60 Q10 40 30 40 Q50 40 50 60 Q50 80 70 80 Q90 80 90 60"
				fill="none"
				stroke="black"
			/>
		</svg>
	);
};

export const SocketIO = (props: IconProps) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			width="1em"
			height="1em"
			{...props}
		>
			<path d="M11.936.014a12.17 12.17 0 00-2.975.378C4.281 1.555.568 5.794.091 10.602c-.59 4.548 1.709 9.285 5.644 11.634 3.861 2.418 9.093 2.32 12.874-.223 3.397-2.206 5.512-6.228 5.386-10.285-.058-4.016-2.31-7.916-5.76-9.98C16.355.589 14.144.006 11.937.015zm-.063 1.696c4.945-.007 9.789 3.813 10.282 8.924.945 5.66-3.753 11.413-9.488 11.58-5.454.544-10.724-4.08-10.88-9.557-.406-4.434 2.517-8.835 6.698-10.3a9.113 9.113 0 013.388-.646zm5.091 3.224c-2.687 2.085-5.26 4.308-7.889 6.457 1.203.017 2.412.016 3.621.01 1.41-2.165 2.86-4.3 4.268-6.467zm-5.665 7.654c-1.41 2.166-2.86 4.309-4.27 6.474 2.693-2.08 5.255-4.32 7.902-6.456a255.413 255.413 0 00-3.632-.018z" />
		</svg>
	);
};


