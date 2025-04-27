# tailschat


test chat platform





## Setting up


first, install `npm`


then, clone this repo or download the code as a zip.


then run `npm install`.


then run `npm start`.


optionally, set the environment variable "banhashpasswd" to a sha256 hashed password for the admin commands like /ban and /unban





## WebUI


when you run `npm start` a local web server should run at localhost:3000


## Application

I have tested the app on android 2.3.6 but it should work on about every version that appinventor supports.

If you do not want to edit the app code, download the apk file and install it on your device. If you want to edit the app code, then download the .aia file

and go to https://ai2.appinventor.mit.edu and import the .aia in the Projects tab. (Don't click the repository one by mistake)

when you are finished making your changes click on the "Build" tab then "Android App (.apk)"


## Contributing

You are welcome to contribute!


## Commands


/ban <password> <user>: bans a user


/unban <password> <user>: unbans a user


/help: shows a command list


/clear: clears the chat

