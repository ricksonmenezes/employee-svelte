

<script>
    import { Input, Label,Dropdown,DropdownItem, Helper, Button, Checkbox, A } from 'flowbite-svelte';
    import { navigate } from 'svelte-routing'
    import { onMount } from 'svelte';
    import { DatePicker } from "@svelte-plugins/datepicker";
    import { format } from 'date-fns';

    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import apiService from '../lib/api';
    import {createEmployeeMutation} from "../lib/graphqlqueries.js";

    let formData = {
        contactPrimary1 : false,
        contactPrimary2 : false,
        contactPrimary3 : false,
        addressPrimary1 : false,
        addressPrimary2 : false,
        contact1: '',
        contact2: '',
        contact3: '',
        selectedMaritalStatus : '',
        selectedGender : '',
        hireddate: null,
        birthdate: null,
        position: '',
        address1:'',
        address2:'',
        address3:'',
        address4:'',
        firstName: '',
        lastName: '',
        middleName:''

    };

    let startDate1 = new Date();
    let startDate2 = new Date();
    let dateFormat = 'MM/dd/yy';
    let isOpen1 = false;
    let isOpen2 = false;

    const toggleDatePicker1 = () => (isOpen1 = !isOpen1);
    const toggleDatePicker2 = () => (isOpen2 = !isOpen2);

    const formatDate = (dateString) => {
        return dateString && format(new Date(dateString), dateFormat) || '';
    };

    let formattedStartDate1 = formatDate(startDate1);
    let formattedStartDate2 = formatDate(startDate2);

    const onChange1 = () => {
        startDate1 = new Date(formattedStartDate1);
    };

    const onChange2 = () => {
        startDate2 = new Date(formattedStartDate2);
    };

    $: formattedStartDate1 = formatDate(startDate1);
    $: formattedStartDate2 = formatDate(startDate2);


    let maritalStatusError = '';
    let genderError = '';
    let contactPrimaryError = '';
    let addressPrimaryError = '';
    let addEmployeeError = '';



    function handleSubmit() {

        if (!formData.selectedMaritalStatus) {
            maritalStatusError = 'This field is required.';
        } else {
            maritalStatusError = '';
            // Proceed with form submission
            console.log('Form submitted with value:', formData.selectedMaritalStatus);
        }

        if (!formData.selectedGender) {
            genderError = 'This field is required.';
        } else genderError = '';

        const moreThanOneContactPrimary = (formData.contactPrimary1 && (formData.contactPrimary2 || formData.contactPrimary3)) || (formData.contactPrimary2 && formData.contactPrimary3);
        if (!formData.contactPrimary1 && !formData.contactPrimary2 && !formData.contactPrimary3) {
            contactPrimaryError = 'At least one contact must be selected as primary';
        } else if (moreThanOneContactPrimary) {
            contactPrimaryError = 'Only one contact must be selected as primary';
        } else contactPrimaryError = '';



        if (!formData.addressPrimary1 && !formData.addressPrimary2) {
            addressPrimaryError = 'At least one address must be selected as primary';
        } else if (formData.addressPrimary1 && formData.addressPrimary2) {
            addressPrimaryError = 'Only one address must be selected as primary';
        } else if(formData.addressPrimary2 && (!formData.address3 || !formData.address4)) {
            addressPrimaryError = 'address selected as primary is not filled';
        } else addressPrimaryError = '';



        let error =  (addressPrimaryError || moreThanOneContactPrimary || genderError || contactPrimaryError || maritalStatusError);
        if(error) {
            return;
        }
        console.log("startdate1 " + startDate1);
        console.log("formattedStartDate1 "  + formattedStartDate1)
        debugger


        let contacts = [];


        contacts.push({contact:formData.contact1, isPrimary: formData.contactPrimary1})

        if(formData.contact2) {
            contacts.push({contact:formData.contact2, isPrimary: formData.contactPrimary2})
        }
        if(formData.contact3) {
            contacts.push({contact:formData.contact3, isPrimary: formData.contactPrimary3})
        }

        let addresses = [];
        addresses.push({address1: formData.address1, address2: formData.address2, isPrimary: formData.addressPrimary1})

        if(formData.addressPrimary2) {
            addresses.push({address1: formData.address3, address2: formData.address4, isPrimary: formData.addressPrimary2})
        }
  console.log('reach')


        let employeeData = {
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            maritalStatus : formData.selectedMaritalStatus,
            gender : formData.selectedGender,
            hiredDate: Date.parse(formattedStartDate2),
            birthDate: Date.parse(formattedStartDate1),
            position: formData.position,
            contacts: contacts,
            addresses: addresses
        };

        createEmployee(employeeData);





    }

    async function createEmployee(employeeData) {

        const mutation = createEmployeeMutation(employeeData)
        try {
            const response = await apiService.getGraphQLData(mutation);
            if(response.status === 200) {
                console.log('Response:', response.data);
                navigate('/');
            } else {
                addEmployeeError = 'Something went wrong when creating an employee record. Please try again later.'
            }

        } catch (error) {
           console.log(error);
        }

    }
</script>

<h1>Add an Employee</h1>
<p></p>
<form on:submit|preventDefault={handleSubmit}>
    <div class="grid gap-x-8 gap-y-4 grid-cols-4">
        <div>
            <Label for="first_name" class="mb-2">First name</Label>
            <Input type="text" id="first_name" bind:value={formData.firstName} placeholder="John" required />
        </div>
        <div>
            <Label for="contact_1" class="mb-2">Contact 1</Label>
            <Input type="text" id="contact_1" bind:value={formData.contact1} placeholder="123-123-2345" required />
        </div>

        <div>

            <Checkbox bind:checked={formData.contactPrimary1} class="mb-6 space-x-1 rtl:space-x-reverse" >
                Primary
            </Checkbox>
        </div>
        <div></div>
        <div>
            <Label for="middle_name" class="mb-2">Middle name</Label>
            <Input type="text" id="middle_name" bind:value={formData.middleName} placeholder="A"  />
        </div>
        <div>
            <Label for="contact_2" class="mb-2">Contact 2</Label>
            <Input type="text" id="contact_2" bind:value={formData.contact2} placeholder="123-234-2342" />
        </div>
        <div>
        <div></div>
            <Checkbox bind:checked={formData.contactPrimary2}  class="mb-6 space-x-1 rtl:space-x-reverse" >
                Primary
            </Checkbox>
        </div>
        <div></div>
        <div>
            <Label for="last_name" class="mb-2">Last name</Label>
            <Input type="text" id="last_name" bind:value={formData.lastName} placeholder="Doe" required />
        </div>
        <div>
            <Label for="contact_3" class="mb-2">Contact 3</Label>
            <Input type="text" id="contact_3" bind:value={formData.contact3} placeholder="123-234-2342" />
        </div>
        <div>
            <div>  </div>
            <Checkbox bind:checked={formData.contactPrimary3}  class="mb-6 space-x-1 rtl:space-x-reverse" >
                Primary
            </Checkbox>
        </div>
        <div></div>
        <div>
            <Label for="birthdate" class="mb-2">Birth Date</Label>
           <!-- <Input type="date" id="birthdate" bind:value={formData.birthdate}  required />-->
            <!--<div class="relative max-w-sm">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                </div>
                <input required  id="birthdate" bind:value={formData.birthdate} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
            </div>-->
            <DatePicker   bind:isOpen={isOpen1} bind:startDate={startDate1}>
                <input type="text" bind:value={formattedStartDate1} required placeholder="Select date" on:change={onChange1}  on:click={toggleDatePicker1} />
            </DatePicker>
        </div>
        <div>
            <div>
                <Label for="address1" class="mb-2">Address 1</Label>
                <Input type="text" id="address1" bind:value={formData.address1} placeholder="Apartment 23A, Rupert Street" required />
            </div>
        </div>
        <div>
            <div>
                <Label for="address2" class="mb-2">Address 2</Label>
                <Input type="text" id="address2" bind:value={formData.address2} placeholder="Lexington Avenue, London" required />
            </div>
        </div>
        <div>

            <Checkbox bind:checked={formData.addressPrimary1} class="mb-6 space-x-1 rtl:space-x-reverse" >
                Primary
            </Checkbox>
        </div>
        <div>
            <Label for="gender" class="mb-2">Gender</Label>
            <Button><ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
                {formData.selectedGender || 'Select an option'}</Button>
            <Dropdown>
                <DropdownItem on:click={() => { formData.selectedGender = 'MALE'; genderError='' }}>Male</DropdownItem>
                <DropdownItem on:click={() => { formData.selectedGender = 'FEMALE';genderError='' }}>Female</DropdownItem>
                <DropdownItem on:click={() => { formData.selectedGender = 'OTHER';genderError='' }}>Other</DropdownItem>
            </Dropdown>
            {#if formData.genderError}
                <p class="text-red-500">{genderError}</p>
            {/if}
        </div>
        <div>
            <div>
                <Label for="address3" class="mb-2">Address 1</Label>
                <Input type="text" id="address3" bind:value={formData.address3} placeholder="Apartment 23A, Rupert Street" />
            </div>
        </div>
        <div>
            <div>
                <Label for="address4" class="mb-2">Address 2</Label>
                <Input type="text" id="address4" bind:value={formData.address4} placeholder="Lexington Avenue, London" />
            </div>
        </div>
        <div>

            <Checkbox bind:checked={formData.addressPrimary2} class="mb-6 space-x-1 rtl:space-x-reverse" >
                Primary
            </Checkbox>
        </div>
        <div>
            <Label for="maritalstatus" class="mb-2">Marital Status</Label>
            <Button><ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
                {formData.selectedMaritalStatus || 'Select an option'}</Button>
            <Dropdown>
                <DropdownItem on:click={() => { formData.selectedMaritalStatus = 'MARRIED'; maritalStatusError='' }}>Married</DropdownItem>
                <DropdownItem on:click={() => { formData.selectedMaritalStatus = 'SINGLE'; maritalStatusError='' }}>Single</DropdownItem>
                <DropdownItem on:click={() => { formData.selectedMaritalStatus = 'WIDOWED'; maritalStatusError='' }}>Widowed</DropdownItem>
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
            <Input type="text" id="position" bind:value={formData.position} required  placeholder="Software Tester" />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div>
            <Label for="hireddate" class="mb-2">Date Hired</Label>
            <!--<Input type="date" id="hireddate"  bind:value={formData.hireddate} required />-->
            <DatePicker   bind:isOpen={isOpen2} bind:startDate={startDate2}>
                <input  type="text" bind:value={formattedStartDate2} required placeholder="Select date" on:change={onChange2} on:click={toggleDatePicker2} />
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
    <Button type="submit">Submit</Button>
    <Button href="/">Cancel</Button>
</form>