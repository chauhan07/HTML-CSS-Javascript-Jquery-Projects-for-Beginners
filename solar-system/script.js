// Solar System Simulation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Generate random stars
    generateStars();
    
    // Add planet hover effects
    addPlanetInteractions();
    
    // Add control features
    addControlFeatures();
    
    // Populate planetary data table
    populatePlanetaryData();
    
    // Add visual enhancements
    setTimeout(addVisualEnhancements, 2000);
});

// Planetary data
const planetaryData = {
    'Sun': {
        rotation: 609.12,
        revolution: 0,
        radius: 696340,
        diameter: 1392680,
        minTemp: 5500,
        maxTemp: 5500,
        distanceFromSun: 0,
        distanceFromEarth: 1
    },
    'Mercury': {
        rotation: 1407.6,
        revolution: 88,
        radius: 2439.7,
        diameter: 4879.4,
        minTemp: -173,
        maxTemp: 427,
        distanceFromSun: 0.39,
        distanceFromEarth: 0.61
    },
    'Venus': {
        rotation: 5832.5,
        revolution: 225,
        radius: 6051.8,
        diameter: 12103.6,
        minTemp: 462,
        maxTemp: 462,
        distanceFromSun: 0.72,
        distanceFromEarth: 0.28
    },
    'Earth': {
        rotation: 24,
        revolution: 365.25,
        radius: 6371,
        diameter: 12742,
        minTemp: -89,
        maxTemp: 58,
        distanceFromSun: 1,
        distanceFromEarth: 0
    },
    'Moon': {
        rotation: 655.7,
        revolution: 27.3,
        radius: 1737.4,
        diameter: 3474.8,
        minTemp: -173,
        maxTemp: 127,
        distanceFromSun: 1,
        distanceFromEarth: 0.00257
    },
    'Mars': {
        rotation: 24.6,
        revolution: 687,
        radius: 3389.5,
        diameter: 6779,
        minTemp: -87,
        maxTemp: -5,
        distanceFromSun: 1.52,
        distanceFromEarth: 0.52
    },
    'Jupiter': {
        rotation: 9.9,
        revolution: 4333,
        radius: 69911,
        diameter: 139822,
        minTemp: -108,
        maxTemp: -108,
        distanceFromSun: 5.2,
        distanceFromEarth: 4.2
    },
    'Saturn': {
        rotation: 10.7,
        revolution: 10759,
        radius: 58232,
        diameter: 116464,
        minTemp: -139,
        maxTemp: -139,
        distanceFromSun: 9.5,
        distanceFromEarth: 8.5
    },
    'Uranus': {
        rotation: 17.2,
        revolution: 30687,
        radius: 25362,
        diameter: 50724,
        minTemp: -197,
        maxTemp: -197,
        distanceFromSun: 19.2,
        distanceFromEarth: 18.2
    },
    'Neptune': {
        rotation: 16.1,
        revolution: 60190,
        radius: 24622,
        diameter: 49244,
        minTemp: -201,
        maxTemp: -201,
        distanceFromSun: 30.1,
        distanceFromEarth: 29.1
    }
};

function generateStars() {
    const universe = document.querySelector('.universe');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size
        const sizes = ['small', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        star.classList.add(randomSize);
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation delay for twinkling effect
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Random animation duration for variety
        star.style.animationDuration = (2 + Math.random() * 3) + 's';
        
        universe.appendChild(star);
    }
}

function addPlanetInteractions() {
    const planets = document.querySelectorAll('.planet');
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
    const planetNames = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
    
    // Add interactions for planets
    planets.forEach((planet, index) => {
        planet.setAttribute('data-planet', planetNames[index]);
        
        planet.addEventListener('mouseenter', function() {
            showPlanetInfo(this);
        });
        
        planet.addEventListener('mouseleave', function() {
            hidePlanetInfo();
        });
        
        planet.addEventListener('click', function() {
            showPlanetInfo(this);
            setTimeout(hidePlanetInfo, 3000);
        });
    });
    
    // Add interactions for sun
    if (sun) {
        sun.setAttribute('data-planet', 'Sun');
        sun.addEventListener('mouseenter', function() {
            showPlanetInfo(this);
        });
        sun.addEventListener('mouseleave', function() {
            hidePlanetInfo();
        });
        sun.addEventListener('click', function() {
            showPlanetInfo(this);
            setTimeout(hidePlanetInfo, 3000);
        });
    }
    
    // Add interactions for moon
    if (moon) {
        moon.setAttribute('data-planet', 'Moon');
        moon.addEventListener('mouseenter', function() {
            showPlanetInfo(this);
        });
        moon.addEventListener('mouseleave', function() {
            hidePlanetInfo();
        });
        moon.addEventListener('click', function() {
            showPlanetInfo(this);
            setTimeout(hidePlanetInfo, 3000);
        });
    }
}

function showPlanetInfo(planet) {
    const planetName = planet.getAttribute('data-planet');
    const existingTooltip = document.querySelector('.planet-tooltip');
    
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'planet-tooltip';
    tooltip.textContent = planetName;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip near the planet
    const rect = planet.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
}

function hidePlanetInfo() {
    const tooltip = document.querySelector('.planet-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function addControlFeatures() {
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    
    if (speedSlider && speedValue) {
        speedSlider.addEventListener('input', function() {
            const speed = parseFloat(this.value);
            speedValue.textContent = speed + 'x';
            
            // Apply speed to all orbiting elements
            const orbits = document.querySelectorAll('.orbit');
            orbits.forEach(orbit => {
                orbit.style.animationDuration = getOriginalDuration(orbit) / speed + 's';
            });
            
            // Apply speed to moon orbit
            const moonOrbit = document.querySelector('.moon-orbit');
            if (moonOrbit) {
                moonOrbit.style.animationDuration = (2.7 / speed) + 's';
            }
            
            // Apply speed to sun glow
            const sun = document.querySelector('.sun');
            if (sun) {
                sun.style.animationDuration = (4 / speed) + 's';
            }
        });
    }
}

function getOriginalDuration(orbit) {
    // Return original animation duration based on orbit class
    if (orbit.classList.contains('mercury-orbit')) return 8.8;
    if (orbit.classList.contains('venus-orbit')) return 22.5;
    if (orbit.classList.contains('earth-orbit')) return 36.5;
    if (orbit.classList.contains('mars-orbit')) return 68.7;
    if (orbit.classList.contains('jupiter-orbit')) return 433.3;
    if (orbit.classList.contains('saturn-orbit')) return 1075.9;
    if (orbit.classList.contains('uranus-orbit')) return 3068.7;
    if (orbit.classList.contains('neptune-orbit')) return 6019;
    return 36.5; // default
}

function populatePlanetaryData() {
    const tableBody = document.querySelector('#planetaryData tbody');
    if (!tableBody) return;
    
    const bodies = ['Sun', 'Mercury', 'Venus', 'Earth', 'Moon', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
    
    bodies.forEach(body => {
        const data = planetaryData[body];
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>${body}</strong></td>
            <td>${data.rotation.toLocaleString()}</td>
            <td>${data.revolution === 0 ? 'N/A' : data.revolution.toLocaleString()}</td>
            <td>${data.radius.toLocaleString()}</td>
            <td>${data.diameter.toLocaleString()}</td>
            <td>${data.minTemp}</td>
            <td>${data.maxTemp}</td>
            <td>${data.distanceFromSun}</td>
            <td>${data.distanceFromEarth}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Add some visual enhancements
function addVisualEnhancements() {
    // Add shooting stars occasionally
    setInterval(createShootingStar, 10000);
}

function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        top: ${Math.random() * 50}%;
        left: -10px;
        box-shadow: 0 0 10px white;
        animation: shootingStar 3s linear;
        z-index: 5;
    `;
    
    // Add shooting star animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shootingStar {
            0% {
                transform: translateX(0) translateY(0);
                opacity: 1;
            }
            100% {
                transform: translateX(100vw) translateY(50vh);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#shooting-star-style')) {
        style.id = 'shooting-star-style';
        document.head.appendChild(style);
    }
    
    document.querySelector('.universe').appendChild(shootingStar);
    
    // Remove shooting star after animation
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 3000);
}