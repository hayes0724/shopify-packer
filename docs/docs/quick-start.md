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