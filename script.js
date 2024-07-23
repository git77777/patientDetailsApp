document.addEventListener('DOMContentLoaded', () => {
    const patientContainer = document.getElementById('patientContainer');
    const spinner = document.getElementById('spinner');
    const searchInput = document.getElementById('searchInput');

    const fetchPatients = async () => {
        try {
            spinner.classList.remove('d-none'); // Show spinner
            const response = await fetch('https://doc-back.onrender.com/patients');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            displayPatients(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            patientContainer.innerHTML = `<div class="alert alert-danger" role="alert">Error fetching patient details.</div>`;
        } finally {
            spinner.classList.add('d-none'); // Hide spinner
        }
    };

    const displayPatients = (patients) => {
        patientContainer.innerHTML = ''; // Clear existing content
        patients.forEach(patient => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${patient.name}</h5>
                        <p class="card-text"><strong>Age:</strong> ${patient.age}</p>
                        <p class="card-text"><strong>Gender:</strong> ${patient.gender}</p>
                        <p class="card-text"><strong>Weight:</strong> ${patient.weight}</p>
                        <p class="card-text"><strong>Disease:</strong> ${patient.disease}</p>
                        <p class="card-text"><strong>Doctor:</strong> ${patient.doctor.name} (${patient.doctor.specialization})</p>
                    </div>
                </div>
            `;
            patientContainer.appendChild(card);
        });
    };

    const filterPatients = () => {
        const searchText = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            card.style.display = title.includes(searchText) ? 'block' : 'none';
        });
    };

    searchInput.addEventListener('input', filterPatients);

    fetchPatients(); // Fetch data when the page loads
});
