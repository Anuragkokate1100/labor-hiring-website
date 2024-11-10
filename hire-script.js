// Worker data including location
const workers = {
    "Construction Worker": [
        { name: "Ashok Ingle", phone: "8180909826", rate: "500/hour", location: "Bawada" },
        { name: "Sarjirao Shinde", phone: "9371653082", rate: "500/hour", location: "Kadamwadi" },
        { name: "sandip powar", phone: "9529853236", rate: "550/hour", location: "Bawada" },
        { name: "deepa shinde", phone: "8010688388", rate: "400/hour", location: "Kadamwadi" },
        { name: "Vijay Yadav", phone: "7777777777", rate: "570/hour", location: "Kolhapur City" },
        { name: "Ramesh Chavan", phone: "6666666666", rate: "580/hour", location: "Kolhapur City" }
    ],
    "Electrician": [
        { name: "Dipak Mundal", phone: "8001963149", rate: "400/hour", location: "Bawada" },
        { name: "Mihir", phone: "8116485076", rate: "400/hour", location: "Kadamwadi" },
        { name: "kumar shinde", phone: "8665291511", rate: "450/hour", location: "Bawada" },
        { name: "Sunil Mehta", phone: "6666666666", rate: "420/hour", location: "Kadamwadi" },
        { name: "Suresh Rane", phone: "8888888888", rate: "430/hour", location: "Kolhapur City" },
        { name: "Nitin Patil", phone: "9998887777", rate: "440/hour", location: "Kolhapur City" }
    ],
    "Cleaner": [
        { name: "Emily Davis", phone: "222-222-2222", rate: "15/hour", location: "Bawada" },
        { name: "Tom Brown", phone: "333-333-3333", rate: "18/hour", location: "Kadamwadi" },
        { name: "Anita Sharma", phone: "444-444-4444", rate: "16/hour", location: "Bawada" },
        { name: "Shivani Kumar", phone: "555-555-5555", rate: "17/hour", location: "Kadamwadi" },
        { name: "Sneha Joshi", phone: "8885554444", rate: "15/hour", location: "Kolhapur City" },
        { name: "Meena Ghosh", phone: "7774443333", rate: "19/hour", location: "Kolhapur City" }
    ],
    "Builder": [
        { name: "Chris Green", phone: "111-111-1111", rate: "22/hour", location: "Bawada" },
        { name: "Nina Blue", phone: "666-666-6666", rate: "24/hour", location: "Kadamwadi" },
        { name: "Rajendra Singh", phone: "222-333-4444", rate: "25/hour", location: "Bawada" },
        { name: "Pooja Verma", phone: "333-222-1111", rate: "26/hour", location: "Kadamwadi" },
        { name: "Amit Jadhav", phone: "8888888888", rate: "27/hour", location: "Kolhapur City" },
        { name: "Vinayak Patil", phone: "9999999999", rate: "28/hour", location: "Kolhapur City" }
    ]
};

// Function to prompt for location and show workers
function requestLocation(workerType) {
    const location = prompt("Please enter your location (Bawada, Kadamwadi, Kolhapur City):");
    if (location) {
        showWorkers(workerType, location);
    }
}

// Function to show workers in a modal based on location
function showWorkers(workerType, location) {
    const modal = document.getElementById('workerModal');
    const modalTitle = document.getElementById('modalTitle');
    const workerList = document.getElementById('workerList');

    modalTitle.textContent = workerType + " in " + location;
    workerList.innerHTML = ""; // Clear previous content

    // Generate worker list based on the provided location
    const filteredWorkers = workers[workerType].filter(worker => worker.location.toLowerCase() === location.toLowerCase());

    if (filteredWorkers.length === 0) {
        workerList.innerHTML = `<div>No workers found in ${location} for ${workerType}.</div>`;
    } else {
        filteredWorkers.forEach(worker => {
            const workerItem = document.createElement('div');
            workerItem.innerHTML = `<strong>Name:</strong> ${worker.name} <br>
                                    <strong>Phone:</strong> ${worker.phone} <br>
                                    <strong>Rate:</strong> ${worker.rate} <br>
                                    <button class="hire-button" onclick="hireWorker('${worker.name}', '${worker.phone}')">Hire</button>
                                    <br><br>`;
            workerList.appendChild(workerItem);
        });
    }

    modal.style.display = "block"; // Show modal
}

// Function to handle hiring a worker
function hireWorker(name, phone) {
    // Redirect to call log
    window.location.href = `tel:${phone}`;
}

// Close modal
function closeModal() {
    document.getElementById('workerModal').style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('workerModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
