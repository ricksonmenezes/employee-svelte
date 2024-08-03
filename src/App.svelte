<script>import "./app.css";
import svelteLogo from './assets/svelte.svg'
import viteLogo from '/vite.svg'
import Counter from './lib/Counter.svelte'
import { Router, Route, Link, navigate } from 'svelte-routing';
/*import Router from 'svelte-spa-router';*/
import EmployeeList from "./routes/EmployeeList.svelte";
import AddEmployee from "./routes/AddEmployee.svelte";
import ViewEmployee from "./routes/ViewEmployee.svelte";
import EditEmployee from "./routes/EditEmployee.svelte";
</script>

<main>

  <div>

    <!--<Router routes={{
                '/': EmployeeList,
                '/add2': AddEmployee
            }} />-->
    <Router>
      <Route path="/" component={EmployeeList} />
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
