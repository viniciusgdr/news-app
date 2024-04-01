import { GetLatestNewsByCountry } from '../../domains/usecases/get-latest-news-by-country'
import { NewsRepository } from '../protocols/news-repository'

export class AppGetLatestNewsByCountry implements GetLatestNewsByCountry {
  constructor(private readonly newsRepository: NewsRepository) {}

  async get(country: string): Promise<GetLatestNewsByCountry.Result[]> {
    return this.newsRepository.getLatestNewsByCountry(country)
  }
}
