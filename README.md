# Something Borrowed

#### [__Something Borrowed__](https://something-borrowed-2019.herokuapp.com/) is a borrowing / lending web application that allows users to list items for lending others or to borrow items listed by others.

By developing Something Borrowed, we want to create self-sufficient communities through a web application that allows users to lend and to borrow items from others.


### Why Lending / Borrowing

We have the luxury to buy and claim possessions over many things to sustain our lifestyle, but we still run into situations where we find ourselves needing certain items we don’t own. Whether the reasons being having no space to store an extra appliance in your closet-size apartment, or too awkward to ask your neighbor for a bottle opener when you have never spoken with them despite being neighbors for two consecutive years. We want to give everyone the choice to live a cheaper, cleaner, more enjoyable and more sustainable life through the act of sharing while optimizing our needs.

## How Does It Work

### Application Features
- Unique and secured user profiles
- Inventory of all items available for borrowing posted by all existing users
- Inventory of all items available for lending posted by user
- Borrow and lending functionality
- Log of user's borrowing and lending history

### Planned Additional Features
- Credit System: 
    - Determine item(s) value prior to posting
    - Deposit pre-identified money value prior to borrowing
- User Profile: 
    - Require authentification once user creates a profile
    - Deliver waver to be signed by user prior to app use
    - Specify neighborhood for developing local hubs
- Lending:
    - Display borrowers' comments and ratings of a listed item
    - Upload image of item(s)
- Borrowing: 
    - Limit item(s) search to user's neighborhood location
    - Review and comment on item(s) borrowed
- Other features that are on the list:
    - Administrative profile
    - Newsletters and email updates


### Project Structure
The project is created with standardized folder structure of MVC Paradigm. Some highlight in implementing MVC:

Model: 
1.	Other than using MySQL database, we utilized Sequelize as our ORM (object-relational mapper) to create migration files and set up table-to-column relationship in our database. 
2.	We also utilized foreign key to link different data tables, which allows us to keep track of user’s action log displayed on dashboard

View: 

1.	We use handlebars not only for semantic templates across all views but also for the following features:
    - displaying alert messages
    - specifying user page URL
    - display user information in dashboard
    - appending items lent or borrowed in dashboard
    - appending items in inventory

Controller: 

1.	In our registration and login routing, we implemented (Passport.js) and (bcrypt.js) to ensure all user login information is secured


## Credits

### Team Members
[Somat Thakali](https://github.com/SomatThakali), [Natasha Moore](https://github.com/natalytak), [Emma Bixler](https://github.com/emmabixler), [Eleonore Chevillion](https://github.com/tomspalding), and [Rachael Tseng](https://github.com/hojungt).

### Special Thanks
Jamal O'Garro, Michael Russo, Pete Tascio, Yohann Potico and Michell Brito for all of their patience and support toward the development of the project.

### NPMs & Libraries
- Back-End
    - Bcrypt.js
    - Express.js
    - MySQL
    - Nodemon
    - Passport.js
    - Sequelize
- Front-End
    - Bootstrap
    - Express-handlebars
    - Font Awesome
    - Google Fonts
    - JQuery

### Notes
This is an ongoing project. Comments and feedbacks are appreciated!