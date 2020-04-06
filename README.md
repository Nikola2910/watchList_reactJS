# watchList_reactJS

![cover](http://i.imgur.com/EkYS1u9.png)
- App made using React JS for searching movies and adding them to Watch list and Watched list.
- When typing in [search field](http://i.imgur.com/D1b3gQF.png) an API request is sent and movies are listed based on search field value. There is also a feature that disallows sending consecutive requests if user is typing fast.
- On clicking [add to list](http://i.imgur.com/IC3Mi6v.png) object with additional information is posted to firebase, fetched and rendered on the [page](http://i.imgur.com/0M6Mqwo.png).
- A movie can be moved to Watched list by clicking on [Watched movie icon](http://i.imgur.com/JERZPP2.png) or it can be deleted by clicking on [Delete movie icon](http://i.imgur.com/9RP0aXf.png).
- When the Watched movie icon is clicked, movie is deleted from firebase, and is posted to another firebase colection which renders movies in the "Watched movies" list.
- When a Movie title is clicked, [additional information](http://i.imgur.com/4m4iQhn.png) for that movie is displayed.
- We can also sort movies by genre by using [selector](http://i.imgur.com/3MlS4WE.png) or by clicking on a [specific genre](http://i.imgur.com/eAa2oW9.png) that is listed under the movie title.
- App is also [responsive](http://i.imgur.com/VH8XXBq.png) on all devices.
