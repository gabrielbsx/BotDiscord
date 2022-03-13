import { IMeta } from '../meta/meta.dto';

export interface IChatData {
    id: number,
    nick: string,
    message: string,
    created_at: string,
    updated_at: string,
};

export interface IChat {
    meta: IMeta,
    data: IChatData[],
};