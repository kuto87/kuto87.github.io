export type Project = {
  title: string
  description: {
    ja: string
    en: string
  }
  tags: {
    ja: string[]
    en: string[]
  }
  link: string
  status: 'Live' | 'GitHub'
}

export const projects: Project[] = [
  {
    title: 'break-reactor',
    description: {
      ja: 'ブロック崩しをベースに、強化・コイン・ボス戦っぽい流れを入れたゲームです。',
      en: 'A block-breaking game with upgrades, coins, and boss-like stages.',
    },
    tags: {
      ja: ['Game', 'JavaScript', 'GitHub Pages'],
      en: ['Game', 'JavaScript', 'GitHub Pages'],
    },
    link: 'https://kuto87.github.io/break-reactor/',
    status: 'Live',
  },
  {
    title: 'branch-canvas',
    description: {
      ja: '考えごとや選択肢を、枝分かれのように残していくための小さなWebアプリです。',
      en: 'A small web app for keeping ideas and choices as a branching map.',
    },
    tags: {
      ja: ['React', 'Firebase', 'アイデア整理'],
      en: ['React', 'Firebase', 'Ideas'],
    },
    link: 'https://github.com/kuto87/branch-canvas',
    status: 'GitHub',
  },
  {
    title: 'ctx-ledger',
    description: {
      ja: 'AIに渡すための文脈やメモを、整理して扱いやすくするためのツールです。',
      en: 'A tool for organizing context notes so they are easier to pass to AI agents.',
    },
    tags: {
      ja: ['Python', 'AI', 'CLI'],
      en: ['Python', 'AI', 'CLI'],
    },
    link: 'https://github.com/kuto87/ctx-ledger',
    status: 'GitHub',
  },
  {
    title: 'plc-factory-clicker',
    description: {
      ja: '工場やPLCっぽい雰囲気をテーマにした、小さなクリックゲームの試作です。',
      en: 'A small clicker game prototype with a factory and PLC-inspired mood.',
    },
    tags: {
      ja: ['JavaScript', 'Game', '試作'],
      en: ['JavaScript', 'Game', 'Prototype'],
    },
    link: 'https://github.com/kuto87/plc-factory-clicker',
    status: 'GitHub',
  },
]
