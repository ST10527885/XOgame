import {useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 const Stack = createNativeStackNavigator();

export default function App() {
 return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={PlayerScreen}/>
      <Stack.Screen name="Game" component={GameScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
 );
 
}

function PlayerScreen({navigation}:any){
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
     onPress={() => {navigation.navigate ("Game", {player1: player1, player2: player2})}}
     />
      
    </View>
  );

}

function GameScreen ({navigation, route }: any){
  const {palyer1, player2} = route.parms;
return(
  <View style={styles.container}>
    <Text style={styles.title}>Game Screen</Text>
    <Text style={styles.title}>{palyer1} vs. {player2}</Text>
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
})
