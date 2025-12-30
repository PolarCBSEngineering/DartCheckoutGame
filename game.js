// Dart 501 Checkout Master - Game Logic

// Game State
const gameState = {
    targetScore: 0,
    currentScore: 0,
    dartsUsed: 0,
    maxDarts: 3,
    currentVisit: [],
    gameActive: false,
    bust: false,
    gameShot: false,
    finalScore: 0,
    scoreBreakdown: null,
    totalPoints: 0,
    sessionGames: 0
};

let IS_INITIAL_FLOW = true; // Use a dedicated global to prevent any reset interference

// Zone to Numbers Mapping
const ZONE_NUMBERS = {
    'zone-top': [12, 5, 20, 1, 18],
    'zone-right': [4, 13, 6, 10, 15],
    'zone-bottom': [7, 19, 3, 17, 2],
    'zone-left': [16, 8, 11, 14, 9],
    'zone-bull': ['SB', 'DB']
};

// Professional Finishers (Extracted from DB)
const PROF_DOUBLES = new Set();

// Bogey Numbers (Cannot finish)
const BOGEY_NUMBERS = [169, 168, 166, 165, 163, 162, 159];

// Initialize Game
function initGame() {
    initProfDoubles();
    resetGame();
    generateTargetScore();
    updateUI();
    setupEventListeners();
}

// Extract all doubles used as finishers in DB
function initProfDoubles() {
    for (let key in CHECKOUT_DB) {
        const entry = CHECKOUT_DB[key];
        if (entry.path) {
            const last = entry.path[entry.path.length - 1];
            if (last) PROF_DOUBLES.add(last);
        }
        if (entry.alternatives) {
            entry.alternatives.forEach(alt => {
                const last = alt[alt.length - 1];
                if (last) PROF_DOUBLES.add(last);
            });
        }
    }
}

// Simplified Start (No countdown if not first time)
function startTurn() {
    if (IS_INITIAL_FLOW) {
        IS_INITIAL_FLOW = false;
        startCountdown();
    } else {
        // Immediate start for subsequent rounds
        resetGame();
        generateTargetScore();
        updateUI();
        gameState.gameActive = true;
        updateMessage('Yeni tur başladı!', 'success');
        document.getElementById('dartBoard').classList.remove('board-disabled');
    }
}

// Countdown Implementation
function startCountdown() {
    const overlay = document.getElementById('countdownOverlay');
    const text = document.getElementById('countdownText');
    const splash = document.getElementById('splashScreen');

    splash.classList.add('hidden');
    overlay.classList.remove('d-none');

    let count = 3;
    text.textContent = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            text.textContent = count;
        } else if (count === 0) {
            text.textContent = "BAŞLA!";
            // SHORTEN THE WAIT FOR "BAŞLA!" to 500ms
            setTimeout(() => {
                clearInterval(interval);
                overlay.classList.add('d-none');
                resetGame();
                generateTargetScore();
                updateUI();
                gameState.gameActive = true; // MUST BE AFTER resetGame()
                document.getElementById('dartBoard').classList.remove('board-disabled');
                updateMessage('Oyun başladı! İyi şanslar.', 'success');
            }, 500);
        }
    }, 1000);
}

// Setup Event Listeners
function setupEventListeners() {
    const splashStartBtn = document.getElementById('splashStartBtn');
    if (splashStartBtn) {
        splashStartBtn.addEventListener('click', startTurn);
    }

    // Dart Board Zones
    const zones = document.querySelectorAll('.clickable-zone');
    zones.forEach(zone => {
        zone.addEventListener('click', (e) => {
            if (!gameState.gameActive) return;
            if (gameState.dartsUsed >= gameState.maxDarts) return;

            e.stopPropagation();
            const zoneId = e.currentTarget.id;
            openZoneModal(zoneId);
        });
    });

    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            document.getElementById('zoomModal').classList.add('d-none');
            document.getElementById('dartBoard').classList.remove('board-disabled');
        });
    }

    const closeResult = document.getElementById('closeResult');
    if (closeResult) {
        closeResult.addEventListener('click', () => {
            document.getElementById('resultModal').classList.add('d-none');
            document.getElementById('dartBoard').classList.remove('board-disabled');
            startTurn();
        });
    }

    // HIGH-PRECISION SELECTION: Static Event Delegation
    const numberButtons = document.getElementById('numberButtons');
    if (numberButtons) {
        numberButtons.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-dart');
            if (!btn) return;

            e.stopPropagation();
            const score = parseInt(btn.getAttribute('data-score'));
            const notation = btn.getAttribute('data-notation');

            // Immediate Visual Feedback
            btn.classList.add('active-selection');

            // Short delay for visual confirmation before closing
            setTimeout(() => {
                btn.classList.remove('active-selection');
                throwDart(score, notation);
            }, 50);
        });
    }
}

// Generate Random Target Score (40-170)
function generateTargetScore() {
    let score;
    do {
        score = Math.floor(Math.random() * (170 - 40 + 1)) + 40;
    } while (BOGEY_NUMBERS.includes(score));

    gameState.targetScore = score;
    gameState.currentScore = score;
}

// Reset Game State
function resetGame() {
    gameState.currentScore = 0;
    gameState.dartsUsed = 0;
    gameState.currentVisit = [];
    gameState.gameActive = false;
    gameState.bust = false;
    gameState.gameShot = false;
}

// Open Zone Modal
function openZoneModal(zoneId) {
    const board = document.getElementById('dartBoard');
    board.classList.add('board-disabled');

    const modal = document.getElementById('zoomModal');
    const zoneTitle = document.getElementById('zoneTitle');
    const zoneNumbers = document.getElementById('zoneNumbers');
    const numberButtons = document.getElementById('numberButtons');

    const numbers = ZONE_NUMBERS[zoneId];
    if (!numbers) return;

    zoneNumbers.textContent = numbers.join(' - ');
    const zoneNames = {
        'zone-top': 'Üst-Merkez', 'zone-right': 'Sağ-Yan',
        'zone-bottom': 'Alt-Merkez', 'zone-left': 'Sol-Yan', 'zone-bull': 'Merkez'
    };
    zoneTitle.textContent = zoneNames[zoneId] || 'Bölge Seçimi';

    numberButtons.innerHTML = '';
    if (zoneId === 'zone-bull') numberButtons.classList.add('center-content');
    else numberButtons.classList.remove('center-content');

    numbers.forEach(num => {
        const group = document.createElement('div');
        group.className = 'number-group';

        const label = document.createElement('div');
        label.className = 'number-label';
        label.textContent = (num === 'SB' ? '25' : (num === 'DB' ? '50' : num));
        group.appendChild(label);

        ['D', 'T', 'S'].forEach(type => {
            if (num === 'SB' && type !== 'S') return;
            if (num === 'DB' && type !== 'D') return;

            const btn = document.createElement('button');
            btn.className = 'btn-dart';
            btn.setAttribute('data-type', type);
            btn.setAttribute('data-num', num);
            btn.textContent = type === 'S' ? (num === 'SB' ? 'SB' : 'S') : (type === 'D' ? (num === 'DB' ? 'DB' : 'D') : 'T');

            const score = getDartScore(type, (num === 'SB' ? 25 : (num === 'DB' ? 50 : num)));
            btn.setAttribute('data-score', score);

            const notation = (num === 'SB' ? 'SB' : (num === 'DB' ? 'DB' : type + num));
            btn.setAttribute('data-notation', notation);

            group.appendChild(btn);
        });
        numberButtons.appendChild(group);
    });

    const score = parseInt(btn.getAttribute('data-score'));
    const notation = btn.getAttribute('data-notation');

    // Visual feedback
    btn.style.background = 'var(--accent-gold)';
    btn.style.color = '#000';

    setTimeout(() => throwDart(score, notation), 50);
};

modal.classList.remove('d-none');
}

function getDartScore(type, number) {
    if (number === 25 || number === 50) return number;
    if (type === 'S') return number;
    if (type === 'D') return number * 2;
    if (type === 'T') return number * 3;
    return 0;
}

function throwDart(score, notation) {
    document.getElementById('zoomModal').classList.add('d-none');
    document.getElementById('dartBoard').classList.remove('board-disabled');
    gameState.currentVisit.push({ score, notation });
    gameState.dartsUsed++;
    gameState.currentScore -= score;
    updateUI();

    if (gameState.currentScore === 0) {
        if (notation.startsWith('D') || notation === 'DB') {
            gameState.gameShot = true;
            endTurn();
        } else {
            updateMessage('Bust! Double ile bitirmelisiniz.', 'error');
            gameState.bust = true;
            endTurn();
        }
    } else if (gameState.currentScore < 2) {
        updateMessage('Bust!', 'error');
        gameState.bust = true;
        endTurn();
    } else if (gameState.dartsUsed === 3) {
        endTurn();
    } else {
        const remains = 3 - gameState.dartsUsed;
        const max = remains === 2 ? 110 : 50;
        if (gameState.currentScore > max) {
            gameState.gameActive = false;
            updateMessage('Bitiriş artık imkansız!', 'warning');
            setTimeout(endTurn, 800);
        }
    }
}

function endTurn() {
    gameState.gameActive = false;
    if (gameState.gameShot) {
        updateMessage('🎉 Game Shot!', 'success');
        document.body.classList.add('success-flash');
        setTimeout(() => document.body.classList.remove('success-flash'), 500);
    } else if (gameState.bust) {
        updateMessage('💥 BUST!', 'error');
        document.body.classList.add('error-flash');
        setTimeout(() => document.body.classList.remove('error-flash'), 500);
    }
    setTimeout(() => {
        gradeVisitPerformance();
        showResultModal();
    }, 1000);
}

function gradeVisitPerformance() {
    const breakdown = { checkoutMatch: 0, dartCount: 0, pathAccuracy: 0, finishSuccess: 0 };
    const target = gameState.targetScore.toString();
    const userPath = gameState.currentVisit.map(d => d.notation);
    const db = CHECKOUT_DB[target];

    if (db) {
        const paths = [db.path, ...(db.alternatives || [])].filter(Boolean);
        let bestCheckout = 0;
        let bestAccuracy = 0;

        paths.forEach(p => {
            // Check Exact Match
            if (arraysEqual(userPath, p)) {
                bestCheckout = Math.max(bestCheckout, 48);
            }
            // Check Swapped setup (3 darts)
            else if (userPath.length === 3 && p.length === 3 && userPath[2] === p[2]) {
                if (userPath[0] === p[1] && userPath[1] === p[0]) {
                    bestCheckout = Math.max(bestCheckout, 32);
                }
            }

            // Accuracy (Dynamic 30 / length)
            let currentAcc = 0;
            const ptsPerDart = 30 / p.length;
            for (let i = 0; i < Math.min(userPath.length, p.length); i++) {
                if (userPath[i] === p[i]) currentAcc += ptsPerDart;
                else if (i < 2 && p.length === 3 && userPath.length >= 2) {
                    // Swap rule for accuracy
                    if (i === 0 && userPath[0] === p[1] && userPath[1] === p[0]) currentAcc += ptsPerDart;
                    if (i === 1 && userPath[1] === p[0] && userPath[0] === p[1]) currentAcc += ptsPerDart;
                }
            }
            bestAccuracy = Math.max(bestAccuracy, currentAcc);
        });

        // 24/16/8 Tiers
        if (bestCheckout < 32) {
            const finalDart = userPath[userPath.length - 1];
            const isProfDouble = PROF_DOUBLES.has(finalDart);

            if (gameState.gameShot) {
                bestCheckout = isProfDouble ? 24 : 8;
            } else if (!gameState.bust && userPath.length > 0 && isProfDouble && gameState.currentScore === (getDartScore('D', parseInt(finalDart.substring(1)) || 25))) {
                // This logic is a bit complex: if the remaining score is a pro double they set up.
                // Simplified: if currentScore is a double in our Pro list.
                const remainingDouble = gameState.currentScore === 50 ? 'DB' : ('D' + (gameState.currentScore / 2));
                if (PROF_DOUBLES.has(remainingDouble)) bestCheckout = 16;
            }
        }

        breakdown.checkoutMatch = bestCheckout;
        breakdown.pathAccuracy = Math.round(bestAccuracy);
    }

    if (gameState.gameShot) {
        breakdown.finishSuccess = 10;
        const dbEntry = CHECKOUT_DB[target];
        const opt = dbEntry ? dbEntry.path.length : 1;
        const extra = Math.max(0, gameState.dartsUsed - opt);
        if (extra === 0) breakdown.dartCount = 12;
        else if (extra === 1) breakdown.dartCount = 8;
        else if (extra === 2) breakdown.dartCount = 4;
    }

    gameState.finalScore = Math.min(100, breakdown.checkoutMatch + breakdown.dartCount + breakdown.pathAccuracy + breakdown.finishSuccess);
    gameState.scoreBreakdown = breakdown;
    gameState.totalPoints += gameState.finalScore;
    gameState.sessionGames++;
}

function arraysEqual(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    return a.every((v, i) => v === b[i]);
}

function showResultModal() {
    const modal = document.getElementById('resultModal');
    const pathDiv = document.getElementById('userPathDisplay');
    const breakdown = document.getElementById('scoreBreakdown');

    pathDiv.innerHTML = `<span class="label">Senin Rotan:</span><div class="path-values">${gameState.currentVisit.map(d => d.notation).join(' - ')}</div>`;

    const b = gameState.scoreBreakdown;
    breakdown.innerHTML = `
        <div class="result-item"><span>Checkout Seçimi: ${b.checkoutMatch}/48</span></div>
        <div class="result-item"><span>Dart Sayısı: ${b.dartCount}/12</span></div>
        <div class="result-item"><span>Gidiş Yolu Doğruluğu: ${b.pathAccuracy}/30</span></div>
        <div class="result-item"><span>Bitiriş Başarısı: ${b.finishSuccess}/10</span></div>
    `;

    document.getElementById('turnTotal').textContent = gameState.finalScore + '/100';
    document.getElementById('totalScore').textContent = gameState.totalPoints + ' / ' + (gameState.sessionGames * 100);

    const db = CHECKOUT_DB[gameState.targetScore];
    if (db) {
        let optHtml = `<div class="optimal-paths"><h4>Doğru Rotalar:</h4><div class="paths-list">`;
        optHtml += `<span class="path-tag">${db.path.join(' - ')} (PDC)</span>`;
        if (db.alternatives) db.alternatives.forEach(alt => {
            optHtml += `<span class="path-tag">${alt.join(' - ')} (PDC)</span>`;
        });
        optHtml += `</div></div>`;
        breakdown.innerHTML += optHtml;
    }

    modal.classList.remove('d-none');
}

function updateUI() {
    document.getElementById('targetScore').textContent = gameState.targetScore;
    document.getElementById('currentScore').textContent = gameState.currentScore;
    document.getElementById('headerTotalScore').textContent = gameState.totalPoints;

    for (let i = 1; i <= 3; i++) {
        const el = document.getElementById(`dart${i}`);
        if (i <= gameState.dartsUsed) el.classList.add('used');
        else el.classList.remove('used');
    }
    const logItems = document.getElementById('logItems');
    logItems.innerHTML = gameState.currentVisit.map(d => `<span class="log-item">[${d.notation}]</span>`).join('');
}

function updateMessage(text, type = '') {
    const area = document.getElementById('messageArea');
    area.textContent = text;
    area.className = `message-area ${type}`;
    setTimeout(() => { if (area.textContent === text) { area.textContent = ''; area.className = 'message-area'; } }, 3000);
}

document.addEventListener('DOMContentLoaded', initGame);
