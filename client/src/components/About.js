import React from 'react'
import {Link} from 'react-router-dom'
import '../stylesheets/about.css'

function About() {
    return (
        <div className="about-page-container">
            <div className="about">
            <h1>About WC Gesucht</h1>
            <h2>The name</h2>
            <p>WC Gesucht is a German phrase translated roughly as "Seeking Restroom." It is based on a popular apartment-searching website called "WG Gesucht."</p>
            <h2>The story</h2>
                <p>In Fall 2019, a partner and I developed a project at Ironhack Berlin in which users could map out restrooms. The purpose was twofold: first, to help users find restrooms that created a positive experience, and second, to help users find cheaper locations. With money saved at a cheaper restroom, a user could donate to an organization that builds sanitation facilities in places that don't have access to them. Since our project was a demo app, we did not end up including the actual functionalities to donate.</p>
                <p>The app we created had some issues with the login checks and was not fully responsive.</p>
                <p>Finding myself with more free time a year later, I decided to reuse the idea of mapping restrooms and make it my own, this time using React.js in the frontend. I also improved the backend models and changed many overall functionalities to make it my own. Now, although the idea is the same, the code is very different from a year ago. This time around, I have left the payment form out completely, as I am not connected to any relevent organization, but if you are reading this, please consider donating somewhere anyway!</p>
                <p>This was a simple app created for React practice and something to do. However, if you have feedback or questions or just want to chat further, you can find me on <a href="https://www.linkedin.com/in/amelia/scarbrough/">Linkedin</a> or <a href="https://github.com/scaram02">Github</a>.</p>
                <Link to='/'>Home</Link>
                
        </div>
        </div>
    )
}

export default About
