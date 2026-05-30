import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function CustomScreen({ gender, onComplete }) {
  const [skinTone, setSkinTone] = useState('#FFDcb1');
  const [hairColor, setHairColor] = useState('#2A2A2A');
  const [outfit, setOutfit] = useState('#2e7d32');

  // Gambar berubah sesuai gender dari layar Login!
  const spriteImage = gender === 'Female' 
    ? 'https://cdn-icons-png.flaticon.com/512/8672/8672800.png' // Pixel Girl
    : 'https://cdn-icons-png.flaticon.com/512/8672/8672782.png'; // Pixel Boy

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FORGE YOUR HERO</Text>
      <Text style={styles.subtitle}>Customize your legendary avatar.</Text>

      {/* Box Karakter */}
      <View style={[styles.spriteBox, { backgroundColor: outfit }]}>
         <Image source={{ uri: spriteImage }} style={styles.spriteImage} />
      </View>

      {/* Swatch Warna (Bisa lo tambahin/ubah logikanya nanti) */}
      <View style={styles.swatchContainer}>
        <Text style={styles.label}>OUTFIT COLOR</Text>
        <View style={styles.row}>
          {['#2e7d32', '#8A2B2B', '#0177bd', '#4A4A4A'].map(color => (
            <TouchableOpacity 
              key={color} 
              style={[styles.swatch, { backgroundColor: color }, outfit === color && styles.selectedSwatch]} 
              onPress={() => setOutfit(color)}
            />
          ))}
        </View>
      </View>

      {/* Tombol Selesai */}
      <TouchableOpacity 
        style={styles.actionBtn} 
        onPress={() => onComplete(skinTone, hairColor, outfit)}
      >
        <Text style={styles.actionBtnText}>SELESAI & MASUK KOTA ➔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f0a', padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: 'monospace', fontSize: 28, color: '#88d982', fontWeight: '900', marginBottom: 5 },
  subtitle: { fontFamily: 'monospace', fontSize: 12, color: '#bfcaba', marginBottom: 20 },
  spriteBox: { width: 180, height: 180, borderWidth: 4, borderColor: '#31362f', justifyContent: 'center', alignItems: 'center', marginBottom: 30, elevation: 10 },
  spriteImage: { width: 140, height: 140, resizeMode: 'contain' },
  swatchContainer: { width: '100%', marginBottom: 30 },
  label: { fontFamily: 'monospace', color: '#e0e4da', fontSize: 14, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  swatch: { width: 50, height: 50, borderWidth: 2, borderColor: '#31362f' },
  selectedSwatch: { borderColor: '#88d982', borderWidth: 4 },
  actionBtn: { backgroundColor: '#FFC107', padding: 15, width: '100%', borderWidth: 4, borderColor: '#87665c', alignItems: 'center', elevation: 5 },
  actionBtnText: { fontFamily: 'monospace', color: '#442a22', fontSize: 16, fontWeight: '900' }
});
