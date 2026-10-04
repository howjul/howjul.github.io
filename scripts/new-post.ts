/**
 * Create a new post with frontmatter
 * Usage: pnpm new <title>        (Chinese post, the default)
 *        pnpm new --en <title>   (English post)
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'

// Process title from all arguments
// Pass --en to create the post under posts/en/
const isEnglish: boolean = process.argv.includes('--en')
const titleArgs: string[] = process.argv.slice(2).filter((arg) => arg !== '--en')
const rawTitle: string = titleArgs.length > 0 ? titleArgs.join(' ') : 'new-post'

// Check if title starts with underscore (draft post)
const isDraft: boolean = rawTitle.startsWith('_')
const displayTitle: string = isDraft ? rawTitle.slice(1) : rawTitle

const fileName: string = rawTitle
  .toLowerCase()
  .replace(/[^a-z0-9\s-_]/g, '') // Remove special characters but keep underscore and hyphen
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/-+/g, '-') // Replace multiple hyphens with single
  .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
const targetFile: string = `${fileName}.md`
const fullPath: string = join('src/content/posts', isEnglish ? 'en' : '', targetFile)

// Check if the target file already exists
if (existsSync(fullPath)) {
  console.error(`😇 File already exists: ${fullPath}`)
  process.exit(1)
}

// Ensure the directory structure exists
mkdirSync(dirname(fullPath), { recursive: true })

// Generate frontmatter with current date
const content: string = `---
title: ${displayTitle}
pubDate: '${new Date().toISOString().split('T')[0]}'
---

`

// Write the new post file
try {
  writeFileSync(fullPath, content)
  if (isDraft) {
    console.log(`📝 Draft created: ${fullPath}`)
  } else {
    console.log(`✅ Post created: ${fullPath}`)
  }
} catch (error) {
  console.error('⚠️ Failed to create post:', error)
  process.exit(1)
}
