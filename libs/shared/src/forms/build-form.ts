export function buildForm<T extends Record<string, any>>(form: any): T {
   const data: T = {} as T;

   (form as HTMLFormElement).querySelectorAll('input').forEach(item => {
      // @ts-ignore
      data[item.name] = item.value;
   })

   return data;
}
