export const getColorFromId = (id) => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA500",
    "#6A5ACD",
    "#2ECC71",
    "#E91E63",
    "#3498DB",
    "#9B59B6",
    "#F1C40F",
  ];

  // simple hash
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % colors.length);
  return colors[index];
};
