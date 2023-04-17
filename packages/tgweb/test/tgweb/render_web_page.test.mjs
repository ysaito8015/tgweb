import assert from "node:assert/strict"
import { getSiteData } from "../../lib/tgweb/get_site_data.mjs"
import { renderWebPage } from "../../lib/tgweb/render_web_page.mjs"
import { fileURLToPath } from "url";
import * as PATH from "path"
import render from "dom-serializer"
import pretty from "pretty"
import { inspectDom } from "../../lib/utils/inspect_dom.mjs"

// Prevent warnings when function inspectDom is not used.
if (inspectDom === undefined) { inspectDom() }

const __dirname = PATH.dirname(fileURLToPath(import.meta.url))

describe("renderWebSite", () => {
  it("should render a page of 'minimum' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/minimum")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Hello, world!</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <h1 class="text-xl m-2">Hello, world!</h1>',
      '    <p class="m-1">I am a <em>computer</em>.</p>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render a page of 'minimum_with_title' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/minimum_with_title")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Greeting</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <h1 class="text-xl m-2">Hello, world!</h1>',
      '    <p class="m-1">I am a <em>computer</em>.</p>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render a page of 'with_meta_props' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_meta_props")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Greeting</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      `    <meta http-equiv="content-security-policy" content="default-src 'self'">`,
      '    <meta property="fb:app_id" content="0123456789abced">',
      '    <meta property="og:type" content="website">',
      '    <meta property="og:url" content="${url}">',
      '    <meta property="og:title" content="Greeting">',
      '    <meta property="og:image" content="%{/images/icons/default.png}">',
      '    <link rel="canonical" href="%{/}">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <h1 class="text-xl m-2">Hello, world!</h1>',
      '    <p class="m-1">I am a <em>computer</em>.</p>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render a page of 'with_layout' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_layout")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Greeting</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <header>Header</header>',
      '    <div class="my-4 p-2 bg-blue-100">',
      '      <h1 class="text-xl m-2">Hello, world!</h1>',
      '      <p class="m-1">I am a <em>computer</em>.</p>',
      '      <div>',
      '        <strong>X</strong>',
      '        Y',
      '      </div>',
      '      <div>',
      '        <strong>X</strong>',
      '      </div>',
      '    </div>',
      '    <footer>Footer</footer>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render a page of 'with_wrapper' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_wrapper")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Hello, world!</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <div class="my-4 p-2 bg-green-100 md:my-6 md:p-4 [&>p]:mb-2 [&>p]:p-1">',
      '      <h1 class="text-xl m-2">Hello, world!</h1>',
      '      <p>I am a <em>computer</em>.</p>',
      '      <div>',
      '        <em>X</em>',
      '      </div>',
      '    </div>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render a page of 'with_wrapper_and_layout' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_wrapper_and_layout")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Hello, world!</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <header>Header</header>',
      '    <main class="my-4 p-2">',
      '      <div class="my-4 p-2 bg-green-100">',
      '        <h1 class="text-xl m-2">Hello, world!</h1>',
      '        <p class="m-1">I am a <em>computer</em>.</p>',
      '      </div>',
      '    </main>',
      '    <footer>Footer</footer>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render a page of 'with_component' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_component")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Greeting</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <h1 class="text-xl m-2">Hello, world!</h1>',
      '    <div><span class="badge badge-primary">',
      '  M',
      '  AAA',
      '</span>',
      '    </div>',
      '    <div>',
      '      <h3>Warning</h3>',
      '      <p>You <em>cannot</em> do it.</p>',
      '    </div>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render a page of 'with_segment' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_segment")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Greeting</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <div class="hero">',
      '      HERO',
      '    </div>',
      '    <div>X</div>',
      '    <div>X</div>',
      '    <h1 class="text-xl m-2">Hello, world!</h1>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render an article of 'with_articles' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_articles")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/articles/about_me.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>About me</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <article>',
      '      <h1 class="text-xl m-2">About me</h1>',
      '      <p class="m-1">My name is Alice.</p>',
      '      <hr class="border border-gray-500">',
      '      <div>',
      '        Comment',
      '      </div>',
      '    </article>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render a page of 'with_articles' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_articles")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Greeting</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <header>Header</header>',
      '    <div class="my-4 p-2 bg-blue-100">',
      '      <article>',
      '        <h1 class="text-xl m-2">About me</h1>',
      '        <p class="m-1">My name is Alice.</p>',
      '        <hr class="border border-gray-500">',
      '        <div>',
      '          Comment',
      '        </div>',
      '      </article>',
      '      <article>',
      '        <h1 class="text-xl m-2">A</h1>',
      '        <p class="m-1">The first article.</p>',
      '      </article>',
      '      <article>',
      '        <h1 class="text-xl m-2">B</h1>',
      '        <p class="m-1">The second article.</p>',
      '      </article>',
      '    </div>',
      '    <footer>Footer</footer>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should sort embedded articles by index", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_articles")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/info.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Info</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <header>Header</header>',
      '    <div class="my-4 p-2 bg-blue-100">',
      '      <article class="bg-gray-100">',
      '        <div><span class="badge badge-primary">B</span>',
      '        </div>',
      '        <h1>J</h1>',
      '      </article>',
      '      <article class="bg-gray-100">',
      '        <div><span class="badge badge-primary">B</span>',
      '        </div>',
      '        <h1>K</h1>',
      '      </article>',
      '      <article class="bg-gray-100">',
      '        <div><span class="badge badge-primary">B</span>',
      '        </div>',
      '        <h1>I</h1>',
      '      </article>',
      '    </div>',
      '    <footer>Footer</footer>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render 'index.html' of 'with_link_list' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_link_list")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Greeting</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <header>Header</header>',
      '    <div class="my-4 p-2 bg-blue-100">',
      '      <ul>',
      '        <li>',
      '          <a href="/articles/blog/a.html">',
      '            A',
      '            <span class="text-sm">',
      '            (2024-01-01)',
      '          </span>',
      '          </a>',
      '        </li>',
      '        <li>',
      '          <a href="/articles/blog/b.html">',
      '            B',
      '          </a>',
      '        </li>',
      '      </ul>',
      '    </div>',
      '    <footer>Footer</footer>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render 'info.html' of 'with_link_list' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_link_list")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/info.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Info</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <header>Header</header>',
      '    <div class="my-4 p-2 bg-blue-100">',
      '      <ul>',
      '        <li>',
      '          <a href="/articles/info/j.html">',
      '            J',
      '          </a>',
      '        </li>',
      '        <li>',
      '          <a href="/articles/info/k.html">',
      '            K',
      '          </a>',
      '        </li>',
      '        <li>',
      '          <a href="/articles/info/i.html">',
      '            I',
      '          </a>',
      '        </li>',
      '      </ul>',
      '    </div>',
      '    <footer>Footer</footer>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render the 'index.html' of 'with_links' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_links")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Home</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <header>Header</header>',
      '    <div class="my-4 p-2 bg-blue-100">',
      '      <header>',
      '        <span class="font-bold">Home</span>',
      '        <a href="/about.html">About</a>',
      '      </header>',
      '      <h2>Home</h2>',
      '    </div>',
      '    <footer>Footer</footer>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render the 'about.html' of 'with_links' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/with_links")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/about.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>About Us</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body>',
      '    <header>',
      '      <a href="/">Home</a>',
      '      <span class="font-bold">About</span>',
      '    </header>',
      '    <h2>About Us</h2>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render the 'index.html' of 'site_0' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/site_0")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>Home</title>',
      '    <meta name="viewport" content="width=device-width, initial-scale=1">',
      `    <meta http-equiv="content-security-policy" content="default-src 'self'">`,
      '    <meta property="fb:app_id" content="0123456789abced">',
      '    <meta property="og:type" content="website">',
      '    <meta property="og:url" content="${url}">',
      '    <meta property="og:title" content="Home">',
      '    <meta property="og:image" content="%{/images/icons/default.png}">',
      '    <link rel="canonical" href="%{/}">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body class="p-2">',
      '    <div class="grid grid-cols-1 gap-6 x:grid-cols-2 lg:grid-cols-3">',
      '      <div class="bg-gray-100 py-2">',
      '        <h3 class="font-bold text-lg ml-2">Greeting</h3>',
      '        <div class="flex justify-center">',
      '          Hello, world!',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })

  it("should render the 'index.html' of 'site_1' site", () => {
    const wd = PATH.resolve(__dirname, "../sites/site_1")
    const siteData = getSiteData(wd)

    const dom = renderWebPage("src/pages/index.html", siteData)

    const html = pretty(render(dom, {encodeEntities: false}), {ocd: true})
    const lines = html.trim().split("\n")

    const expected = [
      '<html>',
      '  <head>',
      '    <meta charset="utf-8">',
      '    <title>FizzBuzz</title>',
      '    <meta property="og:image" content="%{/images/red_square.png}">',
      '    <link rel="stylesheet" href="/css/tailwind.css">',
      '    <script src="/js/tgweb_utilities.js" defer></script>',
      '    <script src="/js/alpine.min.js" defer></script>',
      '    <script src="/reload/reload.js" defer></script>',
      '  </head>',
      '  <body class="p-2">',
      '    <nav>',
      '      <span class="font-bold">Home</span>',
      '      <a href="/about.html" class="underline text-blue-500">About Us</a>',
      '    </nav>',
      '    <div class="grid">',
      '      <div class="bg-gray-100 p-2">',
      '        <p class="mb-2">Hello, world!</p>',
      '        <p>',
      '          Hello, <span class="text-red-800">great</span>',
      '          <span class="text-green-800">world!</span>',
      '        </p>',
      '      </div>',
      '      <div class="bg-gray-100 p-2">',
      '        <p>I am a computer.</p>',
      '      </div>',
      '      <div class="bg-gray-100 py-2">',
      '        <h3 class="font-bold text-lg ml-2">FizzBuzz</h3>',
      '        <div class="flex justify-center">',
      '          <div></div>',
      '        </div>',
      '        <main>',
      '          <div class="bg-gray-100 py-2">',
      '            <h3 class="font-bold text-lg ml-2">Technology</h3>',
      '            <nav>',
      '              <ul>',
      '                <li>',
      '                  <a href="/articles/blog/d.html">X</a>',
      '                  (<span>2023-01-03</span>)',
      '                  <span>New</span>',
      '                </li>',
      '                <li>',
      '                  <a href="/articles/blog/a.html">Y</a>',
      '                  (<span>2022-12-31</span>)',
      '                </li>',
      '                <li>',
      '                  <a href="/articles/blog/c.html">Z</a>',
      '                  (<span>2023-01-02</span>)',
      '                </li>',
      '              </ul>',
      '            </nav>',
      '          </div>',
      '          <div class="bg-gray-100 py-2">',
      '            <h3 class="font-bold text-lg ml-2">',
      '              A',
      '            </h3>',
      '            <p>',
      '              <a href="/">Home</a>',
      '              <a href="/articles/about.html">About</a>',
      '              <a href="/articles/blogs/c.html">C</a>',
      '            </p>',
      '            <div id="custom-props">',
      '              W',
      '              X',
      '              2',
      '              3',
      '            </div>',
      '            <p></p>',
      '            <div>2022-12-31</div>',
      '          </div>',
      '          <div class="bg-gray-100 py-2">',
      '            <h3 class="font-bold text-lg ml-2">',
      '              D',
      '            </h3>',
      '            <p>This is D.</p>',
      '            <div>2023-01-03</div>',
      '          </div>',
      '          <div class="bg-gray-100 py-2">',
      '            <h3 class="font-bold text-lg ml-2">',
      '              C',
      '            </h3>',
      '            <p>This is C.</p>',
      '            <div>2023-01-02</div>',
      '          </div>',
      '          <div class="bg-gray-100 py-2">',
      '            <h3 class="font-bold text-lg ml-2">',
      '              E',
      '            </h3>',
      '            <p>This is E.</p>',
      '          </div>',
      '        </main>',
      '        <aside>',
      '          <div>Special Content</div>',
      '        </aside>',
      '      </div>',
      '    </div>',
      '    <footer>',
      '      © 2023 Example Inc.',
      '    </footer>',
      '  </body>',
      '</html>'
    ]

    assert.deepEqual(lines, expected)
  })
})