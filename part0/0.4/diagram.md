```mermaid 
sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Server
    
    Note left of U: Submits the form with a new note
    U->>B: New Note

    Note left of B: Browser sends a POST request to the server alongwith the user input
    B->>+S: POST  https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of S: Server adds the input (new notes) to the notes array and redirects the browser
    S-->>-B: Redirect /exampleapp/note 

    Note left of B: Browser sends a GET request to the server to fetch the page.
    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/notes
    Note right of S: Server sends html document to the browser 
    S-->>-B: Html Document

    Note left of B: Browser sends a GET request to the server to fetch the the css file.
    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/main.css
    Note right of S: Server sends css file to the browser
    S-->>-B: Css File

    Note left of B: Browser sends a GET request to the server to fetch the javascript file.
    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/main.js
    Note right of S: Server sends javascript file to the browser
    S-->>-B: Javascript File

    Note left of B: Browser executes the javascript file.
    Note left of B: Browser sends a GET request to the server to fetch the json file containing notes data.
    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/data.json
    Note right of S: Server sends notes data to the browser
    S-->>-B: Notes data in json

    Note left of B: Browser executes the event handler to display the updated notes