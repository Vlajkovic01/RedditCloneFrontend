# RedditCloneFrontend

This project was created in 2nd year at the Faculty of Technical Science at Nov Sad as a part of a project for the FrontEnd Development course. Later it has been expanded to 3rd year as a part of a "Manipulating e-documents" course. Developed by [@stefan](https://www.linkedin.com/in/stefanvlajkovic/)

## Getting started

To run this project you will need the following libraries:
- [Angular ](https://angular.io/) version 13.3.0.
- [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

To start the app run `npm install` and then `ng serve` for a dev server. Navigate to `http://localhost:4200/`. You will also need a running backend which I have written in this [SpringApp](https://github.com/Vlajkovic01/RedditCloneBackend). Initial admin credentials(if you started the backend and run SQL script should be `Username:stefan password:123456`.

## Features
- Login/Register with JWT
- Multiple user roles(User,Mod,Admin)
- Create/Edit Community
- Create post(txt + img + pdf) with flairs
- Commenting(infinite comment replies)
- Edit/Delete comment
- Report post/comment
- React to post/comment
- Posts/Comment sorting(new,top,hot)
- User profile edit
- Community edit
- Banning users
- Community suspend
- Community/post search - Can search by two chosen parameters with AND or OR logic
  and multiple search styles(fuzzy,match,match phrase, range)


