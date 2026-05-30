import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen({ inputUser, setInputUser, onLogin }) {
  return (
    <View style={styles.centerContainer}>
      <View style={styles.loginBox}>
        <Text style={styles.loginEmoji}>🥷</Text>
        <Text style={styles.loginTitle}>THE ABSOLUTE WILL</Text>
        <Text style={styles.loginSubtitle}>Masukkan nama karakter lo untuk memulai atau melanjutkan perjuangan.</Text>
        
        <TextInput 
          style={styles.input}
          placeholder="Nama Pejuang (cth: bintang_sh)"
          placeholderTextColor="#52525b"
          value={inputUser}
          onChangeText={setInputUser}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
          <Text style={styles.loginBtnText}>MEMASUKI GERBANG GAME ➔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', backgroundColor: '#0b0b0d', padding: 20 },
  loginBox: { backgroundColor: '#13131a', borderRadius: 24, padding: 25, borderWidth: 1, borderColor: '#27272a', alignItems: 'center' },
  loginEmoji: { fontSize: 50, marginBottom: 15 },
  loginTitle: { color: '#fff', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  loginSubtitle: { color: '#71717a', fontSize: 11, textAlign: 'center', marginTop: 6, marginBottom: 20, lineHeight: 16 },
  input: { width: '100%', backgroundColor: '#0b0b0d', borderWidth: 1, borderColor: '#27272a', borderRadius: 12, padding: 14, color: '#fff', fontSize: 12, fontWeight: '600', marginBottom: 15, textAlign: 'center' },
  loginBtn: { width: '100%', backgroundColor: '#6366f1', padding: 15, borderRadius: 12, alignItems: 'center' },
  loginBtnText: { color: '#fff', fontWeight: '900', fontSize: 11, letterSpacing: 0.5 }
});
