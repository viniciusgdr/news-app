import { GetCountryUserByLatAndLng } from '../../domains/usecases/get-country-user-by-lat-and-lng';
import { GetCountryUserByLatAndLngRepository } from '../protocols/get-country-user-by-lat-and-lng-repository';

export class AppCountryUserByLatAndLng implements GetCountryUserByLatAndLng {
  constructor(private readonly countryRepository: GetCountryUserByLatAndLngRepository) {}

  async get(lat: string, lng: string): Promise<GetCountryUserByLatAndLng.Result> {
    return await this.countryRepository.getCountryByLatAndLng(lat, lng)
  }
}