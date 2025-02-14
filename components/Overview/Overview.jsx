import styles from "./Overview.module.scss";
import Features from "./Features/Features";
import Pedestals from "./Pedestals/Pedestals";
import ColorSlider from "./ColorSlider/ColorSlider";

export default function Overview() {
  return (
    <div className={styles["container"]}>
      <div className={styles["container--inner"]}>
        <div className={styles["text"]}>
          <h3>
            Let the WashCombo™ do the heavy lifting. It’s not only fast,
            spacious and energy-efficient, it’s also loaded with premium
            features that set LG laundry appliances apart.
          </h3>
        </div>
        <ColorSlider />
        <Features />
        <Pedestals />
        <p className={styles["disclaimer"]}>
          *All laundry pedestals sold separately
        </p>
      </div>
    </div>
  );
}
