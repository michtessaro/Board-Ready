async function loadNominees() {
    const response = await fetch('./data/2026-list.json');
    const nominees = await response.json();
    
    const grid = document.getElementById('nomineeGrid');
    const searchInput = document.getElementById('searchInput');
    const sectorFilter = document.getElementById('sectorFilter');

    function displayNominees(list) {
        grid.innerHTML = list.map(n => `
            <div class="card">
                <div class="photo-container">
                    <img src="${n.photo}" alt="${n.name}">
                    <div class="badge-overlay"></div>
                </div>
                <div class="info">
                    <h3>${n.name}</h3>
                    <p><strong>${n.role}</strong></p>
                    <p>${n.company}</p>
                    <div class="expertise">
                        ${n.expertise.map(e => `<span class="tag">${e}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    function filterData() {
        const searchTerm = searchInput.value.toLowerCase();
        const sector = sectorFilter.value;

        const filtered = nominees.filter(n => {
            const matchesSearch = n.name.toLowerCase().includes(searchTerm) || 
                                n.expertise.some(e => e.toLowerCase().includes(searchTerm));
            const matchesSector = sector === "" || n.sector === sector;
            return matchesSearch && matchesSector;
        });
        displayNominees(filtered);
    }

    searchInput.addEventListener('input', filterData);
    sectorFilter.addEventListener('change', filterData);

    displayNominees(nominees);
}

loadNominees();
