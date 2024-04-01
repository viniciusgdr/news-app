import { AppGetLatestNewsByCountry } from '../../data/usecases/app-get-latest-news-by-country';
import { GetLatestNewsByCountry } from '../../domains/usecases/get-latest-news-by-country';
import { NewsAPIRepository } from '../../infra/app/newsapi/newsapi';

export const makeGetLatestNewsByCountry = (): GetLatestNewsByCountry => {
  const newsRepository = new NewsAPIRepository()
  return new AppGetLatestNewsByCountry(newsRepository)
}