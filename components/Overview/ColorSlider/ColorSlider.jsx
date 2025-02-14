import styles from "./ColorSlider.module.scss";
import { useState } from "react";

export default function ColorSlider() {
  const [activeColor, setActiveColor] = useState(1);
  const [showLabel, setShowLabel] = useState(null);
  const colors = [
    { name: "Graphite Steel", hex: "#a6a6a6" },
    { name: "Black Steel", hex: "#3c3a3b" },
  ];

  return (
    <div className={styles["color-carousel"]}>
      <div className={styles["color-carousel-btns"]}>
        {colors.map((color, index) => (
          <button
            aria-label={color.name}
            key={index}
            data-active={activeColor === index}
            onClick={() => setActiveColor(index)}
            style={{ backgroundColor: color.hex }}
            onMouseEnter={() => setShowLabel(color.name)}
            onMouseLeave={() => setShowLabel(null)}
          >
            <span className={styles["name"]}>{color.name}</span>
            <div
              className={styles["color-label"]}
              data-show={showLabel === color.name}
              data-color={color.name}
            >
              <span>{color.name}</span>
            </div>
          </button>
        ))}
      </div>
      <div className={styles["color-carousel-slide"]}>
        {colors.map((_, index) => (
          <img
            key={index}
            src={`/us/washcombo-all-in-one/images/WM6998HVA Front Background Removed ${index}.png`}
            alt=""
            data-active={activeColor === index}
          />
        ))}
      </div>
    </div>
  );
}
