import { Text, View, Button, StyleSheet} from "react-native";
import { Link } from "expo-router";



export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/tasks" asChild>
        <Button title="Tasks List"/>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
  },
});