export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Project {
  _id: string
  title: string
  slug: {current: string}
  description: string
  shortDescription: string
  images: SanityImage[]
  features: string[]
  category: string
  layoutTemplate: 'template1' | 'template2' | 'template3'
  year: number
  client: string
}

export interface PortfolioSettings {
  designerName: string
  bio: string
  email: string
  phone: string
  instagram: string
  behance: string
  primaryColor: string
  secondaryColor: string
  font: string
}