import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT LAYER 1, 2, 3
import LoginScreen from './components/LoginScreen';
import CustomScreen from './components/CustomScreen';
import DashboardScreen from './components/DashboardScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // ALUR GAME SEKARANG PAKE PHASE: 'LOGIN' | 'CUSTOM' | 'DASHBOARD'
  const [appPhase, setAppPhase] = useState('LOGIN'); 
  
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState(''); // Simpen gender sementara
  const [stats, setStats] = useState({ level: 1, xp: 0, streak: 0, hp: 100, paws: 50 });

  useEffect(() => { checkLoginSession(); }, []);

  const checkLoginSession = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('@user_session');
      if (savedUser !== null) {
        setUsername(savedUser);
        setAppPhase('DASHBOARD'); // Kalo udah pernah login, langsung tembus ke Kota
        await loadGameData(savedUser);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGameData = async (user) => {
    try {
      const data = await AsyncStorage.getItem(`@game_data_${user}`);
      if (data !== null) setStats(JSON.parse(data));
    } catch (e) {}
  };

  // STEP 1: Beres Login
  const handleLogin = (namaHeroBaru, heroGender) => {
    setUsername(namaHeroBaru.trim().toLowerCase());
    setGender(heroGender);
    setAppPhase('CUSTOM'); // Pindah ke layar Custom Karakter
  };

  // STEP 2: Beres Custom Karakter
  const handleCustomComplete = async (skin, hair, outfit) => {
    // Nanti lo bisa simpen warna bajunya ke database sini
    await AsyncStorage.setItem('@user_session', username);
    setAppPhase('DASHBOARD'); // Pindah ke Peta Kota
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@user_session');
    setAppPhase('LOGIN');
    setUsername('');
  };

  if (isLoading) return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator size="large" color="#88d982" />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b0f0a" />
      
      {/* KONDISI ALUR HALAMAN */}
      { appPhase === 'LOGIN' && <LoginScreen onLogin={handleLogin} /> }
      
      { appPhase === 'CUSTOM' && <CustomScreen gender={gender} onComplete={handleCustomComplete} /> }
      
      { appPhase === 'DASHBOARD' && (
        <DashboardScreen username={username} stats={stats} setStats={setStats} onLogout={handleLogout} />
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f0a' }
});
