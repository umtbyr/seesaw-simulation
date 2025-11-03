# Seesaw Demo

This project aims to simulate a seesaw using only HTML, CSS, and vanilla JavaScript without using any external libraries.

## Thought Process & Design Decisions

First thing that I focused on was design the architecture and seperateing the concerns to work on smaller modals not one big file that does everything.

- main.js -> orchestrates the game and manage the state changes.

- physics.js -> calculations related with the physics (torque, angle).

- ui.js -> to follow single source of truth principle I interact with the DOM from one place. this way I added an abstraction layer between DOM and my application.

- storage.js -> for the same reason I use a sepereate file to interact with the localStorage.

- util.js -> I used seperate file to contain utility and helper functions such as color randomizer, randomInt, coordinate calculater etc to improve code readabilty and code duplication.

- soundEffectManager.js -> I used singelton pattern to centralize the sound interactions. since this is a small-sized demo application I thought it would be appropriate.

Overall these design desicions provided clear boundaries between different modules, scaleable and testeable codebase and made it easier to idetify side efffects and bugs.

## Trade-offs and Limitations

To stay in the boundries of the case I made several trade-offs to keep the project within the scope. Finding the balance between styling concerns and physics accuracy was the most challenging part of the case since time was limited with 3 days. I focused on createing a clean and responsive UI while keeping the physics as accurate as possiable.

Some of the trade-offs that I encounter while developing the game.

- I spent a lot of time to organize the architecture (modular structure, single source of truth, responsibality isolation) this reduced the time for adding advanced animations for example object could've been interact between each other.

- I focused on mouse-based gameplay and desktop layout since developing both mouse and touch (mobile) based would've required more time.

- I tried to maintain balance between developing user feedback features (distance indicator, animations, sound effects) and implementing advanved physics. For example torque calculations are correct but I intentionally avoided calculating the momentum because of the time limitation.

## AI Assistance

I used ChatGPT as a support tool. mainly brainstorm architectural ideas, refresh sytax that I did not remember fully and for the mathematical formulas. For example getting the projection of the user's click position on the rotated seesaw plank.

All the core logic were written by me.

## How to Run

You can use run the project using Live Server extension (or any other local developmemt server) in Visual Studio Code since directly opening index.html file may cause module import errors.
