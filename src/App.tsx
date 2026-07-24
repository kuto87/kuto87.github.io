import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'
import {
  copy,
  filterStorageKey,
  projectFilters,
  projects,
  socialLinks,
  type Language,
  type Project,
  type ProjectFilter,
} from './data/site'

const defaultFilter: ProjectFilter = 'all'

function isProjectFilter(value: string | null): value is ProjectFilter {
  return projectFilters.some((filter) => filter.value === value)
}

function readStoredValue(key: string) {
  try {
    return window.localStorage?.getItem(key) ?? null
  } catch {
    return null
  }
}

function writeStoredValue(key: string, value: string) {
  try {
    window.localStorage?.setItem(key, value)
  } catch {
    // Preferences remain available for the current session when storage is blocked.
  }
}

function detectLanguage(): Language {
  return window.location.pathname.startsWith('/en/') ? 'en' : 'ja'
}

function detectFilter(): ProjectFilter {
  const storedFilter = readStoredValue(filterStorageKey)
  return isProjectFilter(storedFilter) ? storedFilter : defaultFilter
}

function navigateToLanguage(language: Language) {
  const targetPath = language === 'en' ? '/en/' : '/'
  window.location.assign(`${targetPath}${window.location.hash}`)
}

function useRevealAnimation(language: Language, filter: ProjectFilter) {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [filter, language])
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
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1 id="hero-title" aria-label={t.hero.screenReaderTitle}>
          {t.hero.title.map((line, index) => (
            <span className={index === 1 ? 'hero-accent-line' : undefined} key={line}>
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

      <div className="hero-stage" aria-hidden="true" data-reveal>
        <div className="stage-coordinate stage-coordinate-top">35.0116° N</div>
        <div className="stage-coordinate stage-coordinate-side">135.7681° E</div>
        <div className="stack-object">
          <div className="stack-shadow" />
          <div className="stack-plate stack-plate-back">
            <span>05</span>
            <span>PROJECTS</span>
          </div>
          <div className="stack-plate stack-plate-mid">
            <span>KUTO</span>
            <span>LAB</span>
          </div>
          <div className="stack-plate stack-plate-front">
            <span className="stack-number">87</span>
            <span className="stack-caption">{t.hero.visualCaption}</span>
            <span className="stack-year">©26</span>
          </div>
        </div>
        <div className="stage-stamp">KYOTO<br />JAPAN</div>
      </div>
    </section>
  )
}

function IndexStrip({ language }: { language: Language }) {
  return (
    <div className="index-strip" aria-label="Creative fields">
      {copy[language].indexStrip.map((item, index) => (
        <span key={item}>
          {item}
          {index < copy[language].indexStrip.length - 1 && <i aria-hidden="true">✦</i>}
        </span>
      ))}
    </div>
  )
}

function ProjectArtwork({ project }: { project: Project }) {
  if (project.visual === 'press') {
    return (
      <div className="artwork artwork-press" aria-hidden="true">
        <div className="press-sheet press-sheet-back">¥87</div>
        <div className="press-sheet press-sheet-mid">億万</div>
        <div className="press-sheet press-sheet-front">
          <span>PRINT</span>
          <strong>87</strong>
          <span>SUPPORT</span>
        </div>
      </div>
    )
  }

  if (project.visual === 'reactor') {
    return (
      <div className="artwork artwork-reactor" aria-hidden="true">
        <div className="reactor-score">WAVE 87</div>
        <div className="reactor-blocks">
          {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
        </div>
        <span className="reactor-ball" />
        <span className="reactor-paddle" />
      </div>
    )
  }

  if (project.visual === 'branch') {
    return (
      <div className="artwork artwork-branch" aria-hidden="true">
        <span className="branch-line branch-line-a" />
        <span className="branch-line branch-line-b" />
        <span className="branch-line branch-line-c" />
        <span className="branch-node branch-node-root">IDEA</span>
        <span className="branch-node branch-node-a">A</span>
        <span className="branch-node branch-node-b">B</span>
        <span className="branch-node branch-node-c">C</span>
      </div>
    )
  }

  if (project.visual === 'ledger') {
    return (
      <div className="artwork artwork-ledger" aria-hidden="true">
        <div className="terminal-bar"><i /><i /><i /></div>
        <div className="terminal-copy">
          <span>$ ctx handoff</span>
          <span>collecting git state...</span>
          <span>building context pack...</span>
          <strong>NEXT_PROMPT.md ✓</strong>
          <i className="terminal-cursor" />
        </div>
      </div>
    )
  }

  return (
    <div className="artwork artwork-factory" aria-hidden="true">
      <div className="factory-display">0087</div>
      <div className="factory-gauge"><span /></div>
      <div className="factory-controls"><i /><i /><i /></div>
      <div className="factory-label">PLC / RUN</div>
    </div>
  )
}

function ProjectCard({ language, project }: { language: Language; project: Project }) {
  const t = copy[language]
  const label = `${project.title}: ${t.works.open}. ${t.external}`

  return (
    <ExternalLink
      className={`project-card project-${project.visual}${project.featured ? ' is-featured' : ''}`}
      href={project.link}
      label={label}
    >
      <div className="project-art">
        <ProjectArtwork project={project} />
      </div>
      <div className="project-copy">
        <div className="project-kicker">
          <span>{project.index}</span>
          <span>{project.kind[language]}</span>
          <span className={`project-status status-${project.status.toLowerCase()}`}>
            <i aria-hidden="true" />
            {t.works.status[project.status]}
          </span>
        </div>

        <h3>{project.title}</h3>
        <p className="project-description">{project.description[language]}</p>
        <p className="project-note">{project.note[language]}</p>

        <div className="project-footer">
          <ul aria-label="Technology">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <span className="project-open">
            {t.works.open}
            <i aria-hidden="true">↗</i>
          </span>
        </div>
      </div>
    </ExternalLink>
  )
}

function Works({
  filter,
  language,
  onFilterChange,
}: {
  filter: ProjectFilter
  language: Language
  onFilterChange: (filter: ProjectFilter) => void
}) {
  const t = copy[language]
  const visibleProjects = useMemo(() => {
    if (filter === 'live') return projects.filter((project) => project.status === 'Live')
    if (filter === 'code') return projects.filter((project) => project.status === 'Code')
    return projects
  }, [filter])

  return (
    <section className="works section-shell" id="works" aria-labelledby="works-title">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">{t.works.eyebrow}</p>
          <h2 id="works-title">{t.works.title}</h2>
        </div>
        <div className="section-heading-side">
          <p>{t.works.lead}</p>
          <div className="project-filters" aria-label={t.works.filterLabel} role="group">
            {projectFilters.map((option) => (
              <button
                aria-pressed={filter === option.value}
                className={filter === option.value ? 'is-active' : undefined}
                key={option.value}
                onClick={() => onFilterChange(option.value)}
                type="button"
              >
                {option.label[language]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {visibleProjects.length ? (
        <div className="project-list">
          <p className="sr-only" aria-live="polite">
            {language === 'ja'
              ? `${visibleProjects.length}件のプロジェクトを表示しています。`
              : `Showing ${visibleProjects.length} projects.`}
          </p>
          {visibleProjects.map((project) => (
            <div data-reveal key={project.id}>
              <ProjectCard language={language} project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">{t.works.empty}</p>
      )}
    </section>
  )
}

function About({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="about section-shell" id="about" aria-labelledby="about-title">
      <div className="about-intro" data-reveal>
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2 id="about-title">
          {t.about.title.split('\n').map((line) => <span key={line}>{line}</span>)}
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-copy" data-reveal>
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

        <div className="principles" data-reveal>
          <p className="principles-label">{t.about.principlesLabel}</p>
          <ol>
            {t.about.principles.map((principle) => (
              <li key={principle.number}>
                <span>{principle.number}</span>
                <div>
                  <strong>{principle.title}</strong>
                  <p>{principle.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Contact({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
      <div className="contact-card" data-reveal>
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2 id="contact-title">
          {t.contact.title.split('\n').map((line) => <span key={line}>{line}</span>)}
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
        <span className="contact-orbit" aria-hidden="true">87</span>
      </div>
    </section>
  )
}

function App() {
  const [language] = useState<Language>(detectLanguage)
  const [filter, setFilter] = useState<ProjectFilter>(detectFilter)
  const t = copy[language]

  useRevealAnimation(language, filter)

  useEffect(() => {
    document.documentElement.lang = language
    document.title = t.pageTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.pageDescription)
  }, [language, t.pageDescription, t.pageTitle])

  useEffect(() => {
    writeStoredValue(filterStorageKey, filter)
  }, [filter])

  const changeLanguage = (nextLanguage: Language) => {
    if (nextLanguage === language) return
    navigateToLanguage(nextLanguage)
  }

  return (
    <div className="page">
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <Header language={language} onLanguageChange={changeLanguage} />

      <main id="main-content">
        <Hero language={language} />
        <IndexStrip language={language} />
        <Works filter={filter} language={language} onFilterChange={setFilter} />
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
