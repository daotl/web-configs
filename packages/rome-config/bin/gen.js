#!/usr/bin/env node
const keyOrder = ['$schema', 'files', 'linter', 'formatter', 'javascript']

const fs = require('node:fs')
const path = require('node:path')

const cwd = process.cwd()
const target = `${cwd}/rome.json`

if (!fs.existsSync(`${cwd}/rome.ext.json`)) {
  try {
    fs.copyFileSync(path.resolve(__dirname, '../dist/rome.json'), target)
    console.log('@daotl/rome-config/dist/rome.json generated to project root\n')
  } catch (err) {
    console.error(
      `Failed to generate @daotl/rome-config/dist/rome.json to project root: ${err}\n`,
    )
  }
  process.exit(0)
}

const deepmerge = require('deepmerge')
const stringify = require('json-stable-stringify')

const _conf = require('../dist/rome.json')
const ext = require(`${cwd}/rome.ext.json`)
const conf = deepmerge(_conf, ext)

try {
  fs.writeFileSync(
    target,
    stringify(conf, {
      space: 2,
      cmp: (a, b) => keyOrder.indexOf(a.key) - keyOrder.indexOf(b.key),
    }),
  )
  console.log('@daotl/rome-config/dist/rome.json generated to project root\n')
} catch (err) {
  console.error(
    `Failed to generate @daotl/rome-config/dist/rome.json to project root: ${err}\n`,
  )
}
