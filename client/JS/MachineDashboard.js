// MachineDashboard.js
const apiUrl = 'http://localhost:5141/api/Vending';

const East = [];
const West = [];
const SouthWest = [];
const SouthEast = [];
const MidWest = [];

async function handleOnLoad() {
    await populateArrays();
    displayRedDropdowns();
}

async function populateArrays() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        data.forEach(item => {
            switch (item.machineRegion) {
                case 'East':
                    East.push(item);
                    break;
                case 'West':
                    West.push(item);
                    break;
                case 'SouthWest':
                    SouthWest.push(item);
                    break;
                case 'SouthEast':
                    SouthEast.push(item);
                    break;
                case 'MidWest':
                    MidWest.push(item);
                    break;
                default:
                    // Handle unexpected regions or ignore them
                    break;
            }
        });

        console.log('Arrays populated:', { East, West, SouthWest, SouthEast, MidWest });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createRedDropdown(array, containerId, region) {
    const dropdownContainer = document.getElementById(containerId);

    // Create the button element
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn', 'btn-danger', 'dropdown-toggle');
    button.dataset.toggle = 'dropdown';
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = `${region}`;

    // Create the dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');

    // Create dropdown items for each item in the array
    array.forEach(item => {
        const dropdownItem = document.createElement('a');
        dropdownItem.classList.add('dropdown-item');
        dropdownItem.href = './Individual Machine.html';
        dropdownItem.textContent = item.machineLocation;

        // Add a click event listener to each dropdown item
        dropdownItem.addEventListener('click', function () {
            // Save machineId to local storage
            localStorage.setItem('selectedMachineId', item.machineId);
            console.log('MachineId saved to local storage:', item.machineId);
            // Alternatively, you can use alert for debugging
            // alert('MachineId saved to local storage: ' + item.machineId);
        });

        dropdownMenu.appendChild(dropdownItem);
    });

    // Add a divider to the dropdown menu
    const dropdownDivider = document.createElement('div');
    dropdownDivider.classList.add('dropdown-divider');
    dropdownMenu.appendChild(dropdownDivider);

    // Append button and dropdown menu to the container
    dropdownContainer.appendChild(button);
    dropdownContainer.appendChild(dropdownMenu);

    // Add event listener to toggle the dropdown
    button.addEventListener('click', function () {
        dropdownMenu.classList.toggle('show');
    });
}






function displayRedDropdowns() {
    createRedDropdown(East, 'eastDropdownContainer', 'East');
    createRedDropdown(West, 'westDropdownContainer', 'West');
    createRedDropdown(SouthWest, 'southWestDropdownContainer', 'SouthWest');
    createRedDropdown(SouthEast, 'southEastDropdownContainer', 'SouthEast');
    createRedDropdown(MidWest, 'midWestDropdownContainer', 'MidWest');
}