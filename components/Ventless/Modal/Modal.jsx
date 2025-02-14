import styles from "./Modal.module.scss";
import { useState, useRef, useEffect } from "react";
import CheckboxInput from "./CheckboxInput/CheckboxInput";
import useOnClickOutside from "../../../hooks/useOutsideClick";
import Icon from "../../Icon/Icon";

export default function Modal({ modalOpen, setModalOpen, action }) {
  const [submit, setSubmit] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [email, setEmail] = useState("");
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [emailCommAgree, setEmailCommAgree] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      setSubmit(false);
      setSuccessMsg(false);
    }, 300);
  }, [modalOpen]);

  useOnClickOutside(ref, () => setModalOpen(false));

  function handleSubmit(e) {
    e.preventDefault();

    if (privacyAgree && termsAgree) {
      setSubmit(true);

      const formData = new FormData();
      formData.append("email_addr", email);
      formData.append("cmpid", "/us/washcombo-all-in-one");
      formData.append("opt_in", emailCommAgree ? "Y" : "N");

      fetch("https://www.lg.com/us/mylg/api/handraiser", {
        method: "POST",
        body: formData,
      }).catch(() => null);
    } else {
      alert("Please check the required field.");
    }
  }

  return (
    <div className={styles["wrapper"]} data-open={modalOpen}>
      <div className={styles["container"]} ref={ref}>
        <div className={styles["container--inner"]}>
          <div
            className={styles["form"]}
            onAnimationEnd={(e) => {
              if (e.target?.getAttribute("data-form")) setSuccessMsg(true);
            }}
            data-form
            data-hidden={submit}
          >
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={styles["email"]}>
                <label htmlFor="email" className={styles["email-label"]}>
                  Email
                </label>
                <input
                  className={styles["email-input"]}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <a
                href="#"
                onClick={(e) => handleSubmit(e)}
                className={styles["submit"]}
                data-ms-event="lgEvent"
                data-ms-action={`submit - ${action}`}
                data-ms-label="Submit"
              >
                <span>Submit</span>
              </a>
            </form>
            <div className={styles["checkboxes"]}>
              <CheckboxInput
                label="Sign me up to receive email communications (e.g. product tips & tricks, special offers, new product announcements and more) from LG."
                setState={setEmailCommAgree}
              />
              <CheckboxInput
                setState={setPrivacyAgree}
                label={
                  <span>
                    I agree with the{" "}
                    <a
                      href="https://privacy.us.lg.com/policies"
                      target="_blank"
                      rel="noreferrer"
                      data-ms-event="lgEvent"
                      data-ms-action="click"
                      data-ms-label="Privacy Policy"
                    >
                      Privacy Policy
                    </a>
                    *
                  </span>
                }
              />
              <CheckboxInput
                setState={setTermsAgree}
                label={
                  <span>
                    I agree with the{" "}
                    <a
                      href="https://www.lg.com/us/legal"
                      target="_blank"
                      rel="noreferrer"
                      data-ms-event="lgEvent"
                      data-ms-action="click"
                      data-ms-label="Terms & Conditions"
                    >
                      Terms & Conditions
                    </a>
                    *
                  </span>
                }
              />
              <p className={styles["disclaimer"]}>* Required fields.</p>
            </div>
          </div>
          {successMsg ? (
            <div className={styles["submit-success"]}>
              <Icon name="PaperPlane" />
              <h4>Your email has been submitted!</h4>
              <p>
                Look out for more information on more ventless laundry
                solutions.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
