/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Button, Header, Icon, Left, Right} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import ValidatedInput from './src/components/ValidatedInput';
import {COLORS} from './src/utils/enums';
const animation = new Animated.Value(0);

const App = () => {
  const [useBvn, togBvn] = useState(false);
  const [value, setValue] = useState(null);
  const interpolated = animation.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15, 0, -15, 0],
  });
  const animStyle = {
    transform: [
      {
        translateX: interpolated,
      },
    ],
  };


  const onButtonPressed = () => {
    try {
      if(!value) throw Error("Empty input field")
    } catch (error) {
      triggerAnimation();  
    }
  };

  const triggerAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      useNativeDriver: true,
      duration: 400,
      toValue: 3,
      easing: Easing.bounce,
    }).start();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header style={styles.header}>
        <Left>
          <TouchableOpacity>
            <Icon type="AntDesign" name="arrowleft" />
          </TouchableOpacity>
        </Left>
        <Right />
      </Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={[styles.body]}>
          <Text style={[styles.headerText]}>Welcome to Access!</Text>
          <Text style={[styles.subText, {color: COLORS.grey}]}>
            In order to open an account, please enter E-mail below
          </Text>
          <TouchableOpacity onPress={() => togBvn(!useBvn)}>
            <Text style={[styles.subText, {color: COLORS.orange}]}>
              Create account with {useBvn ? 'Email' : 'BVN'}
            </Text>
          </TouchableOpacity>
          <View>
            <Animated.View style={animStyle}>
              {useBvn ? (
                <ValidatedInput
                  label={'Number'}
                  type={'number'}
                  onChange={(text) => setValue(text)}
                  required={true}
                />
              ) : (
                <ValidatedInput
                  label={'E-mail'}
                  type={'email'}
                  onChange={(text) => setValue(text)}
                  required={true}
                />
              )}
            </Animated.View>
            <TouchableOpacity>
              <Text style={[styles.subText, {marginBottom: 0}]}>
                Already have an account? Log in!
              </Text>
            </TouchableOpacity>
            <Button onPress={onButtonPressed} block style={styles.button}>
              <Text style={{color: COLORS.white}}>CONTINUE</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.light,
  },
  scrollView: {
    backgroundColor: COLORS.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  button: {
    backgroundColor: COLORS.orange,
    marginTop: 20,
  },
  body: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subText: {
    fontSize: 15,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
