declare module 'picosanity' {
  export interface Asset {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }

  export interface Slug {
    _type: 'slug'
    current: string
    title: string
  }

  export interface Color {
    _type: 'color'
    alpha: number
    hex: string
    rgb: {_type: string; a: number; b: number; g: number; r: number }
    hsl: {_type: string; a: number; h: number; l: number; s: number }
  }

  export interface Document {
    _createdAt: string
    _id: string
    _rev: string
    _type: string
    _updatedAt: string
  }

  export interface Block {
    _type: string
    _key: string
    marks: string[]
    markDefs: Record<string, string>[]
    children: Block[]
    // Default
    style?: string
    text?: string
    // List
    level?: number
    listItem?: 'bullet'
  }

  export interface Config {
    projectId: string
    dataset: string
    useCdn: boolean
  }

  class PicoSanity {
    constructor(config: Config)
    public fetch: <R = unknown>(query: string, params?: Record<string, string>) => Promise<R>
  }

  export default PicoSanity
}
