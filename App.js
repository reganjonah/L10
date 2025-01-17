import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

let originalData = [];
const App = () => {
  const [mydata, setMydata] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=popes&format=json&case=default")
        .then((response) => response.json())
        .then((data) => {
          if (originalData.length < 1) {
            originalData = data;
            setMydata(data);
          }
        });
  }, []);

  const FilterData = (text) => {
    setSearchText(text);
    if (text) {
      const filteredData = originalData.filter((item) =>
          item.Pope.toLowerCase().includes(text.toLowerCase())
      );
      setMydata(filteredData);
    } else {
      setMydata(originalData);
    }
  };

  const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.Pope || "Unknown"}</Text>
        <Text style={styles.itemSubtext}>Reign: {item.Reign || "Unknown"}</Text>
        <Text style={styles.itemSubtext}>Saint: {item.Saint || "Unknown"}</Text>
      </View>
  );

  return (
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.title}>List of Popes</Text>
        <TextInput
            style={styles.searchInput}
            placeholder="Search by Pope name"
            placeholderTextColor="gray"
            value={searchText}
            onChangeText={FilterData}
        />
        <FlatList
            data={mydata}
            keyExtractor={(item) => item.ID.toString()}
            renderItem={renderItem}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff8e1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b71c1c',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'serif',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fdf5e6',
    color: '#4a235a',
  },
  itemContainer: {
    backgroundColor: 'whitesmoke',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#bda55d',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b71c1c',
    fontFamily: 'serif',
  },
  itemSubtext: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'serif',
  },
});

export default App;
