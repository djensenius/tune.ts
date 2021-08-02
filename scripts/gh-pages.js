/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const ghpages = require('gh-pages');

ghpages.publish('docs', { dotfiles: true });
