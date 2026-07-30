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
    pageTitle: 'KUTO87 — 作ったものと、作っているもの',
    pageDescription:
      'kuto87の個人制作サイト。開発中のモバイルゲーム、ブラウザで遊べるゲーム、開発用CLIなど、作ったものと制作中のものを載せています。',
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
      kicker: 'PERSONAL PROJECTS',
      title: 'KUTO87',
      text: '遊んでみたいと思ったゲームや、作業の中で必要になったツールを作っています。ここでは、いま開発しているものと、ブラウザやGitHubで公開しているものをまとめています。',
      action: '作ったものを見る',
    },
    works: {
      title: 'Works',
      lead: '最近作っているものを中心に、ゲーム3本と開発用CLIを載せています。開発中のものも、公開しているものもあります。',
      detailLabel: '制作メモ',
      stackLabel: '使用技術',
      status: { Live: '公開中', Code: 'ソースコード', InProgress: '開発中' },
    },
    about: {
      title: 'About',
      text: 'kuto87です。個人でゲームを作ったり、開発中に必要になったツールを作ったりしています。',
      note: '最近は、六角形の盤面で光をつなぐパズルや、設備を増やしていく放置ゲームを作っています。ブラウザで遊べるゲームと、AI開発の作業を次のセッションへ引き継ぐCLIも公開しています。',
      stackLabel: 'よく使うもの',
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
      works: 'Works',
      about: 'About',
      contact: 'Links',
    },
    languageLabel: 'Display language',
    external: 'Opens in a new tab',
    hero: {
      kicker: 'PERSONAL PROJECTS',
      title: 'KUTO87',
      text: 'I make games and developer tools as personal projects. This page is a record of four recent projects: two mobile games, a browser game, and a command-line tool.',
      action: 'See what I’m making',
    },
    works: {
      title: 'Works',
      lead: 'These are four projects I’ve been working on recently. Two are still in development. The others are available as a playable browser game or as source code on GitHub.',
      detailLabel: 'Notes',
      stackLabel: 'Built with',
      status: { Live: 'Live', Code: 'Source code', InProgress: 'In development' },
    },
    about: {
      title: 'About',
      text: 'I’m kuto87. I make games and developer tools as personal projects. They usually start with an idea I want to try or a problem I want to solve for myself.',
      note: 'Recent work includes a light-routing puzzle, a factory idle clicker, an endless block breaker, and a CLI for carrying development context into a new coding session.',
      stackLabel: 'Often using',
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
    index: '01',
    title: 'Lumen Grid',
    kind: { ja: 'モバイルパズル', en: 'Mobile puzzle' },
    description: {
      ja: '色の違うピースを六角形の盤面へ置き、すべての対象マスへ光を届けるモバイル向けパズルです。反射、ワープ、プリズムによって光の進み方が変わる、全500ステージの構成で制作しています。',
      en: 'A mobile puzzle game where you place colored pieces on a hexagonal board and route light to every target cell. Mirrors, warps, and prisms change the path of the light.',
    },
    note: {
      ja: '進行状況は端末内に保存し、続きのステージから再開できます。',
      en: 'The game includes 500 stages, and progress is saved locally on the device.',
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
      ja: '1円から設備を増やし、1億円を製造すると新しい工場へ事業継承できる、縦画面の放置クリッカーです。設備は7種類あり、連打と自動生産のどちらでも進められます。',
      en: 'A portrait-mode idle clicker that starts with a single yen. You buy more equipment as production grows, then move on to a new factory after producing ¥100 million.',
    },
    note: {
      ja: 'アプリを閉じている間も最大8時間分の収益がたまり、進行状況は端末内に保存します。',
      en: 'There are seven kinds of equipment, with up to eight hours of idle income. Progress is saved locally on the device.',
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
      ja: 'コインで強化し、最大30個までボールを増やしながら、5 WAVEごとのボスに挑むブロック崩しです。ブラウザでそのまま遊べ、スマホのタッチ操作にも対応しています。',
      en: 'An endless block breaker for the browser. Coins can be spent on upgrades, the number of balls can grow to 30, and a boss appears every five waves.',
    },
    note: {
      ja: 'ミッションを進めながら遊べて、WAVE数は10000まで表示できます。',
      en: 'It supports touch controls and missions, with wave numbers displayed through 10,000.',
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
      ja: '作業メモとGitの状態をまとめ、次のAI開発セッションへ渡すMarkdownファイルを生成するローカルCLIです。会話をまたいでも作業の続きが分かるよう、必要な情報を引き継ぎ用のファイルへまとめます。',
      en: 'A local command-line tool for carrying work into a new AI coding session. It combines your notes with the current Git state and writes Markdown handoff files for the next session.',
    },
    note: {
      ja: 'ctx handoffを実行すると、NEXT_PROMPT.mdとDELTA_PACK.mdを生成します。',
      en: 'The ctx handoff command creates NEXT_PROMPT.md and DELTA_PACK.md for use at the start of the next session.',
    },
    cta: { ja: 'コードを見る', en: 'View source' },
    tags: ['Python', 'CLI', 'Git'],
    link: 'https://github.com/kuto87/ctx-ledger',
    status: 'Code',
  },
]
