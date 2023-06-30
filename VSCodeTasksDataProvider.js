const vscode = require("vscode");

const emojiMapDefault = {
    shell: "👾",
    process: "🚀",
    npm: "💻",
    gulp: "🥤",
    grunt: "🦁",
    jake: "🤠",
    tsc: "ʦ",
    dotnet: "🌐",
    go: "💨",
    cmake: "🎂",
    none: ""
}

class VSCodeTasksDataProvider {

    emojiMap = emojiMapDefault;

    /**
     * @param {vscode.ExtensionContext} context
     */
    constructor(context) {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.context = context;
        this.config = vscode.workspace.getConfiguration("tasksquirrel");
    }

    refresh() {
        this.loadEmojiOnConfigChange();
        this._onDidChangeTreeData.fire();
    }

    reloadConfig() {
        this.config = vscode.workspace.getConfiguration("tasksquirrel");
    }

    loadEmojiOnConfigChange() {

        this.reloadConfig();
        
        // To add another task type in the future, append to this array and change package.json
        const taskTypes = ['shell', 'process', 'npm', 'gulp', 'grunt', 'jake', 'tsc', 'dotnet', 'go', 'cmake'];
        const emojiRegex = /\p{Emoji}/u;

        taskTypes.forEach(taskType => {
            let emoji = this.config.get(`${taskType}Emoji`);
            if (!emojiRegex.test(emoji)) {
                vscode.window.showErrorMessage(`Invalid emoji in settings for ${taskType} tasks. Please enter a valid emoji. (TaskSquirrel:${taskType}Emoji)`);
                emoji = emojiMapDefault[taskType];
            }

            this.emojiMap[taskType] = emoji;
        });
    }


    /**
     * @param {any} element
     */
    getTreeItem(element) {
        return element;
    }

    /**
     * @param {string} type
     * @param {string} name
     */
    createTaskEmojiName(type, name) {
        if (!this.config.get("enableEmojis")) {
            return name;
        }
        let emoji = this.emojiMap[type] || this.emojiMap.none;
        return emoji += ` ${name}`;
    }

    async getChildren() {
        const taskList = [];
        const tasks = await vscode.tasks.fetchTasks();
        if (tasks) {
            tasks.forEach(task => {
                taskList.push(new TaskTreeItem(
                    task.definition.type,
                    this.createTaskEmojiName(task.definition.type, task.name),
                    {
                        command: "tasksquirrel.executeTask",
                        title: "Run Task",
                        arguments: [task]
                    }
                ))
            })
        }
        return taskList;
    }
}

class TaskTreeItem extends vscode.TreeItem {
    /**
     * @param {string} type
     * @param {string | vscode.TreeItemLabel} label
     * @param {{ command: string; title: string; arguments: vscode.Task[]; }} command
     */
    constructor(type, label, command) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.type = type;
        this.command = command;
    }
}

module.exports = VSCodeTasksDataProvider;