export type Language = 'ja' | 'en'
export type ProjectStatus = 'Live' | 'Code' | 'InProgress'

export type LocalizedText = {
  ja: string
  en: string
}

export type Project = {
  id: string
  index: string
  title: string
  kind: LocalizedText
  description: LocalizedText
  note: LocalizedText
  cta?: LocalizedText
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
    pageTitle: 'KUTO87 — ゲーム、アプリ、開発ツール',
    pageDescription:
      'kuto87が制作したモバイルゲーム、ブラウザゲーム、開発用CLI。開発中の作品と公開ページ、GitHubのソースコードを掲載しています。',
    skip: '本文へ移動',
    navLabel: 'メインナビゲーション',
    nav: {
      works: 'Works',
      about: 'About',
      contact: 'Links',
    },
    languageLabel: '表示言語',
    external: '新しいタブで開きます',
    hero: {
      kicker: 'kuto87 / Works',
      title: 'ゲーム、アプリ、\n開発ツール。',
      text: 'モバイルゲーム、ブラウザゲーム、開発用CLIを作っています。',
      action: '一覧を見る',
    },
    works: {
      title: 'Works',
      lead: '開発中の作品と、ブラウザやGitHubで公開中の作品を4件掲載しています。',
      detailLabel: '内容',
      stackLabel: '使用技術',
      status: { Live: '公開中', Code: 'ソースコード', InProgress: '開発中' },
    },
    about: {
      title: 'About',
      text: 'kuto87です。ゲームや、必要になったツールを個人で作っています。',
      note: '光のパズル、放置クリッカー、ブロック崩し、開発の引き継ぎなどを作っています。',
      stackLabel: 'よく使うもの',
    },
    contact: {
      title: 'Links',
      text: 'コードはGitHub、制作中のメモはXにあります。',
    },
    footerTop: 'ページの先頭へ',
  },
  en: {
    pageTitle: 'KUTO87 — Games, Apps, and Tools',
    pageDescription:
      'Mobile games, browser games, and developer CLIs by kuto87. Explore current work, live projects, and source code.',
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    nav: {
      works: 'Works',
      about: 'About',
      contact: 'Links',
    },
    languageLabel: 'Display language',
    external: 'Opens in a new tab',
    hero: {
      kicker: 'kuto87 / Works',
      title: 'Games, apps,\nand developer tools.',
      text: 'Mobile games, browser games, and developer CLIs.',
      action: 'View the list',
    },
    works: {
      title: 'Works',
      lead: 'Four selected projects, including current work and projects available in the browser or on GitHub.',
      detailLabel: 'Detail',
      stackLabel: 'Built with',
      status: { Live: 'Live', Code: 'Source code', InProgress: 'In development' },
    },
    about: {
      title: 'About',
      text: 'I’m kuto87. I make games and tools I need.',
      note: 'Light puzzles, idle clickers, block breakers, and development handoffs are some of the things I make.',
      stackLabel: 'Often using',
    },
    contact: {
      title: 'Links',
      text: 'The code is on GitHub. Work-in-progress notes are on X.',
    },
    footerTop: 'Back to top',
  },
} as const

export const projects: Project[] = [
  {
    id: 'lumen-grid',
    index: '01',
    title: 'Lumen Grid',
    kind: { ja: 'モバイルパズル', en: 'Mobile puzzle' },
    description: {
      ja: '色の違うピースを六角形の盤面へ置き、すべての対象マスへ光を届けるモバイル向けパズルです。',
      en: 'A mobile puzzle about placing colored pieces on a hex grid to light every target cell.',
    },
    note: {
      ja: '全500ステージ / 反射・ワープ・プリズム / 端末内セーブ',
      en: '500 stages / mirrors, warps, and prisms / on-device saves',
    },
    tags: ['React Native', 'TypeScript', 'Expo'],
    status: 'InProgress',
  },
  {
    id: 'okuman-printing',
    index: '02',
    title: '億万印刷所',
    kind: { ja: '放置クリッカー', en: 'Idle clicker' },
    description: {
      ja: '1円から設備を増やし、1億円を製造すると新工場へ事業継承できる縦画面の放置クリッカーです。',
      en: 'A portrait idle clicker about growing a factory from ¥1 and opening a new one after producing ¥100 million.',
    },
    note: {
      ja: '7種の設備 / 最大8時間の放置収益 / 端末内セーブ',
      en: 'Seven facilities / up to 8 hours of idle income / on-device saves',
    },
    cta: { ja: '公式サポートを見る', en: 'View official support' },
    tags: ['React Native', 'TypeScript', 'Expo'],
    link: 'https://kuto87.github.io/okuman-printing-support/',
    status: 'InProgress',
  },
  {
    id: 'break-reactor',
    index: '03',
    title: 'break-reactor',
    kind: { ja: 'ブラウザゲーム', en: 'Browser game' },
    description: {
      ja: 'コインで強化し、最大30個までボールを増やしながら、5 WAVEごとのボスに挑むブロック崩しです。',
      en: 'An endless block breaker with coin upgrades, up to 30 balls, and a boss every five waves.',
    },
    note: {
      ja: 'タッチ操作 / ミッション / WAVE 10000対応',
      en: 'Touch controls / missions / wave display through 10,000',
    },
    cta: { ja: 'ブラウザで遊ぶ', en: 'Play in browser' },
    tags: ['JavaScript', 'Canvas', 'Game'],
    link: 'https://kuto87.github.io/break-reactor/',
    status: 'Live',
  },
  {
    id: 'ctx-ledger',
    index: '04',
    title: 'ctx-ledger',
    kind: { ja: '開発用CLI', en: 'Developer CLI' },
    description: {
      ja: '作業メモとGitの状態から、次のAI開発セッションへ渡すMarkdownファイルを作るローカルCLIです。',
      en: 'A local CLI that turns work notes and Git state into Markdown handoff files for the next AI coding session.',
    },
    note: {
      ja: 'ctx handoff / NEXT_PROMPT.md / DELTA_PACK.md',
      en: 'ctx handoff / NEXT_PROMPT.md / DELTA_PACK.md',
    },
    cta: { ja: 'コードを見る', en: 'View source' },
    tags: ['Python', 'CLI', 'Git'],
    link: 'https://github.com/kuto87/ctx-ledger',
    status: 'Code',
  },
]
