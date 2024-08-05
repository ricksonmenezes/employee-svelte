# Known Issues 

- Date calendars css do not match the rest of the form
- Sign in Takes time and no the loader is not appropriate.
- Primary check boxes are not aligned. 
- Contact fields should have been placed downwards
- If you refresh page, the local storage is able to reload the app store but the login page shows up for a 2 seconds
- primary checkbox fields are not aligned with contacts
- Add Employee and logout buttons are not aligned
- If you are logged into to user "user", you cannot login to user "admin" one the same browser at the same time.


## Features I couldn't reach due to time constraints 
- Search
- Pagination
## Good to have but is missing

- Delete popup is not shown

## Login Logout mechanism is powered by userbase library

Added an external service, UserBase for login/logout. Incredibly nice service but out of scope to deal with all its issues on this demo app. One of the issues is that for userbase, you are always logged in on the server side if you login on one browser. If you login again on another, it is possible it wont ask you to login. Userbase provides you session key etc which can be saved in LocalStorage in order to (say)

# Commands to run for starting a docker container

`docker build . -t employee-svelte-docker`

`docker run --rm --name=employee-svelte-docker -p 8082:80 employee-svelte-docker`

If Nginx says it is "ready", your client app should start on localhost:8082

# Fall back if docker does not work

`npm install`

`npm run dev`

Your client app should start on localhost:8080

# Users for logging in to svelte app
username: user
password: userpassword

username: admin
password: adminpassword



