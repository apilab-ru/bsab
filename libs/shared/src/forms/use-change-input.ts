export function useChangeInput<T = string>(callback: (val: T) => void) {
  return (event: any) => callback((event.target as HTMLInputElement).value as T)
}