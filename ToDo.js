import React,{Component} from 'react';
import { View ,StyleSheet,Text, TouchableOpacity} from 'react-native';

export default class ToDo extends React.Component {
  render(){
    return (
      <View style={styles.container}>
          <Text>Hello! i'm from TODO haha</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
    
  }
});
