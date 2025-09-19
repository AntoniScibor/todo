import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";


export default function AddTaskScreen() {

    const router = useRouter();
    const [title, setTitle] = useState("");

    const handleAddTask = () => {
        // Logic to add the task (e.g., send to backend)
        // After adding, navigate back to tasks list
        router.push("/tasks");
    }

    return (
        <GestureHandlerRootView style={styles.container}>
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