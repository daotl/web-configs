#!/usr/bin/env node
const { exec } = require('node:child_process')

const cwd = process.cwd()
if (!cwd.includes('node_modules')) {
  process.exit(0)
}

const wd = `${cwd.split('node_modules')[0]}`
exec('npx gen-rome-json', { cwd: wd }, (error, stdout, stderr) => {
  if (error) {
    return console.error(error.message)
  }
  if (stderr) {
    return console.error(stderr)
  }
  console.log(stdout)
})
