async function loadDirectory() {
    try {
        const response = await fetch('data/2026-list.json');
        const nominees = await response.json();
        const grid = document.getElementById('nomineeGrid');
        
        displayNominees(nominees);

        // Animation Logic: Fade in cards as they appear on screen
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
        <div class="card">
            <div class="card-image-wrapper">
                <div class="badge-overlay"></div>
                <img src="${person.photo}" alt="${person.name}">
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

// Search Functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(term) ? "block" : "none";
    });
});

window.onload = loadDirectory;
