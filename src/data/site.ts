export type Language = 'ja' | 'en'
export type DesignMode = 'soft' | 'studio' | 'console'
export type ProjectStatus = 'Live' | 'GitHub'
export type ProjectFilter = 'all' | 'live' | 'code'

export type LocalizedText = {
  ja: string
  en: string
}

export type Project = {
  title: string
  kind: LocalizedText
  description: LocalizedText
  detail: LocalizedText
  learned: LocalizedText
  tags: {
    ja: string[]
    en: string[]
  }
  link: string
  status: ProjectStatus
  period: string
}

export const languageStorageKey = 'kuto-lab-language'
export const designStorageKey = 'kuto-lab-design'
export const filterStorageKey = 'kuto-lab-project-filter'

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/kuto87',
    buttonClass: 'github',
    ariaLabel: 'GitHub profile for kuto87',
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/rinrin1600',
    buttonClass: 'x',
    ariaLabel: 'X profile for rinrin1600',
  },
] as const

export const designModes = [
  {
    value: 'soft',
    shortLabel: 'Soft',
    label: {
      ja: 'Soft garden',
      en: 'Soft garden',
    },
  },
  {
    value: 'studio',
    shortLabel: 'Studio',
    label: {
      ja: 'Paper studio',
      en: 'Paper studio',
    },
  },
  {
    value: 'console',
    shortLabel: 'Console',
    label: {
      ja: 'Console deck',
      en: 'Console deck',
    },
  },
] as const satisfies ReadonlyArray<{
  value: DesignMode
  shortLabel: string
  label: LocalizedText
}>

export const projectFilters = [
  {
    value: 'all',
    label: {
      ja: 'すべて',
      en: 'All',
    },
  },
  {
    value: 'live',
    label: {
      ja: '公開中',
      en: 'Live',
    },
  },
  {
    value: 'code',
    label: {
      ja: 'コード',
      en: 'Code',
    },
  },
] as const satisfies ReadonlyArray<{
  value: ProjectFilter
  label: LocalizedText
}>

export const copy = {
  ja: {
    pageTitle: 'Kuto Lab | kuto87 の個人サイト',
    pageDescription:
      'kuto87 が作ったWebアプリ、ゲーム、自動化ツールをまとめる個人サイトです。',
    nav: {
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    languageLabel: '表示言語',
    designLabel: 'デザイン',
    filterLabel: '表示するプロジェクト',
    resetLabel: '設定を戻す',
    openExternal: '新しいタブで開きます',
    hero: {
      eyebrow: 'Kyoto, Japan',
      title: ['作って、動かして、', '小さく公開して、', '育てています。'],
      screenReaderTitle: '作って、動かして、小さく公開して、育てています。',
      text: [
        'Webアプリ、ゲーム、自動化ツールなど。',
        '手を動かして覚えたことを、使える形のプロジェクトとしてまとめています。',
      ],
      action: '作ったものを見る',
      secondaryAction: 'コードを見る',
      note: 'React / TypeScript / Python / Firebase',
      topics: ['React', 'TypeScript', 'Webアプリ', 'ゲーム', '自動化'],
      visualTitle: 'Kuto Lab index',
      visualCaption: 'small tools, experiments, games',
    },
    projects: {
      eyebrow: 'Projects',
      title: '作ったもの',
      lead: '公開中の作品とコードを、目的・技術・学びが見える形で並べています。',
      empty: 'この条件に合うプロジェクトはまだありません。',
    },
    about: {
      eyebrow: 'About',
      title: 'くとうさの小さな制作置き場。',
      text: 'React、TypeScript、Pythonなどを使いながら、Webアプリやゲーム、自動化ツールを作っています。まず小さく動かし、触ってわかる形にして、あとから育てやすく整えるのが好きです。',
      points: ['小さく作って公開する', 'あとから直しやすく保つ', '遊べる・使える形にする'],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'コードと制作メモはGitHubとXへ',
      text: '制作物のコードはGitHubに、日々のメモや更新はXに少しずつ置いています。',
    },
    status: {
      Live: '公開中',
      GitHub: 'GitHub',
    },
    cta: {
      Live: '遊ぶ・開く',
      GitHub: 'コードを見る',
    },
    fieldLabels: {
      period: '時期',
      learned: '学び',
    },
  },
  en: {
    pageTitle: 'Kuto Lab | Personal site by kuto87',
    pageDescription:
      'A personal portfolio for web apps, games, automation tools, and small experiments by kuto87.',
    nav: {
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    languageLabel: 'Language',
    designLabel: 'Style',
    filterLabel: 'Project filter',
    resetLabel: 'Reset preferences',
    openExternal: 'Opens in a new tab',
    hero: {
      eyebrow: 'Kyoto, Japan',
      title: ['Building, testing,', 'shipping small,', 'and growing projects.'],
      screenReaderTitle: 'Building, testing, shipping small, and growing projects.',
      text: [
        'Web apps, games, automation tools, and small utilities.',
        'A project space for things learned by making them real enough to use.',
      ],
      action: 'View projects',
      secondaryAction: 'View code',
      note: 'React / TypeScript / Python / Firebase',
      topics: ['React', 'TypeScript', 'Web apps', 'Games', 'Automation'],
      visualTitle: 'Kuto Lab index',
      visualCaption: 'small tools, experiments, games',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Projects',
      lead: 'Live work and code repositories, grouped with purpose, stack, and lessons learned.',
      empty: 'No projects match this filter yet.',
    },
    about: {
      eyebrow: 'About',
      title: 'A small project space by Kuto.',
      text: 'I build web apps, games, and automation tools with React, TypeScript, Python, and other small pieces of tech. I like starting small, making things usable, and shaping them so they can grow later.',
      points: ['Ship small things', 'Keep projects easy to change', 'Make work playable or useful'],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Code and making notes live on GitHub and X',
      text: 'GitHub is for source code and project notes. X is for smaller updates and making notes.',
    },
    status: {
      Live: 'Live',
      GitHub: 'GitHub',
    },
    cta: {
      Live: 'Open project',
      GitHub: 'View code',
    },
    fieldLabels: {
      period: 'Period',
      learned: 'Learned',
    },
  },
} as const

export const projects: Project[] = [
  {
    title: 'break-reactor',
    kind: {
      ja: 'ゲーム',
      en: 'Game',
    },
    description: {
      ja: 'ブロック崩しをベースに、強化・コイン・ボス戦っぽい流れを入れたゲームです。',
      en: 'A block-breaking game with upgrades, coins, and boss-like stages.',
    },
    detail: {
      ja: '短いプレイでも変化が出るように、強化とテンポを意識して作っています。',
      en: 'Built around quick sessions, visible upgrades, and a faster sense of progression.',
    },
    learned: {
      ja: 'ゲームループ、当たり判定、難易度調整',
      en: 'Game loops, collision checks, and difficulty pacing',
    },
    tags: {
      ja: ['Game', 'JavaScript', 'GitHub Pages'],
      en: ['Game', 'JavaScript', 'GitHub Pages'],
    },
    link: 'https://kuto87.github.io/break-reactor/',
    status: 'Live',
    period: '2026',
  },
  {
    title: 'branch-canvas',
    kind: {
      ja: 'Webアプリ',
      en: 'Web app',
    },
    description: {
      ja: '考えごとや選択肢を、枝分かれのように残していくための小さなWebアプリです。',
      en: 'A small web app for keeping ideas and choices as a branching map.',
    },
    detail: {
      ja: '思考の分岐を後から見返しやすくするため、軽い入力と構造化を重視しました。',
      en: 'Focused on lightweight input and structure so branching thoughts stay readable later.',
    },
    learned: {
      ja: 'Reactの状態設計、Firebase連携、情報整理UI',
      en: 'React state design, Firebase integration, and information UI',
    },
    tags: {
      ja: ['React', 'Firebase', 'アイデア整理'],
      en: ['React', 'Firebase', 'Ideas'],
    },
    link: 'https://github.com/kuto87/branch-canvas',
    status: 'GitHub',
    period: '2026',
  },
  {
    title: 'ctx-ledger',
    kind: {
      ja: 'ツール',
      en: 'Tool',
    },
    description: {
      ja: 'AIに渡すための文脈やメモを、整理して扱いやすくするためのツールです。',
      en: 'A tool for organizing context notes so they are easier to pass to AI agents.',
    },
    detail: {
      ja: '散らばるメモを扱いやすくし、必要な文脈だけを取り出しやすくするCLIです。',
      en: 'A CLI for shaping scattered notes into reusable context that is easier to retrieve.',
    },
    learned: {
      ja: 'CLI設計、ファイル処理、AI向け文脈管理',
      en: 'CLI design, file processing, and context management for AI workflows',
    },
    tags: {
      ja: ['Python', 'AI', 'CLI'],
      en: ['Python', 'AI', 'CLI'],
    },
    link: 'https://github.com/kuto87/ctx-ledger',
    status: 'GitHub',
    period: '2026',
  },
  {
    title: 'plc-factory-clicker',
    kind: {
      ja: 'ゲーム',
      en: 'Game',
    },
    description: {
      ja: '工場やPLCっぽい雰囲気をテーマにした、小さなクリックゲームです。',
      en: 'A small clicker game with a factory and PLC-inspired mood.',
    },
    detail: {
      ja: '工場のメーター感とクリックの積み上げ感を、軽いWebゲームに落とし込みました。',
      en: 'Turns factory meters and incremental clicking into a small browser game.',
    },
    learned: {
      ja: '進行管理、数値バランス、テーマに合うUI作り',
      en: 'Progression, number balancing, and UI that supports a theme',
    },
    tags: {
      ja: ['JavaScript', 'Game', 'Clicker'],
      en: ['JavaScript', 'Game', 'Clicker'],
    },
    link: 'https://github.com/kuto87/plc-factory-clicker',
    status: 'GitHub',
    period: '2026',
  },
]
