const URL: string = 'https://api.audius.co/v1/tracks/search'

export const musicAPI = {
    getSongData: async (query: string, page: number, limit: number = 10) => {
        return fetch(`${URL}?query=${query}&limit=${limit}&offset=${page * limit}`).then(res => res.json())
    }
}