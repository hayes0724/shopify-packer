---
id: commands
title: Commands
sidebar_label: Commands
slug: /commands
---

List of all API commands for Packer:
- [init](#init)
- [start](#start)
- [watch](#watch)
- [deploy](#deploy)
- [build](#build)
- [lint](#lint)
- [format](#format)
- [zip](#zip)
- [theme:list](#theme:list)
- [theme:create](#theme:create)
- [theme:remove](#theme:remove)
- [theme:download](#theme:download)
- [ssl:make](#ssl:make)
- [help](#help)

### init
Creates a blank start theme in specified directory. By default, it will use `hayes0724/packer-blank-theme`
unless you specify the repo flag with the name of the themes github repo. It will pull the latest release and fail
if the custom theme repo has no releases.
```
packer init <dir> [--repo=hayes0724/packer-blank-theme]
```
### start
Compiles your local theme files into a dist directory, uploads these files to your remote Shopify store and finally
boots up a local Express server that will serve most of your CSS and JavaScript.
```bash
packer start [--env=my-custom-env-name] [--skipPrompts] [--skipFirstDeploy]
```

| Flag | Description |
| --- | --- |
| `--env` | Targets a custom environment. Setting --env=production would use the production settings in packer.config.json |
| `--skipPrompts` | Skips all prompts. This is especially useful when using Packer with continuous integration tools |
| `--skipFirstDeploy` | Skips the file upload sequence and simply boots up the local Express server |

### watch
Same as start command except it skips the first deployment
```bash
packer watch [--env=my-custom-env-name] [--skipPrompts]
```
### deploy
Uploads the dist folder to the Shopify store.
```bash
packer deploy [--env=my-custom-env-name] [--skipPrompts] [--replace]
```
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Flag &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Description |
| --- | --- |
| ``--env`` | Targets a custom environment. Setting --env=production would use the production settings in packer.config.json |
| ``--skipPrompts`` | Skips all prompts. This is especially useful when using Packer with continuous integration tools |
| ``--nodelete`` | By default deploy will replace all files in theme, use this flag to update without removing existing files |
### build
```bash
packer build [--analyze]
```
| Flag | Description |
| --- | --- |
| ``--analyze`` | Analyzes bundles |

Builds a production-ready version of the theme by compiling the files into the dist folder.
### lint
```bash
packer lint [--scripts] [--styles] [--locales]
```
| Flag | Description |
| --- | --- |
| ``--scripts`` | Runs linting only on script files |
| ``--styles`` | Runs linting only on style files |
| ``--locales`` | Runs linting only on locales files |
### format
Formats the theme code according to the rules declared in the .eslintrc and .stylelintrc files. By default, it uses
ESLint Fix to format JS files, Stylelint Fix to format CSS files and Prettier to format JSON files.
```bash
packer format [--scripts] [--styles] [--json]
```
| Flag | Description |
| --- | --- |
| ``--scripts`` | Runs formatting only on script files |
| ``--styles`` | Runs formatting only on style files |
| ``--locales`` | Runs formatting only on locales files |
### zip
Compiles the contents of the dist directory and creates a ZIP file in the root of the project.
```bash
packer zip
```
### theme:list
Lists all themes (shows name, themeID, etc...) on the site, requires app password and store url be set first. By default looks at the store for development env in packer.config.json
```bash
packer theme:list
```
| Flag | Description |
| --- | --- |
| ``--env`` | Targets a custom environment. Setting --env=production would use the production settings in packer.env.json |
### theme:create
Creates a new empty theme on Shopify and updates packer.config.json for the selected env with the proper themeID
```bash
packer theme:create
```
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Flag &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Description |
| --- | --- |
| ``--env`` | Targets a custom environment. Setting --env=production would use the production settings in packer.env.json |
| ``--name=my-theme-name `` | Sets the theme name on Shopify, it's required |
### theme:remove
Removes the theme set in the selected env from Shopify
```bash
packer theme:remove
```
| Flag | Description |
| --- | --- |
| ``--env`` | Targets a custom environment (defaults to development). Setting --env=production would use the production settings in packer.config.json |
| ``--id`` | Delete a theme by using its ID  |

### theme:download
Downloads the theme set in the selected env from Shopify
```bash
packer theme:download
```
| Flag | Description |
| --- | --- |
| ``--env`` | Targets a custom environment. Setting --env=production would use the production settings in packer.config.json |

### ssl:make
Create a self-signed ssl cert for local development
```bash
packer ssl:make
```
| Flag | Description |
| --- | --- |
| ``--name`` | Name for SSL cert, defaults to localhost |


### help
Display all commands and flags
```bash
packer help
```