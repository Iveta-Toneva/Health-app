import * as React from 'react';
import {
    TextField,
    Button,
    CardHeader,
    Card,
    Radio,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Typography,
    Box,
    Divider,
    Alert
} from '@mui/material';

export default function FormPropsTextFields() {

    const [values, setValues] = React.useState({
        gender: 'female',
        age: '',
        height: '',
        weight: '',
        activity: 'BMR'
    });

    const [error, setError] = React.useState(false);

    const [bmr, setBmr] = React.useState(0);
    const [calories, setCalories] = React.useState(0);

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const calculate = () => {

        const { gender, age, height, weight, activity } = values;

        if (!gender || !age || !height || !weight || !activity) {
            setError(true);
            return;
        }

        const ageValue = Number(age);
        const heightValue = Number(height);
        const weightValue = Number(weight);

        let bmrValue = 0;
        let caloriesValue = 0;

        if (gender === 'male') {
            bmrValue = 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5;
        } else if (gender === 'female') {
            bmrValue = 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;
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
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 4,
                padding: 4,
                backgroundColor: '#f9f9f9',
                minHeight: '100vh',
            }}
        >

            <Card
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 3,
                    width: { xs: '100%', md: '50%' },
                }}
            >
                <CardHeader title="Calorie Calculator" />
                <TextField label="Age" variant="outlined" name="age" onChange={onChangeHandler} />
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
                <TextField label="Height (cm)" variant="outlined" name="height" onChange={onChangeHandler} />
                <TextField label="Weight (kg)" variant="outlined" name="weight" onChange={onChangeHandler} />
                <FormLabel id="activity-label">Activity Level</FormLabel>
                <RadioGroup
                    aria-labelledby="activity-label"
                    defaultValue="BMR"
                    name="activity"
                    onChange={onChangeHandler}
                >
                    <FormControlLabel value="BMR" control={<Radio />} label="BMR (resting calories)" />
                    <FormControlLabel value="Sedentary" control={<Radio />} label="Sedentary: Little/no exercise" />
                    <FormControlLabel value="Lightly active" control={<Radio />} label="Lightly active: 1-3 days/week" />
                    <FormControlLabel value="Moderately active" control={<Radio />} label="Moderate: 3-5 days/week" />
                    <FormControlLabel value="Very active" control={<Radio />} label="Very active: 6-7 days/week" />
                    <FormControlLabel value="Extra active" control={<Radio />} label="Extra active: Physical job + exercise" />
                </RadioGroup>
                {error && (
                    <Alert
                        severity="warning"
                        sx={{
                            fontSize: '1rem',
                            padding: 2,
                            borderRadius: 1,
                        }}
                    >
                        <strong>Warning:</strong> Please fill out all fields before calculating.
                    </Alert>
                )}

                <Button variant="contained" onClick={calculate}>
                    Calculate
                </Button>

            </Card>


            <Card
                sx={{
                    padding: 3,
                    width: { xs: '100%', md: '30%' },
                    backgroundColor: '#e3f2fd',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Results
                </Typography>
                <Divider sx={{ width: '100%', mb: 2 }} />

                <Typography variant="h6">
                    🛌 <strong>BMR:</strong> {bmr ? `${bmr.toFixed(2)} kcal/day` : '--'}
                </Typography>
                {bmr > 0 && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, textAlign: 'center' }}>
                        BMR (Basal Metabolic Rate) is the calories your body burns at rest to keep you alive.
                    </Typography>
                )}

                <Typography variant="h6">
                    🔥 <strong>Calories Needed:</strong> {calories ? `${calories.toFixed(2)} kcal/day` : '--'}
                </Typography>
                {calories > 0 && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
                        Based on your activity level, this is your estimated daily calorie need to maintain your weight.
                    </Typography>
                )}


                {bmr > 0 && (
                    <>
                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Typography variant="h6">🎯 Goal Recommendations</Typography>
                        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                            🔽 Weight loss: {Math.round(calories - 500)} kcal/day
                            <br />
                            🔼 Weight gain: {Math.round(calories + 500)} kcal/day
                        </Typography>
                        <Typography variant="caption" sx={{ mt: 1, textAlign: 'center', color: 'text.secondary' }}>
                            (500 kcal deficit/surplus = ~0.5 kg/week)
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                mt: 2,
                                textAlign: 'center',
                                color: 'error.main',
                                fontWeight: 'bold'
                            }}
                        >
                            ⚠️ Important: Do not consume fewer than 1,200 kcal/day (women) or 1,500 kcal/day (men) without medical supervision.
                        </Typography>
                    </>
                )}
            </Card>

        </Box>

    );
}
