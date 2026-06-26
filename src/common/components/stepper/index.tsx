import React, { type ReactNode } from "react";
import {
    Box,
    Button,
    Stepper as MuiStepper,
    Step,
    StepLabel,
    Paper,
} from "@mui/material";

export type Step = {
    label: string;
    element: ReactNode;
    submitFormId?: string;
};

type StepperProps = {
    steps: Step[];
    activeStep: number;
    onNext: () => void;
    onBack: () => void;
};

export const Stepper: React.FC<StepperProps> = ({
    steps,
    activeStep,
    onNext,
    onBack,
}) => {
    const currentStep = steps[activeStep];
    const submitFormId = currentStep?.submitFormId;
    const isLastStep = activeStep === steps.length - 1;

    return (
        <Paper sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
            <MuiStepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </MuiStepper>

            <Box sx={{ mt: 2, minHeight: 430, display: 'flex', flexDirection: 'column' }}>
                {currentStep?.element ?? <div>No step content found</div>}

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 'auto' }}>
                    <Button disabled={activeStep === 0} onClick={onBack}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        type={submitFormId ? "submit" : "button"}
                        form={submitFormId}
                        onClick={submitFormId ? undefined : onNext}
                    >
                        {isLastStep ? "Finish" : "Next"}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default Stepper;
