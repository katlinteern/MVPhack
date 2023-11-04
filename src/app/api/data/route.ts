import { NextResponse } from 'next/server'
import { getNumericCodes } from 'i18n-iso-countries';
import { CountryData } from "@/app/api/data/types";

export async function GET( /* request, context: { params }*/ ) {
  const countries = getNumericCodes();
  const resp: any = {};
  const years: number[] = Array.from(new Array(27), (_, i) => i+1997);

  Object.keys(countries).forEach((key) => {
      const countryData: CountryData = {
        iso2: countries[key],
        iso3a: key,
      }
      const data: any = {};
      years.forEach((year) => {
        data[''+year] = {
          gdp: getRandomInt(5000),
          crop: getRandomInt(5000),
          ara: getRandomInt(5000),
          immigrants: getRandomInt(5000),
        }
      })
      countryData.data = data;

      resp[key] = countryData
    }
  )
  return NextResponse.json(resp);
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}