const fs = require('node:fs')
const jsonc = require('jsonc-parser')

try {
  fs.mkdirSync('dist')
} catch (_e) {}

const conf = fs.readFileSync('src/biome.json', 'utf8').toString()
const out = fs.openSync('dist/biome.json', 'w')
fs.writeFileSync(out, JSON.stringify(jsonc.parse(conf), undefined, 2))
