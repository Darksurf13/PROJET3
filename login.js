const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
  event.preventDefault();
  const user = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value,
  }
  const chargeUtile = JSON.stringify(user);
  console.log(chargeUtile);
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: chargeUtile
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location = "index.html"
      }
      else {
        const passeOublie = document.getElementById('passeOublie');
        passeOublie.innerText = "";
        const erreur = document.createElement('p');
        erreur.textContent = 'Erreur dans l\'identifiant ou le mot de passe';
        erreur.className = "red";
        form.appendChild(erreur);
      }
    })
});