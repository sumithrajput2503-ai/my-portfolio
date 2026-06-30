import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = path.join(__dirname, '../public/resume.pdf')

const colors = {
  primary: '#1e40af',
  text: '#111827',
  muted: '#4b5563',
  light: '#9ca3af',
  line: '#e5e7eb',
}

const certifications = [
  { title: 'MuleSoft Certified Developer Level 1', issuer: 'MuleSoft', year: '2019' },
  { title: 'MuleSoft Certified Developer Level 2', issuer: 'MuleSoft', year: '2020' },
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2021' },
]

function generateResume() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 48, bottom: 48, left: 48, right: 48 },
    })

    const stream = fs.createWriteStream(outputPath)
    doc.pipe(stream)

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right

    function sectionTitle(title) {
      doc.moveDown(0.8)
      doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .fillColor(colors.primary)
        .text(title.toUpperCase(), { characterSpacing: 0.8 })
      doc
        .moveTo(doc.page.margins.left, doc.y + 4)
        .lineTo(doc.page.margins.left + pageWidth, doc.y + 4)
        .strokeColor(colors.line)
        .lineWidth(1)
        .stroke()
      doc.moveDown(0.6)
    }

    function ensureSpace(height = 80) {
      if (doc.y + height > doc.page.height - doc.page.margins.bottom) {
        doc.addPage()
      }
    }

    doc
      .font('Helvetica-Bold')
      .fontSize(22)
      .fillColor(colors.text)
      .text('Sumith Singh')

    doc
      .font('Helvetica')
      .fontSize(11)
      .fillColor(colors.primary)
      .text('Integration Engineer · MuleSoft Specialist · AI Product Engineer')

    doc.moveDown(0.4)
    doc
      .font('Helvetica')
      .fontSize(9.5)
      .fillColor(colors.muted)
      .text(
        'sumith.singh0325@gmail.com  |  +91 9686793100  |  Bangalore, India  |  linkedin.com/in/sumith-singh-04b36b151'
      )

    doc.moveDown(0.6)
    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor(colors.text)
      .text(
        'Integration Engineer with 7+ years of experience designing enterprise integration solutions using MuleSoft, API-led Connectivity, AWS, Azure and AI technologies across Retail, Insurance, Manufacturing and Travel domains.',
        { align: 'justify', lineGap: 3 }
      )

    sectionTitle('Professional Experience')

    const jobs = [
      {
        company: 'Volvo Group India Pvt Ltd',
        role: 'Integration Engineer',
        period: 'Present',
        highlights: [
          'Contact & Consent Platform, Enterprise Integration, AI Product Development',
          'Salesforce and MuleSoft integrations for global automotive operations',
        ],
      },
      {
        company: 'Publicis Sapient',
        role: 'Integration Engineer',
        period: '2022 – 2024',
        highlights: [
          'Led Retail Integration Program with planned delivery of 140+ APIs',
          'CloudHub Migration, AI Agentic Workflows, Azure Integration Platform',
        ],
      },
      {
        company: 'Cognizant',
        role: 'Senior MuleSoft Developer',
        period: '2020 – 2022',
        project: 'New York Life Insurance',
        highlights: ['Salesforce Integrations, SmartComm, ATLUS Insurance Platform'],
      },
      {
        company: 'Accenture',
        role: 'MuleSoft Developer',
        period: '2018 – 2020',
        project: 'Booking Holdings',
        highlights: [
          'Delivered 40+ APIs with Event Driven Architecture and secure integrations',
        ],
      },
      {
        company: 'Quinnox',
        role: 'MuleSoft Developer',
        period: '2017 – 2018',
        highlights: ['Salesforce Integrations in Retail domain'],
      },
    ]

    jobs.forEach((job) => {
      ensureSpace(70)
      const startY = doc.y

      doc.font('Helvetica-Bold').fontSize(10.5).fillColor(colors.text).text(job.company)
      doc
        .font('Helvetica')
        .fontSize(9.5)
        .fillColor(colors.muted)
        .text(`${job.role}${job.project ? ` · ${job.project}` : ''}`)

      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor(colors.light)
        .text(job.period, doc.page.margins.left, startY, {
          width: pageWidth,
          align: 'right',
        })

      doc.moveDown(0.2)
      job.highlights.forEach((item) => {
        doc.font('Helvetica').fontSize(9.5).fillColor(colors.text).text(`•  ${item}`, {
          indent: 8,
          lineGap: 2,
        })
      })
      doc.moveDown(0.5)
    })

    sectionTitle('Key Projects')

    const projects = [
      {
        title: 'Agentic Workflow Platform',
        desc: 'Autonomous AI agents for retail order and inventory management using A2A architecture, MCP, LLM orchestration and enterprise APIs.',
        tech: 'OpenAI, MuleSoft, Python, FastAPI, React',
      },
      {
        title: 'Contact & Consent Management Platform',
        desc: 'Enterprise Preference Center on Salesforce, MuleSoft and Experience Cloud with Global Consent Store architecture.',
        tech: 'Salesforce, MuleSoft, Experience Cloud',
      },
      {
        title: 'Retail Integration Platform',
        desc: 'Delivered 140+ APIs integrating SAP, POS, ERP, OMS, WMS, Salesforce Commerce and Azure.',
        tech: 'MuleSoft, SAP, Azure, Salesforce Commerce',
      },
      {
        title: 'Venue Recommendation AI Platform',
        desc: 'AI-powered recommendation engine using FastAPI, React, Google Places API and LLMs.',
        tech: 'FastAPI, React, Google Places API, LLMs',
      },
    ]

    projects.forEach((project) => {
      ensureSpace(60)
      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.text).text(project.title)
      doc.font('Helvetica').fontSize(9.5).fillColor(colors.muted).text(project.desc, { lineGap: 2 })
      doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(colors.light).text(project.tech)
      doc.moveDown(0.4)
    })

    sectionTitle('Technical Skills')

    const skills = [
      ['Enterprise', 'MuleSoft, API Management, DataWeave, CloudHub, Runtime Fabric, Anypoint Platform'],
      ['Cloud', 'AWS, Azure, Terraform, Docker, GitHub Actions'],
      ['Programming', 'Java, Python, TypeScript, React, FastAPI, SQL'],
      ['AI', 'OpenAI, Prompt Engineering, Agentic AI, MCP, LangChain, Vector Search, RAG'],
    ]

    skills.forEach(([category, items]) => {
      ensureSpace(30)
      doc.font('Helvetica-Bold').fontSize(9.5).fillColor(colors.text).text(`${category}: `, {
        continued: true,
      })
      doc.font('Helvetica').fontSize(9.5).fillColor(colors.muted).text(items)
    })

    sectionTitle('Certifications')

    certifications.forEach((cert) => {
      doc
        .font('Helvetica')
        .fontSize(9.5)
        .fillColor(colors.text)
        .text(`•  ${cert.title} — ${cert.issuer} (${cert.year})`)
    })

    sectionTitle('Achievements')

    doc
      .font('Helvetica')
      .fontSize(9.5)
      .fillColor(colors.text)
      .text('•  140+ Enterprise APIs delivered across global integration programs')
    doc.text('•  60% incident reduction through API-led architecture and platform modernization')
    doc.text('•  7+ years experience across 4 global companies and 15+ enterprise projects')

    doc.end()

    stream.on('finish', () => resolve(outputPath))
    stream.on('error', reject)
    doc.on('error', reject)
  })
}

generateResume()
  .then((path) => console.log(`Resume generated: ${path}`))
  .catch((err) => {
    console.error('Failed to generate resume:', err)
    process.exit(1)
  })
