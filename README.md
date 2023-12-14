## TravelSnap - A travel photo app :airplane:

Welcome to our TDS200 - Kryssplattform exam project!

Our assignment was to make a photo app inspired by Instagram that focused on travel and exploration.

## :wrench: Technologies

The app was built using React Native and Expo Go, as well as Firebase and Firestore for backend and database functionality!

## :computer: Install and run project

Open a new terminal and run the following command:

```
npm i
```

This will install the nodeModules in the project. Then you can run the command

```
npm start
```

to start Expo Go and then chose the simulator you want to use (Android og iOS), or run the app directly on your phone by downloading the Expo Go app and scan the QR code that shows in the terminal when you run npm start.

Once you run the app, you can either create a user, log in or continue as a guest. If you want to test out the app quickly, you can use the email: **suswin@gmail.com** and the password: **123456**

## :rocket: Functionality

The app consist of five main tabs:

- **Feed** - Where you can see uploaded images from other users, and access a detail view of each image containing tags, description and map view. You can also leave a comment on the image. This also applies in the search tab.
- **Search** - Where you can search for images based on **#tags**.
- **Uploading** - Where you can upload images to your profile, either directly by taking a photo, or choose one from the camera roll on your phone.
- **Map** - Where you can see a map with your own images, based on geolocation.
- **Profile** - A gallery with your own uploaded images, and from here you can also tap each image to add descriptions and tags. You will also see a map view if the image contains location data. From this view you can then add the image to the feed. You can also access profile settings to edit username, user description and profile image, or sign out.

**The app has only been tested on the iOS simulator and on iPhones running the Expo Go app.**

## :pushpin: Limitations & known bugs

- Currently you must take & upload one photo before the location data is set and starts showing up in the photo detail view. Also, images uploaded from your device (at least on iPhone) does not retrieve location data.

- When you chose a new profile image you can only do so once, as we don't have a sort function in place, and only retrieve index 0 from the Firebase storage folder. Also currently we have a warning of unhandled ID when uploading a profile image, but the images do upload to firebase storage.

- Due to use of multiple individual routes and navigation stacks, we ran into an issue regarding signOut, as we could not go back to the welcomeRoutes (containing our start up screen with create user/login) using PopToTop(). To get around this issue, we had to reload the whole app using DevSettings.reload(). This happens when you press Log out in profile settings, or when you press log in when trying to access the profile page when not logged in. We are aware that this is not an optimal solution, and would not work in production.

- Multiple routes/naviagtion stacks also resulted in useEffect not triggering when going from stack to stack, and this led to cases of missing updates when adding items to Firebase storage, so we have implemented refresh buttons. This is an issue that would be solved differently given more time.

## :8ball: Planned features

- Implement the map-tab to use location data, as this page is currently not doing so.
- Give users the ability to follow other users.
- Be able to delete photos from your profile/feed.
- Implement dark mode.
