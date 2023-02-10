import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";

import React, { useState } from "react";

export default function App() {
  //useStates
  const [selected, setSelected] = useState("work");
  const [text, setText] = useState("");

  //header Work or Travel Button
  const work = () => setSelected("work");
  const travel = () => setSelected("travel");

  //value 값 활용하기 위해 필수
  const onChangeText = (e) => {
    console.log(e.nativeEvent.text);
    setText(e.nativeEvent.text);
  };

  const addTodo = (e) => {
    alert(`다음을 추가합니다.
    ${text}`);
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={styles.btnTxt}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text editable style={styles.btnTxt}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TextInput
          style={[styles.textInput, styles.todoInput]}
          placeholder={
            selected === "work" ? "Add Work Todo" : "Add Travel Todo"
          }
          onChange={onChangeText}
          onSubmitEditing={addTodo}
          value={text}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  btnTxt: {
    color: "white",
    fontSize: "30%",
    fontWeight: "700",
    marginTop: 40,
    padding: 30,
  },
  body: {
    flex: 6,
    alignItems: "center",
  },
  textInput: {
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 30,
    padding: 15,
  },
  todoInput: {
    width: "90%",
    marginTop: 20,
  },
});
