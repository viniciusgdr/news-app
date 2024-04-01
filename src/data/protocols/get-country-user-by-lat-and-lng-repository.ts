export interface GetCountryUserByLatAndLngRepository {
  getCountryByLatAndLng: (lat: string, lng: string) => Promise<GetCountryUserByLatAndLngRepository.Result>
}

export namespace GetCountryUserByLatAndLngRepository {
  export type Result = {
    country: string
  }
}