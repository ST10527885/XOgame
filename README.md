# ICE Task 2 – Tic Tac Toe / X & O Game (Version 1)

## Introduction

This is Version 1 of a two-player Tic Tac Toe (X & O) game built with React Native, Expo and TypeScript. It was built by working through Stages 0 to 7 of the course development document, committing progress at each stage.

Players enter their names on a home screen and then play on a 3x3 board. The game alternates turns between X and O, detects wins and draws, tracks a running scoreboard, and lets the players start a new game or go back to change the player names.

## Technologies

- React Native with Expo
- TypeScript
- React Navigation (native stack)
- Git and GitHub

## Installation and Running

Install the dependencies and start the project:

```
npm install
npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
npx expo start
```

Then open the app in Expo Go or an emulator.

## Features (Version 1)

- Home screen where both players enter their names (blank names default to "Player 1" and "Player 2")
- Navigation from the name screen to the game screen, passing the names as route parameters
- 3x3 board rendered from a board state array
- Alternating X and O turns, with a turn indicator showing the current player's name
- Taken squares cannot be overwritten
- Winner detection across all 8 winning lines (3 rows, 3 columns, 2 diagonals)
- Draw detection when the board is full with no winner
- Moves are blocked once the game has ended
- "New Game" button that resets the board but keeps the scores
- Scoreboard tracking wins for X, wins for O, and draws
- "Change Players" button that returns to the name screen

## Development Stages

| Stage | What was added | What changed from the previous stage |
|-------|----------------|--------------------------------------|
| 0–1 | Project setup, navigation container and stack navigator | Created the project and installed React Navigation |
| 2 | `PlayerScreen` with name inputs, `GameScreen` that receives the names | Added `useState` for the names, `navigation.navigate` and `route.params` |
| 3 | 3x3 board | Added the `board` state array and rendered 9 squares with `map` |
| 4 | Taps and turns | Added `xIsNext` state and `handlePress` to place X or O and alternate players |
| 5 | Winner detection | Added the `WINNING_LINES` array and `calculateWinner`, and blocked moves after a win |
| 6 | Draw, status messages, reset | Added `isDraw`, a status message, and a `resetGame` function and button |
| 7 | Scoreboard and polish | Added `scores` state, default names, and a "Change Players" button |




## Testing

I ran the app as I progressed through each stage and checked the following in the final version:

- Blank player names fall back to "Player 1" and "Player 2".
- Tapping an occupied square does nothing.
- Turns alternate correctly between X and O.
- All 8 winning lines are detected for both X and O.
- No further moves are possible after a win or a draw.
- A full board with no winner is reported as a draw.
- "New Game" clears the board and keeps the scores.
- "Change Players" returns to the name screen.

## Screenshot
<img width="540" height="960" alt="Screenshot_2026 10 13_16 47 20 119" src="https://github.com/user-attachments/assets/73108e05-8afa-41fa-8e4d-e214a9deb24d" />




**Name:** [Your name]
**Repository:** [Your GitHub repository URL]
