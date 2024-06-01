// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

/**
 * This script is used to rename the binary with the platform specific postfix.
 * When `tauri build` is ran, it looks for the binary name appended with the platform specific postfix.
 */

import { execa } from "@esm2cjs/execa";
import fs from "fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

let extension = "";
if (process.platform === "win32") {
	extension = ".exe";
}

async function main() {
	const rustInfo = (await execa("rustc", ["-vV"])).stdout;
	const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
	if (!targetTriple) {
		console.error("Failed to determine platform target triple");
	}

	fs.renameSync(
		path.resolve("apps", "backend", "binaries", `app${extension}`),
		path.resolve(
			"apps",
			"backend",
			"binaries",
			`app-${targetTriple}${extension}`
		)
	);
}

main().catch((e) => {
	throw e;
});
