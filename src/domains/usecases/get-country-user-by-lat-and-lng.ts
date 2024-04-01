export interface GetCountryUserByLatAndLng {
  get: (lat: string, lng: string) => Promise<GetCountryUserByLatAndLng.Result>
}

export namespace GetCountryUserByLatAndLng {
  export type Result = {
    country: string
  }
}