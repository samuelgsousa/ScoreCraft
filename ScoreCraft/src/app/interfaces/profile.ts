export interface Profile{
    id: number
    nome: string
    foto_perfil: string | null
    fav_gen: Array<String> | null
    // avaliacoes: Array<number> !Não será necessário, visto que posso acessar o review_list e de lá contabilizar o total de cada estrela de avaliações
    streamer: boolean
    seguindo: Array<number> | null
    wallpaper: string | null
    bio: string | null
    // review_list: Array<number>
    fav_games: Array<number> | null
    email: string | null
    senha: string | null
}