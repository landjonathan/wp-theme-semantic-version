#!/usr/bin/env node

const bump = require('../index')

;(async () => {
  const [, , type, path] = process.argv
  await bump(type, path)
})()