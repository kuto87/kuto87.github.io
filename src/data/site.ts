export type Language = 'ja' | 'en'
export type ProjectStatus = 'Live' | 'Code'

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
  cta: LocalizedText
  tags: string[]
  link: string
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
      'kuto87が制作したブラウザゲーム、Webアプリ、開発用CLI。公開ページとGitHubのソースコードを掲載しています。',
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
      text: 'ブラウザで遊べるゲーム、Webアプリ、開発用CLIを公開しています。',
      action: '一覧を見る',
    },
    works: {
      title: 'Works',
      lead: 'ブラウザで動くものと、GitHubでコードを公開しているものがあります。',
      detailLabel: '内容',
      stackLabel: '使用技術',
      status: { Live: '公開中', Code: 'ソースコード' },
    },
    about: {
      title: 'About',
      text: 'kuto87です。思いついたゲームや、必要になったツールを個人で作っています。',
      note: 'ブロック崩し、PLCの自己保持回路、アイデア整理、開発の引き継ぎなどを作ってきました。',
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
      'Browser games, web apps, and developer CLIs by kuto87. Explore live projects and source code.',
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
      text: 'Browser games, web apps, and developer CLIs. Open the live projects here, or view the source on GitHub.',
      action: 'View the list',
    },
    works: {
      title: 'Works',
      lead: 'Some projects run in the browser; the rest are available as source on GitHub.',
      detailLabel: 'Detail',
      stackLabel: 'Built with',
      status: { Live: 'Live', Code: 'Source code' },
    },
    about: {
      title: 'About',
      text: 'I’m kuto87. I make games that interest me and tools I need.',
      note: 'Block breakers, PLC circuits, idea maps, and development handoffs are some of the things I’ve built.',
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
    id: 'okuman-printing-support',
    index: '01',
    title: '億万印刷所 Support',
    kind: { ja: 'サポート', en: 'Support' },
    description: {
      ja: '「億万印刷所」のFAQ、セーブ仕様、プライバシーポリシー、不具合報告先をまとめたページです。',
      en: 'FAQs, save details, the privacy policy, and issue reporting for Okuman Printing.',
    },
    note: {
      ja: 'FAQ / セーブ仕様 / プライバシーポリシー / 不具合報告',
      en: 'FAQs / save details / privacy policy / issue reporting',
    },
    cta: { ja: 'サポートを開く', en: 'Open support' },
    tags: ['HTML', 'CSS', 'GitHub Pages'],
    link: 'https://kuto87.github.io/okuman-printing-support/support.html',
    status: 'Live',
  },
  {
    id: 'break-reactor',
    index: '02',
    title: 'break-reactor',
    kind: { ja: 'ブラウザゲーム', en: 'Browser game' },
    description: {
      ja: 'コインで強化し、ボールを増やしながら5 WAVEごとのボスを倒すブロック崩しです。ブラウザですぐ遊べます。',
      en: 'Upgrade with coins, add more balls, and defeat a boss every five waves. It plays in the browser.',
    },
    note: {
      ja: '最大30ボール / ボス戦 / WAVE 10000',
      en: 'Up to 30 balls / boss fights / 10,000 waves',
    },
    cta: { ja: 'ブラウザで遊ぶ', en: 'Play in browser' },
    tags: ['JavaScript', 'Canvas', 'Game'],
    link: 'https://kuto87.github.io/break-reactor/',
    status: 'Live',
  },
  {
    id: 'branch-canvas',
    index: '03',
    title: 'branch-canvas',
    kind: { ja: 'アイデア整理', en: 'Idea mapping' },
    description: {
      ja: 'ひとつのアイデアから選択肢を枝分かれさせて整理できます。作ったマップは共有・コピーできます。',
      en: 'Branch options from one idea, then share the map or copy someone else’s.',
    },
    note: {
      ja: '複数選択 / 閲覧用リンク / マップのコピー',
      en: 'Multi-select / view-only links / map copies',
    },
    cta: { ja: 'コードを見る', en: 'View source' },
    tags: ['React', 'TypeScript', 'Firebase'],
    link: 'https://github.com/kuto87/branch-canvas',
    status: 'Code',
  },
  {
    id: 'ctx-ledger',
    index: '04',
    title: 'ctx-ledger',
    kind: { ja: '開発用CLI', en: 'Developer CLI' },
    description: {
      ja: '作業メモとGitの状態から、次のAI開発セッション用の引き継ぎファイルを作るCLIです。',
      en: 'A CLI that turns work notes and Git state into a handoff file for the next AI development session.',
    },
    note: {
      ja: 'ctx handoff → NEXT_PROMPT.md / DELTA_PACK.md',
      en: 'ctx handoff → NEXT_PROMPT.md / DELTA_PACK.md',
    },
    cta: { ja: 'コードを見る', en: 'View source' },
    tags: ['Python', 'CLI', 'Git'],
    link: 'https://github.com/kuto87/ctx-ledger',
    status: 'Code',
  },
  {
    id: 'plc-factory-clicker',
    index: '05',
    title: 'plc-factory-clicker',
    kind: { ja: 'ブラウザゲーム', en: 'Browser game' },
    description: {
      ja: 'X0を押してラインを動かし、自己保持回路とT0タイマで生産を自動化するクリックゲームです。',
      en: 'Press X0 to start the line, then automate production with a self-hold circuit and T0 timer.',
    },
    note: {
      ja: 'X0 → M0 → T0 → Y0 / 3秒タイマ / セーブ移行',
      en: 'X0 → M0 → T0 → Y0 / 3-second timer / save transfer',
    },
    cta: { ja: 'ブラウザで開く', en: 'Open live page' },
    tags: ['JavaScript', 'PLC', 'Game'],
    link: 'https://kuto87.github.io/plc-factory-clicker/',
    status: 'Live',
  },
]
