import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../../Style';  // Make sure the path is correct
import { useTheme } from 'react-native-paper';

const Search = () => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 2000); 

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  useEffect(() => {
    if (debouncedSearchText) {
      console.log('Debounced searchText:', debouncedSearchText);
     
    }
  }, [debouncedSearchText]);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 5,
      padding: 5,
    },
    icon: {
      marginHorizontal: 5,
      position: 'absolute',
      left: 10,
    },
    input: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 50,
    },
  });

  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color={theme.colors.text} style={styles.icon} />
        <TextInput
          style={[GlobalStyle.txtRounded, styles.input]}
          placeholder="Search"
          placeholderTextColor={theme.colors.placeholder}
          onChangeText={(text) => { setSearchText(text); }}
        />
      </View>
    </View>
  );
};

export default Search;
