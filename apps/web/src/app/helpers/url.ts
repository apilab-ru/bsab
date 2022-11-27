export function prepareUrlParams(params: Object): string {
   return Object.entries(params)
      .map(([key, value]) => `${ key }=${ value }`)
      .join('&');
}
