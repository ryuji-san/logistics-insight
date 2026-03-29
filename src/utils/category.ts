export function categoryStyle(category: string) {
  const styles: Record<string, { badge: string; dot: string; bg: string; icon: string }> = {
    "AI・ロボティクス": {
      badge: "bg-violet-50 text-violet-600",
      dot: "bg-violet-500",
      bg: "bg-gradient-to-br from-violet-50 to-violet-100/50",
      icon: "🤖",
    },
    "物流政策": {
      badge: "bg-blue-50 text-blue-600",
      dot: "bg-blue-500",
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      icon: "🏛️",
    },
    "物流DX": {
      badge: "bg-emerald-50 text-emerald-600",
      dot: "bg-emerald-500",
      bg: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
      icon: "🔗",
    },
    "サステナビリティ": {
      badge: "bg-teal-50 text-teal-600",
      dot: "bg-teal-500",
      bg: "bg-gradient-to-br from-teal-50 to-teal-100/50",
      icon: "🌱",
    },
    "人材・労務": {
      badge: "bg-orange-50 text-orange-600",
      dot: "bg-orange-500",
      bg: "bg-gradient-to-br from-orange-50 to-orange-100/50",
      icon: "👥",
    },
  };

  return (
    styles[category] ?? {
      badge: "bg-gray-50 text-gray-600",
      dot: "bg-gray-500",
      bg: "bg-gradient-to-br from-gray-50 to-gray-100/50",
      icon: "📄",
    }
  );
}
