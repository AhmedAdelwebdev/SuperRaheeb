import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { productName, price } = await req.json();

  const orderData = {
    intent: 'CAPTURE',
    purchase_units: [{
      description: productName,
      amount: { currency_code: 'USD', value: price },
    }],
    application_context: {
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/paypal/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/paypal/cancel`,
    },
  };

  const basicAuth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');

  try {
    const res = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${basicAuth}` },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Create Order Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
