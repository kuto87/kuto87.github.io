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
      projects: 'Projects',
      about: 'About',
    },
    languageLabel: '表示言語',
    hero: {
      eyebrow: 'Kyoto, Japan',
      title: ['作って、試して、', '少しずつ', '置いています。'],
      text: [
        'Webアプリ、ゲーム、自動化ツールなど。',
        '勉強しながら作ったものを、気楽に見られる形でまとめています。',
      ],
      action: '作ったものを見る',
      note: 'React / Python / Firebase / small tools',
      topics: ['Webアプリ', 'ゲーム', '自動化', '学習ログ'],
    },
    projects: {
      eyebrow: 'Projects',
      title: '作ったもの',
      lead: '完成したものも、試作中のものも。手を動かしながら覚えたことを、小さなプロジェクトとして置いています。',
    },
    about: {
      eyebrow: 'About',
      title: 'くとうさの小さな制作置き場。',
      text: 'プログラミングを勉強しながら、Webアプリやゲーム、自動化ツールなどを少しずつ作っています。きれいに作り切ることだけでなく、試して残すことも大事にしています。',
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
    hero: {
      eyebrow: 'Kyoto, Japan',
      title: ['Making, testing,', 'and keeping', 'small things here.'],
      text: [
        'Web apps, games, automation tools, and small experiments.',
        'A soft place for projects I build while learning programming.',
      ],
      action: 'View projects',
      note: 'React / Python / Firebase / small tools',
      topics: ['Web apps', 'Games', 'Automation', 'Learning notes'],
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Projects',
      lead: 'Finished pieces, prototypes, and small tools. Each one is a note from learning by making.',
    },
    about: {
      eyebrow: 'About',
      title: 'A small project space by Kuto.',
      text: 'I am learning programming while making web apps, games, automation tools, and other small projects. This site keeps both finished pieces and experiments together in a relaxed way.',
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
                  <span className="project-mark">{project.mark}</span>
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
