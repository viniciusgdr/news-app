import { AppCountryUserByLatAndLng } from '../../data/usecases/app-country-user-by-lat-and-lng'
import { GetCountryUserByLatAndLng } from '../../domains/usecases/get-country-user-by-lat-and-lng'
import { OpenStreetMapRepository } from '../../infra/app/openstreetmap/openstreetmap'

export const makeGetCountryUserByLatAndLng = (): GetCountryUserByLatAndLng => {
  const countryRepository = new OpenStreetMapRepository()
  return new AppCountryUserByLatAndLng(countryRepository)
}