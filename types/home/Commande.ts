import { Color } from "@prisma/client"


export type Commande = {
    id: number,
    achat_uid: string,
    creation_date: string,
    name_product: string,
    description_product: string,
    price_product: number,
    color_product?: string,
    taille_product?: string,
    quantite_product: number,
    name_image: string
} 