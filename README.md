# Known Issues 

- Date calendars css do not match the rest of the form
- Pagination is missing.
- Sign in Takes time and no the loader is not properly shown
- If you refresh page, the local storage is able to reload the app store but the login page shows up for a 2 seconds
- primary checkbox fields are not aligned with contacts
- Add Employee and logout buttons are not aligned

This template should help get you started developing with Svelte in Vite.

## Good to have but is missing

- Delete popup is not shown

## Login Logout mechanism is powered by userbase library


docker build . -t employee-svelte-docker

docker run --rm --name=employee-svelte-docker -p 5000:80 employee-svelte-docker
