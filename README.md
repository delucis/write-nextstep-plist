# write-nextstep-plist [![Build Status](https://travis-ci.org/delucis/write-nextstep-plist.svg?branch=master)](https://travis-ci.org/delucis/write-nextstep-plist) [![Coverage Status](https://coveralls.io/repos/github/delucis/write-nextstep-plist/badge.svg?branch=master)](https://coveralls.io/github/delucis/write-nextstep-plist?branch=master)

> Stringify and write a NeXTSTEP property list [atomically](https://github.com/npm/write-file-atomic)

Converts a Javascript object into a property list string in the NeXTSTEP “plain text” format and writes it to disk. Creates directories for you as needed.

**N.B.** The NeXTSTEP format is different from both the XML and JSON plist formats.


## Install

```
$ npm install --save write-nextstep-plist
```


## Usage

```js
const WRITE_PLIST = require('write-nextstep-plist')

WRITE_PLIST('demo.plist', {demo: true}).then(() => {
	console.log('done')
})
```


## API

### writeNextstepPlist(filepath, data, [options])

Returns a `Promise`.

### writeNextstepPlist.sync(filepath, data, [options])

```js
const WRITE_PLIST = require('write-nextstep-plist')

WRITE_PLIST.sync('demo.plist', {demo: true})
console.log('done')
```

#### options

Type: `Object`

##### mode

Type: `number`<br>
Default: `0o666`

[Mode](https://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation) used when writing the file.


## See also

- [load-nextstep-plist](https://github.com/delucis/load-nextstep-plist) - Read and parse a NeXTSTEP property list file

## Acknowledgements

Stringifying is accomplished using Chee’s [`nextstep-plist`](https://www.npmjs.com/package/nextstep-plist) module.

This module is modelled on Sindre Sorhus’s [`write-json-file`](https://github.com/sindresorhus/write-json-file).

## License

This software is free to use, modify, and redistribute under a [GNU General Public License](http://www.gnu.org/licenses/gpl-3.0.txt).
