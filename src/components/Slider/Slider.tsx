import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "./Slider.module.css";
import axios from "axios";
import { AfficheType } from "../../../types/home/Affiche";
import Loading from "../Loading/Loading";
import PlainButton from "../plainButton/plainButton";
import { useRouter } from "next/navigation";
import { it } from "node:test";

function Slider() {
  const [affiches, setAffiches] = useState<AfficheType[]>();

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/affiches`)
      .then((response) => {
        console.log(response);
        setAffiches(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {affiches ? (
        <Carousel
          className={styles.carousel}
          showThumbs={false}
          autoPlay={true}
          interval={6000}
          infiniteLoop={true}
          verticalSwipe={"natural"}
          showArrows={false}
        >
          {affiches.map((item: AfficheType) => {
            return (
              <div
                key={item.afficheUid}
                className={styles.container_ducarousel}
              >
                <img
                  className={styles.img}
                  src={item.imageLien}
                  alt="image de chaussure"
                />
                <div className={styles.container_text}>
                  <h1 className={styles.title}>{item.title}</h1>
                  <p className={styles.subtitles}>{item.subtitle}</p>
                    {item.callToAction ? (
                      <PlainButton className={styles.button} text={item.callToAction} onClick={() => router.push(`${item.callToActionUrl}`)} />
                    ) : (
                      false
                    )}
                </div>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Slider;
