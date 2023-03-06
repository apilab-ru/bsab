// https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react

export function formReducer<T, Key extends keyof T>(state:T, key: Key, value: T[Key]): T {
   return {
      ...state,
      [key]: value
   }
}

// const [formData, setFormData] = useReducer(formReducer, {});

/*export const handleChange = event => {
   setFormData({
      name: event.target.name,
      value: event.target.value,
   });
}*/
