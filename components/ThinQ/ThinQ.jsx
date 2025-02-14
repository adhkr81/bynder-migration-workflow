import styles from "./ThinQ.module.scss";
import useIsInViewport from "../../hooks/useIsInViewport";
import { useRef } from "react";

export default function ThinQ() {
  const imgRef = useRef();
  const imgInViewport = useIsInViewport(imgRef);

  return (
    <div className={styles["container"]}>
      <div className={styles["container--inner"]}>
        <div className={styles["content"]}>
          <div className={styles["content--inner"]}>
            <h2>Innovation for everyday living</h2>
            <h3>THINQ</h3>
            <p>
              Discover ThinQ Care™* within the ThinQ® app—proactive smart alerts
              to keep your appliances running smoothly. Get notifications about
              usage, maintenance, plus early diagnosis right on your smartphone.
            </p>
          </div>
          <p className={styles["disclaimer"]}>
            *Available on select LG smart appliances
          </p>
        </div>
        <div className={styles["img"]} ref={imgRef} data-view={imgInViewport}>
          <img src="/us/washcombo-all-in-one/images/thinq.jpg" alt="" />
        </div>
        <p className={styles["disclaimer-mobile"]} aria-hidden="true">
          *Available on select LG smart appliances
        </p>
      </div>
    </div>
  );
}
