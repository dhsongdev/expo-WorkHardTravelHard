import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
} from 'react-native';

import React, { useEffect, useState } from 'react';

const TODO_STORAGE_KEY = '@todos';

export default function App() {
  //useStates
  const [selectedType, setSelectedType] = useState('work');
  const [text, setText] = useState('');
  const [todos, setTodos] = useState({});

  //save todos to asyncStorage
  const saveTodos = async (obj) => {
    try {
      await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(obj));
    } catch (e) {
      console.log(e);
    }
  };

  //get todo datas from asyncStorage
  const getTodos = async () => {
    try {
      const json = await AsyncStorage.getItem(TODO_STORAGE_KEY);
      setTodos(JSON.parse(json));
    } catch (e) {
      console.log(e);
    }
  };

  //header Work or Travel Button
  const work = () => setSelectedType('work');
  const travel = () => setSelectedType('travel');

  //value 값 활용하기 위해 필수
  const onChangeText = (e) => {
    setText(e.nativeEvent.text);
  };

  //todo를 받아서 저장.
  //데이터를 배열로 받으면 나중에 찾을때 오래걸릴수도 있으니까 hashtable방식으로 데이터 저장. hash방식은 현재시간.
  //id: 현재시간, text: 사용자가 적은 todo 내용, type: work인지 travel인지 구분
  const addTodo = async (e) => {
    if (text == '') {
      alert('내용을 입력하쇼');
      return;
    }
    alert(`다음을 추가합니다.
    ${text}`);
    const newTodos = Object.assign({}, todos, {
      [Date.now()]: { text, type: selectedType },
    });
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText('');
  };

  //앱 시동할때 asyncStorage에서 todos가져와서 render
  useEffect(() => {
    getTodos();
  }, []);

  //page
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnTxt,
              opacity: selectedType === 'work' ? 1 : 0.55,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnTxt,
              opacity: selectedType === 'travel' ? 1 : 0.55,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TextInput
          style={[styles.textInput, styles.todoInput]}
          placeholder={
            selectedType === 'work' ? 'Add Work Todo' : 'Add Travel Todo'
          }
          onChange={onChangeText}
          onSubmitEditing={addTodo}
          value={text}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {Object.keys(todos).map((id) =>
            todos[id].type === selectedType ? (
              <View style={styles.todoBlock} key={id}>
                <Text style={styles.todoText}>{todos[id].text}</Text>
                <TouchableOpacity>
                  <FontAwesome name="remove" size={18} color="black" />
                </TouchableOpacity>
              </View>
            ) : null
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    width: '100%',
    backgroundColor: 'grey',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnTxt: {
    color: 'white',
    fontSize: '30%',
    fontWeight: '700',
    marginTop: 40,
    padding: 30,
  },
  body: {
    flex: 6,
    alignItems: 'center',
  },
  textInput: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 30,
    padding: 15,
    marginBottom: 15,
  },
  todoInput: {
    width: '90%',
    marginTop: 20,
  },
  scrollView: {
    width: '90%',
  },
  todoBlock: {
    marginTop: 7,
    marginBottom: 7,
    backgroundColor: 'lightgrey',
    borderRadius: 17,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoText: {
    color: '#2d2c2c',
    fontSize: 14,
  },
});
