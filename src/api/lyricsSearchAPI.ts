const URL = 'https://lrclib.net/api/search'

export const lyricsSearchAPI = {
    searchLyrics: async (query: string) => {
        return fetch(`${URL}?q=${query}`).then(res => res.json())
    }
}