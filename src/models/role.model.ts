
export interface RoleModel {
    id?: number;
    name?: Role.NameEnum;
}


export namespace Role {
    export type NameEnum = 'USER' | 'ADMIN';
    export const NameEnum = {
        USER: 'USER' as NameEnum,
        ADMIN: 'ADMIN' as NameEnum
    };
}
