export interface IRankingData {
    id: number,
    slug: string,
    account_id: number,
    nick: string,
    level: number,
    class: number,
    evolution: number,
    kingdom: number,
    guild_id: number | null,
    guildlevel: number,
    points: number,
    frags: number,
    slot: number,
    has_subcelestial: boolean,
    subcelestial_level: number,
    celestial_level: number,
    created_at: string,
    updated_at: string,
};

export interface IRankingMeta {
    total: number,
    per_page: number,
    current_page: number,
    last_page: number,
    first_page: number,
    first_page_url: string,
    last_page_url: string,
    next_page_url: string,
    previous_page_url: string | null,
}

export interface IRanking {
    meta: IRankingMeta,
    data: IRankingData[],
};


