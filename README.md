The application from here: <p>https://github.com/GeorgeFourikis/DataChallenge</p> but using Docker
===

Step1
==
Clone the application
```console
    > git clone https://github.com/GeorgeFourikis/DataChallengeDocker.git
    > cd DataChallengeDocker
```

Step1
==
By running this command we build the 2 different parts of our app, `app` and `mongo`  
```console
    > docker-compose build
```

Step2
==
By running this command on a normal behaviour we make sure that we save the data to the DB instance and run both the `mongo` and `app` instances
```console
    > docker-compose up
```

Step3
==
Go to localhost:3000, enjoy! :)