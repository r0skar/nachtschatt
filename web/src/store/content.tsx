import Picosanity, * as Sanity from 'picosanity'
import React, { createContext, useContext, useState, useEffect } from 'react'

enum Status {
  FETCHING = 'fetching',
  FETCHED = 'fetched',
  FAILED = 'failed'
}

interface Config extends Sanity.Document {
  about: string
  title: string
  description: string
  coverImage: Sanity.Asset
  socialImage: Sanity.Asset
}

interface Work extends Sanity.Document {
  title: string
  description: string
  image: Sanity.Asset
}

interface Project extends Sanity.Document {
  title: string
  slug: string
  description: string
  works: Work[]
}

interface Category extends Sanity.Document {
  title: string
  slug: string
  description: string
  projects: { slug: string; title: string }[]
}

interface Content {
  config: Config
  projects: Project[]
  categories: Category[]
}

interface State {
  status: Status
  content: Content
}

const Context = createContext({} as State)

const client = new Picosanity({
  projectId: 'tr8i0v52',
  dataset: 'production',
  useCdn: true
})

const query = `{
  "config": *[_type == "config"][0],
  "categories": *[_type == "category"]{ ..., "projects": projects[]->{ slug, title } },
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
        const response = await client.fetch<Content>(query)
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