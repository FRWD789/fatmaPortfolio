import React, { useEffect, useState } from 'react'
import GalleryGrid from '../components/GalleryGrid'
import { getProjects, getSettings } from '../lib/sanity'
import type { PortfolioSettings, Project } from '../lib/types'
import { CornerDownRight } from 'lucide-react'

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
      } catch (err:any ) {
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
      } catch (err :any ) {
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
        <div className='mb-4'>
            <h1 className='font-black'>{profile?.designerName}</h1>
            <h3>Portfolio - {new Date().getFullYear()}</h3>
        </div>
       
     
        <p className=' text-sm wrap-break-word pr-2 capitalize text-left'>
{profile?.bio!}        </p>
        <br />
        <br />
        <div className= 'text-sm flex items-baseline '>
          <CornerDownRight size={18} />
          <p >
          Ouverte aux collaborations et aux commandes
        </p>
        </div>
        <br />
        <p className=' text-sm '>
          Pour toute demande de projet ou pour me contacter :
        </p>  
        <span className='text-sm underline'><a href={`mailto:${profile?.email}`}>{profile?.email}</a></span>
       
       
      </section>
      <hr className='my-4' />
      <section className='w-full flex-col flex gap-y-4  md:px-4'>
        {
          projects.map((project)=>(
            <GalleryGrid project={project} key={project._id}/>
          ))
        }

      </section>
     

    </div>
  )
}
function Bio({ bio }:{bio:string}) {
  return (
    <p className="text-gray-700">
     {bio
    .split(".")
    .filter(line => line.trim() !== "") // remove empty strings
    .map((line, index) => (
      <React.Fragment key={index}>
        {line.trim()}.
        <br />
        <br />
      </React.Fragment>
    ))}
    </p>
  );
}