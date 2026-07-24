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
  year: string
  visual: 'press' | 'reactor' | 'branch' | 'ledger' | 'factory'
  featured?: boolean
}

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/kuto87',
    ariaLabel: 'kuto87 on GitHub',
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/rinrin1600',
    ariaLabel: 'rinrin1600 on X',
  },
] as const

export const copy = {
  ja: {
    pageTitle: 'KUTO / 87 — 京都でつくるゲームと道具',
    pageDescription:
      '京都でゲーム、Webアプリ、CLIをつくるkuto87の作業記録。公開中の作品と、手を動かしながら考えたことを置いています。',
    skip: '本文へ移動',
    headerNote: '京都の個人制作机 / 稼働中',
    navLabel: 'メインナビゲーション',
    nav: {
      works: 'Works',
      about: 'About',
      contact: 'Contact',
    },
    languageLabel: '表示言語',
    external: '新しいタブで開きます',
    hero: {
      eyebrow: 'KUTO87 / KYOTO / 2026',
      title: ['ゲームと道具。', '京都で作る。'],
      screenReaderTitle: 'ゲームと道具。京都で作る。',
      text: 'ブロック崩し、思考整理アプリ、AI引き継ぎCLI。京都で作り、遊べるページか読めるコードまで公開しています。',
      primaryAction: '作業記録を見る',
      secondaryAction: 'コードを見る',
      availability: 'だいたい何かを制作中',
      visualCaption: 'まだ完成とは限らない。',
    },
    works: {
      eyebrow: 'OUTPUT LOG / 01—05',
      title: '5つの記録。\n2つは公開中。',
      lead: 'ゲーム2本、思考整理アプリ、AI引き継ぎCLI、サポートサイト。遊べるページとコードを、作業ログとして並べました。',
      whyLabel: '何を作った',
      detailLabel: '実物の記録',
      stackLabel: '使用:',
      status: { Live: 'RUN / 公開中', Code: 'CODE / リポジトリ' },
    },
    about: {
      eyebrow: 'BENCH NOTES / KUTO87',
      title: 'まず動かす。\n公開する。\nあとで直す。',
      text: 'React / TypeScript / Pythonで、ブラウザゲーム、Webアプリ、CLIを作っています。試作で終わらせず、動くページか読めるコードまで持っていきます。',
      locationLabel: '拠点',
      location: 'Kyoto, Japan',
      stackLabel: 'よく使うもの',
      memo: '完成を待つと、たぶんずっと公開しない。だから小さく出して、触って見つけた違和感を直します。',
    },
    contact: {
      eyebrow: 'OPEN CHANNEL / NO FORM',
      title: '更新先は、\nGitHub / X',
      text: 'リポジトリと更新履歴はGitHub、短い制作メモはXで見られます。',
    },
    footerTop: 'ページの先頭へ',
  },
  en: {
    pageTitle: 'KUTO / 87 — Games and tools made in Kyoto',
    pageDescription:
      'The working log of kuto87 in Kyoto: games, web apps, CLIs, released projects, and notes from the bench.',
    skip: 'Skip to content',
    headerNote: 'Personal workbench in Kyoto / running',
    navLabel: 'Main navigation',
    nav: {
      works: 'Works',
      about: 'About',
      contact: 'Contact',
    },
    languageLabel: 'Display language',
    external: 'Opens in a new tab',
    hero: {
      eyebrow: 'KUTO87 / KYOTO / 2026',
      title: ['Games and tools.', 'Made in Kyoto.'],
      screenReaderTitle: 'Games and tools. Made in Kyoto.',
      text: 'A browser game, a branching thought tool, and a CLI for AI coding handoffs. Built in Kyoto and published as live pages or open code.',
      primaryAction: 'Read the work log',
      secondaryAction: 'Read the code',
      availability: 'Usually making something',
      visualCaption: 'MAY NOT BE FINISHED.',
    },
    works: {
      eyebrow: 'OUTPUT LOG / 01—05',
      title: 'Five projects.\nTwo are live.',
      lead: 'Two games, a thinking tool, an AI handoff CLI, and a support site. Live pages and repositories, filed as working logs.',
      whyLabel: 'What it does',
      detailLabel: 'Recorded detail',
      stackLabel: 'Built with:',
      status: { Live: 'RUN / Live', Code: 'CODE / Repository' },
    },
    about: {
      eyebrow: 'BENCH NOTES / KUTO87',
      title: 'Build one.\nPut it online.\nThen fix it.',
      text: 'I make browser games, web apps, and CLIs with React, TypeScript, and Python. I take them past the prototype and publish a working page or readable code.',
      locationLabel: 'Based in',
      location: 'Kyoto, Japan',
      stackLabel: 'Often working with',
      memo: 'If I wait until it’s finished, I may never publish. I put out a small version, use it, and fix what feels wrong.',
    },
    contact: {
      eyebrow: 'OPEN CHANNEL / NO FORM',
      title: 'Updates live on\nGitHub / X.',
      text: 'Repositories and release history are on GitHub. Short build notes are on X.',
    },
    footerTop: 'Back to top',
  },
} as const

export const projects: Project[] = [
  {
    id: 'okuman-printing-support',
    index: '01',
    title: '億万印刷所 Support',
    kind: { ja: 'プロダクトサポート', en: 'Product support' },
    description: {
      ja: '「億万印刷所」のFAQ、プライバシーポリシー、不具合報告先。必要な情報を1ページからたどれます。',
      en: 'FAQs, the privacy policy, and issue reporting for the Okuman Printing game app—all from one support hub.',
    },
    note: {
      ja: 'FAQ / プライバシー / GitHub Issues',
      en: 'FAQ / Privacy / GitHub Issues',
    },
    cta: { ja: 'サポートを見る', en: 'Open support' },
    tags: ['HTML', 'GitHub Pages', 'Support'],
    link: 'https://kuto87.github.io/okuman-printing-support/support.html',
    status: 'Live',
    year: '2026',
    visual: 'press',
  },
  {
    id: 'break-reactor',
    index: '02',
    title: 'break-reactor',
    kind: { ja: 'ブラウザゲーム', en: 'Browser game' },
    description: {
      ja: '強化とコインを集め、5 WAVEごとのボスを倒すブロック崩し。ブラウザですぐ遊べます。',
      en: 'Collect upgrades and coins, then fight a boss every five waves. Play it in the browser.',
    },
    note: {
      ja: 'Canvas / 最大30ボール / WAVE 10000',
      en: 'Canvas / Up to 30 balls / 10,000 waves',
    },
    cta: { ja: 'ブラウザで遊ぶ', en: 'Play in browser' },
    tags: ['JavaScript', 'Game', 'GitHub Pages'],
    link: 'https://kuto87.github.io/break-reactor/',
    status: 'Live',
    year: '2026',
    visual: 'reactor',
    featured: true,
  },
  {
    id: 'branch-canvas',
    index: '03',
    title: 'branch-canvas',
    kind: { ja: '思考整理Webアプリ', en: 'Thinking tool' },
    description: {
      ja: '中心のアイデアから候補を枝分かれ。複数選択、共有リンク、共有マップのコピーに対応。',
      en: 'Branch options from one central idea. Multi-select, share links, and copyable shared maps are built in.',
    },
    note: {
      ja: '匿名ログイン / 共有リンク / Firestore',
      en: 'Anonymous Auth / Share links / Firestore',
    },
    cta: { ja: 'コードを見る', en: 'View code' },
    tags: ['React', 'TypeScript', 'Firebase'],
    link: 'https://github.com/kuto87/branch-canvas',
    status: 'Code',
    year: '2026',
    visual: 'branch',
  },
  {
    id: 'ctx-ledger',
    index: '04',
    title: 'ctx-ledger',
    kind: { ja: 'AI向けCLI', en: 'CLI for AI workflows' },
    description: {
      ja: 'ctx handoffで、メモとGitの状態からNEXT_PROMPT.mdを生成。次のAIチャットへそのまま渡せます。',
      en: 'Run ctx handoff to turn notes and Git state into NEXT_PROMPT.md for the next AI coding session.',
    },
    note: {
      ja: 'ctx handoff → NEXT_PROMPT.md',
      en: 'ctx handoff → NEXT_PROMPT.md',
    },
    cta: { ja: 'コードを見る', en: 'View code' },
    tags: ['Python', 'AI', 'CLI'],
    link: 'https://github.com/kuto87/ctx-ledger',
    status: 'Code',
    year: '2026',
    visual: 'ledger',
  },
  {
    id: 'plc-factory-clicker',
    index: '05',
    title: 'plc-factory-clicker',
    kind: { ja: 'クリックゲーム', en: 'Clicker game' },
    description: {
      ja: 'X0で通電。自己保持回路とT0タイマを追加し、工場を自動化するクリックゲーム。',
      en: 'Press X0 to power the line. Add a self-hold circuit and T0 timer to automate production.',
    },
    note: {
      ja: '自己保持 / 3秒タイマ / セーブ移行',
      en: 'Self-hold / 3-second timer / Save transfer',
    },
    cta: { ja: 'コードを見る', en: 'View code' },
    tags: ['JavaScript', 'Game', 'UI'],
    link: 'https://github.com/kuto87/plc-factory-clicker',
    status: 'Code',
    year: '2026',
    visual: 'factory',
  },
]
