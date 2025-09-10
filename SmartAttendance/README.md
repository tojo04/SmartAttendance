# SmartAttendance
Generate the code for a Teacher's Dashboard that facilitates a novel, high-security attendance system using a combination of "Geo-Sound Confirmation" and "Visual Cryptography QR." The application should be a single-page app in a single file, providing the teacher with the controls to initiate, monitor, and conclude an attendance session.

Core Concept (for context):
The system prevents proxy attendance using two factors:

Geo-Sound: The teacher's device emits an inaudible ultrasonic sound. The student's app must detect it to confirm they are in the same room.

Visual QR: A QR code is split into two visual shares. One is shown by the teacher on a projector, the other on the student's phone. When the phone's camera overlays its share on the projector's share, they combine to form a scannable QR code.
Attendance is marked only when both checks pass.

Core Features for the Teacher's Dashboard:

Class Selection & Session Control:

A main view displaying a list of the teacher's classes (e.g., "Physics - Grade 12", "Chemistry - Grade 11").

Each class should have a prominent "Start Attendance Session" button.

Active Attendance Session View:

This is the primary screen that appears after clicking "Start Attendance Session."

Visual QR Share Display: A large, central area must display a simulation of the first visual QR share. This can be a placeholder image or a generated pattern of random black and white dots to represent the incomplete QR code.

Live Student Roster: Display a real-time list of all students enrolled in the class.

Real-time Status Updates: Each student's entry in the roster must have a status indicator that updates in real-time without needing a page refresh. The statuses are:

Pending (default, grey color).

Present (when the system confirms successful verification, green color).

Live Counters: Display a live count of "Students Present" and "Students Pending."

Session Timer: Show a timer indicating how long the attendance session has been active.

"Stop Session" Button: A clear button for the teacher to end the attendance collection process.

Session Summary:

After the teacher clicks "Stop Session," the view should transition to a summary screen.

Display final counts: "Total Present," "Total Absent."

Provide an option to "Save and Close" or "Go Back to Classes."

Technology Stack:

Framework: React.js (using functional components and Hooks, especially useState and useEffect).

Language: JavaScript.

Styling: Tailwind CSS for a clean, responsive UI.

Icons: Use the lucide-react library.

Simulation (Important):

Geo-Sound & QR Logic: Do not implement actual ultrasonic sound generation or visual cryptography. The entire backend logic should be simulated on the frontend.

Simulating Student Check-in: Create a "Simulate Student Arrival" button. When the teacher clicks this button, it should randomly select a few students from the "Pending" list and update their status to "Present" to demonstrate the real-time update functionality.

Data: Use mock JSON data directly within the component for classes and student rosters.

Component Structure (all within one file):

Create a main App component that manages the overall state (e.g., which view is active).

Header: A simple top bar with the title "Secure Attendance System."

ClassListView: The initial view showing the list of classes to start a session.

ActiveSessionView: The main component for the live attendance session, containing the visual QR share placeholder and the live student roster.

SessionSummaryView: The component to show results after the session ends.

Design and UX Requirements:

Layout: A clean, uncluttered, single-column layout. The focus during the active session should be on the QR share and the live roster.

Clarity: The status updates (Pending to Present) should be visually distinct and immediate. Use color and icons effectively.

Responsiveness: The dashboard should be usable on different screen sizes, from a laptop to a tablet.

Aesthetics: A modern, professional color scheme. Use card components for classes and clear typography.

Final Output:

Provide a single, complete, and runnable .jsx file. The code must be well-commented, especially explaining the state management for the active session and the simulation logic for student check-ins.