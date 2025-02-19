// Store guests array
let guests = [];

// Add new guest
function addGuest() {
    const name = document.getElementById('guestName').value;
    const costume = document.getElementById('costume').value;

    if (name && costume) {
        guests.push({
            name: name,
            costume: costume,
            votes: 0,
            canUnlike: false
        });

        updateDisplay();
        clearInputs();
    }
}

// Remove guest
function removeGuest(index) {
    guests.splice(index, 1);
    updateDisplay();
}

// Add vote
function like(index) {
    guests[index].votes++;
    guests[index].canUnlike = true;
    updateDisplay();
}

// Remove vote
function unlike(index) {
    if (guests[index].votes > 0 && guests[index].canUnlike) {
        guests[index].votes--;
        guests[index].canUnlike = guests[index].votes > 0;
        updateDisplay();
    }
}

// Update display
function updateDisplay() {
    const guestList = document.getElementById('guestList');
    const totalGuests = document.getElementById('totalGuests');
    const leaderSpan = document.getElementById('leader');
    
    guestList.innerHTML = '';
    totalGuests.textContent = guests.length;

    // Find current leader
    let maxVotes = 0;
    let leaderName = 'None';

    guests.forEach((guest, index) => {
        const div = document.createElement('div');
        div.className = 'guest-item';
        
        if (guest.votes > maxVotes) {
            maxVotes = guest.votes;
            leaderName = guest.name;
        }

        div.innerHTML = `
            <span class="guest-name">${guest.name}</span>
            <span class="guest-costume">${guest.costume}</span>
            <div class="vote-buttons">
                <span class="vote-count">${guest.votes}</span>
                <button class="like-btn" onclick="like(${index})">👍 Like</button>
                <button class="unlike-btn" 
                        onclick="unlike(${index})" 
                        ${!guest.canUnlike ? 'disabled' : ''}>
                    👎 Unlike
                </button>
            </div>
            <button onclick="removeGuest(${index})">Remove</button>
        `;

        if (guest.votes === maxVotes && maxVotes > 0) {
            div.classList.add('winner');
        }

        guestList.appendChild(div);
    });

    leaderSpan.textContent = leaderName;
}

// Clear input fields
function clearInputs() {
    document.getElementById('guestName').value = '';
    document.getElementById('costume').value = '';
}