---
id: environment
title: Environment
sidebar_label: Environment
slug: /config/environment
---

Environment settings are located in ``packer.env.json``.

```json
{
    "development": {
      "id": "74500041118",
      "password": "ebd6ce7f27aae8cdafb8111a5b887b9",
      "store": "my-store-name.myshopify.com",
      "live": "false",
      "ignore": [
        "settings_data.json"
      ]
    }
}

```

By default, most commands will use development environment unless you
override with the ``--env`` flag

live - will allow deploying to published themes and skip the default prompts

```
packer start --env=production
```
This will use the settings set `packer.env.json` production