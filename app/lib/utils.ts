/**
 * Bytes ko KB, MB, ya GB mein convert karne ke liye (TypeScript Version)
 */
export const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];

  // Index nikalne ka logic
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Result return karna unit ke saath
  const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  
  return `${formattedValue} ${sizes[i]}`;
};