# tasksquirrel README

Run your VSCode tasks with ease.

## Features

TaskSquirrel provides an easy way to run your defined tasks from the VSCode explorer pane. 
With optional, user-definable, emojis available, you can make it easy to identify task types
from a large list of tasks.

## Extension Settings

### Adding Tasks

Editing `.vscode/tasks.json` allows you, and VSCode, to define commands, processes, and workflows that are run often.
You can read more about [VSCode Tasks Here](https://code.visualstudio.com/Docs/editor/tasks).

Any tasks you add to the `tasks.json` file will automatically display in the TaskSquirrel pane.

### Configuration

This extension has the following settings:

* `tasksquirrel.enableEmoji`: Enable/disable emojis.
* `tasksquirrel.shellEmoji`: Change the default shell emoji.
* `tasksquirrel.processEmoji`: Change the default process emoji.
* `tasksquirrel.npmEmoji`: Change the default npm emoji.
* `tasksquirrel.gulpEmoji`: Change the default gulp emoji.
* `tasksquirrel.gruntEmoji`: Change the default grunt emoji.
* `tasksquirrel.jakeEmoji`: Change the default jake emoji.
* `tasksquirrel.tscEmoji`: Change the default tsc emoji.
* `tasksquirrel.dotnetEmoji`: Change the default dotnet emoji.
* `tasksquirrel.goEmoji`: Change the default go emoji.
* `tasksquirrel.cmakeEmoji`: Change the default cmake emoji.

## Known Issues

If you find an issue, please check the open [issues](https://github.com/j-labbe/tasksquirrel/issues) before submitting a new one.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Initial release.

## Roadmap

There are features I want to add in the future, such as:

- [X] Emoji
- [ ] Task Templates - Easily create tasks from a button in TaskSquirrel
... and more.

If you have any suggestions, create an issue and I can decide if it's worth adding.

## Inspiration
While searching for a solution to running tasks easily, I discovered [Task Runner](https://github.com/sana-ajani/taskrunner-code), which is very similar to this extension. I decided to create my own extension to learn about creating VSCode extensions, and to add more features I find useful.