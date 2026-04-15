# Installing SWF for Codex

## Prerequisites

- Git
- Linear MCP connected

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cliffren/swf.git ~/.codex/swf
   ```

2. **Create the skills symlink:**
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/swf/skills ~/.agents/skills/swf
   ```

3. **Restart Codex** to discover the skills.

## Updating

```bash
cd ~/.codex/swf && git pull
```

## Uninstalling

```bash
rm ~/.agents/skills/swf
rm -rf ~/.codex/swf
```
