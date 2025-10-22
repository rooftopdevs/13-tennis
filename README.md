# Tennis League Management System
## 17-Player Doubles League

A complete web-based management system for running a fair and balanced doubles tennis league with 17 players.

---

## Quick Start

1. Open `tennis-league.html` in any modern web browser
2. The system automatically generates 85 matches across 21 rounds
3. Navigate between tabs to view different information
4. Enter match results as games are played
5. Track live standings and statistics

---

## System Overview

### League Structure
- **Total Players**: 17 (labeled A through Q)
- **Format**: Doubles only (2v2 matches)
- **Total Matches**: 85 matches
- **Rounds**: 21 rounds with 4 matches per round
- **Games per Player**: Each player plays 20 matches
- **Rest Rotation**: 1 player rests each round (rotating fairly)

### Scoring System
- **Win**: 2 points
- **Loss**: 0 points
- **Rankings**: Based on total points (wins as tiebreaker)

---

## Features Guide

### 1. Match Schedule Tab
**Purpose**: View all matches organized by rounds

**Features**:
- Complete 85-match schedule pre-generated
- Organized by rounds (21 total)
- Each match shows:
  - Match ID and round number
  - Team 1 (two partners)
  - Team 2 (two opponents)
  - Resting player
  - Match status (Pending/Won)
- Filter by player to see individual schedules
- Color-coded results (green = Team 1 won, red = Team 2 won)

**How to Use**:
1. Select a player from the dropdown to filter their matches
2. Select "All Matches" to see complete schedule
3. Print-friendly format for posting at tennis club

---

### 2. Live Standings Tab
**Purpose**: Real-time rankings and performance tracking

**Features**:
- Sortable columns (click any header to sort)
- Displays for each player:
  - Current rank
  - Matches played
  - Wins and losses
  - Total points
  - Win rate percentage
- Top 3 players highlighted
- Leader highlighted in gold

**How to Use**:
1. Click column headers to sort
2. Click again to reverse sort order
3. Default sort is by points (highest first)

---

### 3. Player Stats Tab
**Purpose**: Detailed individual player statistics

**Features**:
- Overview cards showing:
  - Matches played
  - Wins/Losses
  - Total points
- Partnership statistics (who they've played with and how often)
- Opposition statistics (who they've faced and how often)
- Complete match history with results
- Color-coded results (green border = won, red = lost)

**How to Use**:
1. Select a player from dropdown
2. View comprehensive statistics
3. Track partnership patterns
4. Review match-by-match history

---

### 4. Matchup Matrix Tab
**Purpose**: Visual representation of all player interactions

**Features**:
- Grid showing all player combinations
- Color coding:
  - **Green**: Players who partnered together
  - **Red**: Players who faced as opponents
  - **Purple**: Players who both partnered AND opposed
  - **Gray**: No matchup yet
- Numbers show frequency of matchups
- Hover over cells for details

**How to Use**:
1. Find a player on the left column
2. Read across to see their relationships with other players
3. Verify fair distribution of partnerships and oppositions

---

### 5. Enter Results Tab
**Purpose**: Input match outcomes as they are played

**Features**:
- Dropdown showing only unplayed matches
- Clear match details display
- Simple winner selection
- Automatic statistics updates
- Validation to prevent errors

**How to Use**:
1. Select match from dropdown (shows only pending matches)
2. Review match details
3. Select winning team (Team 1 or Team 2)
4. Click "Submit Result"
5. System automatically:
   - Updates player statistics
   - Recalculates standings
   - Removes match from pending list
   - Saves to browser storage

---

## Data Management

### Auto-Save
- All data automatically saves to browser's localStorage
- Data persists between sessions
- No internet connection required

### Export Data
- Click "Export Data" button
- Downloads JSON file with complete league state
- Filename includes current date
- Use for backups or sharing

### Import Data
- Click "Import Data" button
- Select previously exported JSON file
- Restores complete league state
- Useful for:
  - Recovering from browser clear
  - Transferring between devices
  - Sharing with co-organizers

### Reset League
- Click "Reset League" button
- Confirms before proceeding (irreversible!)
- Generates fresh 85-match schedule
- Clears all results and statistics
- Use at start of new season

### Print Schedule
- Click "Print Schedule" button
- Optimized print layout
- Hides navigation and buttons
- Perfect for posting at tennis facility
- Shows complete schedule by rounds

---

## Match Generation Algorithm

### Overview
The system uses a sophisticated weighted matching algorithm to ensure fair and balanced competition.

### Algorithm Goals
1. **Partnership Variety**: Each player partners with as many different players as possible
2. **Opposition Variety**: Each player faces as many different opponents as possible
3. **Fair Rest Distribution**: Rest periods distributed evenly across all players
4. **Balanced Game Counts**: Players accumulate games at similar rates

### How It Works

#### Round Structure
- Each round has 4 matches
- 16 players participate (4 matches × 4 players)
- 1 player rests per round
- Continues for 21 rounds until all players reach 20 games

#### Match Selection Process

**Step 1: Determine Resting Player**
- Selects player with fewest rest periods
- Among those, prefers player with most games played
- Ensures even rest distribution

**Step 2: Select 4 Players for Each Match**
- Prioritizes players with fewer games played
- Creates candidate pool of 8 players
- Tests multiple random combinations (50 attempts per match)

**Step 3: Score Match Quality**
The algorithm scores each potential match based on:

- **Partnership Novelty** (-10 points per repeated partnership)
  - Heavily penalizes playing with same partner again
  - Encourages variety in partnerships

- **Opposition Novelty** (-5 points per repeated opposition)
  - Penalizes facing same opponents again
  - Ensures diverse competition

- **Game Balance** (-2 points per game difference)
  - Reduces spread between players' total games
  - Keeps all players progressing together

**Step 4: Select Best Match**
- Chooses combination with highest quality score
- Updates tracking matrices
- Adds to current round

#### Tracking Matrices

The algorithm maintains several data structures:

1. **playerGames{}**: Total games played per player
2. **restCounts{}**: Number of rest periods per player
3. **partnerships{}**: 2D matrix of partnership frequencies
4. **oppositions{}**: 2D matrix of opposition frequencies

### Algorithm Guarantees

✓ Each player plays exactly 20 games (or very close)
✓ Rest periods distributed evenly (1-2 per player)
✓ Most partnerships occur only once
✓ Most oppositions occur only once
✓ Variety maximized within mathematical constraints

### Mathematical Constraints

With 17 players:
- Possible unique partners: 16 per player
- Possible unique opponents: 16 per player
- In 20 games, each player partners 20 times (some repeats necessary)
- In 20 games, each player faces 40 opponents (some repeats necessary)

The algorithm minimizes but cannot eliminate all repeats due to these constraints.

---

## Usage Recommendations

### Before League Starts
1. Open the system and verify 85 matches generated
2. Export data as backup
3. Print schedule for posting
4. Share file with all participants

### During League
1. Enter results after each playing session
2. Check standings regularly
3. Use matchup matrix to verify fairness
4. Export data weekly as backup

### Weekly Routine
1. Announce upcoming round matches
2. Collect results from completed matches
3. Enter results into system
4. Share updated standings with players
5. Remind players of next round schedule

### End of Season
1. Review final standings
2. Export final data for records
3. Use player stats for awards/recognition
4. Reset for new season when ready

---

## Technical Specifications

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Requirements
- JavaScript enabled
- LocalStorage enabled (for data persistence)
- No internet connection required (after initial load)

### File Structure
- Single HTML file (fully self-contained)
- Embedded CSS (Tailwind via CDN)
- Embedded JavaScript
- No external dependencies for core functionality

### Mobile Responsive
- Fully responsive design
- Works on phones, tablets, and desktops
- Touch-friendly interface
- Optimized table scrolling

---

## Troubleshooting

### Data Lost After Browser Clear
- **Solution**: Use Export/Import feature regularly
- **Prevention**: Export data weekly

### Matches Not Appearing
- **Solution**: Reset league (generates new schedule)
- **Check**: Browser JavaScript is enabled

### Results Not Saving
- **Solution**: Check browser localStorage is enabled
- **Check**: Not in private/incognito mode

### Print Layout Issues
- **Solution**: Use print button (not browser print)
- **Try**: Print to PDF first, then print PDF

---

## Customization Guide

### Change Player Names
In the HTML file, find:
```javascript
const PLAYERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
```

Replace letters with actual names:
```javascript
const PLAYERS = ['John', 'Jane', 'Mike', 'Sarah', ...];
```

### Adjust Scoring
Find:
```javascript
leagueData.playerStats[player].points += 2;  // Win = 2 points
```

Change value as needed:
```javascript
leagueData.playerStats[player].points += 3;  // Win = 3 points
```

### Modify Colors
Search for Tailwind color classes and modify:
- `bg-blue-500` → `bg-green-500`
- `text-red-600` → `text-orange-600`

---

## Support & Contact

For issues or questions:
1. Check Troubleshooting section above
2. Review algorithm explanation
3. Verify browser compatibility
4. Test with exported/imported data

---

## Version History

**v1.0** - Initial Release
- 85-match generation algorithm
- Live standings tracking
- Player statistics
- Matchup matrix visualization
- Data persistence and export/import
- Print-friendly layouts

---

## License

Free to use and modify for tennis league management.

---

**Happy Playing! 🎾**