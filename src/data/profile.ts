// Everything shown in the intro and publication list on the home page.
// Text that differs by language is written as { zh: '…', en: '…' }.

import type { Lang } from '@/i18n'

type Localized = Record<Lang, string>

export interface ProfileLink {
  label: Localized
  href: string
  /** With an icon the link sits beside the name; without one it is shown as text under the intro */
  icon?: 'email' | 'github' | 'scholar'
}

export interface Publication {
  title: string
  /** Author names in order. The entry equal to `profile.authorName` is highlighted. */
  authors: string[]
  /** Number of leading co-first authors; they are joined with "and" instead of commas. */
  coFirstAuthors?: number
  /** e.g. 'USENIX Security' */
  venue: string
  year: number
  /** Optional note such as 'Oral' or 'Best Paper' */
  note?: Localized
  links?: { label: string; href: string }[]
}

export interface Award {
  title: Localized
  year: number | string
  /** Optional detail such as the level or rank, shown in grey after the title */
  note?: Localized
}

export interface NoteSite {
  title: Localized
  /** Short description shown in grey after the title */
  note: Localized
  href: string
}

export const profile = {
  name: { zh: '朱镐哲', en: 'Haozhe Zhu' } as Localized,
  role: { zh: '硕士研究生 · 浙江大学', en: "Master's student · Zhejiang University" } as Localized,

  // Your name exactly as it appears in the author lists below
  authorName: 'Haozhe Zhu',

  // To add a CV link later: put the PDF in public/ and add
  // { label: { zh: '简历', en: 'CV' }, href: '/cv.pdf' }
  links: [
    { label: { zh: '邮箱', en: 'Email' }, href: 'mailto:howjul@zju.edu.cn', icon: 'email' },
    { label: { zh: 'GitHub', en: 'GitHub' }, href: 'https://github.com/howjul', icon: 'github' },
    {
      label: { zh: 'Google Scholar', en: 'Google Scholar' },
      href: 'https://scholar.google.com/citations?user=buiYv2sAAAAJ',
      icon: 'scholar'
    }
  ] as ProfileLink[],

  // How many posts to show on the home page before linking to the full list
  homePostCount: 8,

  // How many awards to show on the home page before linking to the full list on the About page
  homeAwardCount: 6
}

// Note sites listed in the "Notes" section of the home page
export const noteSites: NoteSite[] = [
  {
    title: { zh: '课程笔记', en: 'Course notes' },
    note: { zh: '本科课程、深度学习入门', en: 'undergraduate courses, deep learning basics' },
    href: 'https://howjul.github.io/note/'
  },
  {
    title: { zh: '语雀 · 本科四年', en: 'Yuque · Undergraduate years' },
    note: { zh: '课程笔记与课程总结', en: 'course notes and reviews' },
    href: 'https://www.yuque.com/howjul/rt9ms6'
  },
  {
    title: { zh: '语雀主页', en: 'Yuque home' },
    note: { zh: '全部知识库', en: 'all notebooks' },
    href: 'https://www.yuque.com/howjul'
  }
]

// Newest first. Papers under review should simply be left out.
export const publications: Publication[] = [
  {
    title: 'AttriGuard: Defeating Indirect Prompt Injection in LLM Agents via Causal Attribution of Tool Invocations',
    authors: ['Yu He', 'Haozhe Zhu', 'Yiming Li', 'Shuo Shao', 'Hongwei Yao', 'Zhihao Liu', 'Zhan Qin'],
    coFirstAuthors: 2,
    venue: 'USENIX Security',
    year: 2026,
    links: [
      { label: 'paper', href: 'https://www.usenix.org/conference/usenixsecurity26/presentation/he-yu' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2603.10749' }
    ]
  },
  {
    title: 'FIT-Print: Towards False-claim-resistant Model Ownership Verification via Targeted Fingerprint',
    authors: ['Shuo Shao', 'Haozhe Zhu', 'Yiming Li', 'Hongwei Yao', 'Tianwei Zhang', 'Zhan Qin'],
    venue: 'IEEE TIFS',
    year: 2026,
    links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2501.15509' }]
  }
]

// Shown in this order. The home page shows the first `homeAwardCount`; the About page shows all of them.
export const awards: Award[] = [
  {
    title: {
      zh: '浙江大学优秀研究生、五好研究生、优秀研究生干部',
      en: 'Outstanding Graduate Student, Five-Good Graduate Student, and Outstanding Graduate Student Leader'
    },
    year: '2025–26'
  },
  {
    title: {
      zh: '浙江大学优秀毕业生、本科优秀毕业论文',
      en: 'Outstanding Graduate and Outstanding Undergraduate Thesis, Zhejiang University'
    },
    year: '2025'
  },
  { title: { zh: '本科生国家奖学金', en: 'National Scholarship for Undergraduates' }, year: '2023–24' },
  { title: { zh: '浙江大学一等奖学金', en: 'First-Class Scholarship, Zhejiang University' }, year: '2023–24' },
  { title: { zh: '浙江大学优秀学生', en: 'Outstanding Student, Zhejiang University' }, year: '2023–24' },
  {
    title: { zh: '希格斯大学生课外创新活动奖学金', en: 'Higgs Extracurricular Innovation Scholarship' },
    note: { zh: '二等奖', en: 'Second Prize' },
    year: '2023–24'
  },
  { title: { zh: '浙江大学公益服务标兵', en: 'Public Service Model, Zhejiang University' }, year: '2023–24' },
  {
    title: { zh: '浙江大学学业优秀标兵', en: 'Academic Excellence Model, Zhejiang University' },
    note: { zh: '连续三年', en: 'three consecutive years' },
    year: '2021–24'
  },
  { title: { zh: '浙江大学对外交流标兵', en: 'International Exchange Model, Zhejiang University' }, year: '2022–23' },
  {
    title: { zh: '浙江大学三等奖学金', en: 'Third-Class Scholarship, Zhejiang University' },
    note: { zh: '两次', en: 'twice' },
    year: '2021–23'
  }
]
