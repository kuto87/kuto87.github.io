import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'
import heroImage from './assets/hero.png'
import {
  copy,
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
const enabledDesignModes: DesignMode[] = ['soft']

function isLanguage(value: string | null): value is Language {
  return value === 'ja' || value === 'en'
}

function isDesignMode(value: string | null): value is DesignMode {
  return enabledDesignModes.some((mode) => mode === value)
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

function clearDesignModeUrlParam() {
  if (typeof window === 'undefined') {
    return
  }

  if (new URLSearchParams(window.location.search).has('style')) {
    updateUrl({ style: '' })
  }
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

function useRevealAnimation(designMode: DesignMode, language: Language, projectFilter: ProjectFilter) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
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
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [designMode, language, projectFilter])
}

function getFilteredProjects(filter: ProjectFilter) {
  if (filter === 'live') {
    return projects.filter((project) => project.status === 'Live')
  }

  if (filter === 'code') {
    return projects.filter((project) => project.status === 'GitHub')
  }

  return projects
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
    <section className="hero" aria-labelledby="hero-title" data-reveal>
      <div className="hero-copy" data-reveal>
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

      <figure className="hero-visual" data-reveal>
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
    <article className="project-card" data-reveal>
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
  projectsToShow,
  filter,
  language,
  onFilterChange,
}: {
  projectsToShow: Project[]
  filter: ProjectFilter
  language: Language
  onFilterChange: (filter: ProjectFilter) => void
}) {
  const t = copy[language]

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading" data-reveal>
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

      {projectsToShow.length ? (
        <div className="project-grid">
          {projectsToShow.map((project) => (
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
      <div className="about-card" data-reveal>
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2 id="about-title">{t.about.title}</h2>
        <p>{t.about.text}</p>
      </div>

      <ul className="about-points" aria-label="Making principles" data-reveal>
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
    <section className="section contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
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

function ProjectFilters({
  filter,
  language,
  onFilterChange,
}: {
  filter: ProjectFilter
  language: Language
  onFilterChange: (filter: ProjectFilter) => void
}) {
  const t = copy[language]

  return (
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
  )
}

function SoftExperience({
  filter,
  language,
  onFilterChange,
  projectsToShow,
}: {
  filter: ProjectFilter
  language: Language
  onFilterChange: (filter: ProjectFilter) => void
  projectsToShow: Project[]
}) {
  return (
    <div className="experience experience-soft">
      <Hero language={language} />
      <ProjectsSection
        filter={filter}
        language={language}
        onFilterChange={onFilterChange}
        projectsToShow={projectsToShow}
      />
      <AboutSection language={language} />
      <ContactSection language={language} />
    </div>
  )
}

function ShowcaseProjectPanel({
  index,
  language,
  project,
}: {
  index: number
  language: Language
  project: Project
}) {
  const t = copy[language]
  const projectLabel = `${project.title}: ${t.cta[project.status]}. ${t.openExternal}`

  return (
    <article className="showcase-panel" data-reveal>
      <div className="showcase-device" aria-hidden="true">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <strong>{project.title}</strong>
      </div>
      <div className="showcase-copy">
        <p className="eyebrow">{project.kind[language]}</p>
        <h3>{project.title}</h3>
        <p>{project.description[language]}</p>
        <p>{project.detail[language]}</p>
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

function ShowcaseExperience({
  filter,
  language,
  onFilterChange,
  projectsToShow,
}: {
  filter: ProjectFilter
  language: Language
  onFilterChange: (filter: ProjectFilter) => void
  projectsToShow: Project[]
}) {
  const t = copy[language]

  return (
    <div className="experience showcase-layout">
      <section className="showcase-hero" aria-labelledby="hero-title">
        <div className="showcase-hero-copy" data-reveal>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title" aria-label={t.hero.screenReaderTitle}>
            {t.hero.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p>{t.hero.text.join(' ')}</p>
        </div>
        <div className="showcase-stage" data-reveal aria-hidden="true">
          <img src={heroImage} alt="" />
          <span>Build</span>
          <span>Ship</span>
          <span>Grow</span>
        </div>
      </section>

      <section className="showcase-intro" data-reveal>
        <p>{t.projects.lead}</p>
        <ProjectFilters filter={filter} language={language} onFilterChange={onFilterChange} />
      </section>

      <section className="showcase-panels" id="projects" aria-labelledby="projects-title">
        <h2 id="projects-title" data-reveal>
          {t.projects.title}
        </h2>
        {projectsToShow.length ? (
          projectsToShow.map((project, index) => (
            <ShowcaseProjectPanel
              index={index}
              key={project.title}
              language={language}
              project={project}
            />
          ))
        ) : (
          <p className="empty-state">{t.projects.empty}</p>
        )}
      </section>

      <AboutSection language={language} />
      <ContactSection language={language} />
    </div>
  )
}

function ConsoleExperience({
  filter,
  language,
  onFilterChange,
  projectsToShow,
}: {
  filter: ProjectFilter
  language: Language
  onFilterChange: (filter: ProjectFilter) => void
  projectsToShow: Project[]
}) {
  const t = copy[language]

  return (
    <div className="experience console-layout">
      <section className="ops-hero" aria-labelledby="hero-title" data-reveal>
        <div>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title" aria-label={t.hero.screenReaderTitle}>
            {t.hero.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p>{t.hero.text.join(' ')}</p>
        </div>
        <div className="ops-terminal" aria-hidden="true">
          <span>$ kuto-lab status</span>
          <span>projects: {projects.length}</span>
          <span>live: {projects.filter((project) => project.status === 'Live').length}</span>
          <span>mode: build / observe / improve</span>
        </div>
      </section>

      <section className="ops-board" id="projects" aria-labelledby="projects-title">
        <div className="ops-board-head" data-reveal>
          <div>
            <p className="eyebrow">{t.projects.eyebrow}</p>
            <h2 id="projects-title">{t.projects.title}</h2>
          </div>
          <ProjectFilters filter={filter} language={language} onFilterChange={onFilterChange} />
        </div>

        <div className="ops-grid">
          {projectsToShow.length ? (
            projectsToShow.map((project) => (
              <article className="ops-row" key={project.title} data-reveal>
                <div>
                  <span className={`status-pill ${project.status.toLowerCase()}`}>
                    {t.status[project.status]}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description[language]}</p>
                </div>
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
                <ExternalLink
                  className="card-link"
                  href={project.link}
                  label={`${project.title}: ${t.cta[project.status]}. ${t.openExternal}`}
                >
                  {t.cta[project.status]}
                </ExternalLink>
              </article>
            ))
          ) : (
            <p className="empty-state">{t.projects.empty}</p>
          )}
        </div>
      </section>

      <AboutSection language={language} />
      <ContactSection language={language} />
    </div>
  )
}

function Experience({
  designMode,
  filter,
  language,
  onFilterChange,
  projectsToShow,
}: {
  designMode: DesignMode
  filter: ProjectFilter
  language: Language
  onFilterChange: (filter: ProjectFilter) => void
  projectsToShow: Project[]
}) {
  if (designMode === 'studio') {
    return (
      <ShowcaseExperience
        filter={filter}
        language={language}
        onFilterChange={onFilterChange}
        projectsToShow={projectsToShow}
      />
    )
  }

  if (designMode === 'console') {
    return (
      <ConsoleExperience
        filter={filter}
        language={language}
        onFilterChange={onFilterChange}
        projectsToShow={projectsToShow}
      />
    )
  }

  return (
    <SoftExperience
      filter={filter}
      language={language}
      onFilterChange={onFilterChange}
      projectsToShow={projectsToShow}
    />
  )
}

function App() {
  const [language, setLanguage] = useState<Language>(detectLanguage)
  const [designMode] = useState<DesignMode>(detectDesignMode)
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>(detectProjectFilter)
  const t = copy[language]
  const projectsToShow = useMemo(() => getFilteredProjects(projectFilter), [projectFilter])

  useRevealAnimation(designMode, language, projectFilter)

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
    updateUrl({ lang: nextLanguage })
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
    clearDesignModeUrlParam()
  }, [designMode])

  useEffect(() => {
    writeStoredValue(filterStorageKey, projectFilter)
  }, [projectFilter])

  return (
    <main className="page" data-theme={designMode}>
      <div className="texture-layer" aria-hidden="true" />

      <Header language={language} onLanguageChange={changeLanguage} />
      <Experience
        designMode={designMode}
        filter={projectFilter}
        language={language}
        onFilterChange={setProjectFilter}
        projectsToShow={projectsToShow}
      />

      <footer className="footer">
        <span>Kuto Lab</span>
        <span>© 2026 kuto87</span>
      </footer>
    </main>
  )
}

export default App
