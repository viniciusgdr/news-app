import { GetCountryUserByLatAndLngRepository } from '../../../data/protocols/get-country-user-by-lat-and-lng-repository'
import fetch from 'node-fetch'

export class OpenStreetMapRepository implements GetCountryUserByLatAndLngRepository {
  async getCountryByLatAndLng (lat: string, lng: string): Promise<GetCountryUserByLatAndLngRepository.Result> {    
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&format=jsonv2`)
    const data = await response.json()
    return {
      country: data.address.country_code
    }
  }
}