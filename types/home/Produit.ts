import { AvisType } from "./Avis"

export type ProduitType = {
    productUID : string,
    nameProduct: string,
    price: number,
    imageLien: string[],
    colorProduct: string[],
    tailleProduct: string[],
    avisMoyenne: number,
    avisProduct: AvisType[],
}