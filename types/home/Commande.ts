import { Color } from "@prisma/client"

export type Product_commande = {
    name_product: string,
    description_product: string,
    price_product: number,
    color_product?: string,
    taille_product?: string,
    quantite_product: number,
    name_image: string
}

export type Commande = {
    achat_uid: string,
    creation_date: string,
    price_commande: number
    product_commande: Product_commande[]
} 