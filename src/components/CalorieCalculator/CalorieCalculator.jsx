import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, CardHeader, Card, Radio, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';


export default function FormPropsTextFields() {
    return (
        <Card component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2,  margin: 2 ,padding:2,width: { xs: '90%', sm: '70%', md: '50%' }}}>
            <CardHeader title="Calorie Calculator" />
            <TextField label="Age" variant="outlined" />
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
                aria-labelledby="gender-label"
                defaultValue="female"
                name="gender"
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <TextField label="Height" variant="outlined" />
            <TextField label="Weight" variant="outlined" />
            <FormLabel id="activity-label">Activity</FormLabel>
            <RadioGroup
                aria-labelledby="activity-label"
                defaultValue="BMR"
                name="activity"
            >
                <FormControlLabel value="BMR" control={<Radio />} label="BMR , which represents the calories your body burns at rest." />
                <FormControlLabel value="Sedentary" control={<Radio />} label="Sedentary: Little to no exercise." />
                <FormControlLabel value="Lightly active" control={<Radio />} label="Lightly active: Light exercise/sports 1-3 days/week." />
                <FormControlLabel value="Moderately active" control={<Radio />} label="Moderately active: Moderate exercise/sports 3-5 days/week." />
                <FormControlLabel value="Very active" control={<Radio />} label="Very active: Hard exercise/sports 6-7 days a week." />
                <FormControlLabel value="Extra active" control={<Radio />} label="Extra active: Very hard exercise/sports & a physical job." />
                <FormControlLabel value="Professional athlete" control={<Radio />} label="Professional athlete." />
            </RadioGroup>
            <Button variant="contained">Calculate</Button>
        </Card>
    );
}