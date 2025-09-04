import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function RolePicker({ onChoice }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to EyeCon</Text>
      <Text style={styles.sub}>Choose your role</Text>

      <TouchableOpacity style={styles.card} onPress={() => onChoice('learner')}>
        <Ionicons name="ear" size={48} color={colors.primary} />
        <Text style={styles.cardText}>I want to learn</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => onChoice('volunteer')}>
        <Ionicons name="mic" size={48} color={colors.primary} />
        <Text style={styles.cardText}>I want to help</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  title:     { fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  sub:       { fontSize: 16, color: colors.text, marginBottom: 40 },
  card:      { width: 220, padding: 24, marginVertical: 12, borderRadius: 24, backgroundColor: colors.white,
                alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset:{width:0,height:4},
                shadowOpacity:0.15, shadowRadius:8 },
  cardText:  { marginTop: 12, fontSize: 18, fontWeight: '600', color: colors.text },
});