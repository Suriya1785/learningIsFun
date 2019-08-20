# Learning Is Fun  
##### 2019 Hartcode program (JS Bootcamp project)
#### Author : Suriya N Rajamani

![WebsitePromo](public/images/learningIsFunReadMe.png)

## Purpose:
Help Students and Parents to know about the courses offered in the learning Center and get educated by registering to those courses.
Role model for other learning centers across the globe to extend this and make future generations more knowledgeable and preserve the world.

# Audience:
- Primary: Parents and Students to add skills and be healthy.
- Secondary: Competitive other education center to know and apply them in their respective areas.

## Home page
- Links to courses site and brief note on the learning center. Logo of the site with picture.

## Courses Search Page
- Options to search courses by category from the dropdown list. Upon selection, it lists down the list of courses under the selected category from our learning center collections.
- Upon selection of courses, it provides brief note on them and link to detail courses page.

## Course Details Page
- Lists down the course details with registered students for the selected course from course search page if there are.
- Provides an option for students to go to register page for their registration.

## Course Register page
- Helps students to register by entering their name and email address for the selected course from course details page.

##Server setup and start
This assumes that the user has Node.js installed globally on their machine.

#####Installing the Express framework into the application and setting up the folders:
- First, clone or copy project from GitHub down to a folder on your machine
- Your folder setup should look like this (folder is an example):

######Main Folder:
C:>learningIsFun place the server.js under here

######subfolders under learningIsFun: 
data (where the JSON data files would be placed) public (this is your "root" directory)

######subfolders under public: 
css(your styles.css) images (any images) scripts (your js scripts other than server.js)
- Go to your command prompt
- Under your folder for the application, install the Express framework using NPM by typing:
npm install express --save
- Then you'd install the body-parser package using NPM by next typing:
npm install body-parser --save
- once setup is complete, please execute below in cmd prompt under root directory
node server.js

## Reporting issues
Use [Github's Issues section for this repository](https://github.com/Suriya1785/learningIsFun/Issues) to report any issues with the notes.

Examples of the kind of issues that may need reporting:
+ Typos
+ Code samples not working as described
+ Broken or moved links
+ Etc.

# Credits
- content provided by [Koshinitti](http://koshintti.ac.ke/courses/certificate-in-general-agriculture/), [wiki](http://www.wiki.com), [rlsyCollege](http://www.rlsycollege.ac.in/courses/ba-general),  [extramarks](https://www.extramarks.com/), [mcet](www.mcet.org/), [workaway](https://www.workaway.info/).