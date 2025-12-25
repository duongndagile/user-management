import type { UserResponse } from "../types/user.type";

const BASE_URL = 'https://randomuser.me/api';

export const getUsers = async (page: number, results: number, seed: string = "user-list"): Promise<UserResponse> => {
    const url = `${BASE_URL}?page=${page}&results=${results}&seed=${seed}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};