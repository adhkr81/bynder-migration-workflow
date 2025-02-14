import styles from "./ScrollVideo.module.scss";
import { useEffect, useRef, useState } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import ResponsiveImg from "./ResponsiveImg/ResponsiveImg";

export default function ScrollVideo() {
  const [mobile, setMobile] = useState(false);
  const videoRef = useRef();
  const containerRef = useRef();
  const { width } = useWindowResize();

  useEffect(() => {
    setMobile(width < 800);
  }, [width]);

  const images = ["all-in-one.jpg", "installation.jpg", "dimensions.jpg"];

  useEffect(() => {
    function handleScroll() {
      if (width >= 992) {
        const fromTop = containerRef?.current.offsetTop;
        const scrolledY = window.scrollY;
        const duration = videoRef?.current.duration;

        // Total height of the animation
        const height =
          containerRef?.current.getBoundingClientRect().height -
          window.innerHeight;

        // How much does the animation happening
        const currTime = ((scrolledY - fromTop) / height) * duration;

        if (currTime <= 1 || currTime >= 0) {
          videoRef.current.currentTime = currTime;
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [width]);

  return (
    <div className={styles["container"]} ref={containerRef}>
      <div className={styles["wrapper"]}>
        {width >= 992 ? (
          // Desktop
          <div className={styles["video-wrapper"]}>
            <video
              src={`/us/washcombo-all-in-one/videos/scroll-animation-${
                mobile ? "mobile" : "desktop"
              }.mp4`}
              type="video/mp4"
              ref={videoRef}
              muted
              playsInline
            />
          </div>
        ) : (
          // Tablet/Mobile
          <div className={styles["wrapper"]}>
            <div className={styles["headings"]}>
              <h2>Big-time performance that works in small spaces</h2>
              <p>All-in one features</p>
            </div>
            <div className={styles["content"]}>
              {/* {images.map((img) => ( */}
              <ResponsiveImg img={"all-in-one.jpg"} key={"all-in-one.jpg"} />
              <div className={styles["border-wrapper"]}>
                <h3>Installation that comes without a wrinkle</h3>
                <ResponsiveImg
                  img={"installation.jpg"}
                  key={"installation.jpg"}
                />
              </div>
              <ResponsiveImg img={"dimensions.jpg"} key={"dimensions.jpg"} />
              {/* ))} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
