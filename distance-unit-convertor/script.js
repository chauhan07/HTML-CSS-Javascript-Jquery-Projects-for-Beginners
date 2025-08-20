const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');

const factors = {
    km: 1000,
    m: 1,
    cm: 0.01,
    mi: 1609.34,
    ft: 0.3048,
    in: 0.0254
};

function convert() {
    const v = parseFloat(fromValue.value);
    if (isNaN(v)) { toValue.value = ''; return; }
    const meters = v * factors[fromUnit.value];
    const result = meters / factors[toUnit.value];
    toValue.value = Math.round(result * 1000) / 1000;
}

fromValue.addEventListener('input', convert);
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);