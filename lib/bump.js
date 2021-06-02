const semver = require('semver')
const fs = require('fs').promises
const path = require('path')
const splitOnce = require('../helpers/splitOnce')

const bump = async (type = 'patch', filePath = path.join(process.cwd(), '/style.css')) => {
  const data = await fs.readFile(filePath)
  const content = await data.toString('utf8')
  const [pre, main] = splitOnce(content, 'Version: ')
  let [currentVersion, post] = splitOnce(main, '\n')
  // console.log({ content, pre, currentVersion, post })

  if (!semver.parse(currentVersion)) {
    if (!semver.coerce(currentVersion)) {
      throw `No valid version found at ${filePath}`
    } else {
      currentVersion = semver.coerce(currentVersion)
    }
  }

  const newVersion = semver.inc(currentVersion, type)
  let newContent = pre + 'Version: ' + newVersion + '\n' + post

  await fs.writeFile(filePath, newContent)

  console.log(`Bumped to ${newVersion} from ${currentVersion}`)
}

module.exports = bump

module.exports.patch = (path) => bump('patch', path)
module.exports.minor = (path) => bump('minor', path)
module.exports.major = (path) => bump('major', path)