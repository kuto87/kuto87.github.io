import './App.css'

type Project = {
  title: string
  description: string
  tags: string[]
  link: string
  status: 'Live' | 'GitHub'
}

const projects: Project[] = [
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

function App() {
  return (
    <main className="page">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="orb orb-three" />

      <header className="site-header">
        <a className="brand" href="#">
          <span className="brand-mark">87</span>
          <span>Kuto Lab</span>
        </a>

        <nav className="nav">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="https://github.com/kuto87" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">Kyoto, Japan</p>

      <h1>
        small things,
        <br />
        quietly
        <br />
        put together.
      </h1>

      <p className="hero-text">
        Web, games, automation, and small ideas —
        <br />
        kept light, useful, and a little playful.
      </p>

        <div className="hero-actions">
          <a className="button primary" href="#projects">
            View projects
          </a>
          <a
            className="button ghost"
            href="https://github.com/kuto87"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div><h2>Selected things</h2>

        <div className="soft-card hero-note">
          <span className="note-dot" />
          <p>React / Python / Firebase / tiny utilities</p>        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2>Selected things</h2>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <a
              className="project-card"
              href={project.link}
              key={project.title}
              target="_blank"
              rel="noreferrer"
            >
              <div className="project-top">
                <h3>{project.title}</h3>
                <span>{project.status}</span>
              </div>

              <p>{project.description}</p>

              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-card">
          <p className="eyebrow">About</p>
          <h2>作ったものを、静かに置いておく場所。</h2>
          <p>
            I make small web apps, games, and automation tools.
            Some are useful, some are just experiments — all of them started from curiosity.
          </p>
        </div>

        <div className="contact-card">
          <p className="eyebrow">Contact</p>
          <h2>Elsewhere</h2>
          <p>Most of the code lives on GitHub.</p>
          <a
            className="button primary"
            href="https://github.com/kuto87"
            target="_blank"
            rel="noreferrer"
          >
            @kuto87
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>Kuto Lab</span>
        <span>© 2026 kuto87</span>
      </footer>
    </main>
  )
}

export default App