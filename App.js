/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  
} from 'react-native';

import { HomePage } from "./HomePage";

const App: () => React$Node = () => {
  return (
    <SafeAreaView>
      <HomePage/>
    </SafeAreaView>
  );
};


export default App;
