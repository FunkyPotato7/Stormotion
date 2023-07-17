import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {GameRouteProps, HomeNavigationProps, Routes} from '../routes';

export const Game = () => {
  const {params} = useRoute<GameRouteProps<Routes.Game>>();
  const navigation = useNavigation<HomeNavigationProps>();

  const [matches, setMatches] = useState<number>(25);
  const [userMatches, setUserMatches] = useState<number>(0);
  const [AIMatches, setAIMatches] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [AITurn, setAITurn] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [firstAI, setFirstAI] = useState<boolean>(params.firstAI);

  const AI = (userPick: number) => {
    let AIPick = 0;

    setTimeout(() => {
      if (AIMatches % 2 === 0) {
        if (
          matches - userPick === 1 ||
          matches - userPick === 5 ||
          matches - userPick === 6 ||
          matches - userPick === 13 ||
          matches - userPick === 14 ||
          matches - userPick === 21 ||
          matches - userPick === 22
        ) {
          AIPick = 1;
          setAIMatches(AIMatches + AIPick);
        } else if (
          matches - userPick === 2 ||
          matches - userPick === 3 ||
          matches - userPick === 10 ||
          matches - userPick === 11 ||
          matches - userPick === 18 ||
          matches - userPick === 19
        ) {
          AIPick = 2;
          setAIMatches(AIMatches + AIPick);
        } else if (
          matches - userPick === 7 ||
          matches - userPick === 8 ||
          matches - userPick === 15 ||
          matches - userPick === 16 ||
          matches - userPick === 23 ||
          matches - userPick === 24
        ) {
          AIPick = 3;
          setAIMatches(AIMatches + AIPick);
        } else {
          AIPick = Math.ceil(Math.random() * 3);
          setAIMatches(AIMatches + AIPick);
        }
      }

      if (AIMatches % 2 !== 0) {
        if (
          matches - userPick === 1 ||
          matches - userPick === 2 ||
          matches - userPick === 6 ||
          matches - userPick === 9 ||
          matches - userPick === 10 ||
          matches - userPick === 17 ||
          matches - userPick === 18
        ) {
          AIPick = 1;
          setAIMatches(AIMatches + AIPick);
        } else if (
          matches - userPick === 7 ||
          matches - userPick === 14 ||
          matches - userPick === 15 ||
          matches - userPick === 22 ||
          matches - userPick === 23
        ) {
          AIPick = 2;
          setAIMatches(AIMatches + AIPick);
        } else if (
          matches - userPick === 3 ||
          matches - userPick === 4 ||
          matches - userPick === 11 ||
          matches - userPick === 12 ||
          matches - userPick === 19 ||
          matches - userPick === 20
        ) {
          AIPick = 3;
          setAIMatches(AIMatches + AIPick);
        } else {
          AIPick = Math.ceil(Math.random() * 3);
          setAIMatches(AIMatches + AIPick);
        }
      }

      setAITurn(false);
      setRound(round + 1);
      setMatches(matches - (AIPick + userPick));
    }, 2000);
  };

  useEffect(() => {
    if (matches <= 0) {
      setEnd(true);
    }
    if (firstAI) {
      setAITurn(true);
      AI(0);
      setFirstAI(false);
    }
  }, [matches, firstAI, AI]);

  const handlePick = (userPick: number) => {
    setMatches(matches - userPick);
    setUserMatches(userMatches + userPick);
    setAITurn(true);

    if (matches - userPick <= 0) {
      setEnd(true);
      return;
    }

    AI(userPick);
  };

  const restart = () => {
    setMatches(25);
    setRound(1);
    setUserMatches(0);
    setAIMatches(0);
    setAITurn(false);
    setEnd(false);
  };

  const components = Array.from({length: matches}, (value, index) => (
    <Text key={index} style={styles.match}>
      🔥
    </Text>
  ));

  return (
    <SafeAreaView>
      <View style={styles.window}>
        <Text style={styles.roundCaption}>Round: {round}</Text>
        <View style={styles.main}>{components}</View>
        <View>
          <Text style={{padding: 10}}>Matches left: {matches}</Text>
          <Text style={styles.turnCaption}>
            {AITurn ? "Opponent's" : 'Your'} turn
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              disabled={AITurn || matches < 1}
              onPress={() => handlePick(1)}
              style={AITurn || matches < 1 ? styles.disabled : styles.button}>
              <Text>Pick 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={AITurn || matches < 2}
              onPress={() => handlePick(2)}
              style={AITurn || matches < 2 ? styles.disabled : styles.button}>
              <Text>Pick 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={AITurn || matches < 3}
              onPress={() => handlePick(3)}
              style={AITurn || matches < 3 ? styles.disabled : styles.button}>
              <Text>Pick 3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBar}>
            <Text>Your matches: {userMatches}</Text>
            <Text>Opponent's matches: {AIMatches}</Text>
          </View>
          <Button disabled={end} title={'Restart'} onPress={restart} />
        </View>
      </View>
      {end && (
        <View style={styles.popup}>
          <Text style={{fontSize: 30}}>
            You {userMatches % 2 === 0 ? 'win! 🔥' : 'lost!'}
          </Text>
          <View style={styles.popupButtons}>
            <Button title={'Play Again'} onPress={restart} />
            <Button
              title={'Leave'}
              onPress={() => navigation.navigate(Routes.Home)}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  window: {
    height: '100%',
    justifyContent: 'space-between',
  },
  turnCaption: {
    alignSelf: 'center',
    padding: 20,
  },
  roundCaption: {
    alignSelf: 'center',
    padding: 10,
  },
  popup: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 350,
    backgroundColor: 'white',
  },
  popupButtons: {
    height: 80,
    justifyContent: 'space-between',
    margin: 20,
  },
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    maxWidth: '77%',
  },
  match: {
    fontSize: 30,
    width: 50,
    height: 50,
    margin: 5,
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '30%',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'pink',
  },
  bottomBar: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  disabled: {
    width: '30%',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'lightgray',
  },
});
