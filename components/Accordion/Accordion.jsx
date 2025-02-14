import styles from "./Accordion.module.scss";
import List from "./List/List";
import useScreenWidth from "../../hooks/useScreenWidth";

export default function Accordion() {
  const width = useScreenWidth();
  const MEDIA_QUERY = 991;

  return (
    <div className={styles["container"]}>
      {/* <div className={styles["bg"]}>
        <img src="/us/washcombo-all-in-one/images/accordion-bg.jpg" alt="" />
      </div> */}
      <div className={styles["inner"]}>
        <div className={`${styles["header"]} ${styles["header-mobile"]}`}>
          <h3>Outstanding performance meets peak efficiency </h3>
          <p>
            With the WashCombo™, you’ll save energy and get more done without
            compromise.
          </p>
        </div>
        <div className={styles["graphic"]}>
          <video
            muted
            autoPlay
            playsInline
            controls={false}
            loop
            poster="/us/washcombo-all-in-one/images/WM6998HBA Right Angle_cycle 1.png"
            src="/us/washcombo-all-in-one/videos/WC_Drum_Spin_heatpump_r4.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={styles["content"]}>
          <div className={styles["content-inner"]}>
            <div className={styles["header"]}>
              <h3>Outstanding performance meets peak efficiency </h3>
              <p>
                With the WashCombo™, you’ll save energy and get more done
                without compromise.
              </p>
            </div>
            <List />
          </div>
        </div>
      </div>
    </div>
  );
}
