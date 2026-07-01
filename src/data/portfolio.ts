export const personalInfo = {
  name: 'Sumith Singh',
  title: 'Integration Engineer · MuleSoft Specialist · AI Product Engineer',
  subtitle:
    'Designing Enterprise Integrations, AI Products and Cloud-Native Solutions that power modern digital businesses.',
  email: 'sumith.singh0325@gmail.com',
  phone: '+91 9686793100',
  linkedin: 'https://www.linkedin.com/in/sumith-singh-04b36b151/',
  location: 'Bangalore, India',
  resumeUrl: '/resume.pdf',
  formspreeUrl: 'https://formspree.io/f/xzdlajrd',
  profilePhoto: '/profile.png',
  profilePhotoAlt: 'Portrait of Sumith Singh',
  tagline: 'Building intelligent integrations that connect enterprises with the future.',
}

export const stats = [
  { label: 'Years Experience', value: 7, suffix: '+' },
  { label: 'Enterprise APIs', value: 140, suffix: '+' },
  { label: 'Global Companies', value: 4, suffix: '' },
  { label: 'Enterprise Projects', value: 15, suffix: '+' },
]

export const aboutSpecializations = [
  'Enterprise Integration Architecture',
  'MuleSoft',
  'API Strategy',
  'AI Product Development',
  'Agentic AI',
  'AWS',
  'Azure',
  'Solution Architecture',
]

export const experience = [
  {
    company: 'Volvo Group India Pvt Ltd',
    role: 'Salesforce Consultant',
    period: 'March 2026 – Present',
    current: true,
    project: 'Contact & Consent Master',
    highlights: [
      'MuleSoft API-led Contact and Consent Management',
      'Salesforce LWC Preference Page for dealers',
      'Enterprise Integration',
      'Salesforce',
      'MuleSoft',
    ],
  },
  {
    company: 'Publicis Sapient',
    role: 'Integration Engineer',
    period: 'November 2024 – March 2026',
    current: false,
    project: 'American Builders and Contractors (ABC) Supply',
    highlights: [
      'Led Retail Integration Program across 10 value streams',
      'Planned delivery of 140+ APIs',
      'CloudHub 1.0 to 2.0 Migration',
      'AI Agentic Workflows (A2A)',
      'Azure Data Factory Integration',
    ],
  },
  {
    company: 'Cognizant Technology Solutions',
    role: 'Senior MuleSoft Developer',
    period: 'October 2022 – November 2024',
    current: false,
    project: 'New York Life (NYL) Insurance',
    highlights: [
      'ATLUS Underwriting Platform',
      'Salesforce ↔ ATLUS Integrations',
      'SmartComm & FileNet Document Generation',
      'Integration Dashboard & Hypercare',
    ],
  },
  {
    company: 'Accenture',
    role: 'MuleSoft Developer',
    period: 'October 2021 – August 2022',
    current: false,
    project: 'Booking Holdings Inc.',
    highlights: [
      '40+ Real-time HTTP & SOAP APIs',
      'PGP Encryption & SFTP Integrations',
      'Event-Driven Architecture',
      'Post Go-Live Hypercare',
    ],
  },
  {
    company: 'Quinnox Consultancy Services',
    role: 'MuleSoft Developer',
    period: 'July 2019 – October 2021',
    current: false,
    project: 'Coca-Cola European Partners',
    highlights: [
      '12+ Salesforce Integrations',
      'Retail Domain',
      'WebMethods & MuleSoft Coexistence',
    ],
  },
]

export type ProjectResponsibilitySection = {
  title?: string
  items: string[]
}

export type Project = {
  id: string
  title: string
  role: string
  employer: string
  period: string
  description: string
  disclaimer: string
  responsibilities: string[]
  responsibilitySections?: ProjectResponsibilitySection[]
  tech: string[]
  gradient: string
  icon: string
}

export const projects: Project[] = [
  {
    id: 'volvo-consent',
    title: 'Volvo Group — Contact & Consent Master',
    role: 'Salesforce Consultant',
    employer: 'Volvo Group India Pvt Ltd',
    period: 'March 2026 – Present',
    description:
      'Designing API-led contact and consent management with MuleSoft and Salesforce LWC preference experiences for independent dealers.',
    disclaimer:
      'Project work performed while employed at Volvo Group India Pvt Ltd. Volvo and related trademarks are the property of their respective owners. This summary reflects my individual contributions and does not represent an official statement from the client.',
    responsibilities: [
      'Design and develop MuleSoft API-led architecture to handle Contact and Consent Management.',
      'Design and develop Salesforce LWC for the Preference Page, enabling independent dealers to manage their consents.',
    ],
    tech: ['MuleSoft', 'Salesforce', 'LWC', 'API-Led', 'Experience Cloud'],
    gradient: 'from-slate-600/20 via-blue-500/10 to-zinc-500/20',
    icon: 'car',
  },
  {
    id: 'abc',
    title: 'American Builders and Contractors (ABC) Supply',
    role: 'Integration Engineer',
    employer: 'Publicis Sapient',
    period: 'November 2024 – March 2026',
    description:
      'Led a retail enterprise integration program across 10 value streams, delivering 140+ APIs, CloudHub modernization, and agentic AI onboarding POCs.',
    disclaimer:
      'Project work performed while employed at Publicis Sapient. American Builders and Contractors (ABC) Supply name and trademarks are the property of their respective owners. This summary reflects my individual contributions and does not represent an official statement from the client.',
    responsibilities: [],
    responsibilitySections: [
      {
        title: 'Program Leadership',
        items: [
          'Led the Retail Domain Enterprise Integration Program structured into 10 value streams, each responsible for key business processes.',
          'Directed two streams — Integration Enablement (INE) and Integration Platform (ITP) — contributing to the integration design for Customer Management, Order Management, and Product & Pricing modules.',
        ],
      },
      {
        title: 'Integration Platform (ITP) Team',
        items: [
          'Developed a Parent POM and Mule Common Library for reusable components across MuleSoft APIs.',
          'Planned and delivered 140+ APIs in alignment with project timelines.',
          'Performed Java 17 and runtime upgrades with complete regression testing.',
          'Migrated APIs from CloudHub 1.0 to CloudHub 2.0 environments.',
        ],
      },
      {
        title: 'Integration Enablement (INE) Team',
        items: [
          'Designed and developed Product Inventory Sync between POS and eCommerce systems using Azure Data Factory (ADF).',
          'Built a robust alerting framework to prevent duplicate ServiceNow incidents from Splunk alerts.',
          'Executed a stabilization plan for 28 APIs, significantly reducing production noise.',
          'Achieved a 60% reduction in monthly incident tickets through proactive performance tuning and monitoring.',
        ],
      },
      {
        title: 'Agentic Onboarding for Order & Product Inventory Management',
        items: [
          'Designed and implemented a working POC for Order and Product data management using the A2A model.',
          'Developed and deployed two autonomous business agents that interact dynamically to exchange Product and Order data based on system inputs.',
          'Specialized in AI prompt engineering and instruction design for tool planning and orchestration.',
        ],
      },
      {
        title: 'End-to-End Integrations Designed',
        items: [
          'Implemented Order synchronization from ERP to Digital Central DataHub for real-time POS order alignment.',
          'Built Customer Master Data synchronization between POS and ERP systems.',
          'Delivered Vendavo Pricing Engine integration between eCommerce/POS and ERP to streamline pricing and product consistency.',
        ],
      },
    ],
    tech: ['MuleSoft', 'SAP', 'Azure ADF', 'CloudHub 2.0', 'Agentic AI'],
    gradient: 'from-emerald-600/20 via-blue-500/10 to-teal-500/20',
    icon: 'hardhat',
  },
  {
    id: 'ny-life',
    title: 'New York Life (NYL) Insurance',
    role: 'Senior MuleSoft Developer',
    employer: 'Cognizant Technology Solutions',
    period: 'October 2022 – November 2024',
    description:
      'Contributed to greenfield integration architecture for the ATLUS underwriting platform, with Salesforce sync, SmartComm document generation, and production hypercare.',
    disclaimer:
      'Project work performed while employed at Cognizant Technology Solutions. New York Life Insurance Company name and trademarks are used for identification purposes only. This summary reflects my individual contributions and does not represent an official statement from the client.',
    responsibilities: [],
    responsibilitySections: [
      {
        title: 'Insurance Domain Project',
        items: [
          'Served as Senior MuleSoft Developer, contributing to the design and development of a greenfield integration architecture for the new underwriting platform A Total Line Underwriting System (ATLUS).',
        ],
      },
      {
        title: 'Salesforce ↔ ATLUS Integrations',
        items: [
          'Designed and developed real-time synchronization integrations for voluntary insurance products, including Accident Insurance (AI), Critical Illness (CI), and Hospital Indemnity (HI).',
          'Implemented ATLUS-to-Salesforce synchronization for “Most Likely to be Sold” products to ensure real-time product availability and consistency across systems.',
        ],
      },
      {
        title: 'Document Generation Integrations',
        items: [
          'Built seamless integrations between SmartComm and ATLUS to manage business approved document templates across multiple products such as Basic Term Life (BTL), Voluntary Term Life (VTL), Long-Term Disability (LTD), and Short-Term Disability (STD).',
          'Designed and implemented the document generation workflow between FileNet and SmartComm, automating document creation and distribution.',
        ],
      },
      {
        title: 'Quality Assurance & Release Management',
        items: [
          'Partnered with the QA team to support business testing, validation, and defect resolution.',
          'Collaborated with the platform team to manage deployment, release planning, and production rollout with minimal disruption.',
        ],
      },
      {
        title: 'Hypercare & Support',
        items: [
          'Provided post–go-live Hypercare support and delivered structured knowledge transfer sessions with complete documentation to the production support team.',
          'Developed an Integration Dashboard for real-time business audit, operational visibility, and monitoring of key integration transactions.',
        ],
      },
    ],
    tech: ['MuleSoft', 'Salesforce', 'ATLUS', 'SmartComm', 'FileNet'],
    gradient: 'from-violet-600/20 via-blue-500/10 to-purple-500/20',
    icon: 'shield',
  },
  {
    id: 'booking-holdings',
    title: 'Booking Holdings Inc.',
    role: 'MuleSoft Developer',
    employer: 'Accenture',
    period: 'October 2021 – August 2022',
    description:
      'Delivered 40+ real-time APIs and secure event-driven, SFTP-based integrations with PGP encryption for large-scale travel management systems.',
    disclaimer:
      'Project work performed while employed at Accenture. Booking Holdings Inc. and related trademarks are the property of their respective owners. This summary reflects my individual contributions and does not represent an official statement from the client.',
    responsibilities: [
      'Developed event-driven and SFTP-based integrations for large-scale travel management systems.',
      'Implemented PGP encryption and decryption to ensure secure and compliant data exchange between internal and external systems.',
      'Designed, developed, and delivered 40+ real-time APIs leveraging HTTP and SOAP protocols.',
      'Collaborated with solution architects to define file-based integration patterns for optimized data processing and reusability.',
      'Provided hypercare and stabilization support post–go-live, ensuring smooth operations and minimal production issues.',
    ],
    tech: ['MuleSoft', 'PGP', 'SFTP', 'HTTP', 'SOAP'],
    gradient: 'from-sky-600/20 via-blue-500/10 to-indigo-500/20',
    icon: 'plane',
  },
  {
    id: 'ccep',
    title: 'Coca-Cola European Partners',
    role: 'MuleSoft Developer',
    employer: 'Quinnox Consultancy Services',
    period: 'July 2019 – October 2021',
    description:
      'Retail domain project integrating Salesforce with legacy enterprise systems, delivering 12+ MuleSoft integrations with WebMethods coexistence support.',
    disclaimer:
      'Project work performed while employed at Quinnox Consultancy Services. Coca-Cola European Partners and related trademarks are the property of their respective owners. This summary reflects my individual contributions and does not represent an official statement from the client.',
    responsibilities: [
      'Retail Domain Project — worked as a MuleSoft Developer focused on integrating Salesforce with legacy enterprise systems.',
      'Designed, developed, and delivered 12+ Salesforce integrations using MuleSoft to streamline data exchange and business workflows.',
      'Provided ongoing support for WebMethods (Software AG) integration, ensuring seamless coexistence and interoperability with MuleSoft services.',
    ],
    tech: ['MuleSoft', 'Salesforce', 'WebMethods', 'API-Led', 'DataWeave'],
    gradient: 'from-red-600/20 via-rose-500/10 to-orange-500/20',
    icon: 'building',
  },
]

export const skillCategories = [
  {
    title: 'Enterprise',
    skills: [
      'MuleSoft',
      'API Management',
      'DataWeave',
      'CloudHub',
      'Runtime Fabric',
      'Anypoint Platform',
    ],
  },
  {
    title: 'Cloud',
    skills: ['AWS', 'Azure', 'Terraform', 'Docker', 'GitHub Actions'],
  },
  {
    title: 'Frameworks',
    skills: ['FastAPI', 'LangChain', 'React', 'RAG', 'Vector Search'],
  },
  {
    title: 'AI',
    skills: ['OpenAI', 'Prompt Engineering', 'Agentic AI', 'MCP'],
  },
]

export const achievements = [
  { label: 'Enterprise APIs', value: 140, suffix: '+', prefix: '' },
  { label: 'Incident Reduction', value: 60, suffix: '%', prefix: '' },
  { label: 'Years Experience', value: 7, suffix: '+', prefix: '' },
  { label: 'Enterprise Clients', value: 0, suffix: '', prefix: 'Multiple' },
]

export const certifications = [
  {
    title: 'MuleSoft Certified Developer Level 1',
    issuer: 'MuleSoft',
    year: '2019',
  },
  {
    title: 'MuleSoft Certified Developer Level 2',
    issuer: 'MuleSoft',
    year: '2020',
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2021',
  },
]

export const techMarquee = [
  'MuleSoft',
  'AWS',
  'Azure',
  'FastAPI',
  'LangChain',
  'React',
  'OpenAI',
  'Salesforce',
  'Docker',
  'Terraform',
  'API-Led',
  'DataWeave',
  'CloudHub',
  'GitHub Actions',
  'Agentic AI',
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
