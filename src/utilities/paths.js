const path = require('path');
const getTemplateEntrypoints = require('./get-template-entrypoints');
const getLayoutEntrypoints = require('./get-layout-entrypoints');

const root = process.cwd();
const roots = {
    src: path.resolve(root, 'src'),
    dist: path.resolve(root, 'dist'),
};


const config = {
    root: root,
    commonExcludes: [/node_modules/, /assets\/static/],
    cache: path.join(root, '.cache'),
    settings: path.resolve(root, 'config.json'),
    merge: {
        dev: path.resolve(root, 'dev.config.js'),
        prod: path.resolve(root, 'prod.config.js'),
    },
    postcss: path.resolve(root, 'postcss.config.js'),
    themelint: {
        bin: path.resolve(__dirname, '../../node_modules/.bin/theme-lint'),
        config: path.resolve(__dirname, '../../node_modules/.bin/theme-lint'),
        ignore: path.resolve(__dirname, '../../node_modules/.bin/theme-lint')
    },
    eslint: {
        bin: path.resolve(__dirname, '../../node_modules/.bin/eslint'),
        ignore: path.resolve(root, '.eslintignore'),
        config: path.resolve(root, '.eslintrc')
    },
    prettier: {
        bin: path.resolve(__dirname, '../../node_modules/.bin/prettier'),
        ignore: path.resolve(root, '.prettierignore'),
        config: path.resolve(root, '.prettierrc')
    },
    stylelint: {
        bin: path.resolve(__dirname, '../../node_modules/.bin/stylelint'),
        ignore: path.resolve(root, '.stylelintignore'),
        config: path.resolve(root, '.stylelintrc')
    },
    theme: {
        root: process.cwd(),
        packageJson:  path.join(root, 'package.json'),
        src: {
            assets: path.resolve(roots.src, './assets'),
            config: path.resolve(roots.src, './config'),
            scripts: path.resolve(roots.src, './scripts'),
            styles: path.resolve(roots.src, './styles'),
            layout: path.resolve(roots.src, './layout'),
            locales: path.resolve(roots.src, './locales'),
            snippets: path.resolve(roots.src, './snippets'),
            templates: path.resolve(roots.src, './templates'),
            customers: path.resolve(roots.src, './templates/customers'),
            sections: path.resolve(roots.src, './sections'),
            root: roots.src
        },
        dist: {
            assets: path.resolve(roots.dist, './assets'),
            config: path.resolve(roots.dist, './config'),
            scripts: path.resolve(roots.dist, './scripts'),
            styles: path.resolve(roots.dist, './styles'),
            layout: path.resolve(roots.dist, './layout'),
            locales: path.resolve(roots.dist, './locales'),
            snippets: path.resolve(roots.dist, './snippets'),
            templates: path.resolve(roots.dist, './templates'),
            customers: path.resolve(roots.dist, './templates/customers'),
            sections: path.resolve(roots.dist, './sections'),
            root: roots.dist
        },
    },
};

config.liquidTemplates = getTemplateEntrypoints(config);
config.liquidLayouts = getLayoutEntrypoints(config);
config.entrypoints = {...config.liquidTemplates, ...config.liquidLayouts};

module.exports = {
    config,
};
