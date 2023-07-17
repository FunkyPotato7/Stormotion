import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {HomeNavigationProps, Routes} from '../routes';

export const Home = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigation = useNavigation<HomeNavigationProps>();

  return (
    <SafeAreaView>
      <View style={styles.window}>
        <Text style={styles.title}>{'Pick\n the\n Matches'}</Text>
        <Button title={'Play'} onPress={() => setOpen(true)} />
      </View>
      {open && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>Choose the mode</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate(Routes.Game, {firstAI: false});
                setOpen(false);
              }}>
              <Text>First goes player</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate(Routes.Game, {firstAI: true});
                setOpen(false);
              }}>
              <Text>First goes AI</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  window: {
    alignSelf: 'center',
    height: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 40,
    marginBottom: 40,
  },
  popup: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: 'white',
  },
  popupText: {
    fontSize: 30,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  button: {
    width: 140,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'pink',
  },
});
