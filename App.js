import React from 'react';
import { StyleSheet,Text, View ,StatusBar,TextInput,Dimensions,Platform,ScrollView,AsyncStorage} from 'react-native';
import {AppLoading} from "expo"
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1"

const {height,width} = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo:"",
    loadedToDos:false,
    toDos:{}
  }
  componentDidMount=()=>{
      this._loadToDos();
  }
  render(){ 
    const {newToDo,loadedToDos,toDos} = this.state;
    console.log("todos loading..:"+toDos);
    if(!loadedToDos){ 
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>오늘의할일 목록</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"}
            placeholderTextColor={"#999"}
            value={newToDo} 
            onChangeText={this._controllNewToDo}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
            underlineColorAndroid={"transparent"}
            />
            <ScrollView contentContainerStyle={styles.toDos}>
              {Object.values(toDos).reverse().map(toDo=>
              (
              <ToDo 
                key={toDo.id} 
                {...toDo} 
                deleteToDo={this._deleteToDo} 
                completeToDo={this._completeToDo} 
                uncompleteToDo={this._uncompleteToDo}
                updateToDo={this._updateToDo}
              />
              ))}
            </ScrollView>
        </View>
      </View>
    );
  }
  _controllNewToDo=text=>{
    this.setState({
      newToDo:text
    })
  };
  _loadToDos= async ()=>{
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      console.log(toDos);
      this.setState({loadedToDos:true, toDos:parsedToDos || {} });
    }catch(err){
      console.log(err);
    }
    
  };
  _addToDo=()=>{
    const{newToDo} = this.state;
    if(newToDo !== ""){
      this.setState({
          newToDo:""
      });
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]:{
            id:ID,
            isCompleted:false,
            text:newToDo,
            creatredAt:Date.now()
          }
        };
        const newState={
          ...prevState,
          newToDo:"",
          toDos:{
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        this._saveToDos(newState.toDos);
        return{...newState};
      });
    }
  };
  _deleteToDo=(id)=>{
    this.setState(prevState=>{
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState={
          ...prevState,
          ...toDos
      };
      this._saveToDos(newState.toDos);
      return{...newState};
    })
  };
  _uncompleteToDo=(id)=>{
    this.setState(prevState=>{
      const newState={
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]:{
            ...prevState.toDos[id],
            isCompleted:false
          }
        }
      }
      this._saveToDos(newState.toDos);
      return{...newState};
    })
  };
  _completeToDo=(id)=>{
    this.setState(prevState=>{
      const newState={
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]:{
            ...prevState.toDos[id],
            isCompleted:true
          }
        }
      }
      this._saveToDos(newState.toDos);
      return{...newState};
    })
  };
  _updateToDo=(id,text)=>{
    this.setState(prevState=>{
      const newState={
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]:{
            ...prevState.toDos[id],
            text:text
          }
        }
      }
      this._saveToDos(newState.toDos);
      return{...newState};
    })
  };
  _saveToDos=(newToDos)=>{
    const saveToDos = AsyncStorage.setItem("toDos",JSON.stringify(newToDos));
    //AsyncStorage 는 string형태만 저장할 수 있다. 그래서 변환시켜서 저장하는것. 가져온다음에는 다시 오브젝트 형태로 변환시켜야함.
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
    
  },
  title:{
    color:"#FEF",
    fontSize:24,
    marginTop:40,
    marginBottom:20,
    fontWeight:"300",
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

  },
  toDos:{
    alignItems:"center"
  }
});
