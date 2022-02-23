import { IMeta } from './meta.dto';

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

export interface IRanking {
    meta: IMeta,
    data: IRankingData[],
};


