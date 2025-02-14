import styles from "./MegaCapacity.module.scss";
import useIsInViewport from "../../hooks/useIsInViewport";
import { useRef } from "react";

export default function MegaCapacity() {
  const heroRef = useRef();
  const imgInViewport = useIsInViewport(heroRef);
  return (
    <div className={styles["container"]}>
      <div className={styles["container--inner"]}>
        <div className={styles["header"]}>
          <h3>Go big to save time and get more done</h3>
        </div>
        <div className={styles["relative"]}>
          <div
            className={styles["imgs-wrapper"]}
            ref={heroRef}
            data-view={imgInViewport}
          >
            <picture>
              <source
                srcSet="/us/washcombo-all-in-one/images/mega-capacity-1-mobile.jpg"
                media="(max-width: 767px)"
              />
              <source
                srcSet="/us/washcombo-all-in-one/images/mega-capacity-1-tablet.jpg"
                media="(max-width: 1200px)"
              />
              <img
                src="/us/washcombo-all-in-one/images/mega-capacity-1.jpg"
                alt=""
                className={styles["hero-image"]}
              />
              <div className={styles["gradient-overlay"]}></div>
            </picture>
          </div>
          <div className={styles["content"]}>
            <div className={styles["img-cta"]}>
              <img
                src="/us/washcombo-all-in-one/images/mega-capacity-2.png"
                alt=""
              />
            </div>
            <div className={styles["box"]}>
              <p>
                With 5.0 cubic feet of capacity, the WashCombo™ is LG’s largest
                combo unit available, able to accommodate a king size comforter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
