---
id: admin-api
title: Shopify Admin API
sidebar_label: Shopify Admin API
slug: /features/admin-api
---

Packer comes with several utilities to make managing and setting up
themes easier and without needing to use Shopify admin.

### List Themes
Requires password and store URL in ``packer.env.json``. This will list all themes
on the store, showing name, id, created/modified dates and role.
```
packer theme:list
```
output
```
╔═════════════╤═════════════╤═══════════════════════════╤═══════════════════════════╤═════════════╗
║ ID          │ NAME        │ CREATED AT                │ UPDATED AT                │ ROLE        ║
╟─────────────┼─────────────┼───────────────────────────┼───────────────────────────┼─────────────╢
║ 74500046912 │ Debut       │ 2019-07-05T18:33:52-04:00 │ 2020-06-13T17:21:30-04:00 │ main        ║
╟─────────────┼─────────────┼───────────────────────────┼───────────────────────────┼─────────────╢
║ 83174129723 │ development │ 2020-06-16T19:55:40-04:00 │ 2020-06-16T19:56:50-04:00 │ unpublished ║
╚═════════════╧═════════════╧═══════════════════════════╧═══════════════════════════╧═════════════╝

```

### Create Theme
Creates an empty theme on Shopify that you can deploy to or start
development on. It will automatically add the theme id to your ``packer.env.json``
```
packer theme:create --env=development
```
By default, it will use the development environment if no flag is provided.

### Download Theme
Downloads the theme from Shopify to your src folder
```
packer theme:download --env=development
```
By default, it will use the development environment if no flag is provided.
