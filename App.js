import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT LAYER YANG UDAH DIPECAL TADI
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [inputUser, setInputUser] = useState('');
  
  // Satukan stats game ke dalam satu object state biar ringkas di-pass
  const [stats, setStats] = useState({ level: 1, xp: 0, streak: 0, hp: 100, paws: 50 });

  useEffect(() => { checkLoginSession(); }, []);

  const checkLoginSession = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('@user_session');
      if (savedUser !== null) {
        setUsername(savedUser);
        setIsLoggedIn(true);
        await loadGameData(savedUser);
      }
    } catch (e) {
      Alert.alert("Error", "Gagal memuat sesi.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadGameData = async (user) => {
    try {
      const data = await AsyncStorage.getItem(`@game_data_${user}`);
      if (data !== null) setStats(JSON.parse(data));
    } catch (e) { console.log("User baru."); }
  };

  // Auto-save data tiap ada state stat yang berubah
  useEffect(() => {
    if (isLoggedIn) {
      AsyncStorage.setItem(`@game_data_${username}`, JSON.stringify(stats))
        .catch(e => console.log("Gagal auto-save"));
    }
  }, [stats, isLoggedIn]);

  const handleLogin = async () => {
    if (inputUser.trim() === '') return Alert.alert("⛔ Eror", "Nama pejuang kosong!");
    const fixedUser = inputUser.trim().toLowerCase();
    await AsyncStorage.setItem('@user_session', fixedUser);
    setUsername(fixedUser);
    await loadGameData(fixedUser);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@user_session');
    setIsLoggedIn(false);
    setInputUser('');
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  // FLOW SELEKTOR SCREEN NYA SEKARANG JADI BERSIH DAN RAPI
  return (
    <View style={styles.container}>
      { !isLoggedIn ? (
        <LoginScreen 
          inputUser={inputUser} 
          setInputUser={setInputUser} 
          onLogin={handleLogin} 
        />
      ) : (
        <DashboardScreen 
          username={username} 
          stats={stats} 
          setStats={setStats} 
          onLogout={handleLogout} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0d', padding: 20, paddingTop: 50 }
});
