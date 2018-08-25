The application from here: https://github.com/GeorgeFourikis/DataChallenge but using Docker
===
Step1
==
By running this command we build the 2 different parts of our app, `app` and `mongo`  
```console
    > docker-compose build
```

Step2
==
By running this command on a normal behaviour we make sure that we save the data to the DB instance and run both the mongo and app instances
```console
    > docker-compose up
```

Step3
==
Go to localhost:3000, enjoy! :)