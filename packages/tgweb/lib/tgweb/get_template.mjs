import fs from "fs"
import toml from "toml"
import { parseDocument } from "htmlparser2"
import { expandClassAliases } from "./expand_class_aliases.mjs"
import { showTomlSytaxError } from "./show_toml_syntax_error.mjs"
import { normalizeFrontMatter } from "./normalize_front_matter.mjs"

const separatorRegex = new RegExp("^---\\n", "m")

const getTemplate = (path, type, siteProperties) => {
  const source = fs.readFileSync(path).toString().replaceAll(/\r/g, "")
  const parts = source.split(separatorRegex)

  if (parts[0] === "" && parts[1] !== undefined) {
    try {
      const frontMatter = toml.parse(parts[1])
      normalizeFrontMatter(frontMatter)
      const html = parts.slice(2).join("---\n")
      return createTemplate(path, type, html, frontMatter, siteProperties)
    }
    catch (error) {
      showTomlSytaxError(path, parts[1], error)

      const frontMatter = {layer: 0}
      const html = parts.slice(2).join("---\n")
      return createTemplate(path, type, html, frontMatter, siteProperties)
    }
  }
  else {
    return createTemplate(path, type, source, {}, siteProperties)
  }
}

const createTemplate = (path, type, html, frontMatter, siteProperties) => {
  const dom = parseDocument(html)
  dom.children.forEach(child => expandClassAliases(child, frontMatter))
  const inserts = extractInserts(dom)
  const shortPath = path.replace(/^src\//, "")

  if (type === "page" || type === "article" && frontMatter["embedded-only"] !== true) {
    const canonicalPath =
      shortPath.replace(/^pages\//, "").replace(/\/index.html$/, "/").replace(/^index.html$/, "")

    frontMatter["url"] = siteProperties["root-url"] + canonicalPath
  }

  return { path: shortPath, type, frontMatter, dom, inserts, dependencies: [] }
}

const extractInserts = (dom) => {
  const inserts = {}

  dom.children
    .filter(child => child.constructor.name === "Element" && child.name === "tg:insert")
    .forEach(child => {
      const name = child.attribs.name

      if (name) inserts[name] = child
    })

  dom.children =
    dom.children.filter(child =>
      child.constructor.name !== "Element" || child.name !== "tg:insert"
    )

  return inserts
}

export { getTemplate }
