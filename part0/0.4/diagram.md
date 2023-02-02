```mermaid 
sequenceDiagram
    participant B as Browser
    participant S as Server
    
    B->>+S: POST  https://studies.cs.helsinki.fi/exampleapp/new_note
    Note left of B: Browser sends a POST request to the server alongwith the user input
    S-->>-B: Redirect /exampleapp/note
    Note right of S: Server adds the input (new notes) to the notes array and redirects the browser 

    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/notes
    Note left of B: Browser sends a GET request to the server to fetch the page.
    S-->>-B: Html Document
    Note right of S: Server sends html document to the browser 

    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/main.css
    Note left of B: Browser sends a GET request to the server to fetch the the css file.
    S-->>-B: Css File
        Note right of S: Server sends css file to the browser

    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/main.js
    Note left of B: Browser sends a GET request to the server to fetch the javascript file.
    S-->>-B: Javascript File
        Note right of S: Server sends javascript file to the browser

    Note left of B: Browser executes the javascript file.
    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/data.json
    Note left of B: Browser sends a GET request to the server to fetch the json file containing notes data.
    S-->>-B: Notes data in json
    Note right of S: Server sends notes data to the browser