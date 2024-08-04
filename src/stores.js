import {writable} from 'svelte/store'

export const userbaseStore = writable(null)
export const userStore = writable(null)
export const promiseStore = writable(null)
export const userHasPrivilege = writable(null)

export const isLoading = writable(true);


const storedUser = JSON.parse(localStorage.getItem('user') || 'null');


userStore.set(storedUser)
console.log('storeduser' + storedUser)
console.log('userstire' + userStore)
isLoading.set(false)
console.log('userStore wil be filed')
console.log('userstore filled with value ' + userStore ? userStore.username : 'still null')
// Subscribe to userStore to update localStorage
userStore.subscribe((value) => {
if (value === null) {
    localStorage.removeItem('user'); // Remove the key if the value is null
} else {
    localStorage.setItem('user', JSON.stringify(value));
}
});