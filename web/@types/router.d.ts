import 'react-router-dom'

declare module 'react-router-dom' {
  export interface DefaultParams {
    projectSlug: string
    categorySlug: string
  }
}
