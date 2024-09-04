export interface Profile{
    id: number
    nome: string
    foto_perfil: string
    seguidores: Array<number>
    horas_jogadas: number //possívelmente será necessário alterar para Array<number>
    fav_gen: Array<String>
    // avaliacoes: Array<number> !Não será necessário, visto que posso acessar o review_list e de lá contabilizar o total de cada estrela de avaliações
    streamer: boolean
    seguindo: Array<number>
    wallpaper: string
    bio: string
    review_list: Array<number>
    fav_games: Array<number>
}