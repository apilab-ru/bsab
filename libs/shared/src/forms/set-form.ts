export function setForm<T extends object>(form: HTMLFormElement, data: T) {
   if (!form) {
      return;
   }

   Object.entries(data).forEach(([key, value]) => {
      const input = form.querySelector(`[name='${key}']`) as HTMLInputElement;

      if (input) {
         input.value = value;
      }
   })
}
