import React, { useEffect, useState } from 'react'
import GalleryGrid from '../components/GalleryGrid'
import { getProjects, getSettings } from '../lib/sanity'
import type { PortfolioSettings, Project } from '../lib/types'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [profile, setProfile] = useState<PortfolioSettings>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const data = await getProjects()
        setProjects(data)
      } catch (err ) {
        console.error('Failed to fetch projects:', err)
   
        setError(err.message )
      } finally {
        setLoading(false)
      }
    }
      const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = await getSettings()
        setProfile(data)
      } catch (err ) {
        console.error('Failed to fetch projects:', err)
   
        setError(err.message )
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
    fetchProfile()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>
  }
   if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>
  }
  return (
    <div className='min-h-screen w-full relative responsive-text  md:flex p-4 md:p-6'>
      <section className=' md:sticky  md:block md:h-full  wrap-break-word top-6 md:w-[30%] '>
        <h1 className='mb-4'>{profile?.designerName}</h1>
     
        <h3>
          {
            profile?.bio
          }
        </h3>
       
      </section>
      <hr className='my-4' />
      <section className='w-full flex-col flex gap-y-4  md:px-4'>
        {
          projects.map(project=>(
            <GalleryGrid project={project} key={project._id}/>
          ))
        }

      </section>
     

    </div>
  )
}
