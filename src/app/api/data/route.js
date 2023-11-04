import { NextResponse } from 'next/server'
import { getNumericCodes } from 'i18n-iso-countries';

export async function GET( /* request, context: { params }*/ ) {
  const countries = getNumericCodes();
  const resp = [];

  Object.keys(countries).forEach((key) => {
    resp.push({
      iso: countries[key],
      gdp: getRandomInt(5000),
      iso3a: key
    })
    }
  )
  return NextResponse.json(resp);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}