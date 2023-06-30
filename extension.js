const vscode = require('vscode');
const VSCodeTasksDataProvider = require("./VSCodeTasksDataProvider");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const vsCodeTasksProvider = new VSCodeTasksDataProvider(context);

	// Register view provider & setup commands
	vscode.window.registerTreeDataProvider("tasksquirrel", vsCodeTasksProvider);
	vscode.commands.registerCommand("tasksquirrel.refresh", () => {
		console.log("🐿️ Task Squirrel: Refreshing list...");
		vsCodeTasksProvider.refresh();
	});
	vscode.commands.registerCommand("tasksquirrel.executeTask", (task) => {
		console.log(task);
		vscode.tasks.executeTask(task).then(value => value, () => console.log(`Error running ${task.name}`));
	})

	// Create watch for tasks.json
	const tasksJsonWatcher = vscode.workspace.createFileSystemWatcher("**/.vscode/tasks.json");

	// Refresh the task list whenever the tasks.json file is changed
	tasksJsonWatcher.onDidChange(() => vsCodeTasksProvider.refresh());
	tasksJsonWatcher.onDidCreate(() => vsCodeTasksProvider.refresh());
	tasksJsonWatcher.onDidDelete(() => vsCodeTasksProvider.refresh());

	// Register FileSystemWatcher so it will be disposed when the extension is deactivated
	context.subscriptions.push(tasksJsonWatcher);

	// Load emojis on startup
	vsCodeTasksProvider.loadEmojiOnConfigChange();

	// Listen for changes in configuration
	vscode.workspace.onDidChangeConfiguration((event) => {
		if (event.affectsConfiguration("TaskSquirrel")) {
			vsCodeTasksProvider.loadEmojiOnConfigChange();
			vsCodeTasksProvider.refresh();
		}
	});

	console.log("🐿️ TaskSquirrel is ready to go!");
}

module.exports = { activate };
