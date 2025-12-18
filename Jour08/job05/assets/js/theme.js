document.getElementById('themeToggle')?.addEventListener('click', function(){
  var isDark = document.documentElement.classList.contains('dark')
  if (isDark) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }
  if (window.applyMonacoTheme) window.applyMonacoTheme()
  })

document.getElementById('mobileMenu')?.addEventListener('click', function(){
  var el = document.getElementById('sidebar')
  if (!el) return
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden')
  } else {
    el.classList.add('hidden')
  }
})

;(function initThemeSelector(){
  var header = document.getElementById('siteHeader')
  if (!header) return
  var btn = document.getElementById('themeSelectorBtn')
  var menu = document.getElementById('themeSelectorMenu')
  if (!btn || !menu) return
  function applySystem(){
    var prefersDark = false
    try { prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches } catch (_) {}
    if (prefersDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }
  function setMode(mode){
    if (mode === 'light') {
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    } else if (mode === 'dark') {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      localStorage.setItem('theme', 'system')
      applySystem()
    }
    if (window.applyMonacoTheme) window.applyMonacoTheme()
  }
  ;(function initFromStorage(){
    var saved = localStorage.getItem('theme') || 'system'
    if (saved === 'light') document.documentElement.classList.remove('dark')
    else if (saved === 'dark') document.documentElement.classList.add('dark')
    else applySystem()
  })()
  try {
    var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
    if (mq && mq.addEventListener) mq.addEventListener('change', function(){ if ((localStorage.getItem('theme')||'system') === 'system') { applySystem(); if (window.applyMonacoTheme) window.applyMonacoTheme() } })
  } catch (_) {}
  btn.addEventListener('click', function(e){
    e.preventDefault()
    var expanded = btn.getAttribute('aria-expanded') === 'true'
    btn.setAttribute('aria-expanded', expanded ? 'false' : 'true')
    menu.classList.toggle('hidden', expanded)
  })
  document.addEventListener('click', function(e){
    if (!header.contains(e.target)) {
      btn.setAttribute('aria-expanded', 'false')
      menu.classList.add('hidden')
    }
  })
  var opts = menu.querySelectorAll('[role="option"][data-mode]')
  for (var i=0;i<opts.length;i++){
    opts[i].addEventListener('click', function(){
      var mode = this.getAttribute('data-mode') || 'system'
      setMode(mode)
      btn.setAttribute('aria-expanded', 'false')
      menu.classList.add('hidden')
    })
  }
})()

;(function(){
  var header = document.getElementById('siteHeader')
  if (!header) return
  var base = 'sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-transparent px-4 py-5 shadow-none transition duration-500 sm:px-6 lg:px-8 dark:shadow-none dark:bg-transparent'
  var scrolled = 'sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none dark:bg-slate-900/95 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
  function apply(){
    var y = Math.round(window.pageYOffset || document.documentElement.scrollTop || 0)
    if (y <= 1) {
      header.className = base
    } else {
      header.className = scrolled
    }
  }
  window.applyHeaderClasses = apply
  window.addEventListener('scroll', apply, { passive: true })
  window.addEventListener('load', apply)
  window.addEventListener('resize', apply)
  window.addEventListener('hashchange', apply)
  apply()
})()

;(function(){
  var sidebar = document.getElementById('sidebar')
  var onpage = document.getElementById('onpageAside')
  if (!sidebar && !onpage) return
  function scrollToHash(hash){
    if (!hash) return
    var target = document.querySelector(hash)
    if (!target) return
    var header = document.getElementById('siteHeader')
    var offset = header ? header.offsetHeight + 16 : 0
    var y = target.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
    history.replaceState(null, '', hash)
  }
  function loadPage(page, hash, historyMode){
    var url = '?page=' + encodeURIComponent(page)
    fetch(url, { credentials: 'same-origin' })
      .then(function(r){ return r.text() })
      .then(function(html){
        var doc = new DOMParser().parseFromString(html, 'text/html')
        var newMain = doc.getElementById('mainContent')
        var newAside = doc.getElementById('onpageAside')
        var mainEl = document.getElementById('mainContent')
        var asideEl = document.getElementById('onpageAside')
        if (newMain && mainEl) mainEl.innerHTML = newMain.innerHTML
        if (newAside && asideEl) asideEl.innerHTML = newAside.innerHTML
        var newUrl = url + (hash || '')
        if (historyMode === 'push') {
          history.pushState({ page: page, hash: hash }, '', newUrl)
        } else if (historyMode === 'replace') {
          history.replaceState({ page: page, hash: hash }, '', newUrl)
        }
        if (hash) scrollToHash(hash)
        if (window.initMonacoEditors) window.initMonacoEditors()
        if (window.applyHeaderClasses) window.applyHeaderClasses()
      })
      .catch(function(){
        window.location.href = url + (hash || '')
      })
  }
  function updateActiveSidebar(){
    var sidebar = document.getElementById('sidebar')
    if (!sidebar) return
    var links = sidebar.querySelectorAll('a[href]')
    var current = window.location.pathname + window.location.search + window.location.hash
    for (var i=0; i<links.length; i++){
      var a = links[i]
      var href = a.getAttribute('href')
      var u = new URL(href, window.location.href)
      var isActive = (u.search === window.location.search) && (u.hash === window.location.hash || (u.hash==='' && window.location.hash===''))
      a.classList.remove('text-slate-900','dark:text-white','font-semibold','before:block','before:bg-sky-400','dark:before:bg-sky-400')
      a.classList.remove('text-slate-500','dark:text-slate-400','before:hidden','hover:text-slate-600','dark:hover:text-slate-300','text-sky-500','dark:text-sky-400','hover:text-sky-600','dark:hover:text-sky-300')
      if (isActive){
        a.classList.add('text-sky-500','dark:text-sky-400','font-semibold','before:block','before:bg-sky-400','dark:before:bg-sky-400','hover:text-sky-600','dark:hover:text-sky-300')
      } else {
        a.classList.add('text-slate-500','dark:text-slate-400','hover:text-slate-600','dark:hover:text-slate-300','before:hidden','before:bg-slate-300','dark:before:bg-slate-600')
      }
    }
  }
  if (sidebar) {
    sidebar.addEventListener('click', function(e){
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null
      if (!a) return
      var url = new URL(a.getAttribute('href'), window.location.href)
      var linkPage = url.searchParams.get('page') || 'docs'
      var currentPage = new URLSearchParams(window.location.search).get('page') || 'docs'
      var hash = url.hash
      e.preventDefault()
      if (linkPage === currentPage) {
        if (hash) scrollToHash(hash)
        updateActiveSidebar()
        return
      }
      loadPage(linkPage, hash, 'push')
    }, true)
  }
  if (onpage) {
    onpage.addEventListener('click', function(e){
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null
      if (!a) return
      var hash = a.getAttribute('href')
      if (!hash) return
      e.preventDefault()
      scrollToHash(hash)
      updateActiveSidebar()
      if (window.applyHeaderClasses) window.applyHeaderClasses()
    }, true)
  }
  window.addEventListener('load', function(){
    if (window.location.hash) {
      scrollToHash(window.location.hash)
    }
    updateActiveSidebar()
  })
  window.addEventListener('hashchange', updateActiveSidebar)
  window.addEventListener('popstate', function(){
    var p = new URLSearchParams(window.location.search).get('page') || 'docs'
    var h = window.location.hash || ''
    loadPage(p, h, 'none')
    updateActiveSidebar()
    if (window.applyHeaderClasses) window.applyHeaderClasses()
  })
  var main = document.getElementById('mainContent')
  if (main) {
    main.addEventListener('click', function(e){
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null
      if (!a) return
      var href = a.getAttribute('href')
      if (!href) return
      if (href.indexOf('?page=') !== -1) {
        e.preventDefault()
        var u = new URL(href, window.location.href)
        var page = u.searchParams.get('page') || 'docs'
        var hash = u.hash
        loadPage(page, hash, 'push')
        updateActiveSidebar()
        return
      }
      if (href.charAt(0) === '#') {
        e.preventDefault()
        scrollToHash(href)
        updateActiveSidebar()
        if (window.applyHeaderClasses) window.applyHeaderClasses()
        return
      }
    }, true)
  }
  ;(function initSearch(){
    var btn = document.getElementById('searchButton')
    var dlg = document.getElementById('searchDialog')
    var input = document.getElementById('searchInput')
    var close = document.getElementById('searchClose')
    var results = document.getElementById('searchResults')
    if (!btn || !dlg || !input || !close || !results) return
    function build(){
      var sidebar = document.getElementById('sidebar')
      var items = []
      if (sidebar){
        var links = sidebar.querySelectorAll('a[href]')
        for (var i=0;i<links.length;i++){
          var a = links[i]
          items.push({ text: a.textContent.trim(), href: a.getAttribute('href') })
        }
      }
      return items
    }
    var index = build()
    function open(){ dlg.classList.remove('hidden'); input.value=''; input.focus(); render('') }
    function closeDlg(){ dlg.classList.add('hidden') }
    function render(q){
      results.innerHTML = ''
      var query = (q||'').toLowerCase()
      var filtered = index.filter(function(it){ return it.text.toLowerCase().indexOf(query) !== -1 }).slice(0, 12)
      if (filtered.length === 0){
        var li = document.createElement('li'); li.className='px-4 py-3 text-slate-500 dark:text-slate-400'; li.textContent='Aucun résultat'; results.appendChild(li); return
      }
      for (var i=0;i<filtered.length;i++){
        var it = filtered[i]
        var li = document.createElement('li')
        li.innerHTML = '<a class="flex items-center justify-between rounded px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/40" href="'+it.href+'"><span class="text-slate-700 dark:text-slate-200">'+it.text+'</span><span class="text-xs text-slate-400">'+it.href+'</span></a>'
        results.appendChild(li)
      }
    }
    btn.addEventListener('click', open)
    close.addEventListener('click', closeDlg)
    input.addEventListener('input', function(){ render(input.value) })
    dlg.addEventListener('click', function(e){ if (e.target === dlg) closeDlg() })
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeDlg() })
    results.addEventListener('click', function(e){
      var a = e.target.closest ? e.target.closest('a[href]') : null
      if (!a) return
      e.preventDefault()
      var u = new URL(a.getAttribute('href'), window.location.href)
      var page = u.searchParams.get('page') || 'docs'
      var hash = u.hash
      closeDlg()
      loadPage(page, hash, 'push')
      updateActiveSidebar()
    })
  })()
  window.initMonacoEditors = function(){
    if (!(window.monaco && window.monaco.editor)) return
    if (window.applyMonacoTheme) window.applyMonacoTheme()
    var nodes = document.querySelectorAll('#mainContent pre[data-lang]')
    var available = []
    try {
      var langs = window.monaco.languages.getLanguages() || []
      for (var j = 0; j < langs.length; j++) available.push(langs[j].id)
    } catch (_) {}
    function normalize(l){
      if (l === 'ts' || l === 'tsx') return 'typescript'
      if (l === 'bash') return 'shell'
      if (l === 'env' || l === 'ini') return 'properties'
      if (l === 'text') return 'plaintext'
      return l || 'plaintext'
    }
    for (var i = 0; i < nodes.length; i++) {
      var pre = nodes[i]
      if (pre.__mounted) continue
      var lang = normalize(pre.getAttribute('data-lang') || 'plaintext')
      if (available.indexOf(lang) === -1) lang = 'plaintext'
      var h = parseInt(pre.getAttribute('data-height') || '260', 10)
      var code = pre.textContent
      var container = document.createElement('div')
      container.className = 'rounded-xl mt-4 overflow-hidden bg-gray-50 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10'
      container.style.height = h + 'px'
      pre.parentNode.replaceChild(container, pre)
      var theme = document.documentElement.classList.contains('dark') ? 'syntax-dark' : 'syntax-light'
      var editor = window.monaco.editor.create(container, {
        value: code,
        language: lang,
        readOnly: true,
        theme: theme,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontSize: 12,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        lineNumbers: 'off',
        wordWrap: 'on',
        renderWhitespace: 'none',
        scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
        padding: { top: 8, bottom: 8 }
      })
      pre.__mounted = editor
    }
  }
  window.applyMonacoTheme = function(){
    if (!(window.monaco && window.monaco.editor)) return
    var dark = document.documentElement.classList.contains('dark')
    try {
      window.monaco.editor.defineTheme('syntax-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#0f172a',
          'editor.foreground': '#e2e8f0',
          'editor.lineHighlightBackground': '#0b1220',
          'editorLineNumber.foreground': '#64748b',
          'editorLineNumber.activeForeground': '#e2e8f0',
          'editorGutter.background': '#0f172a',
          'editor.selectionBackground': '#1e293b',
          'editor.selectionHighlightBackground': '#1e293b',
          'editorCursor.foreground': '#f8fafc',
          'scrollbarSlider.background': '#33415580',
          'scrollbarSlider.hoverBackground': '#334155a6',
          'scrollbarSlider.activeBackground': '#334155cc'
        }
      })
      window.monaco.editor.defineTheme('syntax-light', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#f8fafc',
          'editor.foreground': '#0f172a',
          'editor.lineHighlightBackground': '#f1f5f9',
          'editorLineNumber.foreground': '#94a3b8',
          'editorLineNumber.activeForeground': '#0f172a',
          'editorGutter.background': '#f8fafc',
          'editor.selectionBackground': '#e2e8f0',
          'editorCursor.foreground': '#0f172a',
          'scrollbarSlider.background': '#cbd5e180',
          'scrollbarSlider.hoverBackground': '#cbd5e1a6',
          'scrollbarSlider.activeBackground': '#cbd5e1cc'
        }
      })
      window.monaco.editor.setTheme(dark ? 'syntax-dark' : 'syntax-light')
    } catch (_) {}
  }
  if (window.monacoReady) { if (window.applyMonacoTheme) window.applyMonacoTheme(); window.initMonacoEditors() }
})()
