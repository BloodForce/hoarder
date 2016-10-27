[![Dev dependencies][dependencies-badge]][dependencies]
[![Node.js version][nodejs-badge]][nodejs]
[![NPM version][npm-badge]][npm]

[![MIT License][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]
[![Donate][donate-badge]][donate]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

# node-typescript-boilerplate

Minimalistic boilerplate to jump-start a [Node.js][nodejs] project in [TypeScript][typescript] 2.0.

Provides a basic template, batteries included:

+ [TypeScript][typescript] to ES6 transpilation,
+ [TSLint][tslint] with a general recommendation for a good default configuration, 
+ [Jest][jest] unit testing and coverage,
+ Type definitions for Node.js and Jest,
+ [NPM scripts for common operations](#available-scripts),
+ .editorconfig for consistent file format.

## Quick start

This project requires [Node.js][nodejs] 6.2+ and [NPM][npm]. Make sure you have those installed. Then just type following commands:

```
git clone https://github.com/jsynowiec/node-typescript-boilerplate
cd node-typescript-boilerplate
npm install
```

## Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `watch` - interactive watch mode to automatically transpile source files, 
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests

## Alternative

As an alternative to TypeScript, you can try my [Node.js Flow boilerplate][flow-boilerplate]. It's basically the same but with ES6, async/await, Flow type checking and ESLint.

## License
MIT License. See the [LICENSE](https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE) file.

[dependencies-badge]: https://david-dm.org/jsynowiec/node-typescript-boilerplate/dev-status.svg?style=flat-square
[dependencies]: https://david-dm.org/jsynowiec/node-typescript-boilerplate?type=dev
[nodejs-badge]: https://img.shields.io/badge/node->=%206.2.0-blue.svg?style=flat-square
[nodejs]: https://nodejs.org/dist/latest-v6.x/docs/api/
[npm-badge]: https://img.shields.io/badge/npm->=%203.8.9-blue.svg?style=flat-square
[npm]: https://docs.npmjs.com/
[typescript]: https://www.typescriptlang.org/
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[donate]: http://bit.ly/donate-js
[github-watch-badge]: https://img.shields.io/github/watchers/jsynowiec/node-typescript-boilerplate.svg?style=social
[github-watch]: https://github.com/jsynowiec/node-typescript-boilerplate/watchers
[github-star-badge]: https://img.shields.io/github/stars/jsynowiec/node-typescript-boilerplate.svg?style=social
[github-star]: https://github.com/jsynowiec/node-typescript-boilerplate/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20this%20Node.js%20TypeScript%20boilerplate!%20https://github.com/jsynowiec/node-typescript-boilerplate%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/jsynowiec/node-typescript-boilerplate.svg?style=social
[jest]: https://facebook.github.io/jest/
[tslint]: https://palantir.github.io/tslint/

[flow-boilerplate]: https://github.com/jsynowiec/node-flowtype-boilerplate