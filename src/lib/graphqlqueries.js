
function formatArray(array) {
    return array.map(item => {
        const entries = Object.entries(item).map(([key, value]) => {
            // If the value is a string, wrap it in quotes; otherwise, leave it as is
            return `${key}:${typeof value === 'string' ? `"${value}"` : value}`;
        });
        return `{${entries.join(',')}}`;
    }).join(',');
}
export function createEmployeeMutation(employeeData) {

    const contactsString = `[${formatArray(employeeData.contacts)}]`;
    const addressesString = `[${formatArray(employeeData.addresses)}]`;

    return `
        mutation {
            createEmployee(input: { 
                employee: {
                    firstName: "${employeeData.firstName}",
                    lastName: "${employeeData.lastName}",
                    middleName: "${employeeData.middleName}",
                    gender: ${employeeData.gender},  
                    position: "${employeeData.position}",
                    birthDate: ${employeeData.birthDate},
                    hiredDate: ${employeeData.hiredDate},
                    maritalStatus: ${employeeData.maritalStatus}  
                } 
                contacts: ${contactsString}
                addresses: ${addressesString}
            }) {
                code 
            }
        }
    `;
}

export function updateEmployeeMutation(employeeData) {

    const contactsString = `[${formatArray(employeeData.contacts)}]`;
    const addressesString = `[${formatArray(employeeData.addresses)}]`;

    return `
        mutation {
            updateEmployee(input: { 
                employee: {
                    code: ${employeeData.code},
                    firstName: "${employeeData.firstName}",
                    lastName: "${employeeData.lastName}",
                    middleName: "${employeeData.middleName}",
                    gender: ${employeeData.gender},  
                    position: "${employeeData.position}",
                    birthDate: ${employeeData.birthDate},
                    hiredDate: ${employeeData.hiredDate},
                    maritalStatus: ${employeeData.maritalStatus}  
                } 
                contacts: ${contactsString}
                addresses: ${addressesString}
            }) {
                code 
            }
        }
    `;
}

export function getEmployeeListGql() {

    return `
        query {
  employees {
    code
    firstName
    middleName
    lastName
    birthDate
    hiredDate
    
    contacts {
      id
      contactNo
      primary
    }
    addresses{
      id
      address1
      address2
      primary
    }
    
  }
}
    `;
}

export function getEmployeeGql(emp_code) {

    return `
        query {
  employee(code: ${emp_code}) {
    code
    firstName
    gender
    middleName
    lastName
    maritalStatus
    birthDate
    hiredDate
    position
    contacts {
      id
      contactNo
      primary
    }
    addresses{
      id
      address1
      address2
      primary
    }
    
  }
}
    `;
}

export function deleteEmployeeGql(emp_code) {

    return `
        mutation {
            deleteEmployee(code: ${emp_code})
        }`;
}
