# foster-journey-front-end
<h1>Foster Journey</h1>

<h2>App Descirption</h2>
<p>Foster Journey is a web app that helps foster youth track their journey through the foster care system by allowing them to create an account and add information about the various placements they have experienced while in care. They can then refer back to their list of placements to view their personal journeys.</p>

<h2>Technologies</h2>
<ul>
	<li>React front-end</li>
	<li>Django/PostgreSQL backend</li>
	<li>JWT Authentication tokens</li>
</ul>

<h2>Models</h2>
<h3>Placement</h3>
<ul>
	<li>Placement number = Int</li>
	<li>Name for placement = varChar (optional)</li>
	<li>Placement start date = DateTime</li>
	<li>Placement end date (defaults to current) = DateTime</li>
	<li>Placement location = varChar (exact address or just city/state?)</li>
	<li>Foster parent names = ArrayField</li>
	<li>Foster sibling names = ArrayField</li>
	<li>Notes = ArrayField</li>
	<li>Timestamp for when placement created</li>
</ul>


<h2>User Stories</h2>
<ul>
	<li>When user accesses site they should see a message about the apps purpose and be directed to log-in or create an account</li>
	<li>If the user has placements created they should see a list of all of their placements organized by placement number ascending ("Placement #X"). When the user clicks on a placement, they should be taken to the placement show page which includes all the details of the specific placement. There should be options at the bottom of the list to update the details which takes them to the edit placement page</li>
	<li>If the user does not have any placements created there should be a reassuring message about starting their journey in the foster care system, and an option to create a placement</li>
	<li>When a user clicks on edit a placement they should be taken to a form with current values in the form fields and allowing them to edit:
		<ul>
			<li>Placement number</li>
			<li>Placement start date</li>
			<li>Placement end date</li>
			<li>Placement location</li>
    		<li>Delete notes on placement that they have added</li>
			<li>Foster parents listed (non-input field)</li>
			<li>Should have option next to foster parent name to delete foster parent</li>
			<li>Should have input field option to add a foster parent (NOTE: Added this to placement details page instead of edit page... made more sense)</li>
			<li>Foster siblings listed</li>
			<li>Should have option next to foster sibling name to delete foster sibling</li>
			<li>Should have input field to add a foster sibling (NOTE: Added this to placement details page instead of edit page... made more sense)</li>
			<li>List of notes on they have created on the placement with option to delete a note</li>
			<li>Input field to create a new note about the placement (NOTE: Added this to placement details page instead of edit page... made more sense)</li>
			<li>Option to delete the specific placement at the bottom</li>
			<li>When a user deletes a placement they should be taken back to the user show page (all placemnts)</li>
		</ul>
</ul>

<h2>Additional Models</h2>
<h3>Users</h3> <p>--> TODO- Edit and delete user routes</p>
<ul>
	<li>Username (must be unique) --> TODO- Handling message to user if they create an account with username already taken</li>
	<li>First name</li>
	<li>Last name</li>
	<li>Password --> TODO- Confirm password field on register page</li>
	<li>Timestamp for account created</li>
</ul>

<h3>Foster Parent</h3>
<ul>
	<li>first name = varChar</li>
	<li>last name = varChar</li>
	<li>Photo url</li>
	<li>time_stamp for creation</li>
	<li>linked to placement</li>
</ul>

<h3>Foster Sibling</h3>
<ul>
	<li>first name = varChar</li>
	<li>last name = varChar</li>
	<li>time_stamp for creation</li>
	<li>linked to placement</li>
</ul>

<h4>To-Do</h4>
<ul>
	<s><li>Add app description</li></s>
	<s><li>Separate models for foster parents, foster siblings tied to placement model (one to many)</li></s>
	<s><li>User model should collect first name, last name</li></s>
	<s><li>Password confirmation when creating account</li></s>
	<s><li>Get rid of email requirement for both registration & login (This might turn into a security nightmare, but what if foster youth doesn't have email?)</li></s>
	<s><li>Update access and refresh tokens to include username (maybe first name instead?) and include in UI/UX</li></s>
	<s><li>Error handling <--NOTE: Check all api calls for try/catch blocks</li></s>
	<s><li>Styling for landing page, registration page, login form, app component</li></s>
	<s><li>Image upload for foster parent model</li></s>
	<s><li>Include password confirmation field when registering and updating password</li></s>
	<s><li>Finish modals for add foster parent</li></s>
	<s><li>Fix date format for placement start date and end date</li></s>
	<s><li>Style placement & details components</li></s>
	<ul>
		<s><li>Modal for create foster sibling</li></s>
		<s><li>Modal for Edit Placement</li></s>
		<s><li>Style Create placement component</li></s>
	</ul>
	<s><li>Home page statistics & Styling</li></s>
	<s><li>User placement filter currently happens in the front-end. This should be changed to the backend so the API only fetches placements for specific user</li></s>
	<s><li>Delete console.logs</li></s>
	<s><li>Style Account Edit Page</li></s>
	<s><li>Statistics on home page pulled from app data</li></s>
	<s><li>Average number of placements per user</li></s>
	<s><li>Average number of foster parents/siblings a foster youth encounters on journey</li></s>
</ul>
	
<h4>Super-Stretch Goal</h4>
<ul>
	<li>Length of placement calculated by start date/end date on placement details page</li>
</ul>


<h4>Link to Heroku Deployment</h4>
<a href="https://foster-journey-frontend.herokuapp.com/">https://foster-journey-frontend.herokuapp.com/</a>


<h4>Approval Concessions</h4>
<p>Base app will be geared toward a single user with no log-in requirements allowing creation of placements only</p>