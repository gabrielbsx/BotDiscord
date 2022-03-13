import { IMeta } from '../meta/meta.dto';

export interface IDeathData {
    id: number,
    killer: string,
    killed: string,
    x: number,
    y: number,
    created_at: string,
    updated_at: string,
};

export interface IDeath {
    meta: IMeta,
    data: IDeathData[],
};