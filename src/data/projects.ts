export type Project = {
  title: string
  description: string
  tags: string[]
  link: string
  status: 'Live' | 'GitHub'
}

export const projects: Project[] = [
  {
    title: 'break-reactor',
    description:
      'ブロック崩しをベースに、強化・コイン・ボス戦っぽい流れを入れたゲームです。',
    tags: ['Game', 'JavaScript', 'GitHub Pages'],
    link: 'https://kuto87.github.io/break-reactor/',
    status: 'Live',
  },
  {
    title: 'branch-canvas',
    description:
      '考えごとや選択肢を、枝分かれのように残していくための小さなWebアプリです。',
    tags: ['React', 'Firebase', 'アイデア整理'],
    link: 'https://github.com/kuto87/branch-canvas',
    status: 'GitHub',
  },
  {
    title: 'ctx-ledger',
    description:
      'AIに渡すための文脈やメモを、整理して扱いやすくするためのツールです。',
    tags: ['Python', 'AI', 'CLI'],
    link: 'https://github.com/kuto87/ctx-ledger',
    status: 'GitHub',
  },
  {
    title: 'plc-factory-clicker',
    description:
      '工場やPLCっぽい雰囲気をテーマにした、小さなクリックゲームの試作です。',
    tags: ['JavaScript', 'Game', '試作'],
    link: 'https://github.com/kuto87/plc-factory-clicker',
    status: 'GitHub',
  },
]