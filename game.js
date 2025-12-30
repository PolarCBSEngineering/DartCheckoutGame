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
    gameShot: false
};

// Zone to Numbers Mapping
const ZONE_NUMBERS = {
    'zone-top': [12, 5, 20, 1, 18],
    'zone-right': [4, 13, 6, 10, 15],
    'zone-bottom': [2, 17, 3, 19, 7],
    'zone-left': [16, 8, 11, 14, 9],
    'zone-bull': ['SB', 'DB']
};

// Bogey Numbers (Cannot finish)
const BOGEY_NUMBERS = [169, 168, 166, 165, 163, 162, 159];

// Initialize Game
function initGame() {
    resetGame();
    generateTargetScore();
    updateUI();
    
    // Event Listeners
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Start Button
    const startBtn = document.getElementById('startBtn');
    const continueBtn = document.getElementById('continueBtn');
    
    startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        gameState.gameActive = true;
        updateMessage('Oyun başladı! Dart tahtasına tıklayın.', 'success');
    });
    
    continueBtn.addEventListener('click', () => {
        continueBtn.style.display = 'none';
        resetGame();
        generateTargetScore();
        updateUI();
        gameState.gameActive = true;
    });
    
    // Dart Board Zones
    const zones = document.querySelectorAll('.clickable-zone');
    zones.forEach(zone => {
        zone.addEventListener('click', (e) => {
            if (!gameState.gameActive) return;
            if (gameState.dartsUsed >= gameState.maxDarts) return;
            
            const zoneId = e.target.id;
            openZoneModal(zoneId);
        });
    });
    
    // Close Modal
    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', () => {
        document.getElementById('zoomModal').style.display = 'none';
    });
    
    // Close Result Modal
    const closeResult = document.getElementById('closeResult');
    closeResult.addEventListener('click', () => {
        document.getElementById('resultModal').style.display = 'none';
        document.getElementById('continueBtn').style.display = 'block';
    });
}

// Generate Random Target Score (40-170, excluding bogey numbers)
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
    const modal = document.getElementById('zoomModal');
    const zoneTitle = document.getElementById('zoneTitle');
    const numberButtons = document.getElementById('numberButtons');
    
    const numbers = ZONE_NUMBERS[zoneId];
    if (!numbers) return;
    
    // Set zone title
    const zoneNames = {
        'zone-top': 'Üst Çeyrek',
        'zone-right': 'Sağ Çeyrek',
        'zone-bottom': 'Alt Çeyrek',
        'zone-left': 'Sol Çeyrek',
        'zone-bull': 'Bull Alanı'
    };
    zoneTitle.textContent = zoneNames[zoneId] || 'Bölge Seçimi';
    
    // Clear previous buttons
    numberButtons.innerHTML = '';
    
    // Create number buttons
    numbers.forEach(num => {
        const group = document.createElement('div');
        group.className = 'number-group';
        
        const label = document.createElement('div');
        label.className = 'number-label';
        label.textContent = typeof num === 'number' ? num : (num === 'SB' ? 'Single Bull (25)' : 'Double Bull (50)');
        group.appendChild(label);
        
        // Create S/D/T buttons for numbers
        if (typeof num === 'number') {
            ['S', 'D', 'T'].forEach(type => {
                const btn = document.createElement('button');
                btn.className = 'btn-dart';
                btn.textContent = `${type}${num}`;
                btn.addEventListener('click', () => {
                    const score = calculateScore(type, num);
                    throwDart(score, `${type}${num}`);
                });
                group.appendChild(btn);
            });
        } else {
            // Bull buttons
            const btn = document.createElement('button');
            btn.className = 'btn-dart';
            btn.textContent = num;
            btn.addEventListener('click', () => {
                const score = num === 'SB' ? 25 : 50;
                throwDart(score, num);
            });
            group.appendChild(btn);
        }
        
        numberButtons.appendChild(group);
    });
    
    modal.style.display = 'flex';
}

// Calculate Score
function calculateScore(type, number) {
    if (type === 'S') return number;
    if (type === 'D') return number * 2;
    if (type === 'T') return number * 3;
    return 0;
}

// Throw Dart
function throwDart(score, notation) {
    // Close modal
    document.getElementById('zoomModal').style.display = 'none';
    
    // Add to visit
    gameState.currentVisit.push({ score, notation });
    gameState.dartsUsed++;
    
    // Update current score
    gameState.currentScore -= score;
    
    // Check game state
    checkGameState();
    
    // Update UI
    updateUI();
    
    // Check if turn is over
    if (gameState.dartsUsed >= gameState.maxDarts || gameState.gameShot || gameState.bust) {
        endTurn();
    }
}

// Check Game State
function checkGameState() {
    const score = gameState.currentScore;
    
    // Bust conditions
    if (score < 0) {
        gameState.bust = true;
        gameState.currentScore = gameState.targetScore; // Reset to target
        return;
    }
    
    if (score === 1) {
        gameState.bust = true;
        gameState.currentScore = gameState.targetScore; // Reset to target
        return;
    }
    
    // Game Shot
    if (score === 0) {
        const lastDart = gameState.currentVisit[gameState.currentVisit.length - 1];
        const lastNotation = lastDart.notation;
        
        // Check if last dart is Double or Bull
        if (lastNotation.startsWith('D') || lastNotation === 'DB') {
            gameState.gameShot = true;
        } else {
            gameState.bust = true;
            gameState.currentScore = gameState.targetScore; // Reset to target
        }
        return;
    }
}

// End Turn
function endTurn() {
    gameState.gameActive = false;
    
    if (gameState.gameShot) {
        updateMessage('🎉 Game Shot! Başarılı!', 'success');
        // Flash success
        document.body.classList.add('success-flash');
        setTimeout(() => {
            document.body.classList.remove('success-flash');
        }, 500);
    } else if (gameState.bust) {
        updateMessage('💥 BUST! Tur iptal edildi.', 'error');
        // Flash error
        document.body.classList.add('error-flash');
        setTimeout(() => {
            document.body.classList.remove('error-flash');
        }, 500);
    }
    
    // Calculate and show score
    setTimeout(() => {
        calculateScore();
        showResultModal();
    }, 1000);
}

// Calculate Score - 4 Criteria Algorithm
function calculateScore() {
    let totalScore = 0;
    const breakdown = {
        checkoutMatch: 0,
        dartCount: 0,
        setupQuality: 0,
        finishSuccess: 0
    };
    
    // Kriter 1: Resmi Checkout Uygunluğu (Max 50 Puan)
    const target = gameState.targetScore.toString();
    const userPath = gameState.currentVisit.map(d => d.notation);
    
    if (CHECKOUT_DB[target]) {
        const optimalPath = CHECKOUT_DB[target].path;
        const alternatives = CHECKOUT_DB[target].alternatives || [];
        
        if (optimalPath && arraysEqual(userPath, optimalPath)) {
            breakdown.checkoutMatch = 50; // Tam eşleşme
        } else if (alternatives.some(alt => arraysEqual(userPath, alt))) {
            breakdown.checkoutMatch = 35; // Alternatif geçerli yol
        } else if (gameState.gameShot) {
            breakdown.checkoutMatch = 10; // Geçersiz ama bitirildi
        } else {
            breakdown.checkoutMatch = 0;
        }
    } else {
        // Veritabanında yoksa basit kontrol
        if (gameState.gameShot) {
            breakdown.checkoutMatch = 10;
        }
    }
    
    // Kriter 2: Dart Sayısı (Max 25 Puan)
    if (gameState.gameShot) {
        if (gameState.dartsUsed === 1) breakdown.dartCount = 25;
        else if (gameState.dartsUsed === 2) breakdown.dartCount = 20;
        else if (gameState.dartsUsed === 3) breakdown.dartCount = 15;
        else breakdown.dartCount = 0;
    } else {
        breakdown.dartCount = 0; // Bust
    }
    
    // Kriter 3: Setup Kalitesi (Max 15 Puan)
    if (gameState.currentVisit.length > 0) {
        const firstDart = gameState.currentVisit[0].notation;
        
        // Büyük Treble kontrolü
        if (firstDart.startsWith('T') && ['T20', 'T19', 'T18'].includes(firstDart)) {
            breakdown.setupQuality = 15;
        } 
        // Küçük Treble veya Single ile doğru setup
        else if (firstDart.startsWith('T') || firstDart.startsWith('S')) {
            // Basit kontrol: Eğer ilk dart sonrası hala bitirilebilir bir sayı bıraktıysa
            const afterFirst = gameState.targetScore - gameState.currentVisit[0].score;
            if (afterFirst > 0 && afterFirst <= 170 && !BOGEY_NUMBERS.includes(afterFirst)) {
                breakdown.setupQuality = 10;
            } else {
                breakdown.setupQuality = 0;
            }
        } else {
            breakdown.setupQuality = 0;
        }
    }
    
    // Kriter 4: Bitiriş Başarısı (Max 10 Puan)
    breakdown.finishSuccess = gameState.gameShot ? 10 : 0;
    
    // Toplam
    totalScore = breakdown.checkoutMatch + breakdown.dartCount + breakdown.setupQuality + breakdown.finishSuccess;
    
    // Store for display
    gameState.finalScore = Math.min(100, totalScore);
    gameState.scoreBreakdown = breakdown;
}

// Helper: Array equality check
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
}

// Show Result Modal
function showResultModal() {
    const modal = document.getElementById('resultModal');
    const breakdown = document.getElementById('scoreBreakdown');
    const totalScore = document.getElementById('totalScore');
    
    const bd = gameState.scoreBreakdown || {
        checkoutMatch: 0,
        dartCount: 0,
        setupQuality: 0,
        finishSuccess: 0
    };
    
    breakdown.innerHTML = `
        <div class="score-item">
            <span class="score-item-label">Checkout Uygunluğu:</span>
            <span class="score-item-value">${bd.checkoutMatch}/50</span>
        </div>
        <div class="score-item">
            <span class="score-item-label">Dart Sayısı:</span>
            <span class="score-item-value">${bd.dartCount}/25 (${gameState.dartsUsed} dart)</span>
        </div>
        <div class="score-item">
            <span class="score-item-label">Setup Kalitesi:</span>
            <span class="score-item-value">${bd.setupQuality}/15</span>
        </div>
        <div class="score-item">
            <span class="score-item-label">Bitiriş Başarısı:</span>
            <span class="score-item-value">${bd.finishSuccess}/10</span>
        </div>
    `;
    
    totalScore.textContent = gameState.finalScore || 0;
    modal.style.display = 'flex';
}

// Update UI
function updateUI() {
    // Update scores
    document.getElementById('targetScore').textContent = gameState.targetScore;
    document.getElementById('currentScore').textContent = gameState.currentScore;
    
    // Update dart counter
    for (let i = 1; i <= 3; i++) {
        const dartEl = document.getElementById(`dart${i}`);
        if (i <= gameState.dartsUsed) {
            dartEl.classList.add('used');
        } else {
            dartEl.classList.remove('used');
        }
    }
    
    // Update dart log
    updateDartLog();
}

// Update Dart Log
function updateDartLog() {
    const logItems = document.getElementById('logItems');
    logItems.innerHTML = '';
    
    gameState.currentVisit.forEach(dart => {
        const item = document.createElement('span');
        item.className = 'log-item';
        item.textContent = `[${dart.notation}]`;
        logItems.appendChild(item);
    });
}

// Update Message
function updateMessage(text, type = '') {
    const messageArea = document.getElementById('messageArea');
    messageArea.textContent = text;
    messageArea.className = `message-area ${type}`;
    
    // Clear message after 3 seconds
    setTimeout(() => {
        if (messageArea.textContent === text) {
            messageArea.textContent = '';
            messageArea.className = 'message-area';
        }
    }, 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

