// JS: Events & The Loop
// Listening to Events
// Event handlers: functions that are called when events occure. JavaScript offers three ways to register event handlers

// 1. Inline event handlers => <button onClick="doSomething()">Submit</button>
// 2. DOM event handlers => window.load = () => { console.log('window loaded') }
// 3. Using addEventListener() => modern way and it allows us to register as many handlers as we need.
// window.addEventListener('load', () => { console.log('window loaded') })

// Events
const toxicTim = document.querySelector("#toxic-tim");
const teamSalmon = document.querySelector(".team.salmon");

// <node>.addEventListener('<event-name>', <listener-callback>);
// this method allows us to react with a callback to events that
// occure on a node in the browser

// Its first arg. is a string that corresponds to the name of an event.
// you write any name here. It must be on the possible events.
// https://developer.mozilla.org/en-US/docs/Web/Events

// Its second arg. is a callback named "listener" that is
// called/executed when the event is triggered
// Much like setTimeout or setInterval, it is asynchronous

if (false) {
    teamSalmon.addEventListener("click", function (event) {
        // this is the event.currentTarget only if we have callback as
        // a regular function (Not arrow function)
        console.log("this: ", this);
        console.log("type: ", event.type);
        // The 'target' property refers to the node that originally
        // triggered the event. In the case of a 'click' event,
        // that is the node where the cursor was located at
        // that time of the click.
        // It will always be a descendant of the currentTarget node,
        // Or the currentTarget node.
        console.log("target: ", event.target);
        // The 'currentTarget' property refers to the node that
        // calls the 'addEventListener' method.
        // It is the 'listening node'
        // In this case, it is always going to be 'teamSalmon'
        console.log("currentTarget: ", event.currentTarget);
        console.log("==============");
    });
}

// Demo: clicking Titles
if (false) {
    document.querySelectorAll(".doggo.fighter h1").forEach((node) =>
        node.addEventListener("click", () => {
            console.log("Doggo Name was clicked");
        })
    );
}

// Instance of Node
const p = document.querySelector("p");
// When document.querySelector finds nothing, it returns null
if (p instanceof Node) {
    p.addEventListener("click", () => console.log("this was a p node"));
}

// Clicks, Event & Properties
if (false) {
    toxicTim.addEventListener("click", (event) => {
        console.log("target: ", event.target);
        console.log("currentTarget: ", event.currentTarget);
        console.log(`cursor position: (${event.clientX}, ${event.clientY})`);
        console.log("arrow this === currentTarget: ", this === event.currentTarget); // false
        // 'this', is the window when using arrow functions for the callback
    });

    // Exercise: Last In Queue
    document.querySelectorAll(".doggo.fighter").forEach((doggoNode) => {
        doggoNode.addEventListener("click", (event) => {
            const currentDoggo = event.currentTarget;
            const rosterNode = currentDoggo.closest(".roster");
            rosterNode.append(currentDoggo);
        });
    });
}

// Demo: Mouse & The Doggo
if (false) {
    document.querySelectorAll(".doggo.fighter").forEach((doggoNode) => {
        // dblclick
        doggoNode.addEventListener("dblclick", (event) => {
            console.log(`${event.currentTarget.id} was double clicked`);
            event.currentTarget.classList.toggle("inverted");
            console.log("event: ", event);
        });
        // mousedown
        doggoNode.addEventListener("mousedown", (event) => {
            event.currentTarget.classList.add("flipped");
        });
        // mouseup
        doggoNode.addEventListener("mouseup", (event) => {
            event.currentTarget.classList.remove("flipped");
        });
        // mouseleave
        doggoNode.addEventListener("mouseleave", (event) => {
            event.currentTarget.classList.remove("flipped");
        });
    });
}
// Crouching Mouse Hidden Doggo
document.querySelectorAll(".doggo.fighter").forEach((doggoNode) => {
    doggoNode.addEventListener("mouseenter", (event) => {
        event.currentTarget.classList.add("hovered");
    });
    doggoNode.addEventListener("mouseleave", (event) => {
        event.currentTarget.classList.remove("hovered");
    });
});

// Exercise: Where is my cursor?
const coordsDiv = document.createElement("div");
coordsDiv.style.position = "fixed";
coordsDiv.style.bottom = "0";
coordsDiv.style.backgroundColor = "white";
document.body.append(coordsDiv);

document.addEventListener("mousemove", (event) => {
    const position = `(${event.clientX}, ${event.clientY})`;
    coordsDiv.innerText = position;
});

// Form & Input Events
// Demo: Type Loudly & Explode on Submit
const random = (n) => Math.ceil(Math.random() * n);
const keySound = () => new Audio(`sounds/vintage-keyboard-${random(4)}.wav`);

document.querySelectorAll("input").forEach((inputNode) => {
    inputNode.addEventListener("input", (event) => {
        keySound().play();
    });
});

const explosionSound = () => new Audio("sounds/small-explosion.wav");
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    // preventDefault prevents the form from being submitted
    //   This prevents the forms default behaviour
    // When used with forms, the form data will not be submitted somewhere
    //when used with links, the href will not be followed
    explosionSound().play();
});

// Exercise: Applicant's Avatar
const applicantPreview = document.querySelector(
    "#applicant-preview .doggo.blank"
);

document
    .querySelector('input[name="picture-url"]')
    .addEventListener("input", (event) => {
        const imageUrl = event.currentTarget.value;
        //   console.log("imageUrl: ", event.currentTarget.value);
        applicantPreview.style.backgroundImage = `url(${imageUrl})`;
    });