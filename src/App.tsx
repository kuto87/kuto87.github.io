import { Fragment, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'
import {
  copy,
  projects,
  socialLinks,
  type Language,
  type Project,
} from './data/site'

function detectLanguage(): Language {
  return window.location.pathname.startsWith('/en/') ? 'en' : 'ja'
}

function navigateToLanguage(language: Language) {
  const targetPath = language === 'en' ? '/en/' : '/'
  window.location.assign(`${targetPath}${window.location.hash}`)
}

function ExternalLink({
  children,
  className,
  href,
  label,
}: {
  children: ReactNode
  className?: string
  href: string
  label: string
}) {
  return (
    <a
      aria-label={label}
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

function AmbientBackground() {
  const traces = [
    'M0 54H96L154 18H248L306 54H420L476 82H588L646 26H756L810 54H934L988 12H1098L1152 68H1270L1324 34H1440',
    'M0 46H142L198 72H310L366 28H482L538 58H662L718 16H822L878 48H1010L1066 78H1184L1240 40H1440',
    'M0 62H108L164 34H276L332 76H450L506 44H626L682 18H798L854 64H974L1030 38H1154L1210 82H1326L1382 52H1440',
  ]

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-paper">
        <div className="ambient-grid" />
        <div className="feed-holes feed-holes-left" />
        <div className="feed-holes feed-holes-right" />
        {traces.map((path, index) => (
          <svg
            className={`chart-signal chart-signal-${String.fromCharCode(97 + index)}`}
            focusable="false"
            key={path}
            preserveAspectRatio="none"
            viewBox="0 0 1440 100"
          >
            <path d={path} vectorEffect="non-scaling-stroke" />
          </svg>
        ))}
        <div className="ambient-registration">87 / LOG</div>
      </div>
      <div className="ambient-plotter-line"><i /><span>REC</span></div>
    </div>
  )
}

function TextLines({ text }: { text: string }) {
  const lines = text.split('\n')

  return (
    <span className="text-lines">
      {lines.map((line, index) => (
        <Fragment key={`${line}-${index}`}>
          <span>{line}</span>
          {index < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </span>
  )
}

function Header({
  language,
  onLanguageChange,
}: {
  language: Language
  onLanguageChange: (language: Language) => void
}) {
  const t = copy[language]

  return (
    <header className="site-header" id="top">
      <a className="wordmark" href="#top" aria-label="KUTO — page top">
        <span>KUTO</span>
        <span aria-hidden="true">/87</span>
      </a>

      <p className="header-note">
        <i aria-hidden="true" />
        {t.headerNote}
      </p>

      <nav className="site-nav" aria-label={t.navLabel}>
        <a href="#works">{t.nav.works}</a>
        <a href="#about">{t.nav.about}</a>
        <a href="#contact">{t.nav.contact}</a>
      </nav>

      <div className="language-switch" aria-label={t.languageLabel} role="group">
        {(['ja', 'en'] as const).map((option) => (
          <button
            aria-label={option === 'ja' ? '日本語' : 'English'}
            aria-pressed={language === option}
            className={language === option ? 'is-active' : undefined}
            key={option}
            onClick={() => onLanguageChange(option)}
            type="button"
          >
            {option === 'ja' ? 'JP' : 'EN'}
          </button>
        ))}
      </div>
    </header>
  )
}

function Hero({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1 id="hero-title" aria-label={t.hero.screenReaderTitle}>
          {t.hero.title.map((line, index) => (
            <span className={index === 1 ? 'hero-accent-line' : undefined} key={`${line}-${index}`}>
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-lead">{t.hero.text}</p>

        <div className="hero-actions">
          <a className="button button-primary" href="#works">
            {t.hero.primaryAction}
            <span aria-hidden="true">↓</span>
          </a>
          <ExternalLink
            className="button button-secondary"
            href="https://github.com/kuto87"
            label={`${t.hero.secondaryAction}. ${t.external}`}
          >
            {t.hero.secondaryAction}
            <span aria-hidden="true">↗</span>
          </ExternalLink>
        </div>

        <p className="availability">
          <span aria-hidden="true" />
          {t.hero.availability}
        </p>
      </div>

      <div className="hero-stage" aria-hidden="true">
        <div className="plotter-meta plotter-meta-top">35.0116 N / 135.7681 E</div>
        <div className="plotter-meta plotter-meta-side">WORK LOG — 087</div>
        <div className="plotter-paper">
          <span className="plotter-kicker">MAKE / TEST / PATCH</span>
          <svg
            className="plotter-trace"
            focusable="false"
            preserveAspectRatio="none"
            viewBox="0 0 1100 110"
          >
            <path
              d="M0 62H80L136 18H256L312 62H400L456 88H560L616 28H720L780 64H900L960 34H1100"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <strong>87</strong>
          <span className="plotter-caption">{t.hero.visualCaption}</span>
          <span className="plotter-date">2026—NOW</span>
        </div>
        <div className="plotter-rail">
          <span className="plotter-head"><i />REC</span>
        </div>
        <div className="plotter-output">KUTO / PERSONAL OUTPUT / KYOTO</div>
      </div>
    </section>
  )
}

function ProjectTitle({ title }: { title: string }) {
  if (title.includes(' ')) {
    const words = title.split(' ')

    return (
      <>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span>{word}</span>
            {index < words.length - 1 && <><span aria-hidden="true"> </span><wbr /></>}
          </Fragment>
        ))}
      </>
    )
  }

  const segments = title.split('-')

  return (
    <>
      {segments.map((segment, index) => (
        <Fragment key={`${segment}-${index}`}>
          <span>{segment}{index < segments.length - 1 ? '-' : ''}</span>
          {index < segments.length - 1 && <wbr />}
        </Fragment>
      ))}
    </>
  )
}

function ProjectEvidence({ project }: { project: Project }) {
  if (project.visual === 'press') {
    return (
      <div className="evidence evidence-support" aria-hidden="true">
        <div className="support-document">
          <p>億万印刷所 / SUPPORT</p>
          <strong>必要な情報を<br />一枚に。</strong>
          <ul>
            <li>01 — FAQ</li>
            <li>02 — PRIVACY</li>
            <li>03 — REPORT AN ISSUE</li>
          </ul>
        </div>
        <span className="evidence-stamp">LIVE<br />PAGE</span>
      </div>
    )
  }

  if (project.visual === 'reactor') {
    return (
      <div className="evidence evidence-reactor" aria-hidden="true">
        <div className="reactor-score">WAVE 0005 / BOSS</div>
        <div className="reactor-field">
          {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
        </div>
        <span className="reactor-ball" />
        <span className="reactor-paddle" />
        <div className="reactor-stat"><span>MAX BALL</span><strong>30</strong></div>
      </div>
    )
  }

  if (project.visual === 'branch') {
    return (
      <div className="evidence evidence-branch" aria-hidden="true">
        <code>maps/&#123;mapId&#125;/nodes</code>
        <div className="branch-tree">
          <span className="branch-node branch-node-root">ROOT</span>
          <span className="branch-node branch-node-a">A</span>
          <span className="branch-node branch-node-b">B</span>
          <span className="branch-node branch-node-c">C</span>
          <i className="branch-line branch-line-a" />
          <i className="branch-line branch-line-b" />
          <i className="branch-line branch-line-c" />
        </div>
        <p>SELECT × SHARE × COPY</p>
      </div>
    )
  }

  if (project.visual === 'ledger') {
    return (
      <div className="evidence evidence-ledger" aria-hidden="true">
        <div className="ledger-command">$ ctx handoff</div>
        <div className="ledger-output">
          <span>01  notes</span>
          <span>02  git state</span>
          <span>03  sent history</span>
          <strong>→ NEXT_PROMPT.md</strong>
        </div>
      </div>
    )
  }

  return (
    <div className="evidence evidence-factory" aria-hidden="true">
      <div className="factory-rail" />
      <div className="factory-contact">X0</div>
      <div className="factory-coil">M0</div>
      <div className="factory-timer">T0<br /><small>3 SEC</small></div>
      <div className="factory-state">RUN / 0087</div>
    </div>
  )
}

function ProjectCard({ language, project }: { language: Language; project: Project }) {
  const t = copy[language]
  const label = `${project.title}: ${project.cta[language]}. ${t.external}`

  return (
    <article className={`project-entry project-${project.visual}${project.featured ? ' is-featured' : ''}`}>
      <span className="project-index" aria-hidden="true">{project.index}</span>

      <header className="project-heading">
        <div className="project-kicker">
          <span>{project.year}</span>
          <span>{project.kind[language]}</span>
          <span className={`project-status status-${project.status.toLowerCase()}`}>
            {t.works.status[project.status]}
          </span>
        </div>
        <h3><ProjectTitle title={project.title} /></h3>
      </header>

      <div className="project-entry-body">
        <div className="project-evidence">
          <ProjectEvidence project={project} />
        </div>
        <div className="project-copy">
          <dl>
            <div>
              <dt>{t.works.whyLabel}</dt>
              <dd>{project.description[language]}</dd>
            </div>
            <div>
              <dt>{t.works.detailLabel}</dt>
              <dd>{project.note[language]}</dd>
            </div>
          </dl>

          <p className="project-stack">
            <span>{t.works.stackLabel}</span>
            {project.tags.join(' / ')}
          </p>

          <ExternalLink className="project-open" href={project.link} label={label}>
            {project.cta[language]}
            <i aria-hidden="true">↗</i>
          </ExternalLink>
        </div>
      </div>
    </article>
  )
}

function Works({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="works section-shell" id="works" aria-labelledby="works-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t.works.eyebrow}</p>
          <h2 id="works-title"><TextLines text={t.works.title} /></h2>
        </div>
        <div className="section-heading-side">
          <p>{t.works.lead}</p>
        </div>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} language={language} project={project} />
        ))}
      </div>
    </section>
  )
}

function About({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="about section-shell" id="about" aria-labelledby="about-title">
      <div className="about-intro">
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2 id="about-title">
          <TextLines text={t.about.title} />
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <p>{t.about.text}</p>
          <dl>
            <div>
              <dt>{t.about.locationLabel}</dt>
              <dd>{t.about.location}</dd>
            </div>
            <div>
              <dt>{t.about.stackLabel}</dt>
              <dd>React / TypeScript / Python / Firebase</dd>
            </div>
          </dl>
        </div>

        <blockquote className="bench-note">
          <p>{t.about.memo}</p>
          <cite>KUTO87 / WORK NOTE</cite>
        </blockquote>
      </div>
    </section>
  )
}

function Contact({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
      <div className="contact-card">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2 id="contact-title">
          <TextLines text={t.contact.title} />
        </h2>
        <div className="contact-bottom">
          <p>{t.contact.text}</p>
          <div className="social-links">
            {socialLinks.map((link) => (
              <ExternalLink
                href={link.href}
                key={link.label}
                label={`${link.ariaLabel}. ${t.external}`}
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </ExternalLink>
            ))}
          </div>
        </div>
        <p className="contact-signature">END OF CURRENT LOG — CONTINUE ON GITHUB / X</p>
      </div>
    </section>
  )
}

function App() {
  const [language] = useState<Language>(detectLanguage)
  const t = copy[language]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = t.pageTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.pageDescription)
  }, [language, t.pageDescription, t.pageTitle])

  const changeLanguage = (nextLanguage: Language) => {
    if (nextLanguage === language) return
    navigateToLanguage(nextLanguage)
  }

  return (
    <div className="page">
      <AmbientBackground />
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <Header language={language} onLanguageChange={changeLanguage} />

      <main id="main-content">
        <Hero language={language} />
        <Works language={language} />
        <About language={language} />
        <Contact language={language} />
      </main>

      <footer className="site-footer section-shell">
        <span>KUTO / 87</span>
        <span>© {new Date().getFullYear()} kuto87</span>
        <a href="#top">{t.footerTop} ↑</a>
      </footer>
    </div>
  )
}

export default App
