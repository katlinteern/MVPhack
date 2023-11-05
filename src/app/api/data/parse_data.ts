// @ts-ignore
import { CountryData } from "@/app/api/data/types";
import { alpha2ToNumeric, getName } from "i18n-iso-countries";

let parsedData: any;

export function getData() {
  if (parsedData) {
    return parsedData;
  }

  let parsed: {[a: string]: CountryData} = {};

  const data = require('./countries.json');

  data.forEach((row: {
    prev_res_cd: string,
    dest_country_cd: string,
    year: number,
    sex: 'F' | 'M',
    how_many_imms: number|string,
    ara_prev_res: number,
    crop_prev_res: number,
    gdp_prev_res: number,
  }) => {
    const {
      prev_res_cd,
      dest_country_cd,
      year,
      how_many_imms: emigrants,
      ara_prev_res: ara,
      crop_prev_res: crop,
      gdp_prev_res: gdp,
    } = row;

    if (!prev_res_cd || prev_res_cd === '' || emigrants === '') {
      return;
    }
    const cc = alpha2ToNumeric(prev_res_cd) as unknown as number;

    const country = parsed[cc] ?? {
      data: {},
      iso2: prev_res_cd,
      iso3a: cc,
      name: getName(cc, 'en'),
    };

    const yearData = (country.data && country.data[''+year]) ? country.data[''+year] : {
      immigrationTo: {},
      crop,
      ara,
      gdp,
      emigrants: 0,
    };

    // @ts-ignore
    yearData.immigrationTo[dest_country_cd] = (yearData.immigrationTo[dest_country_cd] ?? 0) + emigrants;
    // @ts-ignore
    yearData.emigrants = yearData.emigrants + emigrants;

    // @ts-ignore
    country.data[''+year] = yearData;
    parsed[cc] = country;
  });

  return parsed;
}