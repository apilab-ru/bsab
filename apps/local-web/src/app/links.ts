export const Links = {
   maps: {
      path: '/maps',
      filter: (params: Object) => `/maps?filter=${JSON.stringify(
         Object.entries(params).map(([key, value]) => ({ key, value }))
      )}`
   },
   playlists: {
      path: '/',
      openId: (id: string) => `/?openedId=${id}`
   }
}
