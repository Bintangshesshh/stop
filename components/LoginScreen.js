import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [heroName, setHeroName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = () => {
    // Cek kalau ada form yang masih kosong
    if (!heroName || !birthYear || !gender) {
      Alert.alert("⚠️ TUNGGU!", "Pahlawan harus mengisi nama, tahun kelahiran, dan gender!");
      return;
    }
    
    // Kirim Nama dan Gender ke App.js biar diterusin ke layar Custom!
    onLogin(heroName, gender);
  };

  return (
    // Background hutan ala-ala 8-bit
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/21/df/b3/21dfb3b64c0bd344fcbbdd0be42ee3e3.jpg' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        
        {/* Header Title */}
        <View style={styles.header}>
          <Text style={styles.titlePrimary}>THE LAST WILL</Text>
          <Text style={styles.titleSecondary}>BREAK FREE</Text>
        </View>

        {/* Kotak Dialog 8-Bit */}
        <View style={styles.dialogBox}>
          <Text style={styles.dialogTitle}>REGISTER HERO</Text>

          {/* Input Nama */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>NAMA PEJUANG</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter your legend..."
              placeholderTextColor="#8a9485"
              value={heroName}
              onChangeText={setHeroName}
            />
          </View>

          {/* Input Tahun */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>TAHUN KELAHIRAN</Text>
            <TextInput 
              style={styles.input}
              placeholder="Contoh: 1999"
              placeholderTextColor="#8a9485"
              keyboardType="numeric"
              value={birthYear}
              onChangeText={setBirthYear}
              maxLength={4}
            />
          </View>

          {/* Pilihan Gender */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>GENDER</Text>
            <View style={styles.genderRow}>
              <TouchableOpacity 
                style={[styles.genderBtn, gender === 'Male' && styles.genderBtnActive]}
                onPress={() => setGender('Male')}
              >
                <Text style={styles.genderIcon}>👨</Text>
                <Text style={[styles.genderText, gender === 'Male' && styles.genderTextActive]}>MALE</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.genderBtn, gender === 'Female' && styles.genderBtnActive]}
                onPress={() => setGender('Female')}
              >
                <Text style={styles.genderIcon}>👩</Text>
                <Text style={[styles.genderText, gender === 'Female' && styles.genderTextActive]}>FEMALE</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tombol Daftar */}
          <TouchableOpacity style={styles.actionBtn} onPress={handleRegister}>
            <Text style={styles.actionBtnText}>DAFTAR SEBAGAI HERO ➔</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

// ==============================
// STYLING KHUSUS 8-BIT RETRO
// ==============================
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 21, 15, 0.7)', // Gelap biar teks kebaca
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titlePrimary: {
    fontFamily: 'monospace',
    fontSize: 32,
    fontWeight: '900',
    color: '#88d982',
    textShadowColor: 'black',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 1,
  },
  titleSecondary: {
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: '700',
    color: '#99cbff',
    letterSpacing: 4,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  dialogBox: {
    width: '100%',
    backgroundColor: 'rgba(28, 33, 27, 0.95)',
    borderWidth: 4,
    borderColor: '#31362f',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  dialogTitle: {
    fontFamily: 'monospace',
    color: '#bfcaba',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontFamily: 'monospace',
    color: '#bfcaba',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 5,
  },
  input: {
    fontFamily: 'monospace',
    backgroundColor: '#181d17',
    borderWidth: 2,
    borderColor: '#8a9485',
    color: '#e0e4da',
    padding: 12,
    fontSize: 14,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderBtn: {
    flex: 1,
    backgroundColor: '#31362f',
    borderWidth: 2,
    borderColor: '#40493d',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
  },
  genderBtnActive: {
    backgroundColor: '#2e7d32',
    borderColor: '#88d982',
  },
  genderIcon: {
    fontSize: 28,
  },
  genderText: {
    fontFamily: 'monospace',
    color: '#e0e4da',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '700',
  },
  genderTextActive: {
    color: '#cbffc2',
  },
  actionBtn: {
    backgroundColor: '#FFC107',
    padding: 15,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#3e2723',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  actionBtnText: {
    fontFamily: 'monospace',
    color: '#3e2723',
    fontSize: 14,
    fontWeight: '900',
  }
});
