// src/MyApp.js
import React from "react";
import Table from "./Table";

const characters = [
  {
    name: "Charlie",
    job: "Janitor",
  },
  {
    name: "Mac",
    job: "Bouncer",
  },
  {
    name: "Dee",
    job: "Aspring actress",
  },
  {
    name: "Dennis",
    job: "Bartender",
  },
];

function MyApp() {
const [characters, setCharacters] = useState([
  {
    name: 'Charlie',
    job: 'Janitor',
  },
  // the rest of the data
]); 
  
return (
<div className="container">
    <Table characterData={characters} />
   </div>
) 
}


export default MyApp;
