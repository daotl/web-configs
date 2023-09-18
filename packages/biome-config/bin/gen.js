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
let srcRequire = '../dist/biome.json'
let srcCwd = path.resolve(__dirname, srcRequire)
const argSrc = process.argv[2]
if (argSrc && fs.existsSync(argSrc)) {
  srcCwd = argSrc
  srcRequire = path.resolve(cwd, srcCwd)
}

let target = `${cwd}/biome.json`
const argTarget = process.argv[3]
if (argTarget && fs.existsSync(argTarget)) {
  target = argTarget.endsWith('biome.json')
    ? argTarget
    : argTarget.endsWith('/')
    ? `${argTarget}biome.json`
    : `${argTarget}/biome.json`
}

if (!fs.existsSync(`${cwd}/biome.ext.json`)) {
  try {
    fs.copyFileSync(srcCwd, target)
    console.log('"biome.json" generated to project root\n')
  } catch (err) {
    console.error(`Failed to generate "biome.json" to project root: ${err}\n`)
  }
  process.exit(0)
}

const deepmerge = require('deepmerge')
const stringify = require('json-stable-stringify')

const _conf = require(srcRequire)
const ext = require(`${cwd}/biome.ext.json`)
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
  console.log('"biome.json" generated to project root\n')
} catch (err) {
  console.error(`Failed to generate "biome.json" to project root: ${err}\n`)
}
