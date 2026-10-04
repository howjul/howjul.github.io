# howjul.github.io

个人主页：学术简介、论文、文章，支持中英切换。基于 [Astro](https://astro.build) 和 [Chiri](https://github.com/the3ash/astro-chiri) 主题改造。

## 本地运行

需要 Node.js 22+ 和 pnpm（`npm i -g pnpm`）。

```bash
pnpm install
pnpm dev        # 本地预览 http://localhost:4321
pnpm build      # 构建到 dist/
```

## 改内容

| 想改什么                         | 改哪个文件                         |
| -------------------------------- | ---------------------------------- |
| 姓名、身份、邮箱等链接、论文列表 | `src/data/profile.ts`              |
| 首页的自我介绍                   | `src/content/home/zh.md`、`en.md`  |
| 关于页                           | `src/content/about/zh.md`、`en.md` |
| 站点标题、域名、主题开关         | `src/config.ts`                    |
| 导航和界面文字                   | `src/i18n.ts`                      |
| 简历 PDF                         | 放到 `public/cv.pdf`               |

## 写文章

- 中文文章放在 `src/content/posts/`，文件名就是网址：`hello.md` → `/hello/`。
- 英文文章放在 `src/content/posts/en/`：`en/hello.md` → `/en/hello/`。
- 中英文件名相同时，两篇文章互相链接；只有中文版的文章不会出现在英文站。
- 文件名以 `_` 开头的是草稿，不会发布。
- 图片放在 `src/content/posts/_assets/`，中文文章用 `./_assets/x.png` 引用，英文文章用 `../_assets/x.png`。

```bash
pnpm new my-post-title         # 新建中文文章
pnpm new --en my-post-title    # 新建英文文章
```

文章开头需要：

```yaml
---
title: '标题'
pubDate: '2026-10-04'
---
```

## 部署

部署用 GitHub Actions：把部署配置保存为 `.github/workflows/deploy.yml`（这个文件还没有放进来，需要手动添加），之后推送到 `main` 就会自动构建并发布到 GitHub Pages。仓库的 Settings → Pages → Source 需要选 **GitHub Actions**。站点地址在 `src/config.ts` 的 `website` 里；以后要用自定义域名，把域名写进 `public/CNAME` 并同步改这里。
