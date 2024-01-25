import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { account_uid, promo } = req.body;
    const user = await prisma.account.findUnique({
      where: {
        account_uid: account_uid,
      },
      select: {
        product_in_panier: {
          select:{
            product: {
              select: {
                price: true
              }
            }
          }
        }
      }
    })
    if(!user){
      res.status(400).json({error: "cant find user"})
      return;
    }
    let price = 0;
    for (let i = 0; i < user.product_in_panier.length; i++) {
      const product = user.product_in_panier[i];
      price += product.product.price;
    }
    if(promo){
      const code = await prisma.promotionCode.findUnique({
        where: {
          code: promo
        }
      })
      if(!code){
        console.log("Code non trouvé")
      }else{
        price = price*code.coefficient
      }
    }
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["Prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: (price*1.12).toFixed(2),
          },
        },
      ],
    });
    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      res.status(500);
    }

    //Once order is created store the data using Prisma
    await prisma.achat.create({
      data: {
        order_id: response.result.id,
        account_uid: account_uid,
        status: "PENDING",
      },
    });

    res.json({ orderID: response.result.id });
  }

}
