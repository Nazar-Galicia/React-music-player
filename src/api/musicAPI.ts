const URL: string = 'https://api.audius.co/v1/tracks/search'

export const musicAPI = {
    getSongData: async (query: string) => {
        return fetch(`${URL}?query=${query}&limit=10`).then(res => res.json())
    }
}