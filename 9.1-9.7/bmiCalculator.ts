const calculateBmi = (height: number, mass: number): string => {
    const bmi = mass / ((height / 100) ** 2);

    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Normal range";
    } else if (bmi >= 25 && bmi < 29.9) {
        return "Overweight";
    } else {
        return "Obesity";
    }
};


if (require.main === module) {
    const height: number = Number(process.argv[2]);
    const mass: number = Number(process.argv[3]);

    if (!height || !mass || isNaN(height) || isNaN(mass)) {
        console.log('Error: Please provide valid height and mass');
    } else {
        console.log(calculateBmi(height, mass));
    }
}

export { calculateBmi };