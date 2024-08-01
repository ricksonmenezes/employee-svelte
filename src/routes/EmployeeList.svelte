<script>
    /*import Router from 'svelte-spa-router';*/
    import {Link, navigate} from 'svelte-routing';
    import axios from 'axios';
    import {onMount} from 'svelte';
    import { getEmployeeListGql} from "../lib/graphqlqueries.js";
    import apiService from "../lib/api.js";


    var employeesTable = [];
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





    function getEmployeesForTable(employees) {


        debugger
        const currentDate = new Date();

         employeesTable = employees.data.employees.map(employee => {
            // Concatenate names
            const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;

            // Get primary address
            const primaryAddressObj = employee.addresses.find(address => address.primary);
            const primaryAddress = primaryAddressObj ? `${primaryAddressObj.address1} ${primaryAddressObj.address2}` : '';

            // Get primary contact
            const primaryContactObj = employee.contacts.find(contact => contact.primary);
            const primaryContact = primaryContactObj ? primaryContactObj.contactNo : '';

            // Calculate age

            const age = calculateAge(employee.birthDate)

            const yearsInCompany  = calculateAge(employee.hiredDate)
            // Calculate years in company
            const hiredDate = new Date(employee.hiredDate);
           // const yearsInCompany = currentDate.getUTCFullYear() - hiredDate.getUTCFullYear() - (currentDate.getUTCMonth() < hiredDate.getUTCMonth() || (currentDate.getUTCMonth() === hiredDate.getUTCMonth() && currentDate.getUTCDate() < hiredDate.getUTCDate()) ? 1 : 0);

            return {
                name,
                primaryAddress,
                primaryContact,
                age,
                yearsInCompany
            };
        });

        debugger
        console.log(employeesTable);


    }

    function calculateAge(dateString) {
        // Parse the date string into a Date object
        const birthDate = new Date(dateString);
        const today = new Date();

        // Calculate the age
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    async function getEmployeeList() {

        try {
            const graphQuery = getEmployeeListGql()
            const response = await apiService.getGraphQLData(graphQuery);
            if(response.status === 200) {


                console.log('Response:', response.data);
                debugger
                getEmployeesForTable(response.data);

            } else {
             //   addEmployeeError = 'Something went wrong when creating an employee record. Please try again later.'
                console.log('Response was ', response.status);
            }

        } catch (error) {
            console.log(error);
        }

    }

    function removeEmployee(employeeID) {
        const path = `localhost:8081/employees/${employeeID.employee.code}`;
        axios.delete(path)
            .then(() => {

            })
            .catch((error) => {
                console.error(error);

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

            })
            .catch((error) => {
                console.log(error);

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

            })
            .catch((error) => {
                console.error(error);

            });
        updatetoggle();
    }
    onMount(getEmployeeList);

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


    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" class="px-6 py-3">
                     Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Primary Address
                </th>
                <th scope="col" class="px-6 py-3">
                    Primary Contact Info
                </th>
                <th scope="col" class="px-6 py-3">
                    Age
                </th>
                <th scope="col" class="px-6 py-3">
                    No. of years in Company
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
            </thead>
            <tbody>
            {#each employeesTable as employee}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {employee.name}</th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {employee.primaryAddress}</th>
                    <td class="px-6 py-4">
                        {employee.primaryContact}</td>
                    <td class="px-6 py-4">
                        {employee.age}</td>
                    <td class="px-6 py-4">
                        {employee.yearsInCompany}</td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</a>
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                    </td>
                </tr>
            {/each}


            </tbody>
        </table>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                </li>
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                </li>
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                </li>
                <li>
                    <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                </li>
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                </li>
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                </li>
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                </li>
            </ul>
        </nav>
    </div>


</div>
