/*
import { writable } from 'svelte/store';
import { localStorageStore } from 'svelte-local-storage-store';

const validUsers = [
    { username: 'user', password: 'user' },
    { username: 'admin', password: 'admin' }
];

export function authenticate(username, password) {

    return validUsers.some(user => user.username === username && user.password === password);
}

export const user = writable(null, () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user.set(JSON.parse(storedUser));
    }
    return () => {};
});

localStorageStore('user', user);*/
