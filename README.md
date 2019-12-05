![HomePage](public/images/header-800.jpg)
# YouCritic

Are you a movie critic?
Does not matter, come share your opinion on the movies you watch!

## Motivation

We created YouCritic as a way for people to see movie trailers and be able to rate movies and see what others have rated the movie! 
 
## Screenshots

![HomePage](public/images/homepageGif.gif)

![Search Option](public/images/searchpage.gif)

![Detail Page](public/images/detailsGif.gif)

![Review](public/images/review.png)

![Login](public/images/login.png)

![Register](public/images/register.png)

## Tech/framework used

<b>Built with</b>
- [HTML/CSS](https://electron.atom.io)
- [BOOTSTRAP](https://getbootstrap.com/)
- [NODE](https://nodejs.org/en/)
- [EXPRESS](https://expressjs.com/)
- [SEQUALIZE](https://www.npmjs.com/package/sequelize)
- [PASSPORT](http://www.passportjs.org/)
- [MySQL](https://www.mysql.com/)
- [HEROKU](https://www.heroku.com/)

## Features

YouCritic has some amazing features such as on the home page, you will be able to see the latest movies from release date, trending movies on most searched and all movies sorted by genre! The main feature will give users the ability to not only see movie information and a trailer but also leave a rating and review! 

## Installation
Provide step by step series of examples and explanations about how to get a development env running.

## API Reference

- [THE MOVIE DATABASE API](https://developers.themoviedb.org/3/getting-started/introduction)

YouCritic is based around our API call to The Movie Database API. On the home page, all the different sections are being pulled by the API call referencing each different section. When you are searching for a movie, the API call will display all the movies that fit the search term. On the movie detail page, you will see related movies to the movie selected which is also an API call!  

## Tests

The type of testing we used was a canary test. A "canary" test is one we set up to always pass, this can help us ensure our testing suite is set up correctly before writing real tests.


## Credits

Make sure you give the YouCritic team a round of applause! 

Aaron – Set up the database, handle the routes and spearheaded the authentication

Chris – Took care of the frontend design and functionality

William – Worked on front end JS to connect the front and back together

## Challenges

Learning the Passport authentication and getting it to work

The scrolling of the carousel and making it stop on the right side

## Successes

The auth was the “if we can” functionality and we were able to surpass goal and go further