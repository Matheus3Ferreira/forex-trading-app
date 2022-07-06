export default function verifyVolumeData(newValue: number): number {
  if (newValue > 100) {
    return 100;
  }
  if (newValue < 0.01 || !newValue) {
    return 0.01;
  }
  return parseFloat(newValue.toFixed(2));
}
