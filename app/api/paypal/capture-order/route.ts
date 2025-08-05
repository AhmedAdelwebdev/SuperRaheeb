import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { orderID } = await req.json()

  if (!orderID) {
    return NextResponse.json({ error: 'Missing order ID' }, { status: 400 })
  }

  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')
  const tokenRes = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  if (!tokenRes.ok) {
    const err = await tokenRes.text()
    return NextResponse.json({ error: 'Auth failed', details: err }, { status: 500 })
  }

  const { access_token } = await tokenRes.json()

  const captureRes = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`,
    { 
      method: 'POST',
      headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' }
    }
  )

  if (!captureRes.ok) {
    const errJson = await captureRes.json()
    return NextResponse.json({ error: 'Capture failed', details: errJson }, { status: 500 })
  }

  return NextResponse.json(await captureRes.json())
}
