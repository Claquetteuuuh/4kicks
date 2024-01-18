export type Product_commande = {
    name_product: string,
    description_product: string,
    price_product: number,
    name_image: string
}

export type Commande = {
    achat_uid: string,
    creation_date: Date,
    price_commande: number
    product_commande: Product_commande[]
} 