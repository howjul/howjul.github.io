// The homepage defaults to English at `/`, with Chinese at `/zh/`.
// Other pages retain their existing URLs: English under `/en/`, Chinese unprefixed.

export const LANGS = ['zh', 'en'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'en'

export const HTML_LANG: Record<Lang, string> = { zh: 'zh-CN', en: 'en' }

/** The root homepage and `/en/...` are English; other paths are Chinese. */
export function getLang(pathname: string): Lang {
  if (pathname === '/') return DEFAULT_LANG
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh'
}

/** Prefix a site path (e.g. `/about/`) for the given language. */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (clean === '/') return lang === 'en' ? '/' : '/zh/'
  return lang === 'zh' ? clean : `/en${clean}`
}

/** The same page in the other language (for pages that exist in both). */
export function switchLangPath(pathname: string): string {
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`
  if (withSlash === '/' || withSlash === '/en/') return '/zh/'
  if (withSlash === '/zh/') return '/'
  if (getLang(withSlash) === 'en') return withSlash.replace(/^\/en/, '') || '/'
  return `/en${withSlash}`
}

export function otherLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh'
}

// Interface text
export const ui = {
  zh: {
    about: '关于',
    notes: '笔记',
    publications: '论文',
    awards: '获奖',
    allAwards: '全部获奖',
    posts: '文章',
    allPosts: '全部文章',
    switchTo: 'EN',
    switchLabel: 'Switch to English',
    translation: 'English version',
    back: 'index',
    notFound: '页面不存在…',
    noPosts: '还没有文章。',
    visitors: '访客',
    views: '浏览'
  },
  en: {
    about: 'About',
    notes: 'Notes',
    publications: 'Publications',
    awards: 'Awards',
    allAwards: 'All awards',
    posts: 'Writing',
    allPosts: 'All posts',
    switchTo: '中文',
    switchLabel: '切换到中文',
    translation: '中文版',
    back: 'index',
    notFound: 'Page not found…',
    noPosts: 'No posts yet.',
    visitors: 'Visitors',
    views: 'Views'
  }
} as const

export function t(lang: Lang) {
  return ui[lang]
}
