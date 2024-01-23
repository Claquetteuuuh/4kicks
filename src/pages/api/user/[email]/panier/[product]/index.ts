import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { email, product } = req.query;
    const account = await prisma?.account.findUnique({
      where: {
        email: email as string,
      },
    });
    if (!account) {
      res.status(400).json({ error: "This account doesnt exists !" });
      return;
    }
    const productPanier = await prisma?.productInPanier.deleteMany({
      where: {
        product_uid: product as string,
        account_uid: account.account_uid,
      },
    });
    if (productPanier?.count == 0) {
      res.status(400).json({ error: "the product is not found !" });
      return;
    }
    res
      .status(200)
      .json({ message: "The product has been deleted successfully !" });
  } else {
    res.status(400).json({ error: "This route only accept DELETE request !" });
  }
}
