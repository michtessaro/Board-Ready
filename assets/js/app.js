async function loadDirectory() {
    try {
        const response = await fetch('data/2026-list.json');
        const nominees = await response.json();
        
        displayNominees(nominees);

        // Animation: Fade in cards on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card').forEach(card => observer.observe(card));

    } catch (error) {
        console.error("Error loading directory:", error);
    }
}

function displayNominees(list) {
    const grid = document.getElementById('nomineeGrid');
    grid.innerHTML = list.map(person => `
        <div class="card" data-sector="${person.sector}">
            <div class="card-image-wrapper">
                <div class="badge-overlay"></div>
                <img src="${person.photo}" alt="${person.name}" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="nominee-name">${person.name}</h3>
                <p class="nominee-role">${person.role} • ${person.company}</p>
                <div class="expertise-tags">
                    ${person.expertise.map(skill => `<span class="tag">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Multi-Filter Logic (Search + Dropdown)
function filterCandidates() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedSector = document.getElementById('sectorFilter').value;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        const sector = card.getAttribute('data-sector');
        
        const matchesSearch = text.includes(searchTerm);
        const matchesSector = selectedSector === "" || sector === selectedSector;

        if (matchesSearch && matchesSector) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Event Listeners for Filters
document.getElementById('searchInput').addEventListener('input', filterCandidates);
document.getElementById('sectorFilter').addEventListener('change', filterCandidates);

window.onload = loadDirectory;
