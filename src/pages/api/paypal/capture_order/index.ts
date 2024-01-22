import type { NextApiRequest, NextApiResponse } from 'next'
import client from '@/lib/paypal'
import paypal from '@paypal/checkout-server-sdk'
import prisma from '@/lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //Capture order to complete payment
  const { orderID, name, postal_code, address, cmp_address, city, country } = req.body;
  // const PaypalClient = client()
  // const request = new paypal.orders.OrdersCaptureRequest(orderID)
  // const response = await PaypalClient.execute(request)
  // if (!response) {
  //   res.status(500)
  // }
  // console.log(name)
  const order = await prisma.achat.findMany({
    where: {
      order_id: orderID
    }
  })
  if(!order){
    res.status(400).json({error: "This order doesn't exists !"})
    return;
  }
  const user = await prisma.account.findUnique({
    where: {
      account_uid: order[0].account_uid
    },
    select: {
      account_uid: true,
      product_in_panier: true,
      email: true
    }
  })
  if(!user){
    res.status(400).json({error: "This account doesn't exists !"})
    return;
  }
  const shipAddress = await prisma.shipAddress.create({
    data: {
      postal_code: postal_code,
      address: address,
      cmp_address: cmp_address,
      city: city,
      country: country,
      account_uid: user.account_uid,
      first_name: name.split(" ")[0],
      last_name: name.split(" ")[1],
      email_address: user.email
    }
  })
  if(!shipAddress){
    res.status(400).json({error: "Error when creating shipAddress"})
    return;
  }
  // Update payment to PAID status once completed
  const achat = await prisma.achat.updateMany({
    where: {
      order_id: orderID,
    },
    data: {
      status: 'PAID',
      address_uid: shipAddress.address_uid,
      account_uid: user.account_uid
    },
  })
  if(!achat){
    res.status(400).json({error: "error in creation of achat"});
    return;
  }
  const panier = user.product_in_panier;
  console.log(panier);
  // mettre tout dans product_in_achat
  // supprimer tout dans le panier

}