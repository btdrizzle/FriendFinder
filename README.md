# FriendFinder

This app is a fun way to simulate compatability between people.  I have pre-populated data with fictional characters though if a user likes they could enter data as themselves.

## Functionality

This app is deployed via Heroku and utilizes JawsDB to store data.  The server is built with express and utilizes an API to get and post data to and from the database.  

## User Experience

The user is prompted to click a link to take the survey.  The user enters their name and a weblink to their photo.  They then answer questions about their personal preferences.  This data is stored in the SQL database via API call and is their answers to questions are compared to all other users who have input data.  A modal then pops up showing the name and photo of their most compatible match.  

## Link to App

[Friend Finder](https://btdrakefriendfinder.herokuapp.com/ "See Deployed App on Heroku")