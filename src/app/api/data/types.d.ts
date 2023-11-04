export interface CountryData {
  iso2: string,
  iso3a: string,
  data?: {
    [year: string]: {
      [dataPoint: DataPointType]: ?number,
    }
  }
}

export type DataPointType = 'gdp' | 'crop' | 'ara' | 'immigrants';