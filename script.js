document.addEventListener('DOMContentLoaded', function() {
    loadPaslonData();

    const voteBtn = document.getElementById('voteBtn');
    const radios = document.querySelectorAll('input[name="paslon"]');

    let cooldownActive = false;

    voteBtn.addEventListener('click', function() {
        if (cooldownActive) {
            return;
        }

        const selected = document.querySelector('input[name="paslon"]:checked');
        if (selected) {
            const paslon = selected.value;
            // Store vote
            let votes = JSON.parse(localStorage.getItem('votes')) || {1: 0, 2: 0, 3: 0, 4: 0};
            votes[paslon]++;
            localStorage.setItem('votes', JSON.stringify(votes));

            alert(`Vote submitted for Paslon ${paslon}! Terima kasih telah berpartisipasi dalam PILKOSIS.`);

            // Clear selection
            radios.forEach(radio => radio.checked = false);

            // Start cooldown
            cooldownActive = true;
            voteBtn.disabled = true;
            let timeLeft = 10;
            voteBtn.textContent = `Cooldown: ${timeLeft}`;

            const countdown = setInterval(() => {
                timeLeft--;
                voteBtn.textContent = `Cooldown: ${timeLeft}`;
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    voteBtn.textContent = 'VOTING';
                    voteBtn.disabled = false;
                    cooldownActive = false;
                }
            }, 1000);
        } else {
            alert('Silakan pilih salah satu paslon sebelum voting.');
        }
    });
});

function loadPaslonData() {
    const defaultData = {
        1: { name: 'Paslon 1', img: 'images/paslon1.jpg', desc: 'Kandidat 1A & 1B' },
        2: { name: 'Paslon 2', img: 'images/paslon2.jpg', desc: 'Kandidat 2A & 2B' },
        3: { name: 'Paslon 3', img: 'images/paslon3.jpg', desc: 'Kandidat 3A & 3B' },
        4: { name: 'Paslon 4', img: 'images/paslon4.jpg', desc: 'Kandidat 4A & 4B' }
    };

    const data = JSON.parse(localStorage.getItem('paslonData')) || defaultData;

    for (let i = 1; i <= 4; i++) {
        const paslonDiv = document.getElementById(`paslon${i}`);
        const img = paslonDiv.querySelector('img');
        const h2 = paslonDiv.querySelector('h2');
        const p = paslonDiv.querySelector('p');

        img.src = data[i].img;
        h2.textContent = data[i].name;
        p.textContent = data[i].desc;
    }
}
