import './App.css'
import { projects } from './data/projects'

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
          <a href="#projects">Works</a>
          <a href="#about">About</a>
          <a href="https://github.com/kuto87" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://x.com/rinrin1600" target="_blank" rel="noreferrer">
            X
          </a>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">Kyoto, Japan</p>

        <h1>
          小さく作ったものを、
          <br />
          少しずつ
          <br />
          置いています。
        </h1>

        <p className="hero-text">
          Webアプリ、ゲーム、自動化ツールなど。
          <br />
          プログラミングを勉強しながら、気になったものを形にしています。
        </p>

        <div className="hero-actions">
          <a className="button primary" href="#projects">
            作ったものを見る
          </a>
          <a
            className="button github"
            href="https://github.com/kuto87"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="button x"
            href="https://x.com/rinrin1600"
            target="_blank"
            rel="noreferrer"
          >
            X
          </a>
        </div>

        <div className="soft-card hero-note">
          <span className="note-dot" />
          <p>React / Python / Firebase / small tools</p>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Works</p>
          <h2>作ったもの</h2>
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
                <span>{project.status === 'Live' ? '公開中' : 'GitHub'}</span>
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
          <h2>くとうさの小さな制作置き場。</h2>
          <p>
            プログラミングを勉強しながら、Webアプリやゲーム、
            自動化ツールなどを少しずつ作っています。まだ試作中のものも含めて、
            ここにゆるくまとめていきます。
          </p>
        </div>

        <div className="contact-card">
          <p className="eyebrow">Contact</p>
          <h2>GitHubとXにいます</h2>
          <p>
            コードはGitHubに、日々のことや制作のメモはXに少しずつ置いていきます。
          </p>

          <div className="link-actions">
            <a
              className="button github"
              href="https://github.com/kuto87"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="button x"
              href="https://x.com/rinrin1600"
              target="_blank"
              rel="noreferrer"
            >
              X
            </a>
          </div>
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