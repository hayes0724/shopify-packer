#!/usr/bin/env node
'use strict';
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));

switch (process.argv[2]) {
    case 'init':
        require('./commands/init')(args);
        break;
    case 'start':
        require('./commands/start')(args);
        break;
    case 'build':
        require('./commands/build')(args);
        break;
    case 'deploy':
        require('./commands/deploy')(args);
        break;
    case 'watch':
        args.skipFirstDeploy = true;
        require('./commands/start')(args);
        break;
    case 'lint':
        require('./commands/lint')(args);
        break;
    case 'zip':
        require('./commands/zip')(args);
        break;
    case 'format':
        require('./commands/format')(args);
        break;
    case 'theme':
        require('./commands/help')(args);
        break;
    case 'theme:list':
        args.list = true;
        require('./commands/theme')(args);
        break;
    case 'theme:create':
        args.create = true;
        require('./commands/theme')(args);
        break;
    case 'theme:remove':
        args.remove = true;
        require('./commands/theme')(args);
        break;
    case 'theme:download':
        args.download = true;
        require('./commands/theme')(args);
        break;
    default:
        require('./commands/help')(args);
        break;
}
