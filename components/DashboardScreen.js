import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function DashboardScreen({ username, stats, setStats, onLogout }) {
  const handleFeed = () => {
    setStats(prev => ({
      ...prev,
      streak: prev.streak + 1,
      paws: prev.paws + 20,
      hp: 100
    }));
    Alert.alert("🍖 Berhasil!", "Buddy kenyang, Tang!");
  };

  return (
    <View style={styles.container}>
      {/* Header Profile */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>⚔️ WELCOME, {username.toUpperCase()}!</Text>
          <Text style={styles.headerSub}>CLASS: WARRIOR</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.headerLevel}>LVL {stats.level}</Text>
          <Text style={styles.expText}>{stats.xp}/100 XP</Text>
        </View>
      </View>

      {/* Screen Monitor Character */}
      <View style={styles.monitor}>
        <Text style={styles.avatar}>{stats.hp === 0 ? "💀" : "🐕"}</Text>
        <Text style={styles.petStatus}>Buddy setia nemenin perjuangan lo, Tang!</Text>
      </View>

      {/* Stats Matrix Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>STREAK</Text>
          <Text style={styles.statVal}>{stats.streak} Hari</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>BUDDY HP</Text>
          <Text style={[styles.statVal, {color: '#10b981'}]}>{stats.hp}/100</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>COINS</Text>
          <Text style={[styles.statVal, {color: '#f59e0b'}]}>{stats.paws} 🐾</Text>
        </View>
      </View>

      {/* Main Trigger Action */}
      <TouchableOpacity style={styles.mainBtn} onPress={handleFeed}>
        <Text style={styles.mainBtnText}>FEED BUDDY & LOCK DAY 🍖</Text>
      </TouchableOpacity>

      {/* Footer System Option */}
      <View style={styles.footer}>
        <Text style={{ color: '#52525b', fontSize: 10 }}>Auto-save data aktif</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logoutText}>Keluar Akun (Logout)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0d' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#27272a', paddingBottom: 15 },
  headerTitle: { color: '#fff', fontSize: 14, fontWeight: '900' },
  headerSub: { color: '#6366f1', fontSize: 10, fontWeight: '700', marginTop: 2 },
  headerLevel: { color: '#f59e0b', fontSize: 15, fontWeight: '900' },
  expText: { color: '#52525b', fontSize: 9, fontWeight: '600' },
  monitor: { backgroundColor: '#13131a', borderRadius: 24, padding: 25, alignItems: 'center', marginTop: 20, borderWidth: 1, borderColor: '#27272a' },
  avatar: { fontSize: 50, marginBottom: 8 },
  petStatus: { color: '#71717a', fontSize: 11, fontStyle: 'italic', textAlign: 'center' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 15 },
  statCard: { backgroundColor: '#1a1a24', borderRadius: 16, width: '31%', alignItems: 'center', paddingVertical: 12, borderWidth: 1, borderColor: '#27272a/40' },
  statLabel: { color: '#a1a1aa', fontSize: 8, fontWeight: '800' },
  statVal: { color: '#fff', fontSize: 13, fontWeight: '900', marginTop: 4 },
  mainBtn: { backgroundColor: '#4f46e5', padding: 16, borderRadius: 16, alignItems: 'center' },
  mainBtnText: { color: '#fff', fontWeight: '900', fontSize: 12, letterSpacing: 0.5 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 20 },
  logoutText: { color: '#ef4444', fontSize: 11, fontWeight: '700', textDecorationLine: 'underline' }
});
