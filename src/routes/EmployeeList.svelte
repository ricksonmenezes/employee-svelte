<script>
    /*import Router from 'svelte-spa-router';*/
    import { Link } from 'svelte-routing';
    import axios from 'axios';
    import { fly } from 'svelte/transition';


    import {
        onMount
    } from "svelte";

    var employees = [];
    var addEmployeeForm = {
        title: '',
        author: '',
        description: '',
    };
    var editForm = {
        _id: '',
        title: '',
        author: '',
        description: '',
    };



    function getEmployees() {
        axios.get(`http://localhost:8081/employees`)
            .then((res) => {
                employees = res.data;
                //employees = res;
                console.log(res)
                //employees = {"_id":1,"title":"postgres vol 1", "description":"good employee"};
            });

        console.log(employees);
        employees = [{"code":1,"name":"postgres vol 1", "description":"good employee"}];
        console.log("reaches here")
    };

    function removeEmployee(employeeID) {
        const path = `localhost:8081/employees/${employeeID.employee.code}`;
        axios.delete(path)
            .then(() => {
                getEmployees();
            })
            .catch((error) => {
                console.error(error);
                getEmployees();
            });
    };

    function initForm() {
        addEmployeeForm.name = '';
        addEmployeeForm.author = '';
        addEmployeeForm.description = '';
        editForm.code = '';
        editForm.name = '';
        editForm.author = '';
        editForm.description = '';
    };

    function addEmployee() {
        const payload = {
            name: addEmployeeForm.name,
            author: addEmployeeForm.author,
            description: addEmployeeForm.description,
        };
        const path = `/employees/localhost:8081`;
        axios.post(path, payload)
            .then(() => {
                getEmployees();
            })
            .catch((error) => {
                console.log(error);
                getEmployees();
            });
        addtoggle();
    };

    function editEmployee(employee) {
        updatetoggle();
        editForm = employee.employee;
    };

    function updateEmployee() {
        const payload = {
            name: editForm.name,
            author: editForm.author,
            description: editForm.description,
        };
        const path = `/employees/localhost:8081/${editForm.code}`;
        axios.put(path, payload)
            .then(() => {
                getEmployees();
            })
            .catch((error) => {
                console.error(error);
                getEmployees();
            });
        updatetoggle();
    }
    onMount(getEmployees);
    let addopen = false;

    function addtoggle() {
        initForm();
        addopen = !addopen;
    };
    let updateopen = false;

    function updatetoggle() {
        initForm();
        updateopen = !updateopen;
    };
</script>

<svelte:head>

</svelte:head>

<style>


</style>

<div>

    <Link to="/add2">Add Employee</Link>

</div>
