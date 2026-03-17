import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../context/ThemeContext";
import { SPACING } from "../theme";

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backButton}>
              <Icon name="arrow_back_ios" color={theme.text} size={20} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.text }]}>
              Business Login
            </Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={[styles.logoContainer, { backgroundColor: isDark ? 'rgba(19, 91, 236, 0.2)' : 'rgba(19, 91, 236, 0.1)' }]}>
              <Icon name="inventory_2" color={theme.primary} size={48} />
            </View>
            <Text style={[styles.heroTitle, { color: theme.text }]}>
              StockSync Pro
            </Text>
            <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>
              Inventory & Sales Management System
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Input
              label="Work Email"
              placeholder="name@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<Icon name="mail" color={theme.textSecondary} size={20} />}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              icon={<Icon name="lock" color={theme.textSecondary} size={20} />}
            />

            {/* Remember Me / Forgot Pass */}
            <View style={styles.formOptions}>
              <TouchableOpacity style={styles.checkboxContainer}>
                <View style={[
                  styles.checkbox, 
                  { 
                    borderColor: theme.border,
                    backgroundColor: theme.background 
                  }
                ]} />
                <Text style={[styles.checkboxLabel, { color: theme.textSecondary }]}>
                  Remember me
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[styles.forgotPassword, { color: theme.primary }]}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionSection}>
            <Button
              label="Login to Dashboard"
              onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              })}
              icon={<Icon name="login" color="white" size={20} />}
            />
            <View style={styles.footerLinks}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                Don't have an account?
              </Text>
              <TouchableOpacity>
                <Text style={[styles.footerLink, { color: theme.primary }]}>
                  Contact Admin
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Visual Decor */}
          <View style={styles.decorContainer}>
            <View style={[styles.decorOverlay, { backgroundColor: theme.primary }]} />
            <View style={styles.decorBars}>
              <View style={[styles.decorBar, { height: 48, backgroundColor: theme.primary }]} />
              <View style={[styles.decorBar, { height: 80, backgroundColor: theme.primary }]} />
              <View style={[styles.decorBar, { height: 64, backgroundColor: theme.primary }]} />
              <View style={[styles.decorBar, { height: 96, backgroundColor: theme.primary }]} />
              <View style={[styles.decorBar, { height: 40, backgroundColor: theme.primary }]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 40,
  },
  heroSection: {
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: 40,
  },
  logoContainer: {
    width: 96,
    height: 96,
    marginBottom: SPACING.xl,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  formSection: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    gap: 16,
  },
  formOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "bold",
  },
  actionSection: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
    marginTop: "auto",
  },
  footerLinks: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontWeight: "bold",
    fontSize: 14,
  },
  decorContainer: {
    position: "relative",
    width: "100%",
    height: 128,
    marginTop: 16,
    overflow: "hidden",
  },
  decorOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    opacity: 0.05,
  },
  decorBars: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "100%",
    paddingBottom: 32,
    paddingHorizontal: 40,
    opacity: 0.2,
  },
  decorBar: {
    width: 8,
    borderRadius: 99,
  },
});
