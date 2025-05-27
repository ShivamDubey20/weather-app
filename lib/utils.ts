export function convertTemperature(celsius: number, unit: "celsius" | "fahrenheit"): number {
  if (unit === "fahrenheit") {
    return (celsius * 9) / 5 + 32
  }
  return celsius
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}
