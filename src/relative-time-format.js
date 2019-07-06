const path = require('path')
const fs = require('fs')

// For local testing:
const umd = fs.readFileSync(path.join(__dirname, '../../relative-time-format/bundle/relative-time-format.js'), 'utf-8')
// const umd = fs.readFileSync(path.join(__dirname, '../node_modules/relative-time-format/bundle/relative-time-format.js'), 'utf-8')
const en = fs.readFileSync(path.join(__dirname, '../node_modules/relative-time-format/locale/en.json'), 'utf-8')
const en_GB = fs.readFileSync(path.join(__dirname, '../node_modules/relative-time-format/locale/en-GB.json'), 'utf-8')
const pl = fs.readFileSync(path.join(__dirname, '../node_modules/relative-time-format/locale/pl.json'), 'utf-8')
const intl = fs.readFileSync(path.join(__dirname, '../node_modules/intl/lib/core.js'), 'utf-8')
const intl_en = fs.readFileSync(path.join(__dirname, '../node_modules/intl/locale-data/jsonp/en.js'), 'utf-8')
const intl_pl = fs.readFileSync(path.join(__dirname, '../node_modules/intl/locale-data/jsonp/pl.js'), 'utf-8')

const script = umd + '\n' +
	'var en = ' + en + '\n' +
	'var en_GB = ' + en_GB + '\n' +
	'var pl = ' + pl + '\n' +
	'RelativeTimeFormat.addLocale(en)' + '\n' +
	'RelativeTimeFormat.addLocale(en_GB)' + '\n' +
	'RelativeTimeFormat.addLocale(pl)' + '\n' +
	'Object.defineProperty(Intl, "RelativeTimeFormat", { enumerable: false, configurable: true, writable: true, value: RelativeTimeFormat })' + '\n' +
	';(function(global){' + intl.replace('module.exports = Intl;', 'global.IntlPolyfill = Intl;') + '})(this);' + '\n' +
	'Intl.NumberFormat = IntlPolyfill.NumberFormat' + '\n' +
	intl_en +
	intl_pl

fs.writeFileSync(path.join(__dirname, '../build/relative-time-format.js'), script)
