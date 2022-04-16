# foster-journey-front-end

NAME
Foster Journey


APP DESCRIPTION
Foster Journey is a web app that helps foster youth track their journey through the foster care system by allowing them to create an account and add information about the various placements they have experienced while in care. They can then refer back to their list of placements to view their personal journeys.


APPROVAL CONCESSIONS
-Base app will be geared toward a single user with no log-in requirements allowing creation of placements only


TECHNOLOGIES
-React front-end
-Django/PostSQL back-end


MODELS

PLACEMENT
-Placement number = Int
-Name for placement = varChar (optional)
-Placement start date = DateTime
-Placement end date (defaults to current) = DateTime
-Placement location = varChar (exact address or just city/state?)
-Foster parent names = ArrayField
-Foster sibling names = ArrayField
-Notes = ArrayField
-Timestamp for when placement created
-STRETCH GOALS - Separate models for location, foster parents, foster siblings tied to placement model


STRETCH GOAL MODEL IDEAS

USERS
-Username (must be unique)
-First name
-Last name
-Password
-Timestamp for account created
-SUPER STRETCH GOAL - Email address for account verification?
			
LOCATION
-street address = varChar
-city = varChar
-state = varChar
-country = varChar
NOTE- How to tie this to placement model?

FOSTER PARENT
-first name = varChar
-last name = varChar
-notes? = ArrayField?
-SUPER STRETCH- upload photo
NOTE- How to tie this to placement model?

FOSTER SIBLING
-first name = varChar
-last name = varChar
NOTE- How to tie this to placement model?


USER STORIES
-When user accesses site they should be directed to log-in or create an account
-If the user has placements created they should see a list of all of their placements organized by placement number ascending ("Placement X"). When the user clicks on a placement, they should be taken to the placement show page which includes all the details of the specific placement. There should be options at the bottom of the list to update the details which takes them to the edit placement page
-If the user does not have any placements created there should be a reassuring message about starting their journey in the foster care system, details about the app's purpose and an option to create a placement
-When a user clicks on edit a placement they should be taken to a form with current values in the form fields and allowing them to edit:
	-Placement number
	-Placement start date
	-Placement end date
	-Placement location
	-STRETCH GOAL- Length of placement calculated by start date/end date
	-Foster parents listed (non-input field)
	-Should have option next to foster parent name to delete foster parent
	-Should have input field option to add a foster parent
	-Foster siblings listed
	-Should have option next to foster sibling name to delete foster sibling
	-Should have input field to add a foster sibling
	-List of notes on they have created on the placement with option to delete a note
	-Input field to create a new note about the placement
	-Option to delete the specific placement at the bottom
	-When a user deletes a placement they should be taken back to the user show page (all placemnts)


ADDITIONAL STRETCH GOALS
-On home page without being logged in option to view journey of random user to help increase awareness of stories of foster children
-Statistics on home page pulled from app data
	-Average number of placements per user
	-Average length of stay per placement
	-Average number of foster parents/siblings a foster youth encounters on journey?