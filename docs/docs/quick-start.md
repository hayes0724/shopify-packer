---
id: quick-start
title: Quick start
sidebar_label: Quick start
slug: /quick-start
---

### New project
1. Create new project with all required files
```bash
packer init <dirname>
```
2. Add app password and store url to [packer.env.json](/docs/config/environment)

3. Create new empty theme on shopify
```bash
packer theme:create --name=sample-theme-name
```
4. Install packages
```bash
yarn install
```
5. Deploy files and start working
```bash
packer start
```

### Existing project
1. Initialize Packer and import a repo from a remote source. Packer will pull the latest release and fail if the repo has no releases.
```bash
  packer init <dirname> [--repo=hayes0724/packer-blank-theme]
```
2. Install packages
```bash
yarn install
```
3. Deploy files and start working
```bash
packer start
```
