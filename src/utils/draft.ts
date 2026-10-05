import { getCollection, type CollectionEntry } from 'astro:content'
import { type Lang } from '@/i18n'

type Post = CollectionEntry<'posts'>

/** Posts whose filename starts with `_` are drafts. */
export function isDraft(id: string): boolean {
  return (id.split('/').pop() || '').startsWith('_')
}

/** Posts under `posts/en/` are English; everything else is Chinese. */
export function postLang(id: string): Lang {
  return id.startsWith('en/') ? 'en' : 'zh'
}

/** Id of the same post in the other language (same filename). */
export function translationId(id: string): string {
  return postLang(id) === 'en' ? id.replace(/^en\//, '') : `en/${id}`
}

/**
 * Get all published posts, optionally for one language
 */
export async function getFilteredPosts(lang?: Lang) {
  const posts = await getCollection('posts')
  return posts.filter((post: Post) => !isDraft(post.id) && (!lang || postLang(post.id) === lang))
}

/**
 * Get published posts sorted by publication date, optionally for one language
 */
export async function getSortedFilteredPosts(lang?: Lang) {
  const posts = await getFilteredPosts(lang)
  return posts.sort((a: Post, b: Post) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}
