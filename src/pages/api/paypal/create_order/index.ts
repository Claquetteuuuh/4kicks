import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { account_uid } = req.body;
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["Prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: "0.05",
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
        address_uid: "6a18df4a-ba3f-4bbd-9ece-61b0ce21ad29",
        status: "PENDING",
      },
    });
    res.json({ orderID: response.result.id });
  }
}
