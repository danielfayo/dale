import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// import NotionMagicLinkEmail, { NotionMagicLinkEmailProps } from "@/emails/Purchase"
import PurchaseEmail from '@/emails/Purchase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
//   const { firstName, email } = await request.json();
  const {product, email} = await request.json()

  try {
    await resend.emails.send({
      from: "oboarding@resend.dev",
      to: email,
      subject: 'Dale',
      react: PurchaseEmail({product})
    });
    return NextResponse.json({
      status: 'Ok'
    }, {
      status: 200
    })
  } catch(e: unknown) {
    if (e instanceof Error) {
      console.log(`Failed to send email: ${e.message}`);
    }
    return NextResponse.json({
      error: 'Internal server error.'
    }, {
      status: 500
    })
  }
  

}