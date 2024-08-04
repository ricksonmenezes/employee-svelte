  <script>
    import "./app.css";

  import { Router, Route, navigate } from 'svelte-routing';
  import EmployeeList from "./routes/EmployeeList.svelte";
  import AddEmployee from "./routes/AddEmployee.svelte";
  import ViewEmployee from "./routes/ViewEmployee.svelte";
  import EditEmployee from "./routes/EditEmployee.svelte";
  //import SignIn from "./routes/SignIn.svelte";
  import {userbaseStore,isLoading, userStore, userHasPrivilege, promiseStore} from './stores'
    import SignIn from "./routes/SignIn.svelte";
    import Logout from "./routes/Logout.svelte";
    import {onMount} from "svelte";

  const userbase = window.userbase
  window.userbase = null

  $userbaseStore = userbase
  $userStore = null

    $promiseStore = userbase.init({appId: 'fc0fb7c0-7f0c-4d7c-a1a2-81f1101052ef'})
          .then((session) => $userStore = session.user)


    onMount(() => {


    });
  function retrySignIn() {

    navigate('/');
  }

  console.log('$userstore in app.svelte reached ')
    let appReady = false;
    $: if (!$isLoading) {
      console.log('isloading becoming true')
      console.log('value of userStore ' + $userStore)
      appReady = true;
    }

    $: if (appReady && $userStore) {
      if($userStore.username === 'admin') {
        $userHasPrivilege= true;
      }
      console.log('reaches reactive $Userstore on app.svelte ' + $userStore.user+ ' date:' + new Date())
      navigate('/list');
    } else {

    console.log('app.svelte else loop of user store /')
      navigate('/');
    }
    function signout() {
      $promiseStore = $userbaseStore.signOut().then(() => {
        $userStore = null;
        $userHasPrivilege = false;
      })
    }
  </script>

  <main>

    <div>

      {#await $promiseStore.then(() => Promise.reject())}
        Loading..
      {:catch error}
        {#if error}

          <strong class="text-red-700 font-bold">ERROR! {error} </strong>
        {/if}
        {#if $userStore}
          <button on:click={signout}>Logout</button>

        {:else}

        {/if}
      {/await}

      </div>
        <div>

      <Router>
        <Route path="/" component={SignIn} />
        <Route path="/logout" component={Logout} />
        <Route path="/list" component={EmployeeList} />
        <Route path="/add2" component={AddEmployee} />
        <Route path="/view" component={ViewEmployee} />
        <Route path="/delete" component={ViewEmployee} />
        <Route path="/edit" component={EditEmployee} />

      </Router>
    </div>
  </main>


  <style>
    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.svelte:hover {
      filter: drop-shadow(0 0 2em #ff3e00aa);
    }
    .read-the-docs {
      color: #888;
    }
  </style>
