import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';

export default function CustomScreen({ gender, onComplete }) {
  // --- STATE UNTUK PILIHAN WARNA ---
  const [skinTone, setSkinTone] = useState('#FFDcb1');
  const [hairColor, setHairColor] = useState('#2A2A2A');
  const [outfitColor, setOutfitColor] = useState('#2e7d32');
  
  // Kategori yang lagi dipilih ('Skin', 'Hair', 'Outfit', 'Eyes')
  const [activeCategory, setActiveCategory] = useState('Skin');

  // --- LOGIKA SPRITE GAMBAR (BERUBAH BERDASARKAN GENDER) ---
  const spriteImage = gender === 'Female' 
    ? 'https://cdn-icons-png.flaticon.com/512/8672/8672800.png' // Pixel Girl Base
    : 'https://cdn-icons-png.flaticon.com/512/8672/8672782.png'; // Pixel Boy Base

  // --- DATA PILIHAN WARNA (PALETTE 8-BIT) ---
  const palettes = {
    Skin: ['#FFDcb1', '#E0AC69', '#8D5524', '#7B8D70'], // Light, Medium, Dark, Orc Green
    Hair: ['#2A2A2A', '#8A3A1C', '#DAB239', '#884D72'], // Black, Brown, Blonde, Purple
    Outfit: ['#2e7d32', '#8A2B2B', '#0177bd', '#4A4A4A'], // Green, Red, Blue, Grey
    Eyes: ['#1B4D1B', '#2A2A2A', '#004a78', '#bfcaba'],   // Green, Black, Blue, Grey
  };

  // --- KOMPONEN UNTUK KOTAK KATEGORI ---
  const CategoryCard = ({ title, icon, value, onPress }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, activeCategory === title && styles.categoryCardActive]} 
      onPress={onPress}
    >
      <Text style={styles.categoryIcon}>{icon}</Text>
      <Text style={styles.categoryLabel}>{title}</Text>
      {/* Visualisasi warna saat ini di dalam kotak kecil */}
      <View style={[styles.miniSwatch, { backgroundColor: value }]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b0f0a" />
      
      {/* 1. HEADER */}
      <View style={styles.header}>
        <Text style={styles.titlePrimary}>FORGE YOUR HERO</Text>
        <Text style={styles.titleSecondary}>CUSTOMIZE AVATAR</Text>
      </View>

      {/* 2. SPRITE CANVAS (Atas ala referensi) */}
      <View style={styles.canvasContainer}>
        {/* Decorative Inlay Border */}
        <View style={styles.canvasInlay} />
        {/* Kotak Karakter */}
        <View style={[styles.spriteBox, { backgroundColor: outfitColor + '20' }]}>
          <Image source={{ uri: spriteImage }} style={styles.spriteImage} />
        </View>
        <Text style={styles.heroNameText}>[ HERO PREVIEW ]</Text>
      </View>

      {/* 3. CATEGORY GRID (Tengah ala referensi but 8-bit) */}
      <View style={styles.categoryGridContainer}>
        <Text style={styles.sectionLabel}>OPTIONS</Text>
        <View style={styles.gridRow}>
          <CategoryCard title="Skin" icon="🧑" value={skinTone} onPress={() => setActiveCategory('Skin')} />
          <CategoryCard title="Hair" icon="💇" value={hairColor} onPress={() => setActiveCategory('Hair')} />
        </View>
        <View style={styles.gridRow}>
          <CategoryCard title="Outfit" icon="👕" value={outfitColor} onPress={() => setActiveCategory('Outfit')} />
          <CategoryCard title="Eyes" icon="👀" value={palettes.Eyes[0]} onPress={() => setActiveCategory('Eyes')} />
        </View>
      </View>

      {/* 4. SELECTION PANEL (Bawah buat milih warna) */}
      <View style={styles.selectionPanel}>
        <Text style={styles.selectionPanelTitle}>SELECT {activeCategory.toUpperCase()} COLOR</Text>
        <View style={styles.swatchRow}>
          {palettes[activeCategory].map(color => (
            <TouchableOpacity 
              key={color} 
              style={[
                styles.swatchBtn, 
                { backgroundColor: color }, 
                // Logika Selected Swatch
                (activeCategory === 'Skin' && skinTone === color) ||
                (activeCategory === 'Hair' && hairColor === color) ||
                (activeCategory === 'Outfit' && outfitColor === color)
                  ? styles.swatchSelected
                  : null
              ]} 
              onPress={() => {
                if(activeCategory === 'Skin') setSkinTone(color);
                if(activeCategory === 'Hair') setHairColor(color);
                if(activeCategory === 'Outfit') setOutfitColor(color);
              }}
            />
          ))}
        </View>
      </View>

      {/* 5. ACTION BUTTON */}
      <TouchableOpacity 
        style={styles.actionBtn} 
        onPress={() => onComplete(skinTone, hairColor, outfitColor)}
      >
        <Text style={styles.actionBtnText}>SELESAI & MASUK KOTA ➔</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==============================
// STYLING JRPG 8-BIT RETRO
// ==============================
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0b0f0a', // Background Gelap established
    padding: 20, 
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  titlePrimary: {
    fontFamily: 'monospace',
    fontSize: 28,
    fontWeight: '900',
    color: '#88d982', // Primary Green established
    textShadowColor: 'black',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 1,
  },
  titleSecondary: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    color: '#bfcaba', // Established accent
    letterSpacing: 2,
    marginTop: 2,
  },
  
  // --- Canvas Stylings ---
  canvasContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#10150f', // Surface Container
    borderWidth: 4,
    borderColor: '#31362f', // Established outline
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    elevation: 10,
    // Pixelated shadows
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  canvasInlay: {
    position: 'absolute',
    inset: 4,
    borderWidth: 2,
    borderColor: '#87665c', // Tertiary border
    pointerEvents: 'none',
  },
  spriteBox: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 5,
  },
  spriteImage: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  heroNameText: {
    fontFamily: 'monospace',
    color: '#bfcaba',
    fontSize: 10,
    fontWeight: '700',
  },

  // --- Category Grid Stylings ---
  categoryGridContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontFamily: 'monospace',
    color: '#cbffc2',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 1,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#1c211b', // Surface Container Low
    borderWidth: 4,
    borderColor: '#31362f', // outline
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  categoryCardActive: {
    borderColor: '#cbffc2', // Primary
    backgroundColor: '#262b25', // Surface Container High
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  categoryLabel: {
    fontFamily: 'monospace',
    color: '#e0e4da', // On Surface
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  miniSwatch: {
    width: 15,
    height: 15,
    borderWidth: 2,
    borderColor: '#0b0f0a',
    position: 'absolute',
    right: 10,
    top: 10,
  },

  // --- Selection Panel Stylings ---
  selectionPanel: {
    width: '100%',
    backgroundColor: '#0b0f0a',
    borderWidth: 4,
    borderColor: '#31362f',
    padding: 15,
    flex: 1, // Mengambil sisa ruang
    marginBottom: 20,
  },
  selectionPanelTitle: {
    fontFamily: 'monospace',
    color: '#bfcaba',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
  },
  swatchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  swatchBtn: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#31362f', // outline
  },
  swatchSelected: {
    borderColor: '#cbffc2', // Primary
    borderWidth: 4,
    // Halo effect
    shadowColor: '#cbffc2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },

  // --- Action Button Stylings ---
  actionBtn: {
    backgroundColor: '#FFC107', // Gold Established
    padding: 15,
    width: '100%',
    borderWidth: 4,
    borderColor: '#87665c', // Tertiary container
    alignItems: 'center',
    marginBottom: 10,
    // Established pixel shadow
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  actionBtnText: {
    fontFamily: 'monospace',
    color: '#3e2723', // Coklat gelap established
    fontSize: 14,
    fontWeight: '900',
  }
});
