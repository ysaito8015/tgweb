const normalizeFrontMatter = frontMatter => {
  const tableNames = ["data", "style"]

  tableNames.forEach(tableName => {
    if (typeof frontMatter[tableName] !== "object") frontMatter[tableName] = {}
  })

  Object.keys(frontMatter.style).forEach(key => {
    if (typeof frontMatter.style[key] !== "string") delete frontMatter.style[key]

    frontMatter.style[key] =
      frontMatter.style[key].replaceAll(/(\S+)\s*\{([^}]+)\}/g, (_, modifier, tokens) =>
        tokens.trim().split(/\s+/).map(token => `${modifier}:${token}`).join(" ")
      )
      .trim().replaceAll(/\s+/g, " ")
  })

  if (! Number.isInteger(frontMatter.layer)) frontMatter.layer = 0
  if (frontMatter.layer < 0) frontMatter.layer = 0
}

export { normalizeFrontMatter }
