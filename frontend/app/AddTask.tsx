import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { API_URL } from "./constants";

export default function AddTaskScreen() {

    const router = useRouter();
    const [title, setTitle] = React.useState("");

    const handleAddTask = async () => {
        try {
          await fetch(`${API_URL}/`, {
            method: "POST",
            headers:{"content-type": "application/json"},
            body: JSON.stringify({ title, description: 'default', completed: false }),
          });
          router.push("/tasks");
        } 
        catch (error) {
          console.error("Error adding task:", error);
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Add New Task</Text>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.text}
            />
            <Button title="Add Task" onPress={handleAddTask}/>
        </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" , padding: 20},
  text: { borderWidth: 1, marginVertical: 10, padding: 5 },
});