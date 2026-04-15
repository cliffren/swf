# Installing SWF for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed
- Linear MCP connected

## Installation

Add SWF to the `plugin` array in your `opencode.json` (global or project-level):

```json
{
  "plugin": ["swf@git+https://github.com/cliffren/swf.git"]
}
```

Restart OpenCode. The plugin auto-installs and registers all skills.

## Usage

Use OpenCode's native `skill` tool:

```
use skill tool to list skills
use skill tool to load swf/idea
```

## Updating

SWF updates automatically when you restart OpenCode.

To pin a specific version:

```json
{
  "plugin": ["swf@git+https://github.com/cliffren/swf.git#v0.1.0"]
}
```

## Uninstalling

Remove the plugin line from `opencode.json` and restart OpenCode.
