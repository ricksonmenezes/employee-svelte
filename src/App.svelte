<script>import "./app.css";
import svelteLogo from './assets/svelte.svg'
import viteLogo from '/vite.svg'
import Counter from './lib/Counter.svelte'
import Router from 'svelte-spa-router';
import EmployeeList from "./routes/EmployeeList.svelte";
import AddEmployee from "./routes/AddEmployee.svelte";
</script>

<main>

  <div>

    <Router routes={{
                '/': EmployeeList,
                '/add2': AddEmployee
            }} />
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
