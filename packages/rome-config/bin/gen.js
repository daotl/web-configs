#!/usr/bin/env node
const KEY_ORDER = [
  '$schema',
  'files',
  'linter',
  'formatter',
  'javascript',
].concat([
  'recommended',
  'a11y',
  'complexity',
  'correctness',
  'performance',
  'security',
  'style',
  'suspicious',
  'nursery',
])

const fs = require('node:fs')
const path = require('node:path')

const cwd = process.cwd()
let srcRequire = '../dist/rome.json'
let srcCwd = path.resolve(__dirname, srcRequire)
if ((argSrc = process.argv[2]) && fs.existsSync(argSrc)) {
  srcCwd = argSrc
  srcRequire = path.resolve(cwd, srcCwd)
}

let target = `${cwd}/rome.json`
if ((argTarget = process.argv[3]) && fs.existsSync(argTarget)) {
  target = argTarget.endsWith('rome.json')
    ? argTarget
    : argTarget.endsWith('/')
    ? `${argTarget}rome.json`
    : `${argTarget}/rome.json`
}

if (!fs.existsSync(`${cwd}/rome.ext.json`)) {
  try {
    fs.copyFileSync(srcCwd, target)
    console.log('"rome.json" generated to project root\n')
  } catch (err) {
    console.error(`Failed to generate "rome.json" to project root: ${err}\n`)
  }
  process.exit(0)
}

const deepmerge = require('deepmerge')
const stringify = require('json-stable-stringify')

const _conf = require(srcRequire)
const ext = require(`${cwd}/rome.ext.json`)
const conf = deepmerge(_conf, ext)

const keyOrder = (k) =>
  KEY_ORDER.indexOf(k) >= 0 ? KEY_ORDER.indexOf(k) : Infinity

try {
  fs.writeFileSync(
    target,
    stringify(conf, {
      space: 2,
      cmp: (a, b) => keyOrder(a.key) - keyOrder(b.key),
    }),
  )
  console.log('"rome.json" generated to project root\n')
} catch (err) {
  console.error(`Failed to generate "rome.json" to project root: ${err}\n`)
}
