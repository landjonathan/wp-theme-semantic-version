const assert = require('assert')
const bump = require('../lib/bump')
const path = require('path')
const { promises: fs, existsSync } = require('fs')
const rimraf = require('rimraf')

describe('wp-theme-semantic-version', () => {
  const filesFolder = path.join(__dirname, 'theme')
  const filePath = path.join(filesFolder, '/style.css')

  const writeTestFile = async (path = filePath) => {
    await fs.writeFile(path,
      `/**
  * Theme Name: Test Theme
  * Description: A theme for testing semver
  * Author: Jonathan Land
  * Author URI: https://jonathanland.design
  * Version: 0.0.1
  * Text Domain: test
**/
`
    )
  }

  before(async () => {
    if (!existsSync(filesFolder))
      await fs.mkdir(filesFolder)
    process.chdir(filesFolder)
  })

  beforeEach(async () => {
    await writeTestFile()
  })

  after(() => {
    rimraf(filesFolder, () => {})
  })

  const getTestFileText = async (path = filePath) => {
    const file = await fs.readFile(path)
    return file.toString()
  }

  describe('bump', () => {
    it('should bump to a patch version by default', async () => {
      await bump()
      const text = await getTestFileText()
      assert.match(text, /Version: 0.0.2/)
    })

    it('should bump to a minor version', async () => {
      await bump('minor')
      const text = await getTestFileText()
      assert.match(text, /Version: 0.1.0/)
    })

    it('should bump to a major version', async () => {
      await bump('major')
      const text = await getTestFileText()
      assert.match(text, /Version: 1.0.0/)
    })

    it('should bump a custom file path', async () => {
      const customPath = path.join(filesFolder, '/custom')
      if (!existsSync(customPath))
        await fs.mkdir(customPath)
      const customFilePath = path.join(filesFolder, '/custom/style.css')
      await writeTestFile(customFilePath)
      await bump(undefined, customFilePath)
      const text = await getTestFileText(customFilePath)
      assert.match(text, /Version: 0.0.2/)
    })
  })
})