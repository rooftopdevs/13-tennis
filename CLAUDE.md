# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A self-contained web-based Tennis League Management System for managing a 17-player doubles tennis league with 85 matches across 21 rounds. The entire application is contained in a single HTML file with embedded JavaScript and Tailwind CSS.

**Key Stats:**
- 17 players (labeled A-Q)
- 85 total matches
- 21 rounds (4 matches per round)
- 1 player rests each round
- Each player plays exactly 20 matches

## Commands

### Starting the Server
```bash
bash start-server.sh
```
This launches a Python HTTP server on port 8000 and displays local/network URLs for accessing the application. The script auto-detects the Mac's local IP for network access.

### Opening the Application
```bash
open tennis-league.html
```
Opens directly in default browser (no server required for basic use).

## Architecture

### Single-File Application Structure

The entire system is in [tennis-league.html](tennis-league.html) with three main sections:

**1. HTML Structure (lines 1-194)**
- Header with action buttons (reset, export, import, print)
- Tab navigation (5 views: schedule, standings, players, matrix, input)
- Content containers for each view

**2. CSS Styling (lines 8-47)**
- Print-specific styles (`.no-print`, `.print-break`)
- Tab activation styles
- Sortable table and matrix cell interactions

**3. JavaScript Application (lines 196-948)**

#### Core Data Structures

```javascript
leagueData = {
    matches: [],      // Generated match schedule
    results: {},      // Match outcomes {matchId: {winner, timestamp}}
    playerStats: {}   // Per-player statistics
}
```

#### Key Algorithm: Match Generation (lines 230-368)

The `generateMatches()` function uses a weighted scoring algorithm to create fair matches:

**Tracking Structures:**
- `playerGames{}` - Total games per player
- `restCounts{}` - Rest periods per player
- `partnerships{}` - 2D matrix of partnership frequencies
- `oppositions{}` - 2D matrix of opposition frequencies

**Match Quality Scoring:**
- Partnership novelty: -10 points per repeated partnership
- Opposition novelty: -5 points per repeated opposition
- Game balance: -2 points per game count difference

The algorithm:
1. Selects resting player (prioritizes least rest periods)
2. Creates candidate pool (8 players with fewest games)
3. Tests 50 random combinations per match
4. Scores each combination
5. Selects highest-scoring match
6. Updates tracking matrices

#### State Management & Persistence

**localStorage Integration (lines 872-890):**
- Auto-saves on every change via `saveData()`
- Auto-loads on page initialization via `loadData()`
- Key: `'tennisLeagueData'`
- Format: JSON stringified `leagueData`

**Data Operations:**
- `exportData()` - Downloads JSON with date-stamped filename
- `importData()` - File upload with validation
- `resetLeague()` - Confirms before regenerating matches

#### Tab System & Rendering

Each tab has a dedicated render function:
- `renderSchedule()` - Groups matches by round, applies player filter
- `renderStandings()` - Calculates rankings, supports column sorting
- `renderPlayerStats()` - Shows individual stats, partners, opponents, history
- `renderMatrix()` - Visualizes partnerships (green) vs oppositions (red)
- `renderMatchInput()` - Lists pending matches, handles result submission

### UI/UX Features

**Sorting System (lines 481-543):**
- Stores current sort in `currentSort = {field, ascending}`
- Updates arrow indicators dynamically
- Supports all standings columns

**Match Result Submission (lines 797-869):**
1. Select pending match from dropdown
2. Display match details
3. Choose winning team
4. Update both winners' and losers' stats:
   - `wins`, `losses`, `points` (+2 for win)
   - `partners{}`, `opponents{}`
   - `matchesPlayed`
5. Save to localStorage
6. Clear form and refresh match list

## File Structure

```
tennis13/
├── tennis-league.html      # Complete application
├── start-server.sh         # HTTP server launcher
├── README.md              # Comprehensive user documentation
├── SCHEDULE.md            # Pre-generated match schedule reference
└── .claude/
    └── settings.local.json
```

## Important Constants

Located in [tennis-league.html:198-202](tennis-league.html#L198-L202):

```javascript
const PLAYERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
const TOTAL_PLAYERS = 17;
const TARGET_GAMES = 20;
const MATCHES_PER_ROUND = 4;
const TOTAL_MATCHES = 85;
```

## Customization Points

### Changing Player Names
Modify `PLAYERS` array in [tennis-league.html:198](tennis-league.html#L198). Replace single letters with actual names.

### Adjusting Scoring
Modify win point value in [tennis-league.html:821](tennis-league.html#L821):
```javascript
leagueData.playerStats[player].points += 2;  // Current: 2 points per win
```

### Modifying Match Generation Weights
Adjust penalty values in scoring function [tennis-league.html:309-321](tennis-league.html#L309-L321):
- Line 309: Partnership penalty (currently -10)
- Line 313: Opposition penalty (currently -5)
- Line 321: Game balance penalty (currently -2)

### Changing Language
The application is currently in Korean. To change to English, find and replace UI text strings throughout the HTML (tabs, buttons, labels, alerts).

## Development Workflow

1. **Make Changes**: Edit [tennis-league.html](tennis-league.html)
2. **Test Locally**: Open file directly or use `bash start-server.sh`
3. **Test Match Generation**: Click "리그 초기화" (Reset League) to regenerate schedule
4. **Test Data Persistence**: Enter results, refresh page, verify data persists
5. **Test Export/Import**: Export JSON, reset league, import JSON, verify restoration

## Testing Scenarios

### Match Generation Quality
After reset, verify in "매치업 매트릭스" (Matchup Matrix) tab:
- Most cells should be green (1-2 partnerships) or red (1-2 oppositions)
- Avoid excessive purple cells (both partner AND opponent)
- Gray cells indicate no interaction (acceptable in 17-player system)

### Result Tracking
1. Go to "결과 입력" (Enter Results) tab
2. Select pending match
3. Submit winner
4. Verify "순위표" (Standings) updates immediately
5. Verify "선수 통계" (Player Stats) reflects new result

### Data Persistence
1. Enter several results
2. Export data (backup)
3. Refresh browser
4. Verify results persist
5. Reset league
6. Import backup
7. Verify restoration

## Browser Compatibility

Requires modern browser with:
- ES6 JavaScript support
- localStorage API
- CSS Grid/Flexbox
- File API (for import/export)

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Key Technical Constraints

**Mathematical Limits:**
- With 17 players, each player has 16 possible partners
- In 20 games, each player partners 20 times (some repeats necessary)
- In 20 games, each player faces 40 opponents (some repeats necessary)
- Algorithm minimizes but cannot eliminate all repeats

**Algorithm Safety:**
- Round generation has 1000-attempt limit (line 283)
- Match generation has 50-combination limit (line 301)
- Round cap at 25 to prevent infinite loops (line 364)

## Documentation Reference

[README.md](README.md) contains:
- Detailed feature explanations
- Match generation algorithm walkthrough
- User guide for all tabs
- Troubleshooting guide
- Customization instructions

[SCHEDULE.md](SCHEDULE.md) contains:
- Pre-generated example of 85 matches
- Round-by-round breakdown
- Reference for expected output format
