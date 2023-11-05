import { getData } from "@/app/api/data/parse_data";
import { CountryData } from "@/app/api/data/types";
import { getName, getNumericCodes } from "i18n-iso-countries";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const isDummy = request.nextUrl.searchParams.get('is_dummy');

  if (!isDummy) {
    return NextResponse.json(getData());
  }

  const countries = getNumericCodes();
  const resp: any = {};
  const years: number[] = Array.from(new Array(27), (_, i) => i+1997);

  Object.keys(countries).forEach((key) => {
    const countryData: CountryData = {
      iso2: countries[key],
      // @ts-ignore
      iso3a: key,
      name: getName(key, 'en') || '',
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