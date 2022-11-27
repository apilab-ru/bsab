export const formatDuration = (duration: number) => {
   const minutes = Math.floor(duration / 60);
   const seconds = (duration - (minutes * 60)).toString().padStart(2, '0');

   return `${minutes}:${seconds}`
}
