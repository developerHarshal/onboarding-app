import React, { useState, type ReactNode } from "react";
import {
    Box,
    Button,
    Stepper as MuiStepper,
    Step,
    StepLabel,
    Paper,
} from "@mui/material";

export type Step = {
    label: string,
    element: ReactNode,
    stepId: number,
}

export const Stepper: React.FC<{ steps: Step[] }> = ({ steps }) => {
    const [activeStep, setActiveStep] = useState(steps[0].stepId);

    const handleNext = () => {
        if (activeStep + 1 !== steps.length)
            setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const renderStepContent = (step) => {
        const _activeStep = steps.find(_step => _step.stepId === step);
        return _activeStep.element;
    };

    return (
        <Paper sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
            <MuiStepper activeStep={activeStep} alternativeLabel>
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </MuiStepper>

            <Box sx={{ mt: 5, minHeight: 150 }}>
                {renderStepContent(activeStep)}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 4,
                    }}
                >
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>

                    <Button variant="contained" onClick={handleNext}>
                        {activeStep === steps.length - 1
                            ? "Finish"
                            : "Next"}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default Stepper;