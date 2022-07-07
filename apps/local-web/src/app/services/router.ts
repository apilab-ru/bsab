type QueryValue = string | number | null;

class Router {
  updateQuery(newParams: Record<string, QueryValue>): void {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries()) as Record<string, QueryValue>;

    for (const key in newParams) {
      if (newParams[key]) {
        params[key] = newParams[key];
      } else {
        delete params[key];
      }
    }

    let query = '';

    if (Object.values(params).length) {
      query = '?' + Object.entries(params)
        .map(([key, value]) => `${ key }=${ value }`)
        .join('&');
    }

    window.history.pushState(
      { page: "main" },
      '',
      location.pathname + query,
    );
  }

  getQueryParams<T extends Record<string, any>>(): Partial<T> {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlSearchParams.entries()) as Partial<T>;
  }
}

export const router = new Router();
