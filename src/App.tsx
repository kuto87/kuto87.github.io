import { Fragment, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'
import { ParticleBackdrop } from './ParticleBackdrop'
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
    <header className="site-header">
      <a className="wordmark" href="#top">
        KUTO<sup>87</sup>
      </a>

      <nav className="site-nav" aria-label={t.navLabel}>
        <a href="#works">{t.nav.works}</a>
        <a href="#about">{t.nav.about}</a>
        <a href="#contact">{t.nav.contact}</a>
      </nav>

      <div className="language-switch" aria-label={t.languageLabel} role="group">
        {(['ja', 'en'] as const).map((option) => (
          <button
            aria-label={option === 'ja' ? 'JP — 日本語' : 'EN — English'}
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
      <p className="hero-kicker">{t.hero.kicker}</p>
      <h1 id="hero-title">
        <TextLines text={t.hero.title} />
      </h1>
      <div className="hero-foot">
        <p>{t.hero.text}</p>
        <a className="quiet-link" href="#works">
          {t.hero.action}<span aria-hidden="true">↓</span>
        </a>
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

function ProjectRow({ language, project }: { language: Language; project: Project }) {
  const t = copy[language]
  const label = project.cta
    ? `${project.title}: ${project.cta[language]}. ${t.external}`
    : undefined

  return (
    <article className="project-row" id={project.id}>
      <header className="project-heading">
        <span className="project-index" aria-hidden="true">{project.index}</span>
        <div>
          <p className="project-kind">{project.kind[language]}</p>
          <h3><ProjectTitle title={project.title} /></h3>
        </div>
        <span className={`project-status status-${project.status.toLowerCase()}`}>
          {project.status === 'Live' && <i aria-hidden="true" />}
          {t.works.status[project.status]}
        </span>
      </header>

      <div className="project-body">
        <p className="project-description">{project.description[language]}</p>
        <dl className="project-details">
          <div>
            <dt>{t.works.detailLabel}</dt>
            <dd>{project.note[language]}</dd>
          </div>
          <div>
            <dt>{t.works.stackLabel}</dt>
            <dd>{project.tags.join(' / ')}</dd>
          </div>
        </dl>
        {project.link && project.cta && label && (
          <ExternalLink className="project-open" href={project.link} label={label}>
            {project.cta[language]}<span aria-hidden="true">↗</span>
          </ExternalLink>
        )}
      </div>
    </article>
  )
}

function Works({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="works section-shell" id="works" aria-labelledby="works-title">
      <header className="section-header">
        <span aria-hidden="true">01</span>
        <h2 id="works-title">{t.works.title}</h2>
        <p>{t.works.lead}</p>
      </header>

      <div className="project-list">
        {projects.map((project) => (
          <ProjectRow key={project.id} language={language} project={project} />
        ))}
      </div>
    </section>
  )
}

function About({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="about section-shell" id="about" aria-labelledby="about-title">
      <header className="section-header">
        <span aria-hidden="true">02</span>
        <h2 id="about-title">{t.about.title}</h2>
      </header>

      <div className="about-layout">
        <p className="about-lead">{t.about.text}</p>
        <div className="about-note">
          <p>{t.about.note}</p>
          <dl>
            <div>
              <dt>{t.about.stackLabel}</dt>
              <dd>React / TypeScript / Python / Firebase</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

function Contact({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
      <header className="section-header">
        <span aria-hidden="true">03</span>
        <h2 id="contact-title">{t.contact.title}</h2>
      </header>
      <div className="contact-layout">
        <p>{t.contact.text}</p>
        <div className="social-links">
          {socialLinks.map((link) => (
            <ExternalLink
              href={link.href}
              key={link.label}
              label={`${link.ariaLabel}. ${t.external}`}
            >
              {link.label}<span aria-hidden="true">↗</span>
            </ExternalLink>
          ))}
        </div>
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
    <div className="page" id="top">
      <ParticleBackdrop />
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <Header language={language} onLanguageChange={changeLanguage} />

      <main id="main-content">
        <Hero language={language} />
        <Works language={language} />
        <About language={language} />
        <Contact language={language} />
      </main>

      <footer className="site-footer section-shell">
        <span>KUTO<sup>87</sup></span>
        <span>© {new Date().getFullYear()} kuto87</span>
        <a href="#top">{t.footerTop} ↑</a>
      </footer>
    </div>
  )
}

export default App
