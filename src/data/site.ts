export type Language = 'ja' | 'en'
export type ProjectStatus = 'Live' | 'Code' | 'InProgress'

export type Project = {
  id: string
  title: string
  tags: string[]
  link?: string
  status: ProjectStatus
}

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/kuto87',
    ariaLabel: 'kuto87 on GitHub',
  },
  {
    label: 'X',
    href: 'https://x.com/rinrin1600',
    ariaLabel: 'rinrin1600 on X',
  },
] as const

export const copy = {
  ja: {
    pageTitle: 'KUTO87 — 作ったものと、作っているもの',
    pageDescription:
      'kuto87の個人制作サイト。開発中のモバイルゲーム、ブラウザで遊べるゲーム、開発用CLIなど、作ったものと制作中のものを載せています。',
    skip: '本文へ移動',
    navLabel: 'メインナビゲーション',
    nav: {
      works: 'Projects',
      about: 'About',
      contact: 'Links',
    },
    languageLabel: '表示言語',
    external: '新しいタブで開きます',
    hero: {
      kicker: 'PERSONAL PROJECTS',
      title: 'KUTO87',
      text: '遊んでみたいと思ったゲームや、作業の中で必要になったツールを作っています。ここでは、いま開発しているものと、ブラウザやGitHubで公開しているものをまとめています。',
      action: '作ったものを見る',
    },
    works: {
      title: 'Projects',
      lead: '最近作っているものを中心に載せています。',
      status: { Live: '公開中', Code: 'ソースコード', InProgress: '開発中' },
    },
    about: {
      title: 'About',
      text: 'kuto87です。個人でゲーム開発やツールの作成中。',
    },
    contact: {
      title: 'Links',
      text: '公開できるコードはGitHubに置いています。制作中の短いメモや進捗はXに載せています。',
    },
    footerTop: 'ページの先頭へ',
  },
  en: {
    pageTitle: 'KUTO87 — What I’ve Been Working On',
    pageDescription:
      'The personal site of kuto87, with mobile games in development, a browser game you can play, and a developer CLI.',
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    nav: {
      works: 'Projects',
      about: 'About',
      contact: 'Links',
    },
    languageLabel: 'Display language',
    external: 'Opens in a new tab',
    hero: {
      kicker: 'PERSONAL PROJECTS',
      title: 'KUTO87',
      text: 'I make games and developer tools as personal projects. This page is a record of four recent projects: two mobile games, a browser game, and a command-line tool.',
      action: 'See projects',
    },
    works: {
      title: 'Projects',
      lead: 'A few things I’ve been working on recently.',
      status: { Live: 'Live', Code: 'Source code', InProgress: 'In development' },
    },
    about: {
      title: 'About',
      text: 'I’m kuto87. I develop games and build tools as personal projects.',
    },
    contact: {
      title: 'Links',
      text: 'You can find my code on GitHub. I use X for short notes and updates while I’m working on something.',
    },
    footerTop: 'Back to top',
  },
} as const

export const projects: Project[] = [
  {
    id: 'lumen-grid',
    title: 'Lumen Grid',
    tags: ['React Native', 'TypeScript', 'Expo'],
    status: 'InProgress',
  },
  {
    id: 'okuman-printing',
    title: '億万印刷所',
    tags: ['React Native', 'TypeScript', 'Expo'],
    link: 'https://kuto87.github.io/okuman-printing-support/',
    status: 'InProgress',
  },
  {
    id: 'break-reactor',
    title: 'break-reactor',
    tags: ['JavaScript', 'Canvas', 'Game'],
    link: 'https://kuto87.github.io/break-reactor/',
    status: 'Live',
  },
  {
    id: 'ctx-ledger',
    title: 'ctx-ledger',
    tags: ['Python', 'CLI', 'Git'],
    link: 'https://github.com/kuto87/ctx-ledger',
    status: 'Code',
  },
]
