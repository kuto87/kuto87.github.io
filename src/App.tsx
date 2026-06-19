import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'
import heroImage from './assets/hero.png'
import {
  copy,
  designModes,
  designStorageKey,
  filterStorageKey,
  languageStorageKey,
  projectFilters,
  projects,
  socialLinks,
  type DesignMode,
  type Language,
  type Project,
  type ProjectFilter,
} from './data/site'

const defaultDesignMode: DesignMode = 'soft'
const defaultProjectFilter: ProjectFilter = 'all'

function isLanguage(value: string | null): value is Language {
  return value === 'ja' || value === 'en'
}

function isDesignMode(value: string | null): value is DesignMode {
  return designModes.some((mode) => mode.value === value)
}

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
    // The current page still reflects the selected setting when storage is unavailable.
  }
}

function removeStoredValue(key: string) {
  try {
    window.localStorage?.removeItem(key)
  } catch {
    // Preference reset is best effort when storage is unavailable.
  }
}

function detectLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'ja'
  }

  const urlLanguage = new URLSearchParams(window.location.search).get('lang')
  if (isLanguage(urlLanguage)) {
    return urlLanguage
  }

  const savedLanguage = readStoredValue(languageStorageKey)
  if (isLanguage(savedLanguage)) {
    return savedLanguage
  }

  const browserLanguages = navigator.languages.length ? navigator.languages : [navigator.language]
  return browserLanguages.some((language) => language.toLowerCase().startsWith('ja')) ? 'ja' : 'en'
}

function detectDesignMode(): DesignMode {
  if (typeof window === 'undefined') {
    return defaultDesignMode
  }

  const urlDesignMode = new URLSearchParams(window.location.search).get('style')
  if (isDesignMode(urlDesignMode)) {
    return urlDesignMode
  }

  const savedDesignMode = readStoredValue(designStorageKey)
  return isDesignMode(savedDesignMode) ? savedDesignMode : defaultDesignMode
}

function detectProjectFilter(): ProjectFilter {
  if (typeof window === 'undefined') {
    return defaultProjectFilter
  }

  const savedProjectFilter = readStoredValue(filterStorageKey)
  return isProjectFilter(savedProjectFilter) ? savedProjectFilter : defaultProjectFilter
}

function updateUrl(params: Partial<Record<'lang' | 'style', string>>) {
  if (typeof window === 'undefined') {
    return
  }

  const url = new URL(window.location.href)
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    } else {
      url.searchParams.delete(key)
    }
  })
  window.history.replaceState(null, '', url)
}

function Header({
  language,
  onLanguageChange,
}: {
  language: Language
  onLanguageChange: (language: Language) => void
}) {
  const t = copy[language]
  const languageOptions = [
    { label: 'JP', value: 'ja', ariaLabel: '日本語' },
    { label: 'EN', value: 'en', ariaLabel: 'English' },
  ] as const

  return (
    <header className="site-header" id="top">
      <a className="brand" href="#top" aria-label="Kuto Lab top">
        <span className="brand-mark" aria-hidden="true">
          87
        </span>
        <span>Kuto Lab</span>
      </a>

      <nav className="nav" aria-label="Primary navigation">
        <a href="#projects">{t.nav.projects}</a>
        <a href="#about">{t.nav.about}</a>
        <a href="#contact">{t.nav.contact}</a>
      </nav>

      <div className="language-switch" aria-label={t.languageLabel}>
        {languageOptions.map((option) => (
          <button
            aria-pressed={language === option.value}
            aria-label={option.ariaLabel}
            className={language === option.value ? 'is-active' : undefined}
            key={option.value}
            onClick={() => onLanguageChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </header>
  )
}

function SettingsDock({
  designMode,
  language,
  onDesignModeChange,
  onReset,
}: {
  designMode: DesignMode
  language: Language
  onDesignModeChange: (mode: DesignMode) => void
  onReset: () => void
}) {
  const t = copy[language]

  return (
    <div className="style-dock">
      <div className="design-switch soft-card" aria-label={t.designLabel}>
        <span>{t.designLabel}</span>
        <div>
          {designModes.map((mode) => (
            <button
              aria-pressed={designMode === mode.value}
              aria-label={mode.label[language]}
              className={designMode === mode.value ? 'is-active' : undefined}
              key={mode.value}
              onClick={() => onDesignModeChange(mode.value)}
              title={mode.label[language]}
              type="button"
            >
              {mode.shortLabel}
            </button>
          ))}
        </div>
        <button className="reset-button" onClick={onReset} type="button">
          {t.resetLabel}
        </button>
      </div>
    </div>
  )
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
  label?: string
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
      <span className="external-mark" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}

function Hero({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1 id="hero-title" aria-label={t.hero.screenReaderTitle}>
          {t.hero.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <p className="hero-text">
          {t.hero.text.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>

        <div className="hero-actions">
          <a className="button primary" href="#projects">
            {t.hero.action}
          </a>
          <ExternalLink
            className="button github"
            href="https://github.com/kuto87"
            label={`${t.hero.secondaryAction}. ${copy[language].openExternal}`}
          >
            {t.hero.secondaryAction}
          </ExternalLink>
        </div>

        <div className="hero-topics" aria-label="Project themes">
          {t.hero.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </div>

      <figure className="hero-visual">
        <img src={heroImage} alt="" aria-hidden="true" />
        <figcaption>
          <strong>{t.hero.visualTitle}</strong>
          <span>{t.hero.visualCaption}</span>
          <small>{t.hero.note}</small>
        </figcaption>
      </figure>
    </section>
  )
}

function ProjectCard({ language, project }: { language: Language; project: Project }) {
  const t = copy[language]
  const projectLabel = `${project.title}: ${t.cta[project.status]}. ${t.openExternal}`

  return (
    <article className="project-card">
      <div className="project-preview" aria-hidden="true">
        <span>{project.title.slice(0, 2).toUpperCase()}</span>
      </div>

      <div className="project-body">
        <div className="project-top">
          <div className="project-title">
            <p>{project.kind[language]}</p>
            <h3>{project.title}</h3>
          </div>
          <span className={`status-pill ${project.status.toLowerCase()}`}>
            {t.status[project.status]}
          </span>
        </div>

        <p className="project-description">{project.description[language]}</p>
        <p className="project-detail">{project.detail[language]}</p>

        <dl className="project-meta">
          <div>
            <dt>{t.fieldLabels.period}</dt>
            <dd>{project.period}</dd>
          </div>
          <div>
            <dt>{t.fieldLabels.learned}</dt>
            <dd>{project.learned[language]}</dd>
          </div>
        </dl>

        <div className="tags">
          {project.tags[language].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <ExternalLink className="card-link" href={project.link} label={projectLabel}>
          {t.cta[project.status]}
        </ExternalLink>
      </div>
    </article>
  )
}

function ProjectsSection({
  filter,
  language,
  onFilterChange,
}: {
  filter: ProjectFilter
  language: Language
  onFilterChange: (filter: ProjectFilter) => void
}) {
  const t = copy[language]
  const filteredProjects = useMemo(() => {
    if (filter === 'live') {
      return projects.filter((project) => project.status === 'Live')
    }

    if (filter === 'code') {
      return projects.filter((project) => project.status === 'GitHub')
    }

    return projects
  }, [filter])

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t.projects.eyebrow}</p>
          <h2 id="projects-title">{t.projects.title}</h2>
        </div>
        <p>{t.projects.lead}</p>
      </div>

      <div className="filter-row" aria-label={t.filterLabel}>
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

      {filteredProjects.length ? (
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} language={language} project={project} />
          ))}
        </div>
      ) : (
        <p className="empty-state">{t.projects.empty}</p>
      )}
    </section>
  )
}

function AboutSection({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="about-card">
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2 id="about-title">{t.about.title}</h2>
        <p>{t.about.text}</p>
      </div>

      <ul className="about-points" aria-label="Making principles">
        {t.about.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  )
}

function ContactSection({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div>
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2 id="contact-title">{t.contact.title}</h2>
        <p>{t.contact.text}</p>
      </div>

      <div className="link-actions">
        {socialLinks.map((link) => (
          <ExternalLink
            className={`button ${link.buttonClass}`}
            href={link.href}
            key={link.label}
            label={`${link.ariaLabel}. ${t.openExternal}`}
          >
            {link.label}
          </ExternalLink>
        ))}
      </div>
    </section>
  )
}

function App() {
  const [language, setLanguage] = useState<Language>(detectLanguage)
  const [designMode, setDesignMode] = useState<DesignMode>(detectDesignMode)
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>(detectProjectFilter)
  const t = copy[language]

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
    updateUrl({ lang: nextLanguage })
  }

  const changeDesignMode = (mode: DesignMode) => {
    setDesignMode(mode)
    updateUrl({ style: mode })
  }

  const resetPreferences = () => {
    removeStoredValue(languageStorageKey)
    removeStoredValue(designStorageKey)
    removeStoredValue(filterStorageKey)
    setLanguage('ja')
    setDesignMode(defaultDesignMode)
    setProjectFilter(defaultProjectFilter)
    updateUrl({ lang: '', style: '' })
  }

  useEffect(() => {
    document.documentElement.lang = language
    document.title = t.pageTitle
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.pageDescription)
    writeStoredValue(languageStorageKey, language)
  }, [language, t.pageDescription, t.pageTitle])

  useEffect(() => {
    writeStoredValue(designStorageKey, designMode)
  }, [designMode])

  useEffect(() => {
    writeStoredValue(filterStorageKey, projectFilter)
  }, [projectFilter])

  return (
    <main className="page" data-theme={designMode}>
      <div className="texture-layer" aria-hidden="true" />

      <Header language={language} onLanguageChange={changeLanguage} />
      <SettingsDock
        designMode={designMode}
        language={language}
        onDesignModeChange={changeDesignMode}
        onReset={resetPreferences}
      />
      <Hero language={language} />
      <ProjectsSection
        filter={projectFilter}
        language={language}
        onFilterChange={setProjectFilter}
      />
      <AboutSection language={language} />
      <ContactSection language={language} />

      <footer className="footer">
        <span>Kuto Lab</span>
        <span>© 2026 kuto87</span>
      </footer>
    </main>
  )
}

export default App
