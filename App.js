import React from 'react';
import { StyleSheet,Text, View ,StatusBar,TextInput,Dimensions,Platform,ScrollView} from 'react-native';
import ToDo from "./ToDo";

const {height,width} = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo:""
  }
  render(){ 
    const {newToDo} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"}
            placeholderTextColor={"#999"}
            value={newToDo} 
            onChangeText={this._controllNewToDo}
            returnKeyType={"done"}
            autoCorrect={false}
            />
            <ScrollView>
              <ToDo />
            </ScrollView>
        </View>
      </View>
    );
  }
}
_controllNewToDo=text=>{
    this.setState({
      newToDo:text
    })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
    
  },
  title:{
    color:"#FFF",
    fontSize:30,
    marginTop:50,
    marginBottom:30,
    fontWeight:"200",
  },
  card:{
    backgroundColor:"#FFF",
    flex:1,
    width:width-25,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    ...Platform.select({
      ios:{
        shadowColor:"#505050",
        shadowOpacity:0.7,
        shadowRadius:5,
        shadowOffset:{
          height:-1,
          width:0
        }
      },
      android:{
        elevation:5
      } 
    })
  },
  input:{
    padding:20,
    borderBottomColor:"#bbb",
    borderBottomWidth:1,
    fontSize:25,

  }
});
