---
id: webpack
title: Webpack
sidebar_label: Webpack
slug: /config/webpack
---

Packer includes two files for customizing the webpack build settings.
Uses [webpack-merge](https://www.npmjs.com/package/webpack-merge) to combine the files with packers default config.
You can override or add any [webpack configurations](https://webpack.js.org/configuration/) here 

### prod.config.js
Used on all production builds (`packer build`)

### dev.config.js
Used on all development builds (`packer start`, `packer watch`)