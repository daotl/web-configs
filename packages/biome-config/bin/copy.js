#!/usr/bin/env node
const fs = require('node:fs')

const cwd = process.cwd()
if (!cwd.includes('node_modules')) {
  process.exit(0)
}

try {
  fs.copyFile(
    `${cwd}/dist/biome.json`,
    `${cwd.split('node_modules')[0]}/biome.json`,
    () => {
      console.log(
        '@daotl/biome-config/dist/biome.json copied to project root\n',
      )
    },
  )
} catch (err) {
  console.error(
    `Failed to copy @daotl/biome-config/dist/biome.json to project root: ${err}\n`,
  )
}
