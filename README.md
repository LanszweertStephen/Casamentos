

# Casamentos

## Idea of the app

The idea of the app is making a small website where you can order formules and look at your account with those orders. My aunt was asking for a website for her `weddingplanner` so I thought I'd make it into an PWA.

Throughout the app this theme always comes back (I've tried this with the fonts and the colors). To the future this app could be expand to a normal `party planner` .

## Used frontend

At first I was planning to use Angular as a frontend framework for my app and started to learn it. I quickly realized my knowledge of Angular wasn't that good yet so I pushed that idea away.

For the views I just simply used the EJS view-system in Node.

## Used backend

For the backend (the server) of the app I used **NodeJs**. In this way I practiced for another partim this semester (Advanced Server Web) and I plan to continue in this backend after my studies. 

## Used API's 

I didn't used many API's as I used my own data to return to the users. In fact the only API i used is that one from `Google Maps` to display the map on the contact page.

## App hosting  + database

At first I tried it with just an MySQL database and everything worked fine. After that the issue of getting it online popped up. I tried a lot of ways and different hosts but ended up with the `Google Firebase`.

The Google Firebase has some very good documentation and is well maintained (as it is maintained by the people at Google). They also have a very good CLI which makes it easy for a developer to test and deploy the app.

A few of the commands I use with Firebase:
* firebase init hosting -> to setup the hosting project (for static files)
* firebase init functions -> to setup the NodeJs backend
* firebase serve --only funtions,hosting -> to test the app locally
* firebase deploy -> to push all the files online to the actual web server

Google Firebase uses a `NoSql database` at the backend and they make sure your website is served over **HTTPS**.

As you will see in the ZIP file there are 2 main folders: the public folder and the functions folder.

The public folder has almost no use and is just so that Firebase can succesfully push the files to the online host. The functions folder contains everything needed for the NodeJs backend + the views.

# Start the app

As I said earlier I used Google Firebase to host my app.
So by just surfing to [this](https://casamentos-16f05.firebaseapp.com/) you should be able to get to this PWA. 

You can also access the github repository by clicking on [this](https://github.com/LanszweertStephen/Casamentos) link.
