[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![alt text](https://github.com/christianbmartinez/social-media-api/blob/main/socialmediaapi.jpg)

# Social Media Api

An api for that uses mongo db, express, nodemon, and moment js for a ficticious social media website to handle large amounts of unstructured data.

### Table of Contents

**[User Story](#user-story)**<br>
**[Acceptance Criteria](#acceptance-criteria)**<br>
**[Installation Instructions](#installation)**<br>
**[Usage Instructions](#usage)**<br>
**[License](#license)**<br>
**[Contributing](#contributing)**<br>
**[Questions](#questions)**<br>

# User Story

- AS A social media startup
- I WANT an API for my social network that uses a NoSQL database
- SO THAT my website can handle large amounts of unstructured data

# Acceptance Criteria

- GIVEN a social network API
- WHEN I enter the command to invoke the application
- THEN my server is started and the Mongoose models are synced to the MongoDB database
- WHEN I open API GET routes in Insomnia for users and thoughts
- THEN the data for each of these routes is displayed in a formatted JSON
- WHEN I test API POST, PUT, and DELETE routes in Insomnia
- THEN I am able to successfully create, update, and delete users and thoughts in my database
- WHEN I test API POST and DELETE routes in Insomnia
- THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

# Installation

`git clone https://github.com/christianbmartinez/social-media-api.git`

# Usage

Assuming you have mongodb compass and a local mongo store - First, install all dependencies in the terminal:

```
npm install
```

Next, in a **new** terminal run:

```
mongod
```

and leave that terminal window open. In your other terminal, run:

```
npm run dev
```

to start the api server. After that you're done!

You can test routes by using [insomnia](https://insomnia.rest/download)

# License

This project is covered under the [MIT](https://opensource.org/licenses/MIT) license.

# Contributing

Contributing is welcomed! Please submit a pull request.

# Questions

Feel free to [email](mailto:hello@christianbmartinez.com?subject=[GitHub]%20Social%20Media%20API) me with any questions or view [my github profile](https://github.com/christianbmartinez)

View submission video [here](https://drive.google.com/file/d/1TUqT5Ds15SkjJNW9dsk93Ia_MgeW-HoV/view?usp=sharing)
