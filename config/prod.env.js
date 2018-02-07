'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BACKEND: JSON.stringify(process.env.BACKEND) || '""'
}
