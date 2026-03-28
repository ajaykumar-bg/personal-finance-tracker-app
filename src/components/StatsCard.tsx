import { useAppSelector } from "@/hooks/useRedux";
import { formatCurrency } from "@/utils/currency";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Card, Text } from "react-native-paper";

interface StatItem {
  label: string;
  value: number;
  color?: string;
}

interface StatsCardProps {
  stats: StatItem[];
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const currency = useAppSelector((state) => state.settings.currency);
  const { width } = useWindowDimensions();

  // xs: < 320dp  → single column (stats stacked vertically, full width)
  // sm: < 360dp  → normal row (unchanged)
  // md+: ≥ 360dp → normal row
  const isXs = width < 320;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={isXs ? styles.containerColumn : styles.container}>
          {stats.map((stat, index) => (
            <View
              key={index}
              style={[
                styles.stat,
                isXs && styles.statColumn,
                isXs && index < stats.length - 1 && styles.statColumnDivider,
              ]}
            >
              <Text
                variant={isXs ? "bodyMedium" : "bodySmall"}
                style={[styles.label, isXs && styles.labelColumn]}
                numberOfLines={1}
              >
                {stat.label}
              </Text>
              <Text
                variant={isXs ? "titleMedium" : "titleLarge"}
                style={[styles.value, stat.color && { color: stat.color }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                {formatCurrency(stat.value, currency)}
              </Text>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  // md+: stats side-by-side in a row
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
  },
  // xs: stats stacked in a single column
  containerColumn: {
    flexDirection: "column",
    gap: 0,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    minWidth: 0,
  },
  // xs stat item: full width, row layout (label left, value right)
  statColumn: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  statColumnDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
  },
  label: {
    opacity: 0.7,
    marginBottom: 4,
  },
  // In column mode label sits beside the value — remove bottom margin so they align
  labelColumn: {
    marginBottom: 0,
    opacity: 0.6,
  },
  value: {
    fontWeight: "bold",
  },
});
