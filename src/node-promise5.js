// @ts-check
/* eslint-disable */

const fs = require('fs')

fs.readFile('.gitignore', 'utf-8', (error, value) => {
  console.log(value)
})
