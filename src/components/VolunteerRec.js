import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function VolunteerRec({ onBack }) {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);

  async function start() {
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) return;
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    setRecording(recording);
    setIsRecording(true);
  }

  async function stop() {
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    alert(`Recording saved at: ${uri} (demo only)`);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={{ alignSelf: 'flex-start', margin: 20 }}>
        <Ionicons name="arrow-back" size={28} color={colors.primary} />
      </TouchableOpacity>

      <Text style={styles.title}>Record a 15-second tip</Text>

      <TouchableOpacity style={[styles.mic, isRecording && styles.micActive]} onPress={isRecording ? stop : start}>
        <Ionicons name={isRecording ? 'stop' : 'mic'} size={48} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.hint}>{isRecording ? 'Tap to stop' : 'Tap to start recording'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  title:     { fontSize: 24, fontWeight: '600', color: colors.text, marginBottom: 32 },
  mic:       { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.primary,
               alignItems: 'center', justifyContent: 'center' },
  micActive: { backgroundColor: '#d32f2f' },
  hint:      { marginTop: 16, fontSize: 16, color: colors.text },
});