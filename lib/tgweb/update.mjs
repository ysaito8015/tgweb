import * as PATH from "path"
import fs from "fs"
import generateHTML from "./generate_html.mjs"

const updateHTML = function(path, siteData) {
  const html = generateHTML(path, siteData)

  if (html !== undefined) {
    const targetPath = path.replace(/^src\//, "dist/")
    const targetDir = PATH.dirname(targetPath)

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(targetPath, html)
  }
}

export default updateHTML
