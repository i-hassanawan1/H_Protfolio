import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";
import { Card } from "react-native-paper"; // For better card UI
import { AntDesign } from "@expo/vector-icons"; // Icons for better UI

const API_URL = "https://example.com/api/characters"; // Replace this with a valid API URL

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Dummy Data for Snack Expo Testing
  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      image: "data:image/jpeg;base64,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",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuPUvCDJ7F_5QDsHdNRohIpxFSnvcjy-OmS0FqGBBJ0x1JixqGQ9Fk7Pc&s",
    },
    {
      id: 3,
      name: "Alice Brown",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmxVy3fbJR1EZBjzWPKq9jfs_Md_Cb8jy-4S0wGdqwQFFdSuOdvv2hInQ&s",
    },
     {
      id: 3,
      name: "Ali",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmxVy3fbJR1EZBjzWPKq9jfs_Md_Cb8jy-4S0wGdqwQFFdSuOdvv2hInQ&s",
    }
    
  ];

  // Fetch data from API
  const fetchData = async () => {
    try {
      console.log("🔄 Fetching data...");
      // Commenting out API call for Snack Expo testing
      // const response = await fetch(API_URL);
      // if (!response.ok) throw new Error(❌ HTTP Error! Status: ${response.status});
      // const json = await response.json();

      // Using dummy data for testing
      const json = { data: dummyData };

      console.log("✅ API Response Received:", json);
      if (!json.data || !Array.isArray(json.data)) {
        throw new Error("❌ Invalid API response format");
      }

      setData(json.data);
      setFilteredData(json.data);
    } catch (error) {
      console.error("🚨 Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render item
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  // Show loading indicator if data is still fetching
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Character Gallery</Text>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search characters..."
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#FF6347",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 0,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  textContainer: {
    justifyContent: "center",
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailsButton: {
    marginTop: 5,
    backgroundColor: "#FF6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  detailsText: {
    color: "#fff",
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
