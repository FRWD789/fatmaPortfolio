import { useEffect, useRef, useState } from 'react'
import type { Project } from '../lib/types';
import { urlFor } from '../lib/sanity';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import gsap from 'gsap';
import Flip from 'gsap/Flip';
gsap.registerPlugin(Flip)

type GalleryGridProps = {
  project: Project
}

export default function GalleryGrid({ project }: GalleryGridProps) {



  const [projectImgs,setProjectImgs] = useState<string[]>([])
  const [openViewer, setOpenViewer] = useState(false)
  const flipState = useRef<Flip.FlipState|null>(null)
  const thumbnailRef = useRef(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const fullscreenContainerRef = useRef<HTMLDivElement>(null)

  const fullscreenRef = useRef<HTMLDivElement>(null)

 
  const [imgIndex, setImgIndex] = useState(0)

  
  const handleOpenViewer = () => {
        flipState.current = Flip.getState(thumbnailRef.current)
        setOpenViewer(true)
        requestAnimationFrame(() => {
          fullscreenRef.current?.appendChild(thumbnailRef.current!)
          Flip.from(flipState.current!,{
            duration: 0.5,
            ease: "power1.inOut",
            targets:thumbnailRef.current

          })

          gsap.to(fullscreenContainerRef.current,{
            opacity: 1,
            duration: 0.5,
                 ease: "power1.inOut",
          })
          flipState.current = null
        })
 
  }
   useEffect(() => {
    const urls = project.images.map(img => urlFor(img).url())
    setProjectImgs(urls)
  }, [project.images])
  console.log(project.description)
  const handleCloseViewer = () => {
     flipState.current = Flip.getState(thumbnailRef.current)
     requestAnimationFrame(() => {
          gridRef.current?.appendChild(thumbnailRef.current!)
          Flip.from(flipState.current!,{
            duration: 0.5,
            ease: "power1.inOut",
            targets:thumbnailRef.current,
            onComplete:()=>{
              setOpenViewer(false)
            }
          })
          gsap.to(fullscreenContainerRef.current,{
            opacity: 0,
            duration: 0.5,
                 ease: "power1.inOut",
          })
          flipState.current = null
        })  
  }

  const handleNext = () => {
    setImgIndex(prev => (prev + 1) % project.images.length)
  }

  const handlePrev = () => {
    setImgIndex(prev => (prev - 1 + project.images.length) % project.images.length)
  }


  return (
    <>
  <div className="flex flex-col gap-y-4 h-auto md:h-[50vh] w-full">

  {/* Title + Year */}
  <div className="flex md:flex-row  flex-col w-full gap-2">
    <div className="md:w-[30%] font-semibold capitalize">{project.title}</div>
    <div className='flex flex-1 justify-between'>
      <div className="text-sm text-gray-600 md:pl-4 ">{project.year}</div>
      <div className="text-sm text-gray-600  ">{project.category}</div>
    </div>
    
  </div>

  {/* Description + Image */}
  <div className="flex  md:flex-row flex-col gap-2 flex-1 w-full min-h-0">
    
    {/* Description (optional) */}
    <div className="md:w-[30%]  ">
      <p className=' max-w-full text-left text-sm font-thin text-gray-700 wrap-break-word'>{project.description}</p>
    </div>

    {/* Image Viewer */}
    <div ref={gridRef} className="flex-1 relative flex items-center justify-center min-h-0">
      <button
        className="absolute top-1/2 left-4  mix-blend-difference  text-white/80 -translate-y-1/2 z-10"
        onClick={handlePrev}
      >
        <ChevronLeft />
      </button>

      <button
        className="absolute top-1/2 right-4 mix-blend-difference text-white/80 -translate-y-1/2 z-10"
        onClick={handleNext}
      >
        <ChevronRight />
      </button>

      <img
        ref={thumbnailRef}
        src={projectImgs[imgIndex]}
        className="max-h-full max-w-full object-contain cursor-zoom-in"
        onClick={handleOpenViewer}
      />

      {openViewer && (
        <img
          src={projectImgs[imgIndex]}
          className="absolute max-h-full max-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      )}
    </div>

  </div>

</div>
      {/* <div className="grid  md:grid-cols-[30%_1fr] grid-rows-[max-content_max-content_max-content_100%]  md:grid-rows-[auto_100%] h-[60vh] md:h-[40vh] w-full p-4">
        <div className="font-bold">{project.title}</div>
        <div className="text-sm text-gray-600">{project.year}</div>
        <div className="text-sm text-gray-700 max-w-full "><p className='max-w-full'>{project.description}</p></div>
        <div ref={gridRef} className="h-full w-full flex relative items-center justify-center">
          <button
            type='button'
            className='absolute cursor-pointer top-1/2 left-16 -translate-y-1/2 z-10'
            onClick={handlePrev}
            aria-label="Previous">
            <ChevronLeft />
          </button>
          <button
            type='button'
            className='absolute cursor-pointer top-1/2 right-16 -translate-y-1/2 z-10'
            onClick={handleNext}
            aria-label="Next">
            <ChevronRight />
          </button>

          <img
            ref={thumbnailRef}
            src={projectImgs[imgIndex]}
            className="max-h-full max-w-full cursor-zoom-in object-contain "
            onClick={handleOpenViewer}
            alt={`${project.title} - Image ${imgIndex + 1}`}
          />
          {
            openViewer&&
            <img
            src={projectImgs[imgIndex]}
            className="max-h-full absolute top-1/2 left-1/2 -translate-1/2  max-w-full object-contain cursor-pointer  transition-opacity"
            alt={`${project.title} - Image ${imgIndex + 1}`}
          />
          }
        
        </div>
      </div> */}
{openViewer && (
  <div
    ref={fullscreenContainerRef}
    className="
      fixed inset-0 z-50 
      bg-white 
      flex flex-col md:flex-row 
      items-center justify-center
      px-4
    "
    onClick={(e) => e.target === e.currentTarget && handleCloseViewer()}
  >
    {/* Close Button */}
    <button
      onClick={handleCloseViewer}
      className="
        absolute top-4 right-4 md:top-6 md:right-6
        text-black/50 hover:text-black/75 
        transition-colors
      "
      aria-label="Close"
    >
      <X size={42}  />
    </button>

    {/* Prev Button */}
    <button
      onClick={handlePrev}
      className="
        absolute left-4 md:left-6 
        top-1/2 -translate-y-1/2 
        cursor-pointer 
        text-black/50 hover:text-black/75 
        transition-colors
      "
      aria-label="Previous"
    >
      <ChevronLeft size={32}  />
    </button>

    {/* Image Container */}
    <div
      ref={fullscreenRef}
      className="
        flex items-center justify-center
        w-full md:w-[60%]
        max-w-[1000px]
        h-[60vh] md:h-[80vh]
      "
    >
      {/* You place your image in here dynamically */}
    </div>

    {/* Next Button */}
    <button
      onClick={handleNext}
      className="
        absolute right-4 md:right-6 
        top-1/2 -translate-y-1/2 
        cursor-pointer 
        text-black/50 hover:text-black/75 
        transition-colors
      "
      aria-label="Next"
    >
      <ChevronRight size={32}  />
    </button>

    {/* Counter */}
    <div
      className="
        absolute bottom-4 md:bottom-6 
        text-black text-sm
        bg-black/10 md:bg-black/50 
        text-black md:text-white
        px-3 py-1 md:px-4 md:py-2 
        rounded
      "
    >
      {imgIndex + 1} / {project.images.length}
    </div>
  </div>
)}

    </>
  )
}