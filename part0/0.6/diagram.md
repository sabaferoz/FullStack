```mermaid 
sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Server

    Note left of U: Submits the form with a new note
    U->>B: New Note
    
    Note left of B: Browser executes the event handler that prevents the default behavior of form submission (form submission and reload) 
    Note left of B: Browser creates a new notes, adds it to the list of notes and redraws  the content of the screen.

    Note left of B: Browser sends a POST request to the server alongwith the user input (note content and timestamp)
    B->>+S: POST  https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of S: Server adds the input (new notes) to the notes array and sends 201 status to the browser
    S-->>-B: 201 Created