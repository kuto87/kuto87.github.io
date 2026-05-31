import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { projects } from './data/projects'

type Language = 'ja' | 'en'

const languageStorageKey = 'kuto-lab-language'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/kuto87',
    buttonClass: 'github',
  },
  {
    label: 'X',
    href: 'https://x.com/rinrin1600',
    buttonClass: 'x',
  },
]

const projectStatusLabels = {
  Live: '公開中',
  GitHub: 'GitHub',
} as const

const copy = {
  ja: {
    nav: {
      works: 'Works',
      about: 'About',
    },
    languageLabel: '表示言語',
    hero: {
      eyebrow: 'Kyoto, Japan',
      title: ['小さく作ったものを、', '少しずつ', '置いています。'],
      text: [
        'Webアプリ、ゲーム、自動化ツールなど。',
        'プログラミングを勉強しながら、気になったものを形にしています。',
      ],
      action: '作ったものを見る',
      note: 'React / Python / Firebase / small tools',
    },
    works: {
      eyebrow: 'Works',
      title: '作ったもの',
    },
    about: {
      eyebrow: 'About',
      title: 'くとうさの小さな制作置き場。',
      text: 'プログラミングを勉強しながら、Webアプリやゲーム、自動化ツールなどを少しずつ作っています。まだ試作中のものも含めて、ここにゆるくまとめていきます。',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'GitHubとXにいます',
      text: 'コードはGitHubに、日々のことや制作のメモはXに少しずつ置いていきます。',
    },
    status: {
      Live: '公開中',
      GitHub: 'GitHub',
    },
  },
  en: {
    nav: {
      works: 'Works',
      about: 'About',
    },
    languageLabel: 'Language',
    hero: {
      eyebrow: 'Kyoto, Japan',
      title: ['Small things I make,', 'kept here', 'little by little.'],
      text: [
        'Web apps, games, automation tools, and small experiments.',
        'I am learning programming by turning ideas into tiny usable things.',
      ],
      action: 'View works',
      note: 'React / Python / Firebase / small tools',
    },
    works: {
      eyebrow: 'Works',
      title: 'Works',
    },
    about: {
      eyebrow: 'About',
      title: 'A small making space by Kuto.',
      text: 'I am learning programming while making web apps, games, automation tools, and other small projects. Some are still experiments, and this site keeps them together in a relaxed way.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Find me on GitHub and X',
      text: 'Code lives on GitHub, while daily notes and making logs are posted little by little on X.',
    },
    status: {
      Live: 'Live',
      GitHub: 'GitHub',
    },
  },
} as const

function detectLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'ja'
  }

  const savedLanguage = (() => {
    try {
      return window.localStorage?.getItem(languageStorageKey)
    } catch {
      return null
    }
  })()

  if (savedLanguage === 'ja' || savedLanguage === 'en') {
    return savedLanguage
  }

  const browserLanguages = navigator.languages.length ? navigator.languages : [navigator.language]
  return browserLanguages.some((language) => language.toLowerCase().startsWith('ja')) ? 'ja' : 'en'
}

function App() {
  const [language, setLanguage] = useState<Language>(detectLanguage)
  const t = copy[language]

  const languageOptions = useMemo(
    () =>
      [
        { label: 'JP', value: 'ja' },
        { label: 'EN', value: 'en' },
      ] as const,
    [],
  )

  useEffect(() => {
    document.documentElement.lang = language

    try {
      window.localStorage?.setItem(languageStorageKey, language)
    } catch {
      // The language switch still works for the current page even when storage is unavailable.
    }
  }, [language])

  return (
    <main className="page" key={language}>
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="orb orb-three" />

      <header className="site-header">
        <a className="brand" href="#">
          <span className="brand-mark">87</span>
          <span>Kuto Lab</span>
        </a>

        <nav className="nav">
          <a href="#projects">{t.nav.works}</a>
          <a href="#about">{t.nav.about}</a>
          {socialLinks.map((link) => (
            <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="language-switch" aria-label={t.languageLabel}>
          {languageOptions.map((option) => (
            <button
              aria-pressed={language === option.value}
              aria-label={option.value === 'ja' ? '日本語' : 'English'}
              className={language === option.value ? 'is-active' : undefined}
              key={option.value}
              onClick={() => setLanguage(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <section className="hero">
        <p className="eyebrow">{t.hero.eyebrow}</p>

        <h1>
          {t.hero.title.map((line, index) => (
            <span key={line}>
              {line}
              {index < t.hero.title.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <p className="hero-text">
          {t.hero.text.map((line, index) => (
            <span key={line}>
              {line}
              {index < t.hero.text.length - 1 && <br />}
            </span>
          ))}
        </p>

        <div className="hero-actions">
          <a className="button primary" href="#projects">
            {t.hero.action}
          </a>
          {socialLinks.map((link) => (
            <a
              className={`button ${link.buttonClass}`}
              href={link.href}
              key={link.label}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="soft-card hero-note">
          <span className="note-dot" />
          <p>{t.hero.note}</p>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">{t.works.eyebrow}</p>
          <h2>{t.works.title}</h2>
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
                <span>{t.status[project.status] ?? projectStatusLabels[project.status]}</span>
              </div>

              <p>{project.description[language]}</p>

              <div className="tags">
                {project.tags[language].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-card">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2>{t.about.title}</h2>
          <p>{t.about.text}</p>
        </div>

        <div className="contact-card">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.text}</p>

          <div className="link-actions">
            {socialLinks.map((link) => (
              <a
                className={`button ${link.buttonClass}`}
                href={link.href}
                key={link.label}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
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
