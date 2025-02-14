import styles from "./Video.module.scss";

export default function Video() {
  return (
    <div className={styles["container"]}>
      <video
        src="/us/washcombo-all-in-one/videos/washcombo_heatpump_clip_(Original).mp4"
        type="video/mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
