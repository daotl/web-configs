const fs = require('node:fs')

const cwd = process.cwd()
if (!cwd.includes('node_modules')) {
  process.exit(0)
}

try {
  fs.copyFile(
    `${cwd}/dist/rome.json`,
    `${cwd.split('node_modules')[0]}/rome.json`,
    () => {
      console.log('@daotl/rome-config/dist/rome.json copied to project root\n')
    },
  )
} catch (err) {
  console.error(
    `Failed to copy @daotl/rome-config/dist/rome.json to project root: ${err}\n`,
  )
}
