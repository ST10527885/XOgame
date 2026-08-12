import {useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');

  return (
    <View style={styles.container}>
     <Text style= {styles.title}>Welocome to Tic-Tac-Toe!</Text>
     <TextInput
     placeholder="Player 1 Name"
     value={player1}
     onChangeText={setPlayer1}
     style= {styles.input}
     />

     <TextInput
     placeholder="Player 2 Name"
     value={player2}
     onChangeText={setPlayer2}
     style= {styles.input}
     />

     <Button
     title='Start Game'
     onPress={() => console.log('Player 1: ${player1}, Player 2: ${player2}')}
     />
      
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: '80%'
  }
});
