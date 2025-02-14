import styles from "./GetItDone.module.scss";
import useWindowResize from "../../hooks/useWindowResize";
import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import { Parallax } from "react-scroll-parallax";

export default function GetItDone({ showText }) {
  const [progress, setProgress] = useState(0);
  const { width } = useWindowResize();
  const [scale, setScale] = useState(null);

  useEffect(() => {
    const breakpoints = [
      { max: 575, scale: 575 }, // Mobile devices
      { max: 880, scale: 880 }, // Tablet devices
      { max: 990, scale: 1 }, // Tablet devices with a scale of 1
      { max: 1600, scale: 1600 }, // Desktop devices
    ];

    let scale = 1;
    for (const breakpoint of breakpoints) {
      if (width <= breakpoint.max) {
        scale = width / breakpoint.scale;
        break;
      }
    }

    setScale(scale);
  }, [width]);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["bg-container"]}>
        <img
          src="/us/washcombo-all-in-one/images/fadedwashbg.png"
          alt=""
          className={styles["bg-img"]}
        />
      </div>
      <div className={styles["container"]}>
        <div
          className={styles["content"]}
          style={{
            transform: scale && scale < 1 ? `scale(${scale})` : "none",
          }}
        >
          <img
            src="/us/washcombo-all-in-one/images/spark.png"
            alt=""
            className={styles["images__spark-img"]}
          />
          <h3 className={styles["light"]}>Get it done </h3>

          <div className={styles["images__wrapper"]}>
            <Parallax
              className={styles["svg-wrapper--placeholder"]}
              data-show={showText}
              speed={-100}
              translateY={
                width <= 767 ? [0, 0] : width <= 990 ? [-680, 0] : [-700, 0]
              }
              translateX={
                width <= 767 ? [0, 0] : width <= 990 ? [150, 0] : [-50, 0]
              }
              startScroll={0}
              endScroll={1000}
              onProgressChange={(progress) => setProgress(progress)}
              style={{ "--svgBgOpacity": 1 - progress }}
            >
              <Icon name="Clothes" />
            </Parallax>
            <h3 className={styles["bold-red"]}>in one</h3>
          </div>

          <div className={styles["text"]}>
            <p>
              The LG WashCombo™ All-in-One is a mega capacity combination
              laundry solution that washes and dries laundry as fast as 2 hours*
              without the need for load transfer. The future of laundry has
              arrived.
            </p>
          </div>

          <div className={styles["text"]}>
            <p className={styles["disclaimer"]}>
              *Based on independent testing in Wash+Dry cycle with Dryer on
              Energy Saver mode, 10 lb. DOE load (October 2023). Cycle time may
              vary depending on load type/weight.
            </p>
          </div>
        </div>

        <div
          className={styles["images__energy-img"]}
          style={{
            transform: scale && scale < 1 ? `scale(${scale})` : "none",
          }}
        >
          <img
            src="/us/washcombo-all-in-one/images/energy-circle-mask.png"
            alt=""
          />
        </div>
        <img
          src="/us/washcombo-all-in-one/images/spark.png"
          alt=""
          className={styles["images__spark-img-right"]}
        />
      </div>
    </div>
  );
}
