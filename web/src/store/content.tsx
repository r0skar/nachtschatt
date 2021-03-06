import React, { createContext, useContext, useState, useEffect } from 'react'
import PicoSanity, * as Sanity from 'picosanity'
import { sanityConfig } from '../config'

export enum Status {
  FETCHING = 'fetching',
  FETCHED = 'fetched',
  FAILED = 'failed'
}

export interface Config extends Sanity.Document {
  title: string
  description: string
  coverImage: Sanity.Asset
  socialImage: Sanity.Asset
  about: {
    image: Sanity.Asset
    text: Sanity.Block[]
    email: string
    telephone: string
  }
}

export interface Work extends Sanity.Document {
  title: string
  description: string
  image: Sanity.Asset
}

export interface Project extends Sanity.Document {
  title: string
  slug: Sanity.Slug
  description: Sanity.Block[]
  works: Work[]
}

export interface Category extends Sanity.Document {
  title: string
  slug: Sanity.Slug
  description: string
  projects: {
    row?: number
    col?: number
    project: {
      title: string
      slug: Sanity.Slug
      cover: Sanity.Asset
    }
  }[]
}

export interface Content {
  config: Config
  projects: Project[]
  categories: Category[]
}

interface State {
  status: Status
  content: Content
}

const sanityClient = new PicoSanity(sanityConfig)
const Context = createContext({} as State)

const query = `{
  "config": *[_type == "config"][0]{ ..., "coverImage": coverImage->{ ...image } },
  "categories": *[_type == "category"]{ ..., "projects": projects[]{ row, col, "project": ^.project->{slug, title, "cover": ^.works[0]->{...image}} } },
  "projects": *[_type == "project"]{ ..., "works": works[]->{...} }
}`

export const useContent = () => {
  return useContext(Context)
}

export const ContentProvider: React.FC = ({ children }) => {
  const [status, setStatus] = useState(Status.FETCHING)
  const [content, setContent] = useState({} as Content)

  useEffect(() => {
    const fetchContent = async () => {
      setStatus(Status.FETCHING)

      try {
        const response = await sanityClient.fetch<Content>(query)
        setContent(response)
        setStatus(Status.FETCHED)
      } catch (e) {
        console.error(e)
        setStatus(Status.FAILED)
      }
    }

    fetchContent()
  }, [])

  return <Context.Provider value={{ status, content }}>{children}</Context.Provider>
}
