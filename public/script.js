let userGame = "";

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const isDashboard = window.location.pathname.includes("dashboard.html");

    db.collection("users").doc(user.uid).get().then(doc => {
      userGame = doc.data().game;
      if (isDashboard) {
        if (doc.data().role === "admin") {
          document.getElementById("eventForm").style.display = "block";
        }
        loadEvents();
      }
    });
  } else {
    if (window.location.pathname.includes("dashboard.html")) {
      window.location.href = "index.html";
    }
  }
});
function login(){
document.addEventListener("DOMContentLoaded", () => {
  window.login = function() {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;
    const loginError = document.getElementById("loginError");

    auth.signInWithEmailAndPassword(email, pass)
      .then((cred) => {
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        loginError.textContent = error.message; // Display error
      });
  }

  window.signup = function() {
    const email = document.getElementById("signupEmail").value;
    const pass = document.getElementById("signupPassword").value;
    const game = document.getElementById("signupGame").value;
    const signupError = document.getElementById("signupError");

    auth.createUserWithEmailAndPassword(email, pass)
      .then((cred) => {
        // Store additional user data in Firestore
        db.collection("users").doc(cred.user.uid).set({
          role: "user",
          game: game
        }).then(() => {
          window.location.href = "dashboard.html";
        });
      })
      .catch((error) => {
        signupError.textContent = error.message; // Display error
      });
  }
});
}

function createEventForm() {
    const eventForm = document.getElementById("eventForm");
    eventForm.innerHTML = `
        <h2>Create Event</h2>
        <input type="text" id="eventTitle" placeholder="Event Title" required>
        <input type="date" id="eventDate" required>
        <input type="text" id="eventGame" value="${userGame}" readonly>
        <button onclick="createEvent()">Create Event</button>
    `;
    }

function createEvent() {
  const title = document.getElementById("eventTitle").value;
  const date = document.getElementById("eventDate").value;
  const game = document.getElementById("eventGame").value;

  db.collection("events").add({
    title,
    date,
    game
  }).then(() => {
    loadEvents();
  });
}

function loadEvents() {
  const eventsList = document.getElementById("eventsList");
  eventsList.innerHTML = "";

  db.collection("events").where("game", "==", userGame).orderBy("date").get().then((snapshot) => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = `${data.title} - ${data.date} [${data.game}]`;
      eventsList.appendChild(li);
    });
  });
}

function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}
