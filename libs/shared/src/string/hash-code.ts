export function hashCodeNumber(s: string): number {
   return s.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a
   }, 0)
}
