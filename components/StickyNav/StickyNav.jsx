import useScreenWidth from "../../hooks/useScreenWidth";
import useOnClickOutside from "../../hooks/useOutsideClick";
import styles from "./StickyNav.module.scss";
import { useEffect, useLayoutEffect, useState, useRef } from "react";

export default function StickyNav({ showNav, setDisableLenis }) {
  const [isOpen, setIsOpen] = useState(false);
  const screenWidth = useScreenWidth();
  const ref = useRef();

  useOnClickOutside(ref, () => setIsOpen(false));

  useLayoutEffect(() => {
    document.body.style.overflowY = "auto";
  }, []);

  useEffect(() => {
    if (screenWidth >= 575) setIsOpen(false);
  }, [screenWidth]);

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav
      className={styles["container"]}
      data-menu-open={isOpen}
      data-show={showNav}
      ref={ref}
    >
      <div className={styles["inner"]}>
        <div className={styles["header"]}>
          <h2>WashCombo™ All-In-One</h2>
        </div>
        <div className={styles["links"]}>
          <div className={styles["links-container"]}>
            <a
              href="#"
              data-ms-event="lgEvent"
              data-ms-action="Nav click"
              data-ms-label="Overview"
            >
              Overview
            </a>
            {/* <a
              href="#"
              data-ms-event="lgEvent"
              data-ms-action=""
              data-ms-label="Pedestals"
            >
              Pedestals
            </a> */}
          </div>
          <div className={`cta ${styles["cta"]}`}>
            <div
              className={styles["drop-arrow"]}
              role="button"
              onClick={() => {
                setIsOpen(!isOpen);
                setDisableLenis(!isOpen);
              }}
            >
              <img
                src="/us/washcombo-all-in-one/images/svg/nav-drop-arrow-open.svg"
                alt=""
              />
            </div>
            <a
              className="newbtn"
              href="https://www.lg.com/us/washers-dryers/lg-wm6998hba"
              data-ms-event="lgEvent"
              data-ms-action="Nav click"
              data-ms-label="Shop Now"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
      <div className={styles["drop-down"]}>
        <div className={styles["drop-down--inner"]}>
          <div className={styles["link"]}>
            <a
              href="#"
              className={styles["active"]}
              data-ms-event="lgEvent"
              data-ms-action="Nav click"
              data-ms-label="Overview"
              onClick={() => setIsOpen(false)}
            >
              Overview
            </a>
          </div>
          {/* <div className={styles["link"]}>
            <a
              href="#"
              data-ms-event="lgEvent"
              data-ms-action=""
              data-ms-label="Pedestals"
            >
              Pedestals
            </a>
          </div> */}
        </div>
      </div>
      <div className={styles.overlay} />
    </nav>
  );
}
