// Test script for Z-Cyclic Whist Algorithm
// Run with: node test-algorithm.js

const PLAYERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];

function generateMatches() {
    const matches = [];
    let matchId = 1;

    // Base round configuration (proven to work with cyclic rotation)
    const baseRound = [
        [[14, 15], [2, 4]],
        [[5, 8], [13, 7]],
        [[12, 16], [9, 1]],
        [[6, 11], [10, 3]]
    ];

    const indexToPlayer = (index) => PLAYERS[index];

    // Generate 17 rounds using cyclic rotation
    for (let round = 0; round < 17; round++) {
        const roundMatches = [];

        // Player 0 sits in round 0, player 1 sits in round 1, etc.
        const sittingIndex = round % 17;
        const sittingPlayer = indexToPlayer(sittingIndex);

        for (const [[a, b], [c, d]] of baseRound) {
            const p1 = (a + round) % 17;
            const p2 = (b + round) % 17;
            const p3 = (c + round) % 17;
            const p4 = (d + round) % 17;

            roundMatches.push({
                id: matchId++,
                round: round + 1,
                team1: [indexToPlayer(p1), indexToPlayer(p2)],
                team2: [indexToPlayer(p3), indexToPlayer(p4)],
                resting: sittingPlayer
            });
        }

        matches.push(...roundMatches);
    }

    return matches;
}

function verifySchedule(matches) {
    console.log('='.repeat(80));
    console.log('TESTING Z-CYCLIC WHIST ALGORITHM FOR 17 PLAYERS');
    console.log('='.repeat(80));
    console.log();

    // Initialize tracking structures
    const partnerships = {};
    const oppositions = {};
    const gamesPerPlayer = {};
    const restsPerPlayer = {};

    PLAYERS.forEach(p1 => {
        gamesPerPlayer[p1] = 0;
        restsPerPlayer[p1] = 0;
        partnerships[p1] = {};
        oppositions[p1] = {};
        PLAYERS.forEach(p2 => {
            if (p1 !== p2) {
                partnerships[p1][p2] = 0;
                oppositions[p1][p2] = 0;
            }
        });
    });

    // Track rounds we've seen to count rests only once per round
    const roundsProcessed = new Set();

    // Process all matches
    matches.forEach(match => {
        const [p1, p2] = match.team1;
        const [p3, p4] = match.team2;

        // Record partnerships
        partnerships[p1][p2]++;
        partnerships[p2][p1]++;
        partnerships[p3][p4]++;
        partnerships[p4][p3]++;

        // Record oppositions
        oppositions[p1][p3]++;
        oppositions[p1][p4]++;
        oppositions[p2][p3]++;
        oppositions[p2][p4]++;
        oppositions[p3][p1]++;
        oppositions[p4][p1]++;
        oppositions[p3][p2]++;
        oppositions[p4][p2]++;

        // Record games played
        gamesPerPlayer[p1]++;
        gamesPerPlayer[p2]++;
        gamesPerPlayer[p3]++;
        gamesPerPlayer[p4]++;

        // Record rests (only once per round)
        if (!roundsProcessed.has(match.round)) {
            restsPerPlayer[match.resting]++;
            roundsProcessed.add(match.round);
        }
    });

    // Verify results
    console.log('TEST 1: Total Matches');
    console.log(`  Expected: 68 matches`);
    console.log(`  Actual: ${matches.length} matches`);
    console.log(`  Result: ${matches.length === 68 ? '✓ PASS' : '✗ FAIL'}`);
    console.log();

    console.log('TEST 2: Games Per Player (should be 16 for all)');
    let gamesPass = true;
    PLAYERS.forEach(player => {
        const games = gamesPerPlayer[player];
        if (games !== 16) {
            console.log(`  ${player}: ${games} games ✗ FAIL`);
            gamesPass = false;
        }
    });
    if (gamesPass) {
        console.log(`  All players: 16 games ✓ PASS`);
    }
    console.log();

    console.log('TEST 3: Rests Per Player (should be 1 for all)');
    let restsPass = true;
    PLAYERS.forEach(player => {
        const rests = restsPerPlayer[player];
        if (rests !== 1) {
            console.log(`  ${player}: ${rests} rests ✗ FAIL`);
            restsPass = false;
        }
    });
    if (restsPass) {
        console.log(`  All players: 1 rest ✓ PASS`);
    }
    console.log();

    console.log('TEST 4: Partnerships (should be exactly 1 for all pairs)');
    let partnershipPass = true;
    let partnershipCount = 0;
    for (let i = 0; i < PLAYERS.length; i++) {
        for (let j = i + 1; j < PLAYERS.length; j++) {
            const p1 = PLAYERS[i];
            const p2 = PLAYERS[j];
            const count = partnerships[p1][p2];
            partnershipCount += count;
            if (count !== 1) {
                console.log(`  ${p1}-${p2}: ${count} times ✗ FAIL`);
                partnershipPass = false;
            }
        }
    }
    if (partnershipPass) {
        console.log(`  All 136 partnerships: exactly 1 time ✓ PASS`);
        console.log(`  Total partnerships used: ${partnershipCount}`);
    }
    console.log();

    console.log('TEST 5: Oppositions (should be exactly 2 for all pairs)');
    let oppositionPass = true;
    let oppositionCount = 0;
    for (let i = 0; i < PLAYERS.length; i++) {
        for (let j = i + 1; j < PLAYERS.length; j++) {
            const p1 = PLAYERS[i];
            const p2 = PLAYERS[j];
            const count = oppositions[p1][p2];
            oppositionCount += count;
            if (count !== 2) {
                console.log(`  ${p1} vs ${p2}: ${count} times ✗ FAIL`);
                oppositionPass = false;
            }
        }
    }
    if (oppositionPass) {
        console.log(`  All 136 oppositions: exactly 2 times ✓ PASS`);
        console.log(`  Total oppositions: ${oppositionCount}`);
    }
    console.log();

    console.log('='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    const allPass = matches.length === 68 && gamesPass && restsPass && partnershipPass && oppositionPass;
    if (allPass) {
        console.log('✓ ALL TESTS PASSED - Perfect distribution achieved!');
        console.log('The Z-Cyclic algorithm successfully generates a perfect schedule.');
    } else {
        console.log('✗ SOME TESTS FAILED - Distribution is not perfect.');
    }
    console.log();

    // Print sample rounds
    console.log('='.repeat(80));
    console.log('SAMPLE: First 3 Rounds');
    console.log('='.repeat(80));
    for (let r = 1; r <= 3; r++) {
        console.log();
        console.log(`Round ${r}:`);
        const roundMatches = matches.filter(m => m.round === r);
        console.log(`  Resting: ${roundMatches[0].resting}`);
        roundMatches.forEach(m => {
            console.log(`  Match #${m.id}: ${m.team1.join('&')} vs ${m.team2.join('&')}`);
        });
    }
    console.log();

    return allPass;
}

// Run tests
const matches = generateMatches();
const success = verifySchedule(matches);
process.exit(success ? 0 : 1);
