---
id: dotenv
title: Dotenv
sidebar_label: Dotenv
slug: /features/dotenv
---

Packer uses dotenv and webpack to load any environment values you have stored in ``.env``

## Usage

Create an .env file

```dotenv
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

Use it in your code

```javascript
console.log(process.env.S3_BUCKET)
// YOURS3BUCKET
```
