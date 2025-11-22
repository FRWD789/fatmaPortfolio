import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router'
import {getProjectBySlug, getSettings, urlFor} from '../lib/sanity'
import type { Project, PortfolioSettings } from '../lib/types'
import {ArrowLeft} from 'lucide-react'

export function ProjectDetail() {
  const {slug} = useParams<{slug: string}>()
  const [project, setProject] = useState<Project | null>(null)
  const [settings, setSettings] = useState<PortfolioSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!slug) return
      try {
        const [projectData, settingsData] = await Promise.all([
          getProjectBySlug(slug),
          getSettings(),
        ])
        setProject(projectData)
        setSettings(settingsData)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }
    console.log(project)
    fetchData()
  }, [slug])

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (!project) return <div className="text-center py-20">Project not found</div>

  return (
    <div style={{fontFamily: settings?.font || 'Inter'}}>
      {/* BACK BUTTON */}
      <div className="p-8">
        <Link to="/" className="flex items-center gap-2 text-lg hover:underline">
          <ArrowLeft size={20} />
          Back to Gallery
        </Link>
      </div>

      {/* TITLE */}
      <section className="p-8 text-center">
        <h1 className="text-5xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-600">{project.client}</p>
        <p className="text-gray-500">{project.year}</p>
      </section>

      {/* RENDER TEMPLATE */}
      {project.layoutTemplate === 'template1' && (
        <Template1 project={project} settings={settings} />
      )}
      {project.layoutTemplate === 'template2' && (
        <Template2 project={project} settings={settings} />
      )}
      {project.layoutTemplate === 'template3' && (
        <Template3 project={project} settings={settings} />
      )}
    </div>
  )
}

// Template 1 - Your Grid Layout
function Template1({project}: {project: Project; settings: PortfolioSettings | null}) {
  return (
    <section className="p-8">
      {/* DESCRIPTION + FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p>{project.description}</p>
        </div>
        {project.features.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Key Points</h3>
            <ul className="list-disc pl-5 space-y-2">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* IMAGES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.images.map((image, i) => (
          <div key={i} className="rounded-xl overflow-hidden">
            <img
              src={urlFor(image).width(600).url()}
              alt={`${project.title} image ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function Template2({project}: {project: Project; settings: PortfolioSettings | null}) {
  return (
    <section className="p-8">
      {project.images.length > 0 && (
        <div className="mb-10 rounded-xl overflow-hidden">
          <img
            src={urlFor(project.images[0]).width(1200).url()}
            alt={project.title}
            className="w-full h-auto"
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {project.images.slice(1).map((image, i) => (
          <div key={i} className="rounded-xl overflow-hidden">
            <img
              src={urlFor(image).width(400).url()}
              alt={`${project.title} thumbnail ${i + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function Template3({project}: {project: Project; settings: PortfolioSettings | null}) {
  return (
    <section className="p-8 space-y-10">
      {project.images.map((image, i) => (
        <div key={i} className="rounded-xl overflow-hidden">
          <img
            src={urlFor(image).width(1200).url()}
            alt={`${project.title} image ${i + 1}`}
            className="w-full h-auto"
          />
        </div>
      ))}
    </section>
  )
}