<script>

    import { Input } from 'flowbite-svelte';
    import {userbaseStore, userStore, promiseStore} from '../stores'
    import { navigate } from 'svelte-routing'
    import {onMount} from "svelte";
    import {userHasPrivilege} from "../stores.js";
  //  import {authenticate, user} from "../lib/auth.js";


    let username, password;

    console.log('reaches signing ' + new Date())
    onMount(() => {
        if($userStore) {
            console.log('reaches onMoun of signing' + new Date())
            navigate('/list')
        }



    });

    function signedIn() {

        return $userStore ? true : false
       // return true;
    }

    function signedInlocal() {

        return $userStore ? true : false
        // return true;
    }

    function signin() {


        if($userStore  && $userStore.username === username) {
            console.log('reahes signin function of signin')
            navigate('/list');
        } else {
            $promiseStore = $userbaseStore.signIn({username, password})
                .then((user) => {
                    $userStore = user

                    console.log('userstore values ' + $userStore.username)
                    $userHasPrivilege = $userStore.username === 'admin'
                    console.log($userHasPrivilege)
                })
        }

        console.log($userStore)
    }

    /*function signinlocal() {

        if (authenticate(username, password)) {
            // If authentication is successful, update the store
            $user = { username, password };
            localStorage.setItem('user', JSON.stringify({ username, password }));
            navigate('/list');
        }
    }*/
</script>


    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <!--<img class="w-8 h-8 mr-2" src="https://www.legalmatch.com/" alt="logo">-->
                Employee Management
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form on:submit|preventDefault={signin} class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <Input type="text" bind:value={username} name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required=""/>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input bind:value={password} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">

                                </div>

                            </div>

                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                    </form>
                </div>
            </div>
        </div>
    </section>

