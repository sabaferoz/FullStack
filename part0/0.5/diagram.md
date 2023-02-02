```mermaid 
sequenceDiagram
    participant B as Browser
    participant S as Server
    
    Note left of B: Browser sends a GET request to the server to fetch the page
    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/spa
    Note right of S: Server sends the html document to the browser 
    S-->>-B: Html document
    
    Note left of B: Browser sends a GET request to the server to fetch the the css file.
    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/main.css
    Note right of S: Server sends css file to the browser
    S-->>-B: Css File

    Note left of B: Browser sends a GET request to the server to fetch the javascript file.
    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/spa.js
    Note right of S: Server sends javascript file to the browser
    S-->>-B: Javascript File

    Note left of B: Browser executes the javascript file.
    Note left of B: Browser sends a GET request to the server to fetch the json file containing notes data.
    B->>+S: GET  https://studies.cs.helsinki.fi/exampleapp/data.json
    Note right of S: Server sends notes data to the browser
    S-->>-B: Notes data in json

    Note left of B: Browser executes the event handler to display the notes