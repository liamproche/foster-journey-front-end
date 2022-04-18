# foster-journey-front-end

NAME
Foster Journey


APP DESCRIPTION
Foster Journey is a web app that helps foster youth track their journey through the foster care system by allowing them to create an account and add information about the various placements they have experienced while in care. They can then refer back to their list of placements to view their personal journeys.


#APPROVAL CONCESSIONS
#-Base app will be geared toward a single user with no log-in requirements allowing creation of placements only


#TECHNOLOGIES
#-React front-end
#-Django/PostgreSQL back-end
#-JWT Authentication tokens


MODELS

#PLACEMENT
#-Placement number = Int
#-Name for placement = varChar (optional)
#-Placement start date = DateTime
#-Placement end date (defaults to current) = DateTime
#-Placement location = varChar (exact address or just city/state?)
#-Foster parent names = ArrayField
#-Foster sibling names = ArrayField
#-Notes = ArrayField
#-Timestamp for when placement created


USER STORIES
-When user accesses site they should see a message about the apps purpose and be directed to log-in or create an account
-If the user has placements created they should see a list of all of their placements organized by placement number ascending ("Placement #X"). When the user clicks on a placement, they should be taken to the placement show page which includes all the details of the specific placement. There should be options at the bottom of the list to update the details which takes them to the edit placement page
-If the user does not have any placements created there should be a reassuring message about starting their journey in the foster care system, and an option to create a placement
-When a user clicks on edit a placement they should be taken to a form with current values in the form fields and allowing them to edit:
	#-Placement number
	#-Placement start date
	#-Placement end date
	#-Placement location
    #-Delete notes on placement that they have added
	#-Foster parents listed (non-input field)
	#-Should have option next to foster parent name to delete foster parent
	#-Should have input field option to add a foster parent (NOTE: Added this to placement details page instead of edit page... made more sense)
	#-Foster siblings listed
	#-Should have option next to foster sibling name to delete foster sibling
	#-Should have input field to add a foster sibling (NOTE: Added this to placement details page instead of edit page... made more sense)
	#-List of notes on they have created on the placement with option to delete a note
	#-Input field to create a new note about the placement (NOTE: Added this to placement details page instead of edit page... made more sense)
	#-Option to delete the specific placement at the bottom
	#-When a user deletes a placement they should be taken back to the user show page (all placemnts)


STRETCH GOALS

ADDITIONAL MODELS
USERS --> TODO- Edit and delete user routes
#-Username (must be unique) --> TODO- Handling message to user if they create an account with username already taken
-First name
-Last name
#-Password --> TODO- Confirm password field on register page
#-Timestamp for account created


FOSTER PARENT
-first name = varChar
-last name = varChar
-notes? = ArrayField?
-Photo url
NOTE- How to tie this to placement model?

FOSTER SIBLING
-first name = varChar
-last name = varChar
-Photo url?
NOTE- How to tie this to placement model?


VERSION 2 GOALS:

PRESSING TODO
-Add app description
-Error handling
-Portfolio-quality styling (NOTE: Complete UX Engineering Module before starting)
-User placement filter currently happens in the front-end. This should be changed to the backend so the API only fetches placements for specific user
-Complete user routes
-Delete console.logs
-User model should collect first name, last name
-Update access and refresh tokens to include username (maybe first name instead?) and include in UI/UX
-Fix date format for placement start date and end date
-Get rid of email requirement for both registration & Login (This might turn into a security nightmare, but what if foster youth doesn't have email?)


ADDITIONAL TODO
-Separate models for foster parents, foster siblings tied to placement model (one to many)
-Image upload for foster parents and foster siblings
-On home page without being logged in option to view journey of random user to help increase awareness of stories of foster youth
-Statistics on home page pulled from app data
	-Average number of placements per user
	-Average length of stay per placement
	-Average number of foster parents/siblings a foster youth encounters on journey
-Include password confirmation field when registering and updating password
	
STRETCH GOAL
-Length of placement calculated by start date/end date on placement details page



LINK TO HEROKU DEPLOYMENT
https://foster-journey-frontend.herokuapp.com/