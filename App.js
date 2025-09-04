import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import RolePicker        from './src/components/RolePicker';
import LearnerDash       from './src/components/LearnerDash';
import VolunteerRec      from './src/components/VolunteerRec';

export default function App() {
  const [role, setRole] = useState(null);   // 'learner' | 'volunteer'

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {!role ? (
        <RolePicker onChoice={setRole} />
      ) : role === 'learner' ? (
        <LearnerDash />
      ) : (
        <VolunteerRec onBack={() => setRole(null)} />
      )}
    </SafeAreaView>
  );
}