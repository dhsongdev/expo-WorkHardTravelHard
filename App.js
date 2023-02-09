import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnTxt}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.btnTxt}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  },
});
