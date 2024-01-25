import { ProductType } from "./ProductType"

export type AchatsType = {
    achat_uid: string,
    account_uid: string,
    order_id: string,
    creation_date: string,
    address_uid?: String,
    promo_uid?: String,
    status: String
    product_in_achat: AchatProductType[]
}

export type AchatProductType = {
    id: number,
    productUID: string,
    nameProduct: string,
    price: number,
    imageLien: string,
    description: string,
    color_product?: string,
    taille_product?: string,
    quantite_product: number,
}