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
    pageTitle: 'KUTO — 京都でつくるゲームと小さな道具',
    pageDescription:
      '京都でブラウザゲーム、Webアプリ、CLIを個人制作するkuto87のサイト。公開中のページとソースコードをまとめています。',
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
      location: 'kuto87 / Kyoto, Japan',
      title: '京都で、\nゲームと道具を\n作っています。',
      text: 'ブラウザで遊べるゲーム、考えを枝分かれさせるWebアプリ、作業を少し短くするCLI。自分で使いたいものを作り、公開しています。',
      action: '制作物を見る',
    },
    works: {
      title: 'Works',
      lead: '現在公開しているページとリポジトリです。公開中の3件は、そのままブラウザで開けます。',
      detailLabel: '内容',
      stackLabel: '使用技術',
      status: { Live: '公開中', Code: 'ソースコード' },
    },
    about: {
      title: 'About',
      text: 'kuto87。京都で、ゲームやWebアプリ、CLIを個人で作っています。気になった仕組みは、説明するより先に触れる形へしてみることが多いです。',
      note: '自己保持回路はクリックゲームに、AIチャットの引き継ぎはCLIにしました。題材はばらばらですが、どれも実際に動かして確かめられるところまで作っています。',
      locationLabel: '拠点',
      location: 'Kyoto, Japan',
      stackLabel: 'よく使うもの',
    },
    contact: {
      title: 'Links',
      text: 'ソースコードと更新履歴はGitHubへ。短い制作メモはXに置いています。',
    },
    footerTop: 'ページの先頭へ',
  },
  en: {
    pageTitle: 'KUTO — Games and small tools made in Kyoto',
    pageDescription:
      'The personal site of kuto87 in Kyoto, making browser games, web apps, and CLIs. Find live pages and source code.',
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
      location: 'kuto87 / Kyoto, Japan',
      title: 'Games and tools,\nmade in Kyoto.',
      text: 'Browser games, a web app for branching ideas, and a CLI that shortens repetitive work. I make things I want to use and put them online.',
      action: 'See the work',
    },
    works: {
      title: 'Works',
      lead: 'Live pages and repositories. Three of these projects can be opened and used directly in the browser.',
      detailLabel: 'Detail',
      stackLabel: 'Built with',
      status: { Live: 'Live', Code: 'Source code' },
    },
    about: {
      title: 'About',
      text: 'I’m kuto87, an independent maker in Kyoto. I build games, web apps, and CLIs. When a system interests me, I usually turn it into something I can touch before I try to explain it.',
      note: 'A self-hold circuit became a clicker game. Repeated AI chat handoffs became a CLI. The subjects vary, but I take each one far enough to run and test for real.',
      locationLabel: 'Based in',
      location: 'Kyoto, Japan',
      stackLabel: 'Often using',
    },
    contact: {
      title: 'Links',
      text: 'Source code and release history are on GitHub. Short build notes are on X.',
    },
    footerTop: 'Back to top',
  },
} as const

export const projects: Project[] = [
  {
    id: 'okuman-printing-support',
    index: '01',
    title: '億万印刷所 Support',
    kind: { ja: 'ゲームサポート', en: 'Game support' },
    description: {
      ja: '「億万印刷所」のFAQ、プライバシーポリシー、不具合報告先をまとめた公式サポートページです。',
      en: 'The official support hub for Okuman Printing, with FAQs, the privacy policy, and issue reporting.',
    },
    note: {
      ja: 'FAQ、端末内セーブ、放置収益、不具合報告',
      en: 'FAQs, local saves, idle income, and issue reporting',
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
      ja: '強化とコインを集め、5 WAVEごとのボスを倒すブロック崩し。インストールせずに遊べます。',
      en: 'A block breaker with upgrades, coins, and a boss every five waves. It runs without an install.',
    },
    note: {
      ja: '最大30ボール、ボス戦、WAVE 10000',
      en: 'Up to 30 balls, boss fights, and 10,000 waves',
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
    kind: { ja: '思考整理Webアプリ', en: 'Thinking tool' },
    description: {
      ja: '中心のアイデアから候補を枝分かれさせるWebアプリ。複数選択、共有リンク、共有マップのコピーに対応しています。',
      en: 'A web app for branching options from one central idea, with multi-select, share links, and the ability to copy shared maps.',
    },
    note: {
      ja: '匿名ログイン、閲覧専用共有、Firestore',
      en: 'Anonymous auth, read-only sharing, and Firestore',
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
      ja: 'メモとGitの状態から、次のAIチャットへ渡すNEXT_PROMPT.mdを生成するCLIです。',
      en: 'A CLI that turns notes and Git state into NEXT_PROMPT.md for the next AI coding session.',
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
      ja: 'X0で通電し、自己保持回路とT0タイマを追加して工場を自動化するクリックゲームです。',
      en: 'A clicker game where X0 powers the line, then a self-hold circuit and T0 timer automate production.',
    },
    note: {
      ja: 'X0 → M0 → T0 → Y0、3秒タイマ、セーブ移行',
      en: 'X0 → M0 → T0 → Y0, a 3-second timer, and save transfer',
    },
    cta: { ja: 'ブラウザで開く', en: 'Open live page' },
    tags: ['JavaScript', 'PLC', 'Game'],
    link: 'https://kuto87.github.io/plc-factory-clicker/',
    status: 'Live',
  },
]
