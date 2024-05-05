<Tabs defaultValue="params" className="w-1/2 ">
	<TabsList className="bg-transparent">
		<TabsTrigger value="params">Params</TabsTrigger>
		<TabsTrigger value="headers">Headers</TabsTrigger>
		<TabsTrigger value="auth">Auth</TabsTrigger>
		<TabsTrigger value="body">Body</TabsTrigger>
	</TabsList>

	<div className="h-full ">
		<TabsContent value="params" className="h-full p-2 bg-purple-300">
			<div>Request Params.</div>

			{/* <div className="absolute bottom-0 translate-y-[-250%]"> */}
		</TabsContent>
		<TabsContent value="headers" className="h-full p-2">
			<div>Request Headers.</div>
		</TabsContent>
		<TabsContent value="auth" className="h-full p-2">
			<div>Request Auth.</div>
			<div className="absolute h-8 shadow-xl bottom-6 left-4">
				<ComboboxDemo />
			</div>
		</TabsContent>
		<TabsContent value="body" className="h-full p-2">
			<div>Request Body.</div>
		</TabsContent>
	</div>
</Tabs>;

{
	/* <Tabs   className="relative w-1/2"> */
}
<Tabs /* defaultValue="request" */ className="w-1/2">
	<TabsList className="bg-transparent">
		<TabsTrigger /* disabled */ value="request">Request</TabsTrigger>
		<TabsTrigger value="response">Response</TabsTrigger>
	</TabsList>

	<div className="relative w-full h-full overflow-y-scroll">
		<TabsContent
			value="request"
			className="h-full p-2 bg-red-300 text-ellipsis"
		>
			<div className="h-full bg-green-300">{JSON.stringify(arr) as any}</div>

			<div className="fixed bg-purple-300 bottom-3 left-5">
				<ComboboxDemo />
			</div>
		</TabsContent>
		<TabsContent value="response" className="h-full">
			Response
		</TabsContent>
	</div>
</Tabs>;
