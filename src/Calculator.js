import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';

export default function Calculator() {
  const Exp = useRef(null);
  const Ans = useRef(null);
  
  var firstLoad = false;
  var firstParam = 0;
  var secondParam = 0;
  var answer = undefined;
  var operation = 1;
  var paramAux = '';
  var cont = 0;

  function pressNum(num){
    paramAux += num;
    Exp.current.innerText += num;
    cont++;
  }
  
  function pressOperation(num){
    if(!firstLoad && paramAux != ""){
      firstLoad = true;
      operation = num;
      firstParam = parseFloat(paramAux);
      paramAux = "";
      Exp.current.innerText = firstParam + [' + ', ' - ', ' * ', ' / ', ' ^ '][num-1];
      cont = 0;
    }
  }
  
  function pressBack(){
    console.log("Back");
    if(cont > 0 && paramAux.length > 0){
      paramAux = paramAux.slice(0, paramAux.length-1);
      Exp.current.innerText = Exp.current.innerText.slice(0, Exp.current.innerText.length-1);
      cont--;
    }
  }
  
  function pressPoint(){
    paramAux += '.';
    Exp.current.innerText += '.';
    cont++;
  }
  
  function pressAnswer(){
    if(answer != undefined && !isNaN(answer) && isFinite(answer)){
      paramAux += answer;
      Exp.current.innerText += answer;
      cont += answer.length;
    }
  }
  
  function pressEqual(){
    if(firstLoad && paramAux != ""){
      firstLoad = false;
      secondParam = parseFloat(paramAux);
      answer = [(x,y) => x+y, (x,y) => x-y, (x,y) => x*y, (x,y) => x/y, (x,y) => x**y][operation-1](firstParam, secondParam);
      firstParam = 0;
      secondParam = 0;
      Ans.current.innerText = Exp.current.innerText + ' = ' + answer;
      paramAux = "";
      Exp.current.innerText = "";
      cont = 0;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text ref={Exp} style={styles.textRes} ></Text>
        <Text ref={Ans} style={styles.textRes} ></Text>
      </View>
      <View style={styles.buttons}>
        <Button title="Back" style={styles.button} onPress={() => pressBack()}/>
        <Button title="Ans" style={styles.button} onPress={() => pressAnswer()}/>
        <Button title="^" style={styles.button} onPress={() => pressOperation(5)}/>
        <Button title="/" style={styles.button} onPress={() => pressOperation(4)}/>
        <Button title="7" style={styles.button} onPress={() => pressNum(7)}/>
        <Button title="8" style={styles.button} onPress={() => pressNum(8)}/>
        <Button title="9" style={styles.button} onPress={() => pressNum(9)}/>
        <Button title="*" style={styles.button} onPress={() => pressOperation(3)}/>
        <Button title="4" style={styles.button} onPress={() => pressNum(4)}/>
        <Button title="5" style={styles.button} onPress={() => pressNum(5)}/>
        <Button title="6" style={styles.button} onPress={() => pressNum(6)}/>
        <Button title="-" style={styles.button} onPress={() => pressOperation(2)}/>
        <Button title="1" style={styles.button} onPress={() => pressNum(1)}/>
        <Button title="2" style={styles.button} onPress={() => pressNum(2)}/>
        <Button title="3" style={styles.button} onPress={() => pressNum(3)}/>
        <Button title="+" style={styles.button} onPress={() => pressOperation(1)}/>
        <Button title="." style={styles.button} onPress={() => pressPoint()}/>
        <Button title="0" style={styles.button} onPress={() => pressNum(0)}/>
        <Button title="=" style={styles.equal} onPress={() => pressEqual()}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRes: {
    fontSize: 'large',
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    width: '200px',
    height: '250px',
    margin: '50px auto',
    display: 'grid',
    'grid-template': 'repeat(5, 20%) / repeat(4, 25%)',
  },
  button: {
    'border-radius': '8px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7fc4ee'
  },
  equal: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    'border-radius': '8px',
    'grid-row-start': 2,
    'grid-row-end': 4,
    backgroundColor: '#7fc4ee',
  }
});
