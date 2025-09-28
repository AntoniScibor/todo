import React from "react";
import { View, Text, Button, StyleSheet} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { API_URL } from "./constants";
import { GestureHandlerRootView, Switch, TextInput } from "react-native-gesture-handler";

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [completed, setCompleted] = React.useState(false);
  const toggleSwitch = () => setCompleted(previousState => !previousState);

  React.useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const task = await response.json();
          setTitle(task.title);
          setDescription(task.description);
          setCompleted(task.completed);
        } else {
          console.error("Failed to fetch task");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);


  const handleEditTask = async () => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, description, completed}),
      });
      router.push("/tasks");
    } 
    catch (error) {
      console.error("Error updating task:", error);
    };
  };

  const handleDeleteTask = async () => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      router.push("/tasks");
    }
    catch (error) {
      console.error("Error deleting task:", error);
    };
  }
  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Edit Task</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.text}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.text}
      />
      
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={completed ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={completed}
      />
      <View style={{ height: 10 }} />

      <Button title="Save Changes" onPress={handleEditTask} />
      <View style={{ height: 10 }} />
      <Button title="Delete Task" color="red" onPress={handleDeleteTask} />
    </GestureHandlerRootView>
        
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" , padding: 20},
  text: { borderWidth: 1, marginVertical: 10, padding: 5 },
});