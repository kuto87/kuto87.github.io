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
    description: 'A satisfying block-breaking game with upgrades and boss-like flow.',
    tags: ['Game', 'JavaScript', 'GitHub Pages'],
    link: 'https://kuto87.github.io/break-reactor/',
    status: 'Live',
  },
  {
    title: 'branch-canvas',
    description: 'A small map for saving ideas, choices, and branching thoughts.',
    tags: ['React', 'Firebase', 'Ideas'],
    link: 'https://github.com/kuto87/branch-canvas',
    status: 'GitHub',
  },
  {
    title: 'ctx-ledger',
    description: 'Clean context packs for AI coding agents.',
    tags: ['Python', 'AI', 'CLI'],
    link: 'https://github.com/kuto87/ctx-ledger',
    status: 'GitHub',
  },
  {
    title: 'plc-factory-clicker',
    description: 'A small factory-themed clicker experiment.',
    tags: ['JavaScript', 'Experiment'],
    link: 'https://github.com/kuto87/plc-factory-clicker',
    status: 'GitHub',
  },
]