import styles from "./List.module.scss";
import Icon from "../../Icon/Icon";
import { useState, useRef, useEffect } from "react";

export default function List() {
  const [open, setOpen] = useState(0);
  const [height, setHeight] = useState(0);
  const textRefs = useRef([]);
  const contents = [
    {
      title: "Advanced washing and drying",
      text: "Built-in fabric sensors powered with AI select optimal wash motions and settings, so you’re never left guessing.",
    },
    {
      title: " Inverter HeatPump™",
      text: "The WashCombo™ uses an Inverter HeatPump™ to save energy by working on a closed loop system to reuse circulated air once moisture is removed. Because heat pump dryers effectively recycle the air they create, there is no need for traditional ventilation making for easy installation.",
      // link: "#",
      // HEAT PUMP LINK GOES HERE! Please uncomment once the link is updated
    },
  ];

  useEffect(() => {
    setHeight(textRefs.current[open]?.getBoundingClientRect().height);
  }, [open]);

  return (
    <div className={styles["accordion-wrapper"]}>
      <div className={styles["accordion"]}>
        {contents.map((content, i) => (
          <div
            className={styles["accordion-item"]}
            key={i}
            onClick={() => setOpen(i)}
          >
            <div
              className={styles["accordion-item--title"]}
              data-expanded={open === i}
            >
              <h4>{content.title}</h4>
              <Icon name="DownChev" />
            </div>
            <div
              className={styles["accordion-item--text"]}
              style={{
                height: open === i ? height : 0,
              }}
            >
              <div
                className={styles["accordion-item--text-inner"]}
                ref={(el) => (textRefs.current[i] = el)}
              >
                <p>{content.text}</p>
                {content.link ? (
                  <a
                    href={content.link}
                    data-ms-event="lgEvent"
                    data-ms-action={`click - ${content.title}`}
                    data-ms-label="Learn More"
                  >
                    Learn More
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
