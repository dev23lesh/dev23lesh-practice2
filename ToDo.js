import React,{Component} from 'react';
import { View ,StyleSheet,Text, TouchableOpacity,Dimensions,TextInput} from 'react-native';
import { Ionicons} from "@expo/vector-icons";
import propTypes from "prop-types";

const{width,height} = Dimensions.get("window");

export default class ToDo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing:false,
      todoValue:props.text
    }
  }
  static propTypes={
    id:propTypes.string.isRequired,
    text:propTypes.string.isRequired,
    isCompleted:propTypes.bool.isRequired,
    deleteToDo:propTypes.func.isRequired,
    completeToDo:propTypes.func.isRequired,
    uncompleteToDo:propTypes.func.isRequired,
    updateToDo:propTypes.func.isRequired,
  }
  render(){
    const {isEditing,todoValue} = this.state;
    const {text,id,deleteToDo,isCompleted} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View 
            style={[
              styles.circle ,
              isCompleted?styles.completedCircle:styles.uncompletedCircle
            ]} 
            />
          </TouchableOpacity>
          {isEditing?(
            <TextInput style={[
              styles.text,
              styles.input,
              isCompleted?styles.completedText:styles.uncompletedText
            ]} 
            value={todoValue} 
            multiline={true} 
            onChangeText={this._controllInput}
            returnKeyType={"done"}
            onBlur={this._finishEditing}
            />
          ):(
            <Text style={[
              styles.text,
              isCompleted?styles.completedText:styles.uncompletedText
            ]}
          >{text}
          </Text>
          )}
        </View>
        <View style={styles.column}>
          {isEditing?
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>
                  <Ionicons color="green" size={20} name="ios-checkbox" />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>
                  <Ionicons color="brown" size={20} name="ios-hammer" />
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={(event)=> {event.stopPropagation(); deleteToDo(id)}}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>
                  <Ionicons color="gray" size={20} name="ios-trash" />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          }
        </View>
      </View>
    );
  }
  _toggleComplete=(event)=>{
    event.stopPropagation();
    /*
    this.setState(prevState=>{
      return{
          isCompleted:!prevState.isCompleted
      }
    });
    //더이상 state로 처리하는것이 아닌 prop 받은 값으로 처리하게되니까 이건 주석처리 레츠기릿
    */
    const {isCompleted,completeToDo,uncompleteToDo,id} = this.props;
    if(isCompleted){
      uncompleteToDo(id);
    }else{
      completeToDo(id);
    }
  }
  _startEditing=(event)=>{
    event.stopPropagation();
    this.setState({ isEditing:true,});
  }

  _finishEditing=(event)=>{
    event.stopPropagation();
    const {todoValue} = this.state;
    const {id,updateToDo} = this.props;
    updateToDo(id,todoValue);
    this.setState({ 
          isEditing:false
    });
  }
  _controllInput=(text)=>{
    this.setState({
      todoValue:text
    });
  }
}
const styles = StyleSheet.create({
  container: {
      width:width-50,
      borderBottomColor:"#bbb",
      borderBottomWidth:StyleSheet.hairlineWidth,
      flexDirection:"row",
      alignItems:"center"
  },
  circle:{
    width:30,
    height:30,
    borderRadius:15,
    borderWidth:3,
    marginRight:20
  },
  completedCircle:{
    borderColor:"#0F0",
  },
  uncompletedCircle:{
    borderColor:"#F00",
  },
  text:{
    fontWeight:"600",
    fontSize:20,
    marginVertical:20,
    textAlign:"left"
  },
  completedText:{
    color:"#BBB",
    textDecorationLine:"line-through"
  },
  uncompletedText:{
    color:"#353839",
  },
  column:{
    flexDirection:"row",
    alignItems:"center",
    width:width/2
  },
  actions:{
    flexDirection:"row"
  },
  actionContainer:{
    marginVertical:10,
    marginHorizontal:10
  },
  input:{
    marginVertical:15,
    width:width/2,
    paddingBottom:5
  }
});
