import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Vibration } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import TipCard from './TipCard';
import mockTips from '../data/mockTips';

export default function LearnerDash() {
  const [tips, setTips] = useState(mockTips);
  const [sound, setSound] = useState();

  useEffect(() => () => sound?.unloadAsync(), [sound]);

  async function playAudio(uri) {
    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);
    await newSound.playAsync();
  }

  const toggleDone = id => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTips(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tips}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TipCard
            tip={item}
            onPlay={() => playAudio(item.audio)}
            onToggle={() => toggleDone(item.id)}
          />
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});