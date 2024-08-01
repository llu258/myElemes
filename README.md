**PLEASE READ.** Not recommended yet for use unless you can fix the vulnerabilities:) Given that the project is still in progress, it’s important to recognize that adjustments may be necessary due to the ongoing development and the possibility of encountering errors. Currently all files are in the master repository and looking to merge with the main soon as possible. Thanks for the support.

# myElemes: Learning Management System (LMS) Project

Check the message above this section for urgent read, thanks for stopping by :) Welcome to the simple Learning Management System (LMS) project repository. This system is designed as part of my application for a tech fellowship, demonstrating foundational skills in web development using Express, Node.js, React, and PostgreSQL.

## Overview

This project aims to create a comprehensive LMS that facilitates educational processes by providing essential functionalities for students, teachers, and administrators. The system is built with a focus on scalability, security, and user-friendly interfaces.

## Technologies Used

- **Backend**: Express.js, Node.js
- **Frontend**: React
- **Database**: PostgreSQL

## Features
- Role-based access control (for teachers and students)
- User registration and login/logout
- Profile viewing
- Grades submission (for teachers) and tracking (for student)

## Current Progress

Roles:
- Teacher: User can input grades for student comprising of StudentID, Subject, Quantified Grade.
- Student: User can fetch grades
- Admin: User can see activity and overall data analysis for fetched grades

The overall frontend is subject for adjustment as well follows:
- Alert messages: "Student not found" for example
- Security measures (privacy)
- Additional access control for admin/analyst
- ...and more (based on my preference)

## Known Vulnerabilities

As of July 7, 2024, as stated some vulnerabilities exist in this project as follows:

1. **nth-check (High Severity)**:
   - Vulnerable versions: <2.0.1
   - Description: Inefficient Regular Expression Complexity
   - More info: [GitHub Advisory](https://github.com/advisories/GHSA-rp65-9cf3-cjxr)
   - Status: Pending update. Will be addressed in the next major release update.

2. **postcss (Moderate Severity)**:
   - Vulnerable versions: <8.4.31
   - Description: PostCSS line return parsing error
   - More info: [GitHub Advisory](https://github.com/advisories/GHSA-7fh5-64p2-3v2j)
   - Status: Pending update. Testing required for compatibility with existing setup.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/llu258/myElemes.git
   cd myElemes
   ```
2. Navigate to the project directory:
   ```bash
   cd lms-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
## Contribution
Contributions are welcome! If you have any suggestions, enhancements, or issues to report, please feel free to create an issue or submit a pull request.

