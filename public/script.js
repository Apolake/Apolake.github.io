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

document.addEventListener("DOMContentLoaded", () => {
    window.login = function() {
      const email = document.getElementById("email").value;
      const pass = document.getElementById("password").value;
      const game = document.getElementById("game").value;
  
      auth.signInWithEmailAndPassword(email, pass).then((cred) => {
        db.collection("users").doc(cred.user.uid).set({ game: game }, { merge: true });
        window.location.href = "dashboard.html";
      }).catch(() => {
        auth.createUserWithEmailAndPassword(email, pass).then((cred) => {
          db.collection("users").doc(cred.user.uid).set({
            role: "user",
            game: game
          });
          window.location.href = "dashboard.html";
        });
      });
    }
  });
  

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
