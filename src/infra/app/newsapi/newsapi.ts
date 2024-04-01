import { NewsRepository } from '../../../data/protocols/news-repository'
import fetch from 'node-fetch'

export class NewsAPIRepository implements NewsRepository {
  async getLatestNewsByCountry(country: string): Promise<NewsRepository.Result[]> {
    const response = await fetch(`http://192.168.0.2:3000/api/get-latest-news-by-country`, {
      method: 'post',
      body: JSON.stringify({ country }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    return data
  }
}