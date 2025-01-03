import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box,
} from '@chakra-ui/react'

const steps = [
    { title: 'Step 1', description: 'Group Info' },
    { title: 'Step 2', description: 'Attendee Info' },
    { title: 'Step 3', description: 'Confirm' },
  ]

export function RegistrationStepper() {
    const { activeStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    return (
        <Stepper index={activeStep} orientation="vertical" maxHeight="50vh">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink='0'>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
    )
}
