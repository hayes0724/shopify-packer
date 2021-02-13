---
id: overview
title: Overview
sidebar_label: Overview
slug: /
---

[![GitHub issues](https://img.shields.io/github/issues/hayes0724/shopify-packer.svg)](https://GitHub.com/hayes0724/shopify-packer/issues/)
![npm (scoped)](https://img.shields.io/npm/v/@hayes0724/shopify-packer)
![build](https://github.com/hayes0724/shopify-packer/workflows/Node.js%20CI/badge.svg?branch=master)
![node-current (scoped)](https://img.shields.io/node/v/@hayes0724/shopify-packer)
[![GitHub license](https://img.shields.io/github/license/hayes0724/shopify-packer.svg)](https://github.com/hayes0724/shopify-packer/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/hayes0724/shopify-packer.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/hayes0724/shopify-packer/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/hayes0724/shopify-packer.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/hayes0724/shopify-packer/network/)

Shopify development tool using themekit and webpack. Also a compatible replacement for Slate and existing websites.

## Features
- Webpack 4
- Stylelint
- ESLint
- Babel
- PostCSS
- SCSS
- Analyze Bundles
- Liquid code in stylesheets
- Webpack config is easy to modify (use `dev.config.js` and `prod.config.js`)
- App server loads scripts and stylesheets locally
- Hot Module Reloading for rapid development
- Multiple entrypoints for templates and layouts
- List themes on store
- Delete themes from CLI
- Create new empty theme in Shopify from CLI, adds theme id to packer.config.json
- Download existing themes
- Download files/sync changes
- Init base packer theme from cli or use a custom github repo