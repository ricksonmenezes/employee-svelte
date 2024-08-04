

<script>
    import { Input, Label,Dropdown,DropdownItem, Helper, Button, Checkbox, A } from 'flowbite-svelte';
    import { navigate } from 'svelte-routing'
    import { onMount } from 'svelte';
    import { DatePicker } from "@svelte-plugins/datepicker";
    import { format } from 'date-fns';
    import { userHasPrivilege } from '../stores'

    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import apiService from '../lib/api';
    import {deleteEmployeeGql, getEmployeeGql} from "../lib/graphqlqueries.js";
    import {userbaseStore} from "../stores.js";
    //import { initializeDeleteModal } from '../lib/deletemodal.js';

    let deleteModalController;


    console.log("startofpagemounduserhasprivileges" + $userHasPrivilege)
    function openModal() {

        deleteModalController.open();
    }

    let formData = {

        code:null,
        contactPrimary1: false,
        contactPrimary2: false,
        contactPrimary3: false,
        addressPrimary1: false,
        addressPrimary2: false,
        contact1ID: '',
        contact1: '',
        contact2ID: '',
        contact2: '',
        contact3ID: '',
        contact3: '',
        selectedMaritalStatus: '',
        selectedGender: '',
        hiredDate: null,
        birthDate: null,
        position: '',
        addressID1: '',
        address1: '',
        address2: '',
        addressID2: '',
        address3: '',
        address4: '',
        firstName: '',
        lastName: '',
        middleName: ''

    };

    let emp_code = null;
    let action = null;

    onMount(() => {
        console.log("startofmounduserhasprivileges" + $userHasPrivilege)
        const urlParams = new URLSearchParams(window.location.search);
        emp_code = urlParams.get('value');
        action = urlParams.get('action')
        if(emp_code) {
            getEmployee(emp_code);
        }
        console.log("userhasprivileges" + $userHasPrivilege)


       // deleteModalController = initializeDeleteModal();
        console.log("df")
    });

    function cancel() {
        navigate('/list')

    }
    async function deleteEmployee() {

        try {
            const graphQuery = deleteEmployeeGql(emp_code)
            const response = await apiService.getGraphQLData(graphQuery);
            if(response.status === 200) {

                console.log('Response:', response.data);
                navigate('/');

            } else {
                //   addEmployeeError = 'Something went wrong when creating an employee record. Please try again later.'
                console.log('Response was ', response.status);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function getEmployee(emp_code) {

        try {
            const graphQuery = getEmployeeGql(emp_code)
            const response = await apiService.getGraphQLData(graphQuery);
            if(response.status === 200) {

                console.log('Response:', response.data);
                prepareEmploteeDataForTable(response.data);

            } else {
                //   addEmployeeError = 'Something went wrong when creating an employee record. Please try again later.'
                console.log('Response was ', response.status);
            }

        } catch (error) {
            console.log(error);
        }

    }

    function  prepareEmploteeDataForTable(employeeObj) {


        let employee = employeeObj.data.employee;
        const primaryContactObj = employee.contacts.find(contact => contact.primary);
        const primaryAddress = employee.addresses.find(address => address.primary);
        const nonPrimaryContacts = employee.contacts.filter(contact => !contact.primary);
        const nonPrimaryAddress = employee.addresses.filter(address => !address.primary);
        console.log(employee)



        formData = {

            code: employee.code,
            contactPrimary1 : true,
            contactPrimary2 : false,
            contactPrimary3 : false,
            addressPrimary1 : true,
            addressPrimary2 : false,
            contact1: primaryContactObj.contactNo,
            contact1ID: primaryContactObj.id,
            contact2: nonPrimaryContacts[0] ? nonPrimaryContacts[0].contactNo :  '',
            contact2ID: nonPrimaryContacts[0] ? nonPrimaryContacts[0].id : '',
            contact3ID: nonPrimaryContacts[1] ? nonPrimaryContacts[1].id : '',
            contact3: nonPrimaryContacts[1] ? nonPrimaryContacts[1].contactNo :  '',
            selectedMaritalStatus : employee.maritalStatus,
            selectedGender : employee.gender,
            hiredDate: employee.hiredDate,
            birthDate: employee.birthDate,
            position: employee.position,
            addressID1: primaryAddress.id,
            address1: primaryAddress.address1,
            address2: primaryAddress.address2,
            addressID2: nonPrimaryAddress[0] ? nonPrimaryAddress[0].id : '',
            address3: nonPrimaryAddress[0] ? nonPrimaryAddress[0].address1 : '',
            address4: nonPrimaryAddress[0] ? nonPrimaryAddress[0].address2 : '',
            firstName: employee.firstName,
            lastName: employee.lastName,
            middleName:employee.middleName

        };
        datePickerBirthDate = new Date(formData.birthDate)
        datePickerHiredDate = new Date(formData.hiredDate);
    }


    let  datePickerBirthDate = new Date();

    let datePickerHiredDate = new Date();
    let dateFormat = 'yyyy-MM-dd';
    let isOpen1 = false;
    let isOpen2 = false;

    const toggleDatePicker1 = () => (isOpen1 = !isOpen1);
    const toggleDatePicker2 = () => (isOpen2 = !isOpen2);

    const formatDate = (dateString) => {
        return dateString && format(new Date(dateString), dateFormat) || '';
    };

    let formattedBirthDate = formatDate(datePickerBirthDate);
    let formattedHiredDate = formatDate(datePickerHiredDate);

    const onChange1 = () => {
        datePickerBirthDate = new Date(formattedBirthDate);
    };

    const onChange2 = () => {
        datePickerHiredDate = new Date(formattedHiredDate);
    };

    $: formattedBirthDate = formatDate(datePickerBirthDate);
    $: formattedHiredDate = formatDate(datePickerHiredDate);


    let maritalStatusError = '';
    let genderError = '';
    let contactPrimaryError = '';
    let addressPrimaryError = '';
    let addEmployeeError = '';

    
</script>

<h1>View Employee</h1>
<p></p>

    <div class="grid gap-x-8 gap-y-4 grid-cols-4">
        <div>
            <Label for="first_name" class="mb-2">First name</Label>
            <Input disabled type="text" id="first_name" bind:value={formData.firstName} placeholder="John" required/>
        </div>
        <div>
            <Label for="contact_1" class="mb-2">Contact 1</Label>
            <Input disabled type="text" id="contact_1" bind:value={formData.contact1} placeholder="123-123-2345" required/>
        </div>

        <div>

            <Checkbox bind:checked={formData.contactPrimary1} class="mb-6 space-x-1 rtl:space-x-reverse">
                Primary
            </Checkbox>
        </div>
        <div></div>
        <div>
            <Label for="middle_name" class="mb-2">Middle name</Label>
            <Input disabled type="text" id="middle_name" bind:value={formData.middleName} placeholder="A"/>
        </div>
        <div>
            <Label for="contact_2" class="mb-2">Contact 2</Label>
            <Input disabled type="text" id="contact_2" bind:value={formData.contact2} placeholder="123-234-2342"/>
        </div>
        <div>
            <div></div>
            <Checkbox disabled bind:checked={formData.contactPrimary2} class="mb-6 space-x-1 rtl:space-x-reverse">
                Primary
            </Checkbox>
        </div>
        <div></div>
        <div>
            <Label for="last_name" class="mb-2">Last name</Label>
            <Input disabled  type="text" id="last_name" bind:value={formData.lastName} placeholder="Doe" required/>
        </div>
        <div>
            <Label for="contact_3" class="mb-2">Contact 3</Label>
            <Input disabled  type="text" id="contact_3" bind:value={formData.contact3} placeholder="123-234-2342"/>
        </div>
        <div>
            <div></div>
            <Checkbox disabled bind:checked={formData.contactPrimary3} class="mb-6 space-x-1 rtl:space-x-reverse">
                Primary
            </Checkbox>
        </div>
        <div></div>
        <div>
            <Label for="birthdate" class="mb-2">Birth Date</Label>
            <!-- <Input disabled type="date" id="birthdate" bind:value={formData.birthdate}  required />-->
            <!--<div class="relative max-w-sm">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                </div>
                <input required  id="birthdate" bind:value={formData.birthdate} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
            </div>-->
            <DatePicker bind:isOpen={isOpen1}  bind:startDate={datePickerBirthDate}>
                <input type="text" disabled bind:value={formattedBirthDate} required placeholder="Select date"
                       on:change={onChange1} on:click={toggleDatePicker1}/>
            </DatePicker>
        </div>
        <div>
            <div>
                <Label for="address1" class="mb-2">Address 1</Label>
                <Input disabled  type="text" id="address1" bind:value={formData.address1}
                       placeholder="Apartment 23A, Rupert Street" required/>
            </div>
        </div>
        <div>
            <div>
                <Label for="address2" class="mb-2">Address 2</Label>
                <Input disabled type="text" id="address2" bind:value={formData.address2} placeholder="Lexington Avenue, London"
                       required/>
            </div>
        </div>
        <div>

            <Checkbox disabled bind:checked={formData.addressPrimary1} class="mb-6 space-x-1 rtl:space-x-reverse">
                Primary
            </Checkbox>
        </div>
        <div>
            <Label for="gender" class="mb-2">Gender</Label>
            <Button disabled>
                <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white"/>
                {formData.selectedGender || 'Select an option'}</Button>
            <Dropdown>
                <DropdownItem on:click={() => { formData.selectedGender = 'MALE'; genderError='' }}>Male</DropdownItem>
                <DropdownItem on:click={() => { formData.selectedGender = 'FEMALE';genderError='' }}>Female
                </DropdownItem>
                <DropdownItem on:click={() => { formData.selectedGender = 'OTHER';genderError='' }}>Other</DropdownItem>
            </Dropdown>
            {#if formData.genderError}
                <p class="text-red-500">{genderError}</p>
            {/if}
        </div>
        <div>
            <div>
                <Label for="address3" class="mb-2">Address 1</Label>
                <Input disabled type="text" id="address3" bind:value={formData.address3}
                       placeholder="Apartment 23A, Rupert Street"/>
            </div>
        </div>
        <div>
            <div>
                <Label for="address4" class="mb-2">Address 2</Label>
                <Input disabled type="text" id="address4" bind:value={formData.address4} placeholder="Lexington Avenue, London"/>
            </div>
        </div>
        <div>

            <Checkbox bind:checked={formData.addressPrimary2} class="mb-6 space-x-1 rtl:space-x-reverse">
                Primary
            </Checkbox>
        </div>
        <div>
            <Label for="maritalstatus" class="mb-2">Marital Status</Label>
            <Button disabled>
                <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white"/>
                {formData.selectedMaritalStatus || 'Select an option'}</Button>
            <Dropdown>
                <DropdownItem on:click={() => { formData.selectedMaritalStatus = 'MARRIED'; maritalStatusError='' }}>
                    Married
                </DropdownItem>
                <DropdownItem on:click={() => { formData.selectedMaritalStatus = 'SINGLE'; maritalStatusError='' }}>
                    Single
                </DropdownItem>
                <DropdownItem on:click={() => { formData.selectedMaritalStatus = 'WIDOWED'; maritalStatusError='' }}>
                    Widowed
                </DropdownItem>
            </Dropdown>
            {#if maritalStatusError}
                <p class="text-red-500">{maritalStatusError}</p>
            {/if}
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div>
            <Label for="position" class="mb-2">Position</Label>
            <Input disabled type="text" id="position" bind:value={formData.position} required placeholder="Software Tester"/>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div>
            <Label for="hireddate" class="mb-2">Date Hired</Label>
            <!--<Input disabled type="date" id="hireddate"  bind:value={formData.hireddate} required />-->
            <DatePicker bind:isOpen={isOpen2} bind:startDate={datePickerHiredDate}>
                <input type="text" disabled bind:value={formattedHiredDate} required placeholder="Select date"
                       on:change={onChange2} on:click={toggleDatePicker2}/>
            </DatePicker>
        </div>
        <div></div>
    </div>
    <div class=""></div>
    <div>
        {#if contactPrimaryError}
            <p class="text-red-500">{contactPrimaryError}</p>
        {/if}
    </div>
    <div>
        {#if addressPrimaryError}
            <p class="text-red-500">{addressPrimaryError}</p>
        {/if}
    </div>
    <div>
        {#if addEmployeeError}
            <p class="text-red-500">{addEmployeeError}</p>
        {/if}
    </div>
   {#if $userHasPrivilege}
    <Button on:click={deleteEmployee} id="confirm-delete-employee">Delete</Button>
   {/if}
<Button on:click={cancel}>Cancel</Button>

<div id="delete-modal" class="fixed inset-0 flex items-center justify-center z-50 hidden">
    <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this item?</h3>
        <div class="flex justify-end">
            <button id="confirm-delete" class="text-white bg-red-600 hover:bg-red-800 px-4 py-2 rounded-lg">Yes, I'm sure</button>
            <button id="cancel-delete" class="ml-2 text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
        </div>
    </div>
</div>
