import type { NextApiRequest, NextApiResponse } from 'next'
import client from '@/lib/paypal'
import paypal from '@paypal/checkout-server-sdk'
import prisma from '@/lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //Capture order to complete payment
  const { orderID } = req.body
  const PaypalClient = client()
  const request = new paypal.orders.OrdersCaptureRequest(orderID)
  const response = await PaypalClient.execute(request)
  if (!response) {
    res.status(500)
  }

  // Update payment to PAID status once completed
  await prisma.achat.updateMany({
    where: {
      order_id: orderID,
    },
    data: {
      status: 'PAID',
    },
  })
  res.json({ ...response.result })
}