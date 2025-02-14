import styles from "./Features.module.scss";

export default function Features() {
  const features = [
    {
      title: "LCD Digital Dial Control",
      copy: "Our intuitive control with LCD display shows helpful information with each turn.",
    },
    {
      title: "ezLintFilter",
      copy: "The hands-free design allows you to easily remove lint after every load.",
    },
    {
      title: "ezDispense®",
      copy: "Automatically dispenses the right amount of detergent and fabric softener.",
    },
  ];

  return (
    <div className={styles["features"]}>
      <div className={styles["features--inner"]}>
        {features.map((item, index) => (
          <div className={styles["features--item"]} key={index}>
            <div className={styles["features--image"]}>
              <img
                src={`/us/washcombo-all-in-one/images/overview-feature-${index}.png`}
                alt=""
              />
            </div>
            <div className={styles["features--image"]}>
              <h4>{item.title}</h4>
              <p>{item.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
