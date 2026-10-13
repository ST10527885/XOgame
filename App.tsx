// ============================================================
// IMPORTS
// ============================================================
import { useState } from 'react';
// Stage 3 added TouchableOpacity to your original import list
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

// Stage 1-2 (your code): navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// ============================================================
// TYPES (Stage 3 and 7)
// ============================================================
type SquareValue = 'X' | 'O' | null;

// Stage 7: scoreboard shape
type Scores = {
  x: number;
  o: number;
  draws: number;
};

// ============================================================
// WINNER LOGIC (Stage 5)
// ============================================================
const WINNING_LINES: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

function calculateWinner(squares: SquareValue[]): SquareValue {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ============================================================
// APP + NAVIGATION (Stage 1-2, your code)
// ============================================================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={PlayerScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ============================================================
// PLAYER SCREEN (Stage 2, your code)
// Fixed: "Welocome" -> "Welcome"
// Stage 7: blank names now default to "Player 1" / "Player 2"
// ============================================================
function PlayerScreen({ navigation }: any) {
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Tic-Tac-Toe!</Text>

      <TextInput
        placeholder="Player 1 Name"
        value={player1}
        onChangeText={setPlayer1}
        style={styles.input}
      />

      <TextInput
        placeholder="Player 2 Name"
        value={player2}
        onChangeText={setPlayer2}
        style={styles.input}
      />

      <Button
        title="Start Game"
        onPress={() =>
          navigation.navigate('Game', {
            player1: player1.trim() || 'Player 1', // Stage 7
            player2: player2.trim() || 'Player 2', // Stage 7
          })
        }
      />
    </View>
  );
}

// ============================================================
// GAME SCREEN
// ============================================================
function GameScreen({ navigation, route }: any) {
  // Stage 2 (your code). Fixed: route.parms -> route.params, palyer1 -> player1
  const { player1, player2 } = route.params;

  // Stage 3: board state (9 squares, all empty at the start)
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));

  // Stage 4: whose turn is it? X always starts
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  // Stage 7: scoreboard state
  const [scores, setScores] = useState<Scores>({ x: 0, o: 0, draws: 0 });

  // Stage 5: check for a winner on every render
  const winner = calculateWinner(board);

  // Stage 6: draw = no winner and every square filled
  const isDraw = !winner && board.every((square) => square !== null);

  // Stage 6: status message shown above the board
  let statusMessage: string;
  if (winner) {
    statusMessage = `${winner === 'X' ? player1 : player2} wins!`;
  } else if (isDraw) {
    statusMessage = "It's a draw!";
  } else {
    statusMessage = xIsNext ? `${player1}'s turn (X)` : `${player2}'s turn (O)`;
  }

  // Stage 4: handle a tap on a square
  // Stage 5/6: ignore taps once the game is over
  const handlePress = (index: number) => {
    if (board[index] !== null || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    // Stage 7: update the scoreboard once, when the game ends
    const newWinner = calculateWinner(newBoard);
    if (newWinner === 'X') {
      setScores((s) => ({ ...s, x: s.x + 1 }));
    } else if (newWinner === 'O') {
      setScores((s) => ({ ...s, o: s.o + 1 }));
    } else if (newBoard.every((square) => square !== null)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }
  };

  // Stage 6: reset the board but keep the scores
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <View style={styles.container}>
      {/* Stage 2 (your code): the "player1 vs. player2" heading */}
      <Text style={styles.title}>
        {player1} vs. {player2}
      </Text>

      {/* Stage 7: scoreboard */}
      <Text style={styles.scoreText}>
        {player1} (X): {scores.x}   |   {player2} (O): {scores.o}   |   Draws: {scores.draws}
      </Text>

      {/* Stage 4 and 6: turn / winner / draw message */}
      <Text style={styles.status}>{statusMessage}</Text>

      {/* Stage 3: the 3x3 board */}
      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.square}
            onPress={() => handlePress(index)} // Stage 4
          >
            <Text style={styles.squareText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stage 6: New Game button */}
      <View style={styles.buttonRow}>
        <Button title="New Game" onPress={resetGame} />
      </View>

      {/* Stage 7: go back to the name screen */}
      <View style={styles.buttonRow}>
        <Button title="Change Players" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

// ============================================================
// STYLES
// ============================================================
const styles = StyleSheet.create({
  // Stage 1-2 (your styles, unchanged)
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
    width: '80%',
  },

  // Stage 3: board
  board: {
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 48,
    fontWeight: 'bold',
  },

  // Stage 4: turn indicator
  status: {
    fontSize: 20,
    marginBottom: 16,
  },

  // Stage 6: buttons
  buttonRow: {
    marginTop: 20,
  },

  // Stage 7: scoreboard
  scoreText: {
    fontSize: 14,
    marginBottom: 8,
  },
});
