import { AvisType } from "../home/Avis";

export type FullProductType = {
  product_uid: string;
  product_name: string;
  price: number;
  marque: string;
  colors: string[];
  sizes: string[];
  description: string;
  complete_description: string;
  avis: AvisType[];
  images_url: string[];
  avis_avg: number;
};

export type PanierProductType = {
  product_uid: string;
  product_name: string;
  color: string;
  marque: string;
  size: string;
  price: number;
  quantite: number;
  image_url: string;
  description: string;
  
}