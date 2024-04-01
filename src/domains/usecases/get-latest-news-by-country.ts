import { News } from '../models/news'

export interface GetLatestNewsByCountry {
  get: (country: string) => Promise<GetLatestNewsByCountry.Result[]>
}

export namespace GetLatestNewsByCountry {
  export type Result = News
}