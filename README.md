Vidboard
========
A platform to help freelance photographers and videographers get more work while
filling a need.

Concept:
========
A two way platform that matches freelancers to available jobs, anonymously. There are
two accounts that can use the platform: Freelancer and Job Poster. Accounts can
use either GoogleAuth or Email to sign-up/sign-in.

------------------------
- Freelancer account :- 
- After sign up, there is questionnaire to complete their profile.
- Once they fill in profile requirements, that data gets sent off for review by a
staff member.
- Once approved, freelancer has ability to search and filter for jobs
- Freelancer has ability to express interest in a job
- If a job poster expresses interest, freelancer gets into job poster’s inbox

------------------------
- Job Poster account :-
- Basic profile setup to determine if the user is an individual/company
- After sign up, Job poster is led to post their first job
- Job posting form has multiple fields to describe the job they’re looking to
be fulfilled
- Once the job is submitted, it appears in the appropriate area in the main
feed
- If a freelancer expresses interest in a job that was posted, their info is
shown in an inbox like feature. Only info that the job poster can see is
freelancer’s skills, work and work history, as well as a custom note
- Job poster can see multiple freelancers interested in the job posting

--------------------
- To run on local server :-
Steps : 
1. Clone vid-board and vid-board-backend repository
2. Set up vid-board-backend > .env file for configuration (Optional)
3. Open terminal, go to vid-board directory and fire
    npm install && npm start
4. Open another terminal, go to vid-board-backend directory and fire
    npm install && node serverPg.js (OR nodemon serverPg.js)
5. Open localhost:3000
