"use client";

import { Step, type StepItem, Stepper, useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";

const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
] satisfies StepItem[];

const stepRender: { [key: string]: JSX.Element } = {
  "0": <UserForm />,
  "1": <UserConfirm />,
  "2": <UserProcessing />,
};
export default function StepperExample() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper
        initialStep={0}
        steps={steps}
        onClickStep={(step, setStep) => {
          alert(`Step ${step + 1} clicked`);
          setStep(step);
        }}
      >
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="h-fit flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
                <h1 className="text-xl">Step {index + 1}</h1>
                <div className="flex flex-col">
                  <div className="border bg-white rounded m-3">
                    {stepRender[index.toString()]}
                  </div>
                </div>
              </div>
            </Step>
          );
        })}
        <Footer />
      </Stepper>
    </div>
  );
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

function UserForm() {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

function UserConfirm() {
  return (
    <div>
      <p>Name: John Doe</p>
      <p>Email:</p>
      <button>Confirm</button>
    </div>
  );
}

function UserProcessing() {
  return <div>Processing...</div>;
}
