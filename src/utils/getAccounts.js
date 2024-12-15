const icons = import.meta.glob('../assets/icons/accounts/*.svg', { eager: true });

export const getAccountIcon = (type, subtype) => {
  // Normalize keys by removing "../assets/icons/" and ".svg"
  const formattedIcons = {};
  for (const [key, value] of Object.entries(icons)) {
    const iconName = key.replace('../assets/icons/accounts/', '').replace('.svg', '');
    formattedIcons[iconName] = value.default || value;
  }

  // Check for specific subtype match first
  if (subtype && formattedIcons[subtype]) {
    return formattedIcons[subtype];
  }

  // Fallback to general type match or unknown
  return formattedIcons[type] || formattedIcons.unknown;}