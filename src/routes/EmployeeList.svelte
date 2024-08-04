<script>

    import {Link, navigate} from 'svelte-routing';
    import axios from 'axios';
    import {onMount} from 'svelte';
    import { getEmployeeListGql} from "../lib/graphqlqueries.js";
    import apiService from "../lib/api.js";
    import {userHasPrivilege, userStore} from '../stores'

    var employeesTable = [];

    function prepareEmployeeDataForTable(employees) {


         employeesTable = employees.data.employees.map(employee => {

             const code = employee.code;
            const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;

            const primaryAddressObj = employee.addresses.find(address => address.primary);
            const primaryAddress = primaryAddressObj ? `${primaryAddressObj.address1} ${primaryAddressObj.address2}` : '';

            const primaryContactObj = employee.contacts.find(contact => contact.primary);
            const primaryContact = primaryContactObj ? primaryContactObj.contactNo : '';

            const age = calculateAge(employee.birthDate)

            const yearsInCompany  = calculateAge(employee.hiredDate)

            return {
                code,
                name,
                primaryAddress,
                primaryContact,
                age,
                yearsInCompany
            };
        });

        console.log(employeesTable);

    }

    function calculateAge(dateString) {

        const birthDate = new Date(dateString);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

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

                //console.log('Response:', response.data);

                prepareEmployeeDataForTable(response.data);

            } else {
             //   addEmployeeError = 'Something went wrong when creating an employee record. Please try again later.'
               // console.log('Response was ', response.status);
            }

        } catch (error) {
            console.log(error);
        }

    }


    onMount(() => {
        console.log('userstore values '  + $userStore ? $userStore.username : '');
        getEmployeeList();

    });


</script>

<svelte:head>

</svelte:head>

<style>


</style>

<div>

    {#if $userHasPrivilege}
    <Link to="/add2">Add Employee</Link>
        {/if}
    {#if employeesTable.length === 0}
        <p class="text-red-500">No Data</p>
    {:else}

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
                        <Link to="/view?value={employee.code}&action=view" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>

                        {#if $userHasPrivilege}
                        <Link to="/edit?value={employee.code}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</Link>
                        <Link to="/delete?value={employee.code}&action=delete" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Link>
                        {/if}
                    </td>
                </tr>
            {/each}


            </tbody>
        </table>
        <!--<nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <a href="/" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                </li>
                <li>
                    <a href="/" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                </li>
                <li>
                    <a href="/" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                </li>
                <li>
                    <a href="/" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                </li>
                <li>
                    <a href="/" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                </li>
                <li>
                    <a href="/" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                </li>
                <li>
                    <a href="/" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                </li>
            </ul>
        </nav>-->
    </div>

    {/if}
</div>

