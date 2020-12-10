## [1.3.2](https://github.com/hayes0724/shopify-packer/compare/1.3.1...1.3.2) (2020-12-10)


### :bug: Bug Fixes

* **packer-theme:** theme:download command typo in ignored files ([060d803](https://github.com/hayes0724/shopify-packer/commit/060d803e9faa2c7b37649617981c99af9522c117)), closes [#18](https://github.com/hayes0724/shopify-packer/issues/18)



## [1.3.1](https://github.com/hayes0724/shopify-packer/compare/1.3.0...1.3.1) (2020-12-10)


### :bug: Bug Fixes

* **packer-config:** env value live for allowing live theme deploy ([abd0d9f](https://github.com/hayes0724/shopify-packer/commit/abd0d9f5bc98a50eb8850e8785c5a34d50d1df72)), closes [#25](https://github.com/hayes0724/shopify-packer/issues/25)



# [1.3.0](https://github.com/hayes0724/shopify-packer/compare/1.2.1...1.3.0) (2020-12-10)


### :bug: Bug Fixes

* **html-webpack:** fixed style tag generator typo ([a23064a](https://github.com/hayes0724/shopify-packer/commit/a23064aebf70cfbb552b1470b70fedd7264e6db5))
* **packer-help:** Fixed help table rendering ([0656149](https://github.com/hayes0724/shopify-packer/commit/065614992bfc053630743ceb5f3e3acda96924b2))
* **webpack-config:** Clean webpack removes entire dist folder before build ([595597d](https://github.com/hayes0724/shopify-packer/commit/595597dbdbe643987f98947be33eb83baad7e7a6)), closes [#22](https://github.com/hayes0724/shopify-packer/issues/22)


### :memo: Documentation

* **packer-config:** updated readme with source configs ([857742c](https://github.com/hayes0724/shopify-packer/commit/857742c242375d544b480e4a082ba5a546c89213))


### :sparkles: Features

* **packer-theme:** Added id flag for `theme:remove` as an alternative to env values ([12b1fde](https://github.com/hayes0724/shopify-packer/commit/12b1fde8658779a356d63335a06bdc5937f41dc8))
* **webpack-config:** added ts file type to babel loader ([e7e1b3a](https://github.com/hayes0724/shopify-packer/commit/e7e1b3a049b68363f166566e40c63e428f262a59))


### :wrench: Build System

* CI workflow updated. NPM now uses `--access public` ([9cd64fd](https://github.com/hayes0724/shopify-packer/commit/9cd64fdbde23a3b9482e1de62f04cfb021c7bdac))



## [1.2.1](https://github.com/hayes0724/shopify-packer/compare/1.2.0...1.2.1) (2020-10-06)


* Update README.md ([3cc94ba](https://github.com/hayes0724/shopify-packer/commit/3cc94ba76a93e0cad193ffc2ced6e5763d511731))


### :bug: Bug Fixes

* **packer-config:** config keys set as strings ([42fc6e2](https://github.com/hayes0724/shopify-packer/commit/42fc6e2119fbf06b1c3e04dbeb2ab89dd302d99d))
* fixed issue with empty config files and webpack merge ([eba227c](https://github.com/hayes0724/shopify-packer/commit/eba227c64ae94ca9527851c459b30dc549d47f0d))


### :wrench: Build System

* .editorconfig added ([86a4f29](https://github.com/hayes0724/shopify-packer/commit/86a4f29d4c408f73643ccd1063b3c62f1d8cd1c7))



# [1.2.0](https://github.com/hayes0724/shopify-packer/compare/1.1.0...1.2.0) (2020-10-05)


### :art: Styles

* eslint fix on all javascript ([4f9c857](https://github.com/hayes0724/shopify-packer/commit/4f9c8576482d1a5619e6f4f2c39bfe21bdee6b4a))
* fixed eslint issues ([51a2a40](https://github.com/hayes0724/shopify-packer/commit/51a2a4040ed147b2886f648289bfb1412aecd604))


### :hammer: Code Refactoring

* all configurations files combined ([7648d05](https://github.com/hayes0724/shopify-packer/commit/7648d0539b5ce6cc778be9663c288e3a63bef785))


### :heavy_check_mark: Tests

* jest test for PackerConfig created ([ef8d13f](https://github.com/hayes0724/shopify-packer/commit/ef8d13fe2cb059654eb046c6de1780d346eb338a))


### :memo: Documentation

* readme updated with new settings config ([f12b66f](https://github.com/hayes0724/shopify-packer/commit/f12b66f71d22c6f99ef5b2728fedeb99defbe938))


### :wrench: Build System

* `lerna-changelog` added ([31ffece](https://github.com/hayes0724/shopify-packer/commit/31ffecef75ca753f618cd072e353e110928f8d08))
* development branch added to github workflow ([482066f](https://github.com/hayes0724/shopify-packer/commit/482066f57ccb8af89d5a6acb28ca480782d62eee))
* github workflow action added ([8afec77](https://github.com/hayes0724/shopify-packer/commit/8afec772c7a9ed82f31524f8673de44825d0956d))
* github workflow action added ([7886925](https://github.com/hayes0724/shopify-packer/commit/7886925961b03e8af024faed79b1edbe180e7f4e))


* test: ([8236d34](https://github.com/hayes0724/shopify-packer/commit/8236d34183d9951beaac80cb82ca37eb7d8cf422))
* Updated readme and added license ([7258e85](https://github.com/hayes0724/shopify-packer/commit/7258e85eee42fc028163356cf34c605c4ad49ccf))


### :boom: BREAKING CHANGES

* config is now located in `packer.config.js` and `packer.env.json`



# [1.1.0](https://github.com/hayes0724/shopify-packer/compare/1.0.7...1.1.0) (2020-10-01)


* Updated all packages to latest versions ([0d68d08](https://github.com/hayes0724/shopify-packer/commit/0d68d08aed480e7ebdb15e56faeae1b2998b215f))



## [1.0.7](https://github.com/hayes0724/shopify-packer/compare/1.0.6...1.0.7) (2020-09-27)


* bundle analyzer build command ([a8c3be6](https://github.com/hayes0724/shopify-packer/commit/a8c3be667eb569b70e3e40b1af6a2718e1c932b3))
* refactored dev build settings ([0536132](https://github.com/hayes0724/shopify-packer/commit/0536132fb7ad8ed52d720ae52ad8b7643ba1f9b3))
* fixed script tag creation ([97b7f02](https://github.com/hayes0724/shopify-packer/commit/97b7f022701340f6f3d2289a9802235bfae4b300))
* Update index.js ([1e57e4d](https://github.com/hayes0724/shopify-packer/commit/1e57e4daa48c96044b49ae91e74c588fbbdec1e9)), closes [#4](https://github.com/hayes0724/shopify-packer/issues/4)
* theme commands now use env argument ([1507e25](https://github.com/hayes0724/shopify-packer/commit/1507e252ec1eef1afe44b1d723314a7c2145f922))
* changed settings data prompt text ([886e731](https://github.com/hayes0724/shopify-packer/commit/886e731d88c057b9cb99151c3e559a6ccdc4cea5))



## [1.0.6](https://github.com/hayes0724/shopify-packer/compare/1.0.3...1.0.6) (2020-07-15)


* updated lodash version and removed jquery ([470b044](https://github.com/hayes0724/shopify-packer/commit/470b044b3fe17aec83a08d67dbcdab5bedad0cc1))
* Changed init to pull latest release and option for custom repo ([8832d7b](https://github.com/hayes0724/shopify-packer/commit/8832d7b941c446ea063ee243b949744c4f9e9566))
* check if webpack merge file exists before loading ([eb162be](https://github.com/hayes0724/shopify-packer/commit/eb162be8ca26dfe626014feb9cd8e45cbb9505f8))



## [1.0.3](https://github.com/hayes0724/shopify-packer/compare/1.0.1...1.0.3) (2020-07-01)


* merge and modify webpack config ([f318ded](https://github.com/hayes0724/shopify-packer/commit/f318dedc013319dc087703982b70594912bbdce7))
* start out put text changed ([0f425e5](https://github.com/hayes0724/shopify-packer/commit/0f425e5681dd5507c408b6242945cffcb6b7bb0f))
* updated readme with package name ([9077613](https://github.com/hayes0724/shopify-packer/commit/9077613ad2c9cbf44229ffcef5fc39adce0c01c6))
* added scope to packages.json ([e8dad23](https://github.com/hayes0724/shopify-packer/commit/e8dad23c715ad8257905703181fdad65ae242a3d))



## [1.0.1](https://github.com/hayes0724/shopify-packer/compare/1.0.0...1.0.1) (2020-06-19)


* updated package.json ([bc5378f](https://github.com/hayes0724/shopify-packer/commit/bc5378fd994cd7b6e49e3186a5c53d1b279b2ec9))

