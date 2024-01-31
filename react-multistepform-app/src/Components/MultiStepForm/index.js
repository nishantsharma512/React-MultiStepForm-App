import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { InputLabel } from '@mui/material';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const steps = ['Personal Details', 'Professional Details', 'Docs Upload'];

const MultiStepForm = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());


    const [localState, setLocalState] = React.useReducer(
        (oldState, newState) => ({ ...oldState, ...newState }), {
        firstName: "",
        lastName: "",
        phone: "",
        qualification: "",
        projectDone: "",
        skills: "",
        profileImage: [],
        uploadDocs: []
    }
    )

    const { firstName, lastName, phone, qualification, projectDone, skills, profileImage, uploadDocs } = localState;

    const isStepOptional = (step) => {
        return step === 1||step===2;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if(!firstName||!lastName||!phone)
        {
            alert("All fields are required")
            return;
        }
        else if(phone.length!==10)
        {
            alert("Not a valid phone no.");
            return;
        }
        else 
        {
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }
    
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);

        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
        setLocalState({
            firstName: "",
            lastName: "",
            phone: "",
            qualification: "",
            projectDone: "",
            skills: "",
            profileImage: "",
            uploadDocs: ""
        })
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalState({ [name]: value });
    }

    const handleImageUpload = (e) => {

        const { name, files } = e.target;
        const formData = new FormData();
        if (name === "profileImage") {
            let images = [];
            images.push(files[0].name)
            formData.append("file", files[0])
            setLocalState({ profileImage: images })
        }
        else if (name === "uploadDocs") {
            let images = [];
            images = [...uploadDocs]
            Object.keys(files).map((i) => {
                return images.push(files[i].name)
            })
            formData.append("files", files)
            setLocalState({ uploadDocs: images })
        }
    }
    

    const handleSubmit = () => {
        console.log(localState)
    }

    return (

        <Paper sx={{ width: '50%', margin: "auto", padding:4,mt:4 }} elevation={4}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <>
                        {
                            activeStep === 0 ?
                                <Box component={'paper'}>
                                    <Typography sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                                        Personal Information
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, alignItems: 'center' }}>
                                        <Grid container>
                                            <Grid item xs={6} display={'flex'} alignItems={"center"}>
                                                <InputLabel minWidth={"100px"} required>First Name</InputLabel>
                                                <TextField  name='firstName' value={firstName} sx={{ ml: 2 }} onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={6} display={'flex'} alignItems={"center"}>
                                                <InputLabel minWidth={"100px"} required>Last Name</InputLabel>
                                                <TextField name='lastName' value={lastName} sx={{ ml: 2 }} onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={6} display={'flex'} alignItems={"center"} mt={2}>
                                                <InputLabel minWidth={"100px"} required>Phone No.</InputLabel>
                                                <TextField name='phone' value={phone} sx={{ ml: 2 }} type='number' onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box> :
                                activeStep === 1 ?
                                    <Box component={'paper'}>
                                        <Typography sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                                            Professional Information
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, alignItems: 'center' }}>
                                            <Grid container>
                                                <Grid item xs={6} display={'flex'} alignItems={"center"}>
                                                    <Typography minWidth={"100px"}>Qualification</Typography>
                                                    <TextField name='qualification' value={qualification} sx={{ ml: 2 }} onChange={handleChange} />
                                                </Grid>
                                                <Grid item xs={6} display={'flex'} alignItems={"center"}>
                                                    <Typography minWidth={"100px"}>Projects Done</Typography>
                                                    <TextField name='projectDone' value={projectDone} sx={{ ml: 2 }} onChange={handleChange} />
                                                </Grid>
                                                <Grid item xs={6} display={'flex'} alignItems={"center"} mt={2}>
                                                    <Typography minWidth={"100px"}>Skills</Typography>
                                                    <TextField name='skills' value={skills} sx={{ ml: 2 }} onChange={handleChange} />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box> :
                                    activeStep === 2 &&
                                    <Box component={'paper'}>
                                        <Typography sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                                            Multimedia Docs Upload
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, alignItems: 'center' }}>
                                            <Grid container>
                                                <Grid item xs={6} display={'flex'} alignItems={"center"}>
                                                    <Typography minWidth={"100px"}>Profile Image</Typography>
                                                    <Button component="label" sx={{ ml: 2 }} variant="contained" startIcon={<CloudUploadIcon />}>
                                                        Upload Profile Image
                                                        <VisuallyHiddenInput type="file" name='profileImage' onChange={handleImageUpload} />
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} display={'flex'} alignItems={"center"}>
                                                    <Typography minWidth={"100px"}>{profileImage}</Typography>
                                                </Grid>
                                                <Grid item xs={6} display={'flex'} alignItems={"center"} mt={4}>
                                                    <Typography minWidth={"100px"}>Upload Docs</Typography>
                                                    <Button component="label" sx={{ ml: 2 }} variant="contained" startIcon={<CloudUploadIcon />}>
                                                        Upload Docs
                                                        <VisuallyHiddenInput multiple type="file" name='uploadDocs' onChange={handleImageUpload} />
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} display={'flex'} alignItems={"center"} mt={4}>
                                                    <Typography minWidth={"100px"}>{uploadDocs}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                        }
                    </>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Paper>
    );
};

export default MultiStepForm;