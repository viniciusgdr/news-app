export interface NewsRepository {
  getLatestNewsByCountry(country: string): Promise<NewsRepository.Result[]>
}

export namespace NewsRepository {
  export type Result = {
    title: string
    description: string
    author: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
    sourceName: string
  }
}