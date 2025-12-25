export interface Info {
    seed: string;
    results: number;
    page: number;
    version: string;
}

export interface UserResponse {
    results: User[];
    info: Info;
}

export interface User {
    name: UserName;
    gender: Gender;
    location: UserLocation;
    email: string;
    phone: string;
    cell: string;
    nat: string;
    dob: UserDOB;
    picture: Picture;
    login: Login;
}

export interface UserName {
    title: string;
    first: string;
    last: string;
}

export type Gender = 'male' | 'female';

export interface UserLocation {
    city: string;
    state: string;
    country: string;
    street: {
        number: number;
        name: string;
    }
}

export interface UserDOB {
    date: string;
    age: number;
}

export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface Login {
    uuid: string;
}
