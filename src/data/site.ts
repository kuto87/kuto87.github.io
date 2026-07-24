export type Language = 'ja' | 'en'
export type ProjectStatus = 'Live' | 'Code'
export type ProjectFilter = 'all' | 'live' | 'code'

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
  tags: string[]
  link: string
  status: ProjectStatus
  year: string
  visual: 'press' | 'reactor' | 'branch' | 'ledger' | 'factory'
  featured?: boolean
}

export const filterStorageKey = 'kuto-site-project-filter'

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

export const projectFilters = [
  { value: 'all', label: { ja: 'すべて', en: 'All' } },
  { value: 'live', label: { ja: '公開中', en: 'Live' } },
  { value: 'code', label: { ja: 'コード', en: 'Code' } },
] as const satisfies ReadonlyArray<{
  value: ProjectFilter
  label: LocalizedText
}>

export const copy = {
  ja: {
    pageTitle: 'KUTO — 京都でつくるデジタルプロダクト',
    pageDescription:
      '京都でWebアプリ、ゲーム、CLI、自動化ツールをつくるkuto87の公式サイト。小さく作り、公開し、育てているプロジェクトを紹介します。',
    skip: '本文へ移動',
    navLabel: 'メインナビゲーション',
    nav: {
      works: 'Works',
      about: 'About',
      contact: 'Contact',
    },
    languageLabel: '表示言語',
    external: '新しいタブで開きます',
    hero: {
      eyebrow: 'DIGITAL MAKER / KYOTO',
      title: ['アイデアを、', '動くものに。'],
      screenReaderTitle: 'アイデアを、動くものに。',
      text: 'Webアプリ、ゲーム、AI時代の小さな道具。考えるところから、作って公開するところまで。',
      primaryAction: '作品を見る',
      secondaryAction: 'GitHubへ',
      availability: '京都で制作中',
      visualCaption: 'Build small. Ship real.',
    },
    indexStrip: ['WEB APPS', 'GAMES', 'AUTOMATION', 'CLI', 'OPEN SOURCE'],
    works: {
      eyebrow: 'SELECTED WORK / 05',
      title: '作ったもの。',
      lead: '遊べるもの、使えるもの、次の制作を少し楽にするもの。小さく始めて、公開できる形まで作っています。',
      filterLabel: 'プロジェクトの表示条件',
      empty: 'この条件のプロジェクトはまだありません。',
      open: 'プロジェクトを見る',
      status: { Live: '公開中', Code: 'コード公開' },
    },
    about: {
      eyebrow: 'ABOUT / KUTO87',
      title: '小さく始めて、\nちゃんと届くところまで。',
      text: 'React、TypeScript、Pythonを中心に、Webアプリやゲーム、CLIを作っています。まず手を動かして確かめ、触ってわかる形にしてから、あとで育てやすく整えるのが好きです。',
      locationLabel: '拠点',
      location: 'Kyoto, Japan',
      stackLabel: 'よく使うもの',
      principlesLabel: '制作の考え方',
      principles: [
        { number: '01', title: 'Ship small', text: '小さく作り、まず公開する。' },
        { number: '02', title: 'Stay changeable', text: 'あとから直しやすく保つ。' },
        { number: '03', title: 'Make it tangible', text: '遊べる・使える形にする。' },
      ],
    },
    contact: {
      eyebrow: 'CONTACT / FOLLOW ALONG',
      title: '次のアイデアも、\nもう動きはじめています。',
      text: 'コードと制作メモはGitHubへ。日々の短い更新はXに置いています。',
    },
    footerTop: 'ページの先頭へ',
  },
  en: {
    pageTitle: 'KUTO — Digital products made in Kyoto',
    pageDescription:
      'The official site of kuto87, making web apps, games, CLIs, and automation tools in Kyoto. Small projects, shipped and grown in public.',
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    nav: {
      works: 'Works',
      about: 'About',
      contact: 'Contact',
    },
    languageLabel: 'Display language',
    external: 'Opens in a new tab',
    hero: {
      eyebrow: 'DIGITAL MAKER / KYOTO',
      title: ['Ideas, made', 'to move.'],
      screenReaderTitle: 'Ideas, made to move.',
      text: 'Web apps, games, and small tools for the AI era. From the first thought to something real enough to ship.',
      primaryAction: 'See the work',
      secondaryAction: 'Go to GitHub',
      availability: 'Building in Kyoto',
      visualCaption: 'Build small. Ship real.',
    },
    indexStrip: ['WEB APPS', 'GAMES', 'AUTOMATION', 'CLI', 'OPEN SOURCE'],
    works: {
      eyebrow: 'SELECTED WORK / 05',
      title: 'Things I made.',
      lead: 'Things to play, things to use, and tools that make the next build a little easier. Started small and shaped until ready to ship.',
      filterLabel: 'Filter projects',
      empty: 'No projects match this filter yet.',
      open: 'View project',
      status: { Live: 'Live', Code: 'Open code' },
    },
    about: {
      eyebrow: 'ABOUT / KUTO87',
      title: 'Start small.\nFinish where it reaches people.',
      text: 'I make web apps, games, and CLIs, mostly with React, TypeScript, and Python. I like testing ideas by building, making them tangible, and keeping the result easy to improve.',
      locationLabel: 'Based in',
      location: 'Kyoto, Japan',
      stackLabel: 'Often working with',
      principlesLabel: 'Making principles',
      principles: [
        { number: '01', title: 'Ship small', text: 'Build less, release sooner.' },
        { number: '02', title: 'Stay changeable', text: 'Keep the next edit easy.' },
        { number: '03', title: 'Make it tangible', text: 'Make it useful or playable.' },
      ],
    },
    contact: {
      eyebrow: 'CONTACT / FOLLOW ALONG',
      title: 'The next idea\nis already moving.',
      text: 'Code and project notes live on GitHub. Smaller updates land on X.',
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
      ja: '「億万印刷所」の公式サポートとプライバシーポリシーを、迷わず読める形にまとめた公開サイト。',
      en: 'The official support and privacy site for Okuman Printing, designed to keep essential information clear and easy to reach.',
    },
    note: {
      ja: 'Support / Privacy / Issue reporting',
      en: 'Support / Privacy / Issue reporting',
    },
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
      ja: 'ブロック崩しに強化、コイン、ボス戦を重ねたエンドレスゲーム。短いプレイでも変化が見えるテンポを追求しました。',
      en: 'An endless block breaker layered with upgrades, coins, and boss stages, tuned so even short sessions keep changing.',
    },
    note: {
      ja: 'ゲームループ / 当たり判定 / 難易度設計',
      en: 'Game loop / Collision / Difficulty pacing',
    },
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
      ja: '考えごとや選択肢を、中心から枝分かれさせて整理するWebアプリ。軽い入力と、後から見返せる構造を両立します。',
      en: 'A web app for branching ideas and choices from a central thought, balancing lightweight input with structure worth revisiting.',
    },
    note: {
      ja: '状態設計 / Firebase / 情報整理UI',
      en: 'State design / Firebase / Information UI',
    },
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
      ja: 'AIコーディングエージェントへ渡す文脈を、ローカルで整理・生成するCLI。新しいチャットでも説明を繰り返さずに済みます。',
      en: 'A local-first CLI that organizes and generates context for AI coding agents, so a new chat can start without repeating everything.',
    },
    note: {
      ja: 'CLI設計 / ファイル処理 / 文脈管理',
      en: 'CLI design / File processing / Context management',
    },
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
      ja: '工場とPLCの空気感を、小さなクリックゲームに変換。メーターの動きと、数字が積み上がる気持ちよさを形にしました。',
      en: 'A small clicker game that turns the mood of factories and PLC panels into animated meters and satisfying incremental progress.',
    },
    note: {
      ja: '進行管理 / 数値バランス / テーマUI',
      en: 'Progression / Number balance / Themed UI',
    },
    tags: ['JavaScript', 'Game', 'UI'],
    link: 'https://github.com/kuto87/plc-factory-clicker',
    status: 'Code',
    year: '2026',
    visual: 'factory',
  },
]
