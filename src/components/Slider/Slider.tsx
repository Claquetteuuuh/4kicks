import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';
import styles from "./Slider.module.css"
import axios from 'axios';
import { AfficheType } from '../../../types/home/Affiche';
import { ArticlesType } from '../../../types/home/Article';

function Slider() {
  const [affiches, setAffiches] = useState<AfficheType[]>([]);

  useEffect(() => {
    if (affiches.length === 0) {
      axios
        .get(`/api/affiches`)
        .then((response) => {
          console.log(response);
          setAffiches(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [affiches]);

  return (
    <div className={styles.container}>
    <Carousel className={styles.carousel}>
      {affiches && (
        affiches.map((item: AfficheType) => (
          <div key={item.afficheUid} className={styles.container_ducarousel}>
            <div className={styles.container_images}>
              <img src={item.imageLien} alt="image de chaussure" />
            </div>
            <div className={styles.container_text}>
              <h1 className={styles.title}>{item.title}</h1>
              <p>{item.subtitle}</p>
              <div>
                <a href={item.callToActionUrl} className={styles.callToAction}>
                  <button>{item.callToAction}</button>
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </Carousel>
    </div>
  );
}

export default Slider;