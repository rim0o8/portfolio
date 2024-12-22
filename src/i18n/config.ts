import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Navigation
      navigation: {
        home: 'Home',
        about: 'About', 
        project: 'Projects',
        contact: 'Contact',
        login: 'Login',
        signup: 'Sign Up'
      },

      // Common
      common: {
        welcome: 'Welcome',
        loading: 'Loading...',
        error: 'An error occurred',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit'
      },

      // Hero Section
      hero: {
        title: 'Yuri Kurashima',
        subtitle: 'Data & LLM Engineer',
        description: '',
        cta: 'View Projects'
      },

      // Skills Section
      skills: {
        title: 'Skills',
        description: 'Expertise in various technologies and tools',
        items: {
          1: {
            title: 'Data Engineering',
            description: 'Building scalable data pipelines and ETL processes using SQL, Python, Apache Spark and Hadoop. Experienced in data warehousing and analytics.',
            items: [
                'SQL', 
                'Python', 
                'BigQuery', 
                'Dataform', 
                'Digdag', 
                'Aurora DB'
            ]
          },
          2: {
            title: 'AI',
            description: 'Developing and fine-tuning large language models using state-of-the-art frameworks and techniques.',
            items: ['Natural Language Processing', 'TensorFlow', 'PyTorch', 'Transformers', 'Langchain', 'Dify']
          },
          3: {
            title: 'Cloud & Tools',
            description: 'Expertise in cloud platforms and DevOps tools for deploying and managing applications at scale.',
            items: ['AWS', 'Google Cloud Platform', 'Docker', 'Kubernetes']
          }
        }
      },

      // Projects Section
      projects: {
        title: 'Featured Projects',
        description: 'Recent work and contributions',
        viewProject: 'View Project',
        sourceCode: 'Source Code',
        items: {
          1: {
            title: 'Large-Scale Data Pipeline',
            description: 'Designed and implemented a robust ETL pipeline processing terabytes of data daily for a live community platform, building a behavioral analytics foundation.',
            image: '/dena.png?height=400&width=600',
            demoLink: 'https://engineering.dena.com/team/data/dataengineering/',
            githubLink: ''
          },
          2: {
            title: 'Content Writing Assistant LLM',
            description: 'Fine-tuned and deployed large language models to significantly improve content writing workflow efficiency. (Project shown is one example)',
            image: '/elyza.jpeg?height=400&width=600',
            demoLink: 'https://prtimes.jp/main/html/rd/p/000000029.000047565.html',
            githubLink: ''
          },
          3: {
            title: 'Internal Generative AI Platform',
            description: 'Developed an internal generative AI platform accessible to all employees without technical expertise, supporting diverse use cases from technical Q&A to content creation.',
            image: '/dena.png?height=400&width=600',
            demoLink: 'https://arc.net/l/quote/chbregrd',
            githubLink: ''
          },
          4: {
            title: 'Tetris',
            description: 'Tetris mobile game',
            image: '/tetris.jpeg?height=400&width=600',
            demoLink: 'https://ca1e80c0.tetris-75v.pages.dev/',
            githubLink: 'https://github.com/rim0o8/tetris'
          }
        }
      },

      // Contact Section
      contact: {
        title: 'Get in Touch',
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        submit: 'Send Message'
      },

      // Footer
      footer: {
        rights: 'All rights reserved'
      }
    }
  },
  ja: {
    translation: {
      // Navigation
      navigation: {
        home: 'ホーム',
        about: 'プロフィール',
        project: 'プロジェクト',
        contact: 'お問い合わせ',
        login: 'ログイン',
        signup: '新規登録'
      },

      // Common
      common: {
        welcome: 'ようこそ',
        loading: '読み込み中...',
        error: 'エラーが発生しました',
        save: '保存',
        cancel: 'キャンセル',
        delete: '削除',
        edit: '編集'
      },

      // Hero Section
      hero: {
        title: '倉島悠吏',
        subtitle: 'データエンジニア/LLMエンジニア',
        description: '',
        cta: 'プロジェクトを見る'
      },

      // Skills Section
      skills: {
        title: 'スキル',
        description: '様々な技術とツールの専門知識',
        items: {
          1: {
            title: 'データエンジニアリング',
            description: 'SQL、Python、Apache Spark、Hadoopを使用したスケーラブルなデータパイプラインとETLプロセスの構築。データウェアハウスと分析の経験豊富。',
            items: ['SQL', 'Python', 'BigQuery', 'Dataform', 'Digdag', 'Aurora DB']
          },
          2: {
            title: 'AI',
            description: '最先端のフレームワークとテクニックを使用した大規模言語モデルの開発とファインチューニング。',
            items: ['自然言語処理', 'TensorFlow', 'PyTorch', 'Transformers', 'Langchain', 'Dify']
          },
          3: {
            title: 'クラウド & ツール',
            description: 'アプリケーションのスケーラブルなデプロイと管理のためのクラウドプラットフォームとDevOpsツールの専門知識。',
            items: ['AWS', 'Google Cloud Platform', 'Docker', 'Kubernetes']
          }
        }
      },

      // Projects Section
      projects: {
        title: '主要プロジェクト',
        description: '最近の実績と貢献',
        viewProject: 'プロジェクトを見る',
        sourceCode: 'ソースコード',
        items: {
          1: {
            title: '大規模データパイプライン',
            description: 'ライブコミュニティプラットフォームのデータを処理する大規模パイプラインを設計・実装。日次で大量のデータを効率的に処理し、行動分析基盤を構築しました。',
            image: '/dena.png?height=400&width=600',
            demoLink: 'https://engineering.dena.com/team/data/dataengineering/',
            githubLink: ''
          },
          2: {
            title: '原稿執筆補助LLM',
            description: '大規模言語モデルのファインチューニング・デプロイを行い、原稿作成業務において大幅な効率化を実現しました。（プロジェクトは１例です）',
            image: '/elyza.jpeg?height=400&width=600',
            demoLink: 'https://prtimes.jp/main/html/rd/p/000000029.000047565.html',
            githubLink: ''
          },
          3: {
            title: '社内生成AI活用基盤',
            description: '社内向け生成AIプラットフォームの開発。専門知識不要で誰もが活用できる使いやすいプラットフォームを実現し、技術Q&Aやコンテンツ作成など多様な用途に対応。',
            image: '/dena.png?height=400&width=600',
            demoLink: 'https://arc.net/l/quote/chbregrd',
            githubLink: ''
          },
          4: {
            title: 'テトリス',
            description: 'テトリスのモバイルゲーム',
            image: '/tetris.jpeg?height=400&width=600',
            demoLink: 'https://ca1e80c0.tetris-75v.pages.dev/',
            githubLink: 'https://github.com/rim0o8/tetris'
          }
        }
      },

      // Contact Section
      contact: {
        title: 'お問い合わせ',
        name: 'お名前',
        email: 'メールアドレス',
        message: 'メッセージ',
        submit: '送信する'
      },

      // Footer
      footer: {
        rights: 'All rights reserved'
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
    }
  })

export default i18n