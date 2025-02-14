import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function CheckboxInput({ label, setState }) {
  return (
    <FormGroup>
      <FormControlLabel
        style={{
          // outline: "2px solid blue",
          // alignItems: "start",
        }}
        control={
          <Checkbox
            id="email-communications"
            style={{
              color: "rgba(27, 26, 30, 0.6)",
            }}
            checkedIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
              >
                <path
                  fill="#A50034"
                  d="M19.5 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16h-14V5h14v14ZM18.49 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99 8-8Z"
                />
              </svg>
            }
            onChange={() => setState((prev) => !prev)}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}
