import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      about: 'About',
      project: 'Projects',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign Up',
      
      // Common
      welcome: 'Welcome',
      loading: 'Loading...',
      error: 'An error occurred',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      
      // Hero Section
      heroTitle: 'Yuri Kurashima',
      heroSubtitle: 'Turning Data into Insights, Ideas into AI Solutions',
      heroDescription: 'Specialized in data engineering, machine learning, and large language models. Building scalable data pipelines and innovative AI applications.',
      heroCta: 'View Projects',
      
      // Skills Section
      skillsTitle: 'Technical Skills',
      skillsDescription: 'Expertise in various technologies and tools',
      skillsData: 'Data Engineering',
      skillsML: 'Machine Learning',
      skillsLLM: 'Large Language Models',
      skillsCloud: 'Cloud Infrastructure',
      skillsPython: 'Python Development',
      skillsDevOps: 'DevOps & MLOps',
      
      // Projects Section 
      projectsTitle: 'Featured Projects',
      projectsDescription: 'Recent work and contributions',
      viewProject: 'View Project',
      sourceCode: 'Source Code',
      
      // Contact Section
      contactTitle: 'Get in Touch',
      contactName: 'Your Name',
      contactEmail: 'Your Email',
      contactMessage: 'Your Message',
      contactSubmit: 'Send Message',
      
      // Footer
      footerRights: 'All rights reserved',
      
      // Skills Categories
      dataEngineering: 'Data Engineering',
      llmEngineering: 'LLM Engineering',
      cloudTools: 'Cloud & Tools',
      
      // Data Engineering Skills
      skillSQL: 'SQL',
      skillPython: 'Python',
      skillSpark: 'Apache Spark',
      skillHadoop: 'Hadoop',
      skillETL: 'ETL Pipelines',
      skillDataWarehousing: 'Data Warehousing',
      
      // LLM Engineering Skills
      skillNLP: 'Natural Language Processing',
      skillTensorFlow: 'TensorFlow',
      skillPyTorch: 'PyTorch',
      skillHuggingFace: 'Hugging Face Transformers',
      skillFineTuning: 'Fine-tuning LLMs',
      skillPromptEng: 'Prompt Engineering',
      
      // Cloud & Tools Skills
      skillAWS: 'AWS',
      skillGCP: 'Google Cloud Platform',
      skillDocker: 'Docker',
      skillKubernetes: 'Kubernetes',
      skillGit: 'Git',
      skillCICD: 'CI/CD',
      
      // Projects
      projects: {
        1: {
          title: 'Large-Scale Data Pipeline',
          description: 'Designed and implemented a robust ETL pipeline processing terabytes of data daily for a live community platform, building a behavioral analytics foundation.',
          image: '/dena.png?height=400&width=600',
          demoLink: 'https://engineering.dena.com/team/data/dataengineering/',
          githubLink: '',
        },
        2: {
          title: 'Content Writing Assistant LLM',
          description: 'Fine-tuned and deployed large language models to significantly improve content writing workflow efficiency. (Project shown is one example)',
          image: '/elyza.jpeg?height=400&width=600',
          demoLink: 'https://prtimes.jp/main/html/rd/p/000000029.000047565.html',
          githubLink: '',
        },
        3: {
          title: 'Internal Generative AI Platform',
          description: 'Developed an internal generative AI platform accessible to all employees without technical expertise, supporting diverse use cases from technical Q&A to content creation.',
          image: '/dena.png?height=400&width=600',
          demoLink: 'https://arc.net/l/quote/chbregrd',
          githubLink: '',
        }
      }
    }
  },
  ja: {
    translation: {
      // ナビゲーション
      home: 'ホーム',
      about: 'プロフィール',
      project: 'プロジェクト',
      contact: 'お問い合わせ',
      login: 'ログイン',
      signup: '新規登録',
      
      // 共通
      welcome: 'ようこそ',
      loading: '読み込み中...',
      error: 'エラーが発生しました',
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      edit: '編集',
      
      // Hero セクション
      heroTitle: '倉島悠吏',
      heroSubtitle: 'データを洞察に、アイデアをAIソリューションに',
      heroDescription: 'データエンジニアリング、機械学習、大規模言語モデルを専門とし、スケーラブルなデータパイプラインと革新的なAIアプリケーションを構築しています。',
      heroCta: 'プロジェクトを見る',
      
      // Skills セクション
      skillsTitle: 'スキル',
      skillsDescription: '様々な技術とツールの専門知識',
      skillsData: 'データエンジニアリング',
      skillsML: '機械学習',
      skillsLLM: '大規模言語モデル',
      skillsCloud: 'クラウドインフラ',
      skillsPython: 'Python開発',
      skillsDevOps: 'DevOps & MLOps',
      
      // Projects セクション
      projectsTitle: '主要プロジェクト',
      projectsDescription: '最��の実績と貢献',
      viewProject: 'プロジェクトを見る',
      sourceCode: 'ソースコード',
      
      // Contact セクション
      contactTitle: 'お問い合わせ',
      contactName: 'お名前',
      contactEmail: 'メールアドレス',
      contactMessage: 'メッセージ',
      contactSubmit: '送信する',
      
      // Footer
      footerRights: 'All rights reserved',
      
      // Skills Categories
      dataEngineering: 'データエンジニアリング',
      llmEngineering: 'LLMエンジニアリング',
      cloudTools: 'クラウド & ツール',
      
      // Data Engineering Skills
      skillSQL: 'SQL',
      skillPython: 'Python',
      skillSpark: 'Apache Spark',
      skillHadoop: 'Hadoop',
      skillETL: 'ETLパイプライン',
      skillDataWarehousing: 'データウェアハウス',
      
      // LLM Engineering Skills
      skillNLP: '自然言語処理',
      skillTensorFlow: 'TensorFlow',
      skillPyTorch: 'PyTorch',
      skillHuggingFace: 'Hugging Face Transformers',
      skillFineTuning: 'LLMファインチューニング',
      skillPromptEng: 'プロンプトエンジニアリング',
      
      // Cloud & Tools Skills
      skillAWS: 'AWS',
      skillGCP: 'Google Cloud Platform',
      skillDocker: 'Docker',
      skillKubernetes: 'Kubernetes',
      skillGit: 'Git',
      skillCICD: 'CI/CD',
      
      // Projects
      projects: {
        1: {
          title: '大規模データパイプライン',
          description: 'ライブコミュニティプラットフォームのデータを処理する大規模パイプラインを設計・実装。日次で大量のデータを効率的に処理し、行動分析基盤を構築しました。',
          image: '/dena.png?height=400&width=600',
          demoLink: 'https://engineering.dena.com/team/data/dataengineering/',
          githubLink: '',
        },
        2: {
          title: '原稿執筆補助LLM',
          description: '大規模言語モデルのファインチューニング・デプロイを行い、原稿作成業務において大幅な効率化を実現しました。（プロジェクトは１例です）',
          image: '/elyza.jpeg?height=400&width=600',
          demoLink: 'https://prtimes.jp/main/html/rd/p/000000029.000047565.html',
          githubLink: '',
        },
        3: {
          title: '社内生成AI活用基盤',
          description: '社内向け生成AIプラットフォームの開発。専門知識不要で誰もが活用できる使いやすいプラットフォームを実現し、技術Q&Aやコンテンツ作成など多様な用途に対応。',
          image: '/dena.png?height=400&width=600',
          demoLink: 'https://arc.net/l/quote/chbregrd',
          githubLink: '',
        },
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