// JS: Events & The Loop

// Events
const toxicTim = document.querySelector("#toxic-tim");
const teamSalmon = document.querySelector(".team.salmon");

// <selected-node>.addEventListener

// Implement the ability to select doggos
    // Clicking a .doggo.fighter adds the selected class to it. 
    // A doggo with the selected class is considered selected.
    // Only one doggo can have the selected class.
    // Clicking a team's name, moves a selected doggo to that team.

    // Stretch
    // Clicking anywhere else on the page, unselects all selected .doggo.fighters.

const doggos = document.querySelectorAll(".doggo.fighter");

doggos.forEach(doggo => {
    doggo.addEventListener('click', event => {
        document.querySelectorAll('.doggo.fighter').forEach(doggo => {
            doggo.classList.remove("selected");
        });
        event.currentTarget.classList.add("selected");
    });
});

const teamTitles = document.querySelectorAll(".team > h1");

teamTitles.forEach(teamTitle => {
    teamTitle.addEventListener("click", event => {
        const roster = teamTitle.closest(".team").querySelector(".roster");
        const traitorDoggo = document.querySelector(".selected");
        if (traitorDoggo) {
            roster.append(traitorDoggo);
        };
    });
});

document.body.addEventListener("click", event => {
    const { target } = event;
    if (!target.closest(".team")) {
        document.querySelector(".doggo.fighter.selected").classList.remove("selected");
    };
});

// Update the applicant preview's h1 node contents with the applicant name as it is typed.
// Update the applicant preview's picture once a valid picture url as it is typed. 
// Check that the typed in field ends with .jpg, .gif or .png.
// Give a salmon or teal border to the applicant preview depending on which team is typed.
// When the form is submitted, reset the applicant preview and create that .doggo.fighter 
// in the team written in the team name field.

const blankDoggo = document.querySelector("#applicant-preview .doggo.blank");
const namePreview = document.querySelector('input[name="name"]');
const picturePreview = document.querySelector('input[name="picture-url"]');
const teamPreview = document.querySelector('input[name="team-name"]');

namePreview.addEventListener("input", event => {
        const fieldValue = event.currentTarget.value;
        blankDoggo.querySelector("h1").innerText = fieldValue || "Applicant Preview";
    });

picturePreview.addEventListener("input", event => {
        const fieldValue = event.currentTarget.value;
        if (fieldValue.includes(".jpg") || fieldValue.includes(".gif") || fieldValue.includes(".png")) {
            blankDoggo.style.backgroundImage = `url(${fieldValue.toLowerCase()})`;
        } else {
            blankDoggo.style.backgroundImage = '';
        };
    });

teamPreview.addEventListener("input", event => {
        const fieldValue = event.currentTarget.value;
        if (fieldValue.includes('teal')) {
            document.querySelector("#applicant-preview").style.border = `5px solid teal`;
        } else if (fieldValue.includes('salmon')) {
            document.querySelector("#applicant-preview").style.border = `5px solid salmon`;
        };
    });

const form = document.querySelector("#application-form");

form.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.get("name");
    formData.get("picture-url");
    formData.get("team-name");
    let team = ''
    if (formData.get('team-name').includes('teal')) {
        team = 'teal';
    } else if (formData.get('team-name').includes('salmon')) {
        team = 'salmon';
    } else {
        alert('Please enter a valid team name.');
    };
    const roster = document.querySelector(`.team.${team} .roster`);
    const newDoggo = document.createElement('div');
    const doggoName = document.createElement('h1');

    newDoggo.setAttribute('class','doggo fighter');
    newDoggo.setAttribute('id', `${formData.get("name").toLowerCase()}`);
    newDoggo.style.backgroundImage = `url(${formData.get("picture-url")}`;
    doggoName.innerText = `${formData.get("name")}`;
    
    roster.append(newDoggo);
    newDoggo.append(doggoName);

    blankDoggo.style.border = 'gainsboro';
    blankDoggo.style.backgroundImage = '';
    blankDoggo.innerHTML = '<h1>Applicant Preview</h1>';
});

// Doggo Arena is shaping up nicely, but market research has shown that power users will be unhappy 
// with the lack of shortcuts.

// Holding ctrl and pressing a number selects the .doggo.fighter at that index. .team.salmon doggo's 
// should be first. This should work even if new .doggo.fighters are added to the team (e.g. Pressing 
// ctrl-0 selects #toxic-tim, pressing ctrl-4 selects #larry-the-lion, etc)
// backspace removes a selected .doggo.fighter from the DOM.

// Stretch
// With a .doggo.fighter selected, holding ctrl and pressing up arrow moves a .doggo.fighter to the 
// team above; pressing ctrl + down arrow, moves selected .doggo.fighter to the team below. This unselects 
// the selected doggo in the process.

document.addEventListener("keydown", event => {
    const { ctrlKey, keyCode } = event;
    
    for (let i = 0; i < doggos.length; i++) {
        doggos[i].classList.remove("selected");
        if (ctrlKey && keyCode - 48 === i) {
            doggos[i].classList.add("selected");
        };
    };
});