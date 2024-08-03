  <script>
    import "./app.css";
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import { Router, Route, navigate } from 'svelte-routing';
  import EmployeeList from "./routes/EmployeeList.svelte";
  import AddEmployee from "./routes/AddEmployee.svelte";
  import ViewEmployee from "./routes/ViewEmployee.svelte";
  import EditEmployee from "./routes/EditEmployee.svelte";
  //import SignIn from "./routes/SignIn.svelte";
  import {userbaseStore, userStore, promiseStore} from './stores'
    import SignIn from "./routes/SignIn.svelte";
    import Logout from "./routes/Logout.svelte";

  const userbase = window.userbase
  window.userbase = null

  $userbaseStore = userbase
  $userStore = null

    $promiseStore = userbase.init({appId: 'fc0fb7c0-7f0c-4d7c-a1a2-81f1101052ef'})
          .then((session) => $userStore = session.user)



  function retrySignIn() {

    navigate('/');
  }

    $: if ($userStore) {
      console.log('reaches $:' + new Date())
      navigate('/list');
    } else {
      navigate('/');
    }
    function signout() {
      $promiseStore = $userbaseStore.signOut().then(() => $userStore = null)
    }
  </script>

  <main>

    <div>

      {#await $promiseStore.then(() => Promise.reject())}
        Loading..
      {:catch error}
        {#if error}
          debugger
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
