import {Post} from './Post'

export type Posts = {
  content: Post[]
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  size: number
  sort: Object[] 
  totalElements: number
  totalPages: number
}
