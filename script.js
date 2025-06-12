// script.js
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

// Rest of your JavaScript functions...
// (Keep all the other functions from your original code)
