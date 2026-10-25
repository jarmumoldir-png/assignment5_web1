// Task 1: The Personal Info Object
const defaultProfile = {
    name: "Alex",
    birthYear: 1998,
    isDeveloper: true,
    hobbies: ["reading", "coding", "gaming"]
};

const savedProfile = localStorage.getItem("userProfile");
const userProfile = savedProfile ? JSON.parse(savedProfile) : defaultProfile;

const displayName = document.getElementById("displayName");
const displayBirthYear = document.getElementById("displayBirthYear");
const displayIsDev = document.getElementById("displayIsDev");
const previewHobbies = document.getElementById("previewHobbies");
const ageDisplay = document.getElementById("ageDisplay");
const hobbyCountDisplay = document.getElementById("hobbyCountDisplay");

const usernameInput = document.getElementById("usernameInput");
const birthYearInput = document.getElementById("birthYearInput");
const updateProfileBtn = document.getElementById("updateProfileBtn");

const hobbyList = document.getElementById("hobbyList");
const newHobbyInput = document.getElementById("newHobbyInput");
const addItemBtn = document.getElementById("addItemBtn");
const removeItemBtn = document.getElementById("removeItemBtn");

const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
};

const renderProfile = () => {
    displayName.textContent = userProfile.name;
    displayBirthYear.textContent = userProfile.birthYear;
    displayIsDev.textContent = userProfile.isDeveloper;

    previewHobbies.innerHTML = "";
    for (let i = 0; i < userProfile.hobbies.length; i++) {
        const badge = document.createElement("span");
        badge.className = "hobby-badge";
        badge.textContent = userProfile.hobbies[i];
        previewHobbies.appendChild(badge);
    }

  // Task 2: Arithmetic Calculations
    const currentYear = 2026;
    const age = currentYear - userProfile.birthYear;
    ageDisplay.textContent = age;
    hobbyCountDisplay.textContent = userProfile.hobbies.length;
};

// Task 5: Creating & Removing Elements
const renderHobbyList = () => {
    hobbyList.innerHTML = "";

    if (userProfile.hobbies.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "empty-message";
        emptyLi.textContent = "list is empty, add some hobbies";
        hobbyList.appendChild(emptyLi);
        return;
    }

    for (let i = 0; i < userProfile.hobbies.length; i++) {
        const li = document.createElement("li");
        li.textContent = userProfile.hobbies[i];
        hobbyList.appendChild(li);
    }
};

// Task 4: Event Listener
updateProfileBtn.addEventListener("click", () => {
    const newName = usernameInput.value.trim();
    const newBirthYear = parseInt(birthYearInput.value);

    if (newName !== "") {
        userProfile.name = newName;
    }

    if (!isNaN(newBirthYear) && newBirthYear > 1900 && newBirthYear <= 2026) {
        userProfile.birthYear = newBirthYear;
    }

    saveProfile();
    renderProfile();
    renderHobbyList();
});

// Task 5: add item
addItemBtn.addEventListener("click", () => {
    const newHobby = newHobbyInput.value.trim();
    if (newHobby === "") {
        return;
    }
    userProfile.hobbies.push(newHobby);
    newHobbyInput.value = "";
    saveProfile();
    renderProfile();
    renderHobbyList();
});

// Task 5: remove last item
removeItemBtn.addEventListener("click", () => {
    if (userProfile.hobbies.length > 0) {
        userProfile.hobbies.pop();
        saveProfile();
        renderProfile();
        renderHobbyList();
    } else {
        alert("List is empty already");
    }
});

usernameInput.value = userProfile.name;
birthYearInput.value = userProfile.birthYear;

renderProfile();
renderHobbyList();