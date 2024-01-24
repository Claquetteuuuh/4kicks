"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { userType } from "../../../../../types/global/UserType";
import axios from "axios";
import { CategorieType } from "../../../../../types/dashboard/CategorieType";
import CategoriesCheckboxContainer from "@/components/CategoriesCheckboxContainer/CategoriesCheckboxContainer";
import styles from "./information.module.css"
import TextInput from "@/components/TextInput/TextInput";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { AchatProductType, AchatsType } from "../../../../../types/dashboard/AchatsType";
import SelectInput from "@/components/selectInput/SelectInput";



const Page = ({ params }: { params: { user: userType } }) => {

  const param = useSearchParams()
  const achat_uid = param?.get('achatUID')
  const [recom, setRecom] = useState<AchatsType>();
  const [status, setStatus] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    modifStatus();
  };

  useEffect(() => {
    axios.get('/api/dashboard/commandes?achatUID=' + achat_uid)
      .then((response) => {
        console.log(response)
        setRecom(response.data)
        setStatus(response.data.status)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [achat_uid]);

  const modifStatus = () => {
    axios.put('/api/dashboard/commandes', {
      achat_uid: recom?.achat_uid,
      status: status,

    })
      .then((response) => {
        console.log(response)

      })
      .catch((err) => {
        console.error(err)
      })
  }




  return (
    <DashboardLayout params={params}>
      <div className={styles.container_achat_uid}>
        <p className={styles.achat_uidA}>Achat uid:</p>
        <p className={styles.achat_uidB}> {recom?.achat_uid}</p>
      </div>
      <div className={styles.container_account_uid}>
        <p className={styles.account_uidA}>Account uid:</p>
        <p className={styles.account_uidB}> {recom?.account_uid}</p>
      </div>
      <div className={styles.container_order_id}>
        <p className={styles.order_idA}>Order uid:</p>
        <p className={styles.order_idB}> {recom?.order_id}</p>
      </div>
      <div className={styles.container_creation_date}>
        <p className={styles.creation_dateA}>Date:</p>
        <p className={styles.creation_dateB}> {recom?.creation_date}</p>
      </div>
      <div className={styles.container_address_uid}>
        <p className={styles.address_uidA}>Address uid:</p>
        <p className={styles.address_uidB}> {recom?.address_uid}</p>
      </div>
      <div className={styles.container_promo_uid}>
        <p className={styles.promo_uidA}>Code promo:</p>
        <p className={styles.promo_uidB}> {recom?.promo_uid}</p>
      </div>
      <div className={styles.container_status}>
        <p className={styles.statusA}>Status:</p>
        <p className={styles.statusB}> {status}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <SelectInput elements={["PAID", "SENT", "RETURN", "ERROR"]} setState={setStatus} state={status} placeholder={"Status"} />
        <input type="submit" value={"envoyer"} />
      </form>

      {recom?.product_in_achat.map(p => {

        return (
          <div key={p.id} className={styles.container_historique}>
            <div className={styles.container_row}>
              <div className={styles.container_iTd}>
                <img src={p.imageLien} alt="image de chaussure" className={styles.image} />
              </div>
              <div className={styles.colonne1}>
                <div className={styles.container_td}>
                  <h2 className={styles.titre}>{p.nameProduct}</h2>
                  <p className={styles.description}>{p.description}</p>
                </div>
                <div className={styles.container_ct}>
                  <div className={styles.container_couleur}>
                    <p className={styles.couleurA}>Couleur: </p>
                    <p className={styles.couleurB}> {p.color_product}</p>
                  </div>
                  <div className={styles.container_taille}>
                    <p className={styles.tailleA}>Taille:</p>
                    <p className={styles.tailleB}> {p.taille_product}</p>
                  </div>
                </div>
              </div>
              <div className={styles.colonne2}>
                <div className={styles.container_rq}>
                  <div className={styles.container_reference}>
                    <p className={styles.referenceA}>Référence Produits: </p>
                    <p className={styles.referenceB}>{p.productUID}</p>
                  </div>
                  <div className={styles.container_quantite}>
                    <p className={styles.quantiteA}>Quantité: </p>
                    <p className={styles.quantiteB}>{p.quantite_product}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </DashboardLayout>
  );
};

export default Page;
