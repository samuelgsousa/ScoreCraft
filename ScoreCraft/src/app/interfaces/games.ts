export interface Games{
    id: number
    name: string
    cover: string
    cover_url: string
    release_date: Date
    summary: string
    producer: string
    genres: Array<String>
}