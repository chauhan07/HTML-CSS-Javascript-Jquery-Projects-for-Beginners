function calculateAge() {
    const dob = document.getElementById('dob').value;
    if (!dob) {
        alert("Please select your Date of Birth!");
        return;
    }
    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months -= 1;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    const ageBox = document.getElementById('ageResult');
    const genBox = document.getElementById('generation');

    ageBox.style.display = "block";
    genBox.style.display = "block";

    ageBox.textContent = `🎂 You are ${years} years, ${months} months, ${days} days old`;
    genBox.textContent = `🌍 Generation: ${getGeneration(birthDate)}`;
}

function getGeneration(date) {
    const year = date.getFullYear();
    if (year >= 2010) return "Gen Alpha";
    if (year >= 1997) return "Gen Z";
    if (year >= 1981) return "Millennial";
    if (year >= 1965) return "Gen X";
    if (year >= 1946) return "Baby Boomer";
    return "Silent Generation";
}

function resetCalc() {
    document.getElementById('dob').value = "";
    document.getElementById('ageResult').style.display = "none";
    document.getElementById('generation').style.display = "none";
}