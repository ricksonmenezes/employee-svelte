# 1. Known Issues 

- Date calendars css do not match the rest of the form
- Sign in Takes time and no the loader is not appropriate.
- Primary check boxes are not aligned. 
- Contact fields should have been placed downwards
- If you refresh page, the local storage is able to reload the app store but the login page shows up for a 2 seconds
- primary checkbox fields are not aligned with contacts
- Add Employee and logout buttons are not aligned
- If you are logged into to user "user", you cannot login to user "admin" one the same browser at the same time.


## 2. Features I couldn't reach due to time constraints 
- Search
- Pagination
## 3. Good to have but is missing

- Delete popup is not shown

## 4. Login Logout mechanism is powered by userbase library

Added an external service, UserBase for login/logout. Incredibly nice service but out of scope to deal with all its issues on this demo app. One of the issues is that for userbase, you are always logged in on the server side if you login on one browser. If you login again on another, it is possible it wont ask you to login. Userbase provides you session key etc which can be saved in LocalStorage in order to (say)

# 5. REQUIREMENTS

1. Please have docker running on your machine.
2. Please make sure you are logged into docker. On windows, git bash often can give issues with "docker-credentials". It's safe to go to Docker Desktop app and start the terminal window there

## 6 PORTS NEED TO BE AVAILABLE

- Spring boot is running on 8081
- mysql is running on 3307
- Svelte app works on 8082. In case you need to run svelte inside IDE, it runs on 8080

For the database port to not be used. You need to ensure that the port 3306, 3307 is not already in use.
If you have MySQL installed on your machine, I suggest you stop the service so that the port is free.

On Mac, the way to check if the port is free or is being used is

`sudo lsof -i: 3307`

This command above will tell you the pid of the process. If being used,  you could kill the process by pid

`kill pid`

pid will be

Same above goes for port 8081, 8080.

On Windows, one could merely go to services and stop mysql.

# 7. COMMANDS TO RUN

1. Go to an empty folder in your machine open on terminal (terminal discussed on 4.3)
2. `git clone https://github.com/ricksonmenezes/employee-svelte.git`
3. you will find a new folder employee-svelte. cd /employee-svelte
4. once inside, run command below

`docker compose up --build`

# 7. Commands to run for starting a docker container

`docker build . -t employee-svelte-docker`

`docker run --rm --name=employee-svelte-docker -p 8082:80 employee-svelte-docker`

If Nginx says it is "ready", your client app should start on localhost:8082

# 8. Fall back if docker does not work

`npm install`

`npm run dev`

Your client app should start on localhost:8080

# 9. Users for logging in to svelte app

username: user
password: userpassword

username: admin
password: adminpassword



