import { View, Text, FlatList, ScrollView, StyleSheet, Button, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { API_URL } from "./constants";


interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function TasksScreen(){

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchTasks = async () => {
            try{
                const response = await fetch(API_URL);
                const data = await response.json();
                setTasks(data);
            }
            catch (error) {
                console.error("Error fetching tasks:", error);
            }
            finally {
                setLoading(false);
            }

        };
        fetchTasks();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading tasks...</Text>
            </View>
        );
    }
    if (tasks.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>No tasks available.</Text>
                <Link href="/AddTask" asChild>
                   <Button title="Dodaj nowe zadanie" />
                </Link>
            </View>
        );
    }
    else{
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Tasks:</Text>
                <Link href="/AddTask" asChild>
                    <Button title="Add new task" />
                </Link>
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()} // każde id musi być stringiem
                    renderItem={({ item }) => (
                    <View style={styles.task}>
                        <Text style={styles.title}>
                        {item.title} {item.completed ? "✅" : "❌"}
                        </Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Link href={`/${item.id}`} asChild>
                            <Button title="Edit"/>
                        </Link>
                    </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  task: { marginBottom: 15, padding: 10, backgroundColor: "#f1f1f1", borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "600" },
  description: { fontSize: 14, color: "#555" },
});




