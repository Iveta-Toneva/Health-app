import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, CardHeader, Card, Radio, FormLabel, RadioGroup, FormControlLabel,Typography } from '@mui/material';


export default function FormPropsTextFields() {


    const [values, setValues] = React.useState({
        gender: '',
        age: '',
        height: '',
        weight: '',
        activity: ''

    });

    const [bmr, setBmr] = React.useState(0);
    const [calories, setCalories] = React.useState(0);

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const calculate = () => {
        const { gender, age, height, weight, activity } = values;

        const ageValue = Number(age);
        const heightaValue = Number(height);
        const weightValue = Number(weight);

        let bmrValue = 0;
        let caloriesValue = 0;
        if (gender === 'male') {
            bmrValue = 10 * weightValue + 6.25 * heightaValue - 5 * ageValue + 5;
        } else if (gender === 'female') {
            bmrValue = 10 * weightValue + 6.25 * heightaValue - 5 * ageValue - 161;
        }
        switch (activity) {
            case 'BMR':
                caloriesValue = bmrValue;
                break;
            case 'Sedentary':
                caloriesValue = bmrValue * 1.2;
                break;
            case 'Lightly active':
                caloriesValue = bmrValue * 1.375;
                break;
            case 'Moderately active':
                caloriesValue = bmrValue * 1.55;
                break;
            case 'Very active':
                caloriesValue = bmrValue * 1.725;
                break;
            case 'Extra active':
                caloriesValue = bmrValue * 1.9;
                break;
            default:
                break;
        }

        setBmr(bmrValue);
        setCalories(caloriesValue);
        console.log(calories)
    }

    return (
        <Card component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: 2, padding: 2, width: { xs: '90%', sm: '70%', md: '50%' } }}>
            <CardHeader title="Calorie Calculator" />
            <TextField label="Age" variant="outlined" name='age' onChange={onChangeHandler} />
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
                aria-labelledby="gender-label"
                defaultValue="female"
                name="gender"
                onChange={onChangeHandler}
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <TextField label="Height" variant="outlined" name='height' onChange={onChangeHandler} />
            <TextField label="Weight" variant="outlined" name='weight' onChange={onChangeHandler} />
            <FormLabel id="activity-label">Activity</FormLabel>
            <RadioGroup
                aria-labelledby="activity-label"
                defaultValue="BMR"
                name="activity"
                onChange={onChangeHandler}
            >
                <FormControlLabel value="BMR" control={<Radio />} label="BMR , which represents the calories your body burns at rest." />
                <FormControlLabel value="Sedentary" control={<Radio />} label="Sedentary: Little to no exercise." />
                <FormControlLabel value="Lightly active" control={<Radio />} label="Lightly active: Light exercise/sports 1-3 days/week." />
                <FormControlLabel value="Moderately active" control={<Radio />} label="Moderately active: Moderate exercise/sports 3-5 days/week." />
                <FormControlLabel value="Very active" control={<Radio />} label="Very active: Hard exercise/sports 6-7 days a week." />
                <FormControlLabel value="Extra active" control={<Radio />} label="Extra active: Very hard exercise/sports & a physical job." />
            </RadioGroup>
            <Button variant="contained" onClick={calculate}>Calculate</Button>
            <div style={{ padding: '1rem' }}>
                <Typography variant="h6"><strong>BMR:</strong> {bmr.toFixed(2)} kcal/day</Typography>
                <Typography variant="h6"><strong>Calories:</strong> {calories.toFixed(2)} kcal/day</Typography>
            </div>
        </Card>

    );
}