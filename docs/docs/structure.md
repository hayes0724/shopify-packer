---
id: structure
title: Structure
sidebar_label: Structure
slug: /structure
---

Packer can be used with existing themes, or you can create a new theme.
It must follow the following structure:
```
├── .babelrc
├── .eslintrc
├── .gitignore
├── .stylelintrc
├── .prettierignore
├── .stylelintignore
├── .prettierrc.json
├── .eslintignore
├── .editorconfig
├── packer.env.json
├── packer.config.js
├── dev.config.js
├── prod.config.js
├── postcss.config.js
├── package.json
├── yarn.lock
└── src
   ├── assets
   ├── config
   ├── layout
   ├── locales
   ├── scripts
   ├── sections
   ├── snippets
   ├── styles
   └── templates
```