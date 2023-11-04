import { NextResponse } from 'next/server'
import { getAlpha2Codes } from 'i18n-iso-countries';

export async function GET( /* request, context: { params }*/ ) {
  const countries = getAlpha2Codes();
  const resp = [];

  Object.keys(countries).forEach((key) => {
    resp.push({
      iso: key,
      gdp: getRandomInt(5000),
    })
    }
  )
  return NextResponse.json(resp);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}