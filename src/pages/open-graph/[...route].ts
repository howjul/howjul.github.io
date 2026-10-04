import { getCollection, type CollectionEntry } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'
import { themeConfig } from '../../config'
import { isDraft } from '../../utils/draft'

export const prerender = true

const collectionEntries = (await getCollection('posts')).filter((entry: CollectionEntry<'posts'>) => !isDraft(entry.id))

// Map the array of content collection entries to create an object.
// Converts [{ id: 'post.md', data: { title: 'Example', pubDate: Date } }]
// to { 'post.md': { title: 'Example', pubDate: Date } }
const pages = Object.fromEntries(
  collectionEntries.map((entry: CollectionEntry<'posts'>) => [entry.id.replace(/\.(md|mdx)$/, ''), entry.data])
)

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path: string, page: CollectionEntry<'posts'>['data']) => ({
    title: page.title,
    description: themeConfig.site.title,
    logo: {
      path: 'public/og/og-logo.png',
      size: [80, 80]
    },
    bgGradient: [[255, 255, 255]],
    bgImage: {
      path: 'public/og/og-bg.png',
      fit: 'fill'
    },
    padding: 64,
    font: {
      title: {
        color: [28, 28, 28],
        size: 68,
        weight: 'Bold',
        families: ['Inter Variable', 'Noto Sans SC']
      },
      description: {
        color: [180, 180, 180],
        size: 40,
        weight: 'Normal',
        families: ['Inter Variable', 'Noto Sans SC']
      }
    },
    fonts: ['public/fonts/Inter.woff2', 'public/fonts/NotoSansSC-Regular.otf', 'public/fonts/NotoSansSC-Bold.otf']
  })
})
