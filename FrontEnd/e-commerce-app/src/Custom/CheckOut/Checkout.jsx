import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function Checkout(props) {
  const steps = ["Shipping Details", "Confirm Order", "Payment"];
  return (
    <div className="my-2 mb-5">
      <Stepper activeStep={props.step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default Checkout;
