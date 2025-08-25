let heightUnit = 'cm';
let weightUnit = 'kg';

document.getElementById('cmBtn').onclick = () => setHeightUnit('cm');
document.getElementById('inchBtn').onclick = () => setHeightUnit('in');
document.getElementById('kgBtn').onclick = () => setWeightUnit('kg');
document.getElementById('lbBtn').onclick = () => setWeightUnit('lb');

function setHeightUnit(unit) {
    heightUnit = unit;
    document.getElementById('cmBtn').classList.remove('active');
    document.getElementById('inchBtn').classList.remove('active');
    if (unit === 'cm') document.getElementById('cmBtn').classList.add('active');
    else document.getElementById('inchBtn').classList.add('active');
}

function setWeightUnit(unit) {
    weightUnit = unit;
    document.getElementById('kgBtn').classList.remove('active');
    document.getElementById('lbBtn').classList.remove('active');
    if (unit === 'kg') document.getElementById('kgBtn').classList.add('active');
    else document.getElementById('lbBtn').classList.add('active');
}

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    let bmi;

    if (!height || !weight) {
        document.getElementById('result').innerText = "Please enter valid values.";
        return;
    }

    if (heightUnit === 'cm' && weightUnit === 'kg') {
        bmi = weight / ((height / 100) ** 2);
    } else if (heightUnit === 'in' && weightUnit === 'lb') {
        bmi = 703 * (weight / (height ** 2));
    } else if (heightUnit === 'cm' && weightUnit === 'lb') {
        const kg = weight * 0.453592;
        bmi = kg / ((height / 100) ** 2);
    } else if (heightUnit === 'in' && weightUnit === 'kg') {
        const m = height * 0.0254;
        bmi = weight / (m ** 2);
    }

    let category;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Healthy';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    document.getElementById('result').innerText = `Your BMI: ${bmi.toFixed(1)} (${category})`;
}