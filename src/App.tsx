import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { projects } from './data/projects'

type Language = 'ja' | 'en'
type DesignMode = 'a' | 'b' | 'c' | 'd' | 'e'

const languageStorageKey = 'kuto-lab-language'
const designStorageKey = 'kuto-lab-design'

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

const designModes: DesignMode[] = ['a', 'b', 'c', 'd', 'e']

const copy = {
  ja: {
    nav: {
      projects: 'Projects',
      about: 'About',
    },
    languageLabel: '表示言語',
    designLabel: 'デザイン',
    hero: {
      eyebrow: 'Kyoto, Japan',
      title: ['作って、動かして、', '少しずつ', '育てています。'],
      text: [
        'Webアプリ、ゲーム、自動化ツールなど。',
        '手を動かして覚えたことを、見やすいプロジェクトとしてまとめています。',
      ],
      action: '作ったものを見る',
      note: 'React / Python / Firebase / small tools',
      topics: ['React', 'TypeScript', 'Webアプリ', 'ゲーム', '自動化'],
    },
    projects: {
      eyebrow: 'Projects',
      title: '作ったもの',
      lead: 'アプリ、ゲーム、CLIツールなど。追加するときは projects.ts を編集するだけでカードに反映されます。',
    },
    about: {
      eyebrow: 'About',
      title: 'くとうさの小さな制作置き場。',
      text: 'React、TypeScript、Pythonなどを使いながら、Webアプリやゲーム、自動化ツールを作っています。小さく作って、動かして、あとから育てやすい形にするのが好きです。',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'GitHubとXにいます',
      text: 'GitHubとXにいます。コードや制作のメモなどを、少しずつ置いていきます。',
    },
    status: {
      Live: '公開中',
      GitHub: 'GitHub',
    },
  },
  en: {
    nav: {
      projects: 'Projects',
      about: 'About',
    },
    languageLabel: 'Language',
    designLabel: 'Style',
    hero: {
      eyebrow: 'Kyoto, Japan',
      title: ['Building, running,', 'and growing', 'small projects.'],
      text: [
        'Web apps, games, automation tools, and small utilities.',
        'A soft project space shaped by learning, building, and shipping small things.',
      ],
      action: 'View projects',
      note: 'React / Python / Firebase / small tools',
      topics: ['React', 'TypeScript', 'Web apps', 'Games', 'Automation'],
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Projects',
      lead: 'Apps, games, and CLI tools. New project cards can be added by editing projects.ts.',
    },
    about: {
      eyebrow: 'About',
      title: 'A small project space by Kuto.',
      text: 'I build web apps, games, and automation tools with React, TypeScript, Python, and other small pieces of tech. I like making things simple, usable, and easy to grow later.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Find me on GitHub and X',
      text: 'You can find me on GitHub and X, where I share code, projects, and small making notes.',
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

function detectDesignMode(): DesignMode {
  if (typeof window === 'undefined') {
    return 'a'
  }

  const savedDesignMode = (() => {
    try {
      return window.localStorage?.getItem(designStorageKey)
    } catch {
      return null
    }
  })()

  return designModes.includes(savedDesignMode as DesignMode) ? (savedDesignMode as DesignMode) : 'a'
}

function App() {
  const [language, setLanguage] = useState<Language>(detectLanguage)
  const [designMode, setDesignMode] = useState<DesignMode>(detectDesignMode)
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

  useEffect(() => {
    try {
      window.localStorage?.setItem(designStorageKey, designMode)
    } catch {
      // The design switch still works for the current page even when storage is unavailable.
    }
  }, [designMode])

  return (
    <main className="page" data-theme={designMode} key={language}>
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="orb orb-three" />

      <header className="site-header">
        <a className="brand" href="#">
          <span className="brand-mark">87</span>
          <span>Kuto Lab</span>
        </a>

        <nav className="nav">
          <a href="#projects">{t.nav.projects}</a>
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

        <div className="hero-topics" aria-label="Project themes">
          {t.hero.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>

        <div className="design-switch soft-card" aria-label={t.designLabel}>
          <span>{t.designLabel}</span>
          <div>
            {designModes.map((mode) => (
              <button
                aria-pressed={designMode === mode}
                className={designMode === mode ? 'is-active' : undefined}
                key={mode}
                onClick={() => setDesignMode(mode)}
                type="button"
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="soft-card hero-note">
          <span className="note-dot" />
          <p>{t.hero.note}</p>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.projects.eyebrow}</p>
            <h2>{t.projects.title}</h2>
          </div>
          <p>{t.projects.lead}</p>
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
                <div className="project-title">
                  <div>
                    <p>{project.kind[language]}</p>
                    <h3>{project.title}</h3>
                  </div>
                </div>
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
