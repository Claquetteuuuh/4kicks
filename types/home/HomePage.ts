export type SliderImg = {
    slider_id: string,
    slider_title: string,
    slider_text: string,
    call_to_action_text: string,
    call_to_action_url: string
}

export type Articles = {

}

export type Categories = {
    categorie_name: string,
    articles: Articles[];
}
