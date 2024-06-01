import ReactJson, { ReactJsonViewProps } from "react-json-view";

interface JsonViewerProps extends ReactJsonViewProps {
	className?: string;
}

const JsonViewer = (props: JsonViewerProps) => {
	return <ReactJson {...props} />;
};

export default JsonViewer;
