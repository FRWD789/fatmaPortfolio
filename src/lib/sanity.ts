import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: import.meta.env.VITE_SANITY_DATASET||'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// QUERIES
export async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    description,
    images,
    category,
    layoutTemplate,
    year,
    client
  }`
  return await client.fetch(query)
}

export async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    images,
    features,
    category,
    layoutTemplate,
    year,
    client
  }`
  return await client.fetch(query, {slug})
}

export async function getSettings() {
  const query = `*[_type == "portfolioSettings"][0]`
  return await client.fetch(query)
}