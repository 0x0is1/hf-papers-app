import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search papers...',
}) => {
  const [query, setQuery] = useState('');
  const { COLORS, SIZES } = useTheme();

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      Keyboard.dismiss();
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <View style={styles(COLORS, SIZES).container}>
      <View style={styles(COLORS, SIZES).searchContainer}>
        <MaterialIcons
          name="search"
          size={24}
          color={COLORS.textTertiary}
          style={styles(COLORS, SIZES).searchIcon}
        />
        <TextInput
          style={styles(COLORS, SIZES).input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textTertiary}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles(COLORS, SIZES).clearButton}>
            <MaterialIcons name="close" size={20} color={COLORS.textTertiary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = (COLORS: any, SIZES: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: SIZES.md,
      paddingVertical: SIZES.sm,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.card,
      borderRadius: SIZES.radiusMd,
      paddingHorizontal: SIZES.md,
      height: 48,
    },
    searchIcon: {
      marginRight: SIZES.sm,
    },
    input: {
      flex: 1,
      color: COLORS.text,
      fontSize: SIZES.body,
    },
    clearButton: {
      padding: 4,
    },
  });

export default SearchBar;
