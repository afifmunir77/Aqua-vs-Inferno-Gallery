// Player data for AQUA VS INFERNO event
const players = [
    { no: 1, week: "", name: "Pele", ovr: 109, position: "ST", shardCost: 1500 },
    { no: 2, week: "", name: "Maradona", ovr: 109, position: "CAM", shardCost: 1500 },
    { no: 3, week: 1, name: "Cannavaro", ovr: 109, position: "CB", shardCost: 1000 },
    { no: 4, week: 1, name: "Di Maria", ovr: 108, position: "CAM", shardCost: 800 },
    { no: 5, week: 1, name: "Hernandez", ovr: 108, position: "ST", shardCost: 500 },
    { no: 6, week: 1, name: "Matuidi", ovr: 108, position: "CDM", shardCost: 500 },
    { no: 7, week: 1, name: "Fernandez", ovr: 107, position: "CM", shardCost: 450 },
    { no: 8, week: 1, name: "Kobel", ovr: 107, position: "GK", shardCost: 800 },
    { no: 9, week: 1, name: "Brandt", ovr: 107, position: "CAM", shardCost: 300 },
    { no: 10, week: 1, name: "Jimenez", ovr: 106, position: "ST", shardCost: 200 },
    { no: 11, week: 1, name: "Bradley", ovr: 106, position: "RB", shardCost: 200 },
    { no: 12, week: 1, name: "Martinez", ovr: 106, position: "CB", shardCost: 200 },
    { no: 13, week: 1, name: "Zaire-Emery", ovr: 106, position: "CM", shardCost: 200 },
    { no: 14, week: 1, name: "Sane", ovr: 106, position: "RM", shardCost: 300 },
    { no: 15, week: 1, name: "McGregor", ovr: 106, position: "CDM", shardCost: 200 },
    { no: 16, week: 1, name: "Ugarte", ovr: 106, position: "CDM", shardCost: 200 },
    { no: 17, week: 1, name: "Romeny", ovr: 106, position: "ST", shardCost: 200 }
];

// Position order for sorting
const positionOrder = {
    "GK": 1,
    "CB": 2,
    "LB": 3,
    "RB": 4,
    "CDM": 5,
    "CM": 6,
    "CAM": 7,
    "LM": 8,
    "RM": 9,
    "ST": 10,
    "LW": 11,
    "RW": 12
};

// Function to render the player table
function renderPlayerTable(data) {
    const tableBody = document.getElementById('player-table-body');
    tableBody.innerHTML = '';

    data.forEach(player => {
        const row = document.createElement('tr');
        const rowClass = `ovr-${player.ovr}`;
        row.className = rowClass;

        const weekDisplay = player.week !== "" ? player.week : "-";

        row.innerHTML = `
            <td>${player.no}</td>
            <td>${weekDisplay}</td>
            <td>${player.name}</td>
            <td>${player.ovr}</td>
            <td>${player.position}</td>
            <td>${player.shardCost}</td>
        `;
        tableBody.appendChild(row);
    });

    updateSummary(data);
}

// Function to update summary information
function updateSummary(data) {
    document.getElementById('total-players').textContent = data.length;
    const totalShards = data.reduce((sum, player) => sum + player.shardCost, 0);
    document.getElementById('total-shards').textContent = totalShards;
}

// Function to filter players based on OVR and Shard Cost
function filterPlayers() {
    const ovrFilter = document.getElementById('ovr-filter').value;
    const shardFilter = parseInt(document.getElementById('shard-filter').value);

    let filteredPlayers = [...players];

    // Apply OVR filter
    if (ovrFilter !== 'all') {
        if (ovrFilter.includes('-')) {
            const [min, max] = ovrFilter.split('-').map(Number);
            filteredPlayers = filteredPlayers.filter(player => player.ovr >= min && player.ovr <= max);
        } else {
            const ovr = parseInt(ovrFilter);
            filteredPlayers = filteredPlayers.filter(player => player.ovr === ovr);
        }
    }

    // Apply Shard Cost filter
    filteredPlayers = filteredPlayers.filter(player => player.shardCost <= shardFilter);

    return filteredPlayers;
}

// Function to sort players
function sortPlayers(data) {
    const sortBy = document.getElementById('sort-by').value;
    const sortOrder = document.getElementById('sort-order').value;

    return [...data].sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'name') {
            comparison = a.name.localeCompare(b.name);
        } else if (sortBy === 'ovr') {
            comparison = a.ovr - b.ovr;
        } else if (sortBy === 'position') {
            comparison = positionOrder[a.position] - positionOrder[b.position];
        } else if (sortBy === 'shard-cost') {
            comparison = a.shardCost - b.shardCost;
        } else if (sortBy === 'week') {
            // Handle empty week values for sorting
            const weekA = a.week !== "" ? a.week : -1;
            const weekB = b.week !== "" ? b.week : -1;
            comparison = weekA - weekB;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });
}

// Function to save current settings to localStorage
function saveSettings() {
    const settings = {
        ovrFilter: document.getElementById('ovr-filter').value,
        shardFilter: document.getElementById('shard-filter').value,
        sortBy: document.getElementById('sort-by').value,
        sortOrder: document.getElementById('sort-order').value
    };
    localStorage.setItem('avsSettings', JSON.stringify(settings));
}

// Function to load settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('avsSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('ovr-filter').value = settings.ovrFilter;
        document.getElementById('shard-filter').value = settings.shardFilter;
        document.getElementById('shard-value').textContent = settings.shardFilter;
        document.getElementById('sort-by').value = settings.sortBy;
        document.getElementById('sort-order').value = settings.sortOrder;
    }
}

// Function to save a preset
function savePreset() {
    const presetName = document.getElementById('preset-name').value.trim();
    if (!presetName) {
        alert('Please enter a preset name');
        return;
    }

    const preset = {
        name: presetName,
        settings: {
            ovrFilter: document.getElementById('ovr-filter').value,
            shardFilter: document.getElementById('shard-filter').value,
            sortBy: document.getElementById('sort-by').value,
            sortOrder: document.getElementById('sort-order').value
        }
    };

    let presets = JSON.parse(localStorage.getItem('avsPresets')) || [];
    presets.push(preset);
    localStorage.setItem('avsPresets', JSON.stringify(presets));

    document.getElementById('preset-name').value = '';
    loadPresets();
}

// Function to load presets
function loadPresets() {
    const presetList = document.getElementById('preset-list');
    presetList.innerHTML = '';

    let presets = JSON.parse(localStorage.getItem('avsPresets')) || [];

    // Sort presets alphabetically
    presets.sort((a, b) => a.name.localeCompare(b.name));

    presets.forEach((preset, index) => {
        const presetItem = document.createElement('div');
        presetItem.className = 'preset-item';
        presetItem.innerHTML = `
            <span>${preset.name}</span>
            <div class="preset-actions">
                <button class="load-preset-btn" data-name="${preset.name}">Load</button>
                <button class="delete-preset-btn" data-index="${index}">Delete</button>
            </div>
        `;
        presetList.appendChild(presetItem);
    });

    // Add event listeners to load and delete buttons
    document.querySelectorAll('.load-preset-btn').forEach(button => {
        button.addEventListener('click', function() {
            const presetName = this.getAttribute('data-name');
            const presets = JSON.parse(localStorage.getItem('avsPresets')) || [];
            const preset = presets.find(p => p.name === presetName);

            if (preset) {
                document.getElementById('ovr-filter').value = preset.settings.ovrFilter;
                document.getElementById('shard-filter').value = preset.settings.shardFilter;
                document.getElementById('shard-value').textContent = preset.settings.shardFilter;
                document.getElementById('sort-by').value = preset.settings.sortBy;
                document.getElementById('sort-order').value = preset.settings.sortOrder;

                updateTable();
                saveSettings();
            }
        });
    });

    document.querySelectorAll('.delete-preset-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            let presets = JSON.parse(localStorage.getItem('avsPresets')) || [];
            presets.splice(index, 1);
            localStorage.setItem('avsPresets', JSON.stringify(presets));
            loadPresets();
        });
    });
}

// Function to update the table
function updateTable() {
    const filteredPlayers = filterPlayers();
    const sortedPlayers = sortPlayers(filteredPlayers);
    renderPlayerTable(sortedPlayers);
}

// Event listeners for filters and sorting
document.getElementById('ovr-filter').addEventListener('change', () => {
    updateTable();
    saveSettings();
});

document.getElementById('shard-filter').addEventListener('input', function() {
    document.getElementById('shard-value').textContent = this.value;
    updateTable();
    saveSettings();
});

document.getElementById('sort-by').addEventListener('change', () => {
    updateTable();
    saveSettings();
});

document.getElementById('sort-order').addEventListener('change', () => {
    updateTable();
    saveSettings();
});

// Event listeners for table headers
document.getElementById('name-header').addEventListener('click', () => {
    document.getElementById('sort-by').value = 'name';
    const currentOrder = document.getElementById('sort-order').value;
    document.getElementById('sort-order').value = currentOrder === 'asc' ? 'desc' : 'asc';
    updateTable();
    saveSettings();
});

document.getElementById('ovr-header').addEventListener('click', () => {
    document.getElementById('sort-by').value = 'ovr';
    const currentOrder = document.getElementById('sort-order').value;
    document.getElementById('sort-order').value = currentOrder === 'asc' ? 'desc' : 'asc';
    updateTable();
    saveSettings();
});

document.getElementById('position-header').addEventListener('click', () => {
    document.getElementById('sort-by').value = 'position';
    const currentOrder = document.getElementById('sort-order').value;
    document.getElementById('sort-order').value = currentOrder === 'asc' ? 'desc' : 'asc';
    updateTable();
    saveSettings();
});

document.getElementById('shard-cost-header').addEventListener('click', () => {
    document.getElementById('sort-by').value = 'shard-cost';
    const currentOrder = document.getElementById('sort-order').value;
    document.getElementById('sort-order').value = currentOrder === 'asc' ? 'desc' : 'asc';
    updateTable();
    saveSettings();
});

document.getElementById('week-header').addEventListener('click', () => {
    document.getElementById('sort-by').value = 'week';
    const currentOrder = document.getElementById('sort-order').value;
    document.getElementById('sort-order').value = currentOrder === 'asc' ? 'desc' : 'asc';
    updateTable();
    saveSettings();
});

// Event listeners for preset buttons
document.getElementById('save-preset').addEventListener('click', savePreset);
document.getElementById('load-preset').addEventListener('click', loadPresets);

// Load settings and presets on page load
window.addEventListener('load', () => {
    loadSettings();
    loadPresets();
    updateTable();
});
