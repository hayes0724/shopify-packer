# How to contribute

We ❤️ pull requests. If you'd like to fix a bug, contribute a feature or just correct a typo, please feel free to do so.

If you're thinking of adding a big new feature, consider opening an issue or discussion first to discuss it to ensure it aligns to the direction of the project and to ensure it's not already being worked on.

> All pull requests should be submitted to the `dev` branch, **not** the `master` branch.

## Getting started

1. To start working on the codebase, first fork the repo:

![GitHub forks](https://img.shields.io/github/forks/hayes0724/shopify-packer?style=social)

2. Install all package dependencies and link local packages:

```
yarn install
```

3. Write some features, then run tests with:

```
yarn run test
```

4. Make a pull request to the dev branch

## Folder Structure

The following documents the folder structure for this project and what the purpose of each folder is:

docs - Documentaion site at https://hayes0724.github.io/shopify-packer/docs/

cli - All commands are located here

src - Shared files required by commands

src/config - Handles all of Packer's configurable options

src/env - Handles Packers environment values

src/linters - ESlint, prettier and stylelint

src/server - All dev server files and theme syncing

src/theme - Theme functions like list, download, create...

src/utilities - General helpers like entrypoints, check ports, clear console

src/webpack - everything for building themes

src/webpack/config - main configs for building (development and production)

src/webpack/parts - configuration parts used in configs (css, scss, js, liquid styles, etc..)

## Docs

We use [Docusaurus](https://docusaurus.io/docs) and all files are located in the docs folder.

Start doc server

```
yarn run docs:start
```

## Commit message guidelines

#### Atomic commits

If possible, make [atomic commits](https://en.wikipedia.org/wiki/Atomic_commit), which means:
- a commit should contain exactly one self-contained functional change
- a functional change should be contained in exactly one commit
- a commit should not create an inconsistent state (such as test errors, linting errors, partial fix, feature with documentation etc...)

A complex feature can be broken down into multiple commits as long as each one maintains a consistent state and consists of a self-contained change.

#### Commit message format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, a **scope** and a **subject**:

```commit
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

The **footer** can contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages).

#### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type

The type must be one of the following:

| Type         | Description                                                                                                 |
|--------------|-------------------------------------------------------------------------------------------------------------|
| **build**    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| **ci**       | Changes to our CI configuration files and scripts (example scopes: GithubActions) |
| **docs**     | Documentation only changes                                                                                  |
| **feat**     | A new feature                                                                                               |
| **fix**      | A bug fix                                                                                                   |
| **perf**     | A code change that improves performance                                                                     |
| **refactor** | A code change that neither fixes a bug nor adds a feature                                                   |
| **style**    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| **test**     | Adding missing tests or correcting existing tests                                                           |

#### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

#### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer
The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

#### Examples

```commit
fix(pencil): stop graphite breaking when too much pressure applied
```

```commit
feat(pencil): add 'graphiteWidth' option

Fix #42
```

```commit
perf(pencil): remove graphiteWidth option

BREAKING CHANGE: The graphiteWidth option has been removed.

The default graphite width of 10mm is always used for performance reasons.
```
