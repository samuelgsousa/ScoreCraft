export interface Reviews{
    id: number
    user_id: number
    game_id: number
    played_data?: Date
    rating: number
    review_text: string
}