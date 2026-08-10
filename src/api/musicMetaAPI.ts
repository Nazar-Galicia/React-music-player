const URL: string = 'https://itunes.apple.com/search'

export const musicMetaAPI = {
    getSongData: async (query: string) => {
        return fetch(`${URL}?term=${query}&entity=song&limit=10`).then(res => res.json())
    }
}