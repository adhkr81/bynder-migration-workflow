import { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import styles from "./PowerOfOne.module.scss";
import useWindowResize from "../../hooks/useWindowResize";
import { useParallax } from "react-scroll-parallax";

export default function PowerOfOne() {
  const list = [
    {
      title: "Complete wash & dry as fast as 2 hours ",
      text: "The WashCombo™ runs a complete wash and dry cycle as fast as 2 hours, without having to transfer clothes.*",
      icon: "TwoHrWash",
    },
    {
      title: "Go anywhere ventless design",
      text: "Space-saving 2-in-1 configuration, ventless design and standard 120v plug means it can be installed virtually anywhere.",
      icon: "Ventless",
    },
    {
      title: "Greatest energy savings ",
      text: "With LG's Inverter HeatPump™ technology, you'll use up to 60% less energy with every load.** ",
      icon: "Electrical",
    },
  ];

  return (
    <div className={styles["container"]}>
      <div className={styles["bg"]}>
        <picture>
          <source
            media="(max-width: 575px)"
            srcSet="/us/washcombo-all-in-one/images/power-of-one-bg-mobile.jpg"
          />
          <source
            media="(max-width: 991px)"
            srcSet="/us/washcombo-all-in-one/images/power-of-one-bg-tablet.jpg"
          />
          <img
            src="/us/washcombo-all-in-one/images/power-of-one-bg.jpg"
            alt=""
          />
        </picture>
        {/* <div className={styles["towel-wrapper"]} ref={ref}>
          <img src="/us/washcombo-all-in-one/images/towel.png" alt="" />
        </div> */}
      </div>
      <div className={styles["wrapper"]}>
        <div className={styles["content"]}>
          <div className={styles["content-inner"]}>
            <h3>The power of one</h3>
            <div className={styles["list"]}>
              {list.map((item, i) => (
                <div className={styles["list-container"]} key={i}>
                  <div className={styles["icon-wrapper"]}>
                    <Icon name={item.icon} />
                  </div>
                  <div className={styles["text"]}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles["disclaimer"]}>
              <p>
                *Based on independent testing in Wash+Dry cycle with Dryer on
                Energy Saver mode, 10 lb. DOE load (October 2023). Cycle time
                may vary depending on load type/weight. Full capacity load
                approximately 20 lb.
              </p>
              <p>
                **Up to 60% less energy compared to similarly-sized vented LG
                dryers. The industry&apos;s most energy efficient combo based on
                EnergyStar.gov (November 2023).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
