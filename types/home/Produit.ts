import { CategorieType } from "../dashboard/CategorieType"

export type ProduitType = {
    productUID : string,
    nameProduct: string,
    price: number,
    imageLien: string[],
    description: string,
}