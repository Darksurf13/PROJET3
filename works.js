let works = null;  // la 1ière valeur est null
let idCategorySelected = null;

// FONCTION POUR SE CONNECTER A L'API
// si j'ai le token : je suis connectée : bannère noire et boutons modifier s'affichent 
// je remplace le login par logout, les boutons de tri disparaissent.
function fetchWorks() {
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            if (localStorage.getItem('token')) {
                // j'affiche les icones modifier
                const iconPortrait = document.getElementById('iconPortrait');
                console.log('iconPortrait', iconPortrait)
                iconPortrait.style.display = null;  //ok
                const pIconPortrait = document.getElementById('pIconPortrait');
                console.log('piconPortrait', pIconPortrait)
                pIconPortrait.style.display = null;
                const iconModal = document.getElementById('iconModal');
                iconModal.style.display = null;
                const jsModal = document.getElementById('js-modal');
                jsModal.style.display = null;
                // JE CREE LA BANNIERE NOIRE
                const body = document.querySelector("body");
                const banniereConnected = document.createElement('div');
                banniereConnected.className = "headerConnected";
                body.prepend(banniereConnected);
                const conteneurHeaderConnected = document.createElement('div');
                conteneurHeaderConnected.className = "conteneurHeaderConnected";
                banniereConnected.appendChild(conteneurHeaderConnected);
                const iconModeEdition = document.createElement('img');
                iconModeEdition.src = "assets/icons/modeEdition.jpg";
                iconModeEdition.style.width = '20px';
                iconModeEdition.className = "modeEdition";
                conteneurHeaderConnected.appendChild(iconModeEdition);
                const modeEdition = document.createElement('p');
                modeEdition.textContent = "Mode édition";
                modeEdition.className = "modeEditionP";
                conteneurHeaderConnected.appendChild(modeEdition);
                const publierLesChangements = document.createElement('p');
                publierLesChangements.textContent = "publier les changements";
                publierLesChangements.className = "publierLesChangements";
                conteneurHeaderConnected.appendChild(publierLesChangements);
                //Le margin-top du header une fois connecté est de 38px
                const header = document.querySelector("header");
                header.style.marginTop = "38px";
                // remplace le login pour logout et changer le lien
                const login = document.getElementById('login');
                login.innerText = "logout";
                login.href = "";
                //je me déconnecte
                login.addEventListener('click', function (e) {
                    e.preventDefault;
                    localStorage.removeItem('token');
                })
                // CODE POUR LA MODALE
                let modal = null;
                let modal2 = null;
                // 1ière modale  
                const openModal = function (e) {
                    e.preventDefault();
                    modal = document.querySelector(e.target.getAttribute('href'));
                    modal.style.display = null;
                    modal.removeAttribute('aria-hidden');
                    // modal.setAttribute('aria-modal', 'true');
                    document.getElementById('js-modal-close').addEventListener('click', closeModal);
                    //pour fermer la modale en dehors de celle-ci
                    modal.addEventListener('click', closeModal);
                    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
                    refreshModalList();
                };
                const closeModal = function (e) {
                    if (modal === null) return;
                    e.preventDefault;
                    document.getElementById('js-modal-close').removeEventListener('click', closeModal);
                    modal.style.display = "none";
                    modal.removeAttribute('aria-hidden', 'true');
                    refreshList()
                };
                // quand on clique sur modifier pour ouvrir la modale
                document.querySelectorAll('.js-modal').forEach(a => {
                    a.addEventListener('click', openModal);
                });
                // Pour fermer la modale en dehors de la modale 
                const stopPropagation = function (e) {
                    e.stopPropagation()
                }
                const modalWorks = document.querySelector('#modalWorks');
                works = data;
                genererWorksModal(works);
                // 2ième modale
                const openModal2 = function (e) {
                    e.preventDefault();
                    modal2 = document.getElementById('modal2');
                    console.log(modal2);
                    modal2.style.display = null;
                    modal2.removeAttribute('aria-hidden');
                    modal2.querySelector('.fermerles2').addEventListener('click', fermerLes2);
                    modal2.querySelector('.js-modal2-stop').addEventListener('click', stopPropagation);
                    //flèche pour revenir à la 1ière modale
                    modal2.querySelector('.js-modal2-close').addEventListener('click', closeModal2);
                    //pour fermer la modale 2 en dehors de celle-ci
                    modal2.addEventListener('click', closeModal2);
                    modal2.querySelector('.js-modal2-stop').addEventListener('click', stopPropagation);
                    //  changement de la couleur de valider en vert si tous les champs sont remplis
                    document.getElementById("myForm").addEventListener("change", verif);
                };
                const closeModal2 = function (e) {
                    if (modal2 === null) return;
                    e.preventDefault;
                    modal2.style.display = "none";
                    modal2.removeAttribute('aria-hidden', 'true');
                    modal2 = null;
                    // on"reset" le formulaire
                    document.getElementById("myForm").reset();
                    // Pour que l'image se "reset" à l'ouverture de la modale 2
                    let profilePic = document.getElementById("profile-pic");
                    profilePic.src = "";
                    profilePic.style.display = "none";
                    iconeChargeImage.style.display = null;
                    ajouterPhoto.style.display = null;
                    formatImage.style.display = null;
                    refreshModalList();
                };
                const fermerLes2 = function (e) {
                    if (modal2 === null && modal === null) return;
                    e.preventDefault;
                    modal2.style.display = "none";
                    modal2.removeAttribute('aria-hidden', 'true');
                    modal2.setAttribute('aria-modal', 'false');
                    modal2 = null;
                    modal.style.display = "none";
                    modal.removeAttribute('aria-hidden', 'true');
                    // modal.setAttribute('aria-modal', 'false');
                    modal = null;
                    // on"reset" le formulaire
                    document.getElementById("myForm").reset();
                    // Pour que l'image se "reset" à l'ouverture de la modale 2
                    let profilePic = document.getElementById("profile-pic");
                    profilePic.src = "";
                    profilePic.style.display = "none";
                    iconeChargeImage.style.display = null;
                    ajouterPhoto.style.display = null;
                    formatImage.style.display = null;
                    refreshList()
                };
                // J'appuie sur le bouton : AJOUTER UNE PHOTO  pour accéder à la 2ieme modale
                const ajoutPhoto = document.querySelector('.js-modal2');
                ajoutPhoto.addEventListener('click', openModal2);
                // pour télécharger une photo et qu'elle s'affiche
                let profilePic = document.getElementById("profile-pic");
                let inputFile = document.getElementById("input-file");
                let iconeChargeImage = document.getElementById('iconeChargeImage');
                let ajouterPhoto = document.getElementById('ajouterPhoto');
                let formatImage = document.getElementById('formatImage');
                // Pour que le bouton VALIDER passe au vert lorque les 3 champs sont remplis, reste gris le cas échéant
                inputFile.onchange = function () {
                    profilePic.src = URL.createObjectURL(inputFile.files[0]);
                    console.log("image téléchargée :", profilePic.src);
                    profilePic.style.display = null;
                    iconeChargeImage.style.display = "none";
                    ajouterPhoto.style.display = "none";
                    formatImage.style.display = "none";
                }
                // Envoie d'un nouveau projet
                const button = document.getElementById('valider');
                button.addEventListener("click", function (e) {
                    e.preventDefault();
                    const image = inputFile.files[0];
                    const title = document.getElementById("title").value;
                    const category = document.getElementById("category").value;
                    const imageUrl = JSON.stringify(image);
                    const formData = new FormData();
                    formData.append('image', image);
                    formData.append('title', title);
                    formData.append('category', category);
                    console.log("formData", formData);
                    const token = localStorage.getItem('token');
                    fetch('http://localhost:5678/api/works', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            // "content-Type" : "multipart/form-data": pas besoin
                            "accept": "application/json",
                            'Authorization': `Bearer ${token}`
                        },
                    })
                        .then((resp) => resp.json())
                        .then((response) => {
                            genererWorksModal(response);
                            closeModal2ApresAjout();
                        })
                    document.getElementById("myForm").reset();
                    // Pour que l'image se "reset" à l'ouverture de la modale 2
                    let profilePic = document.getElementById("profile-pic");
                    profilePic.src = "";
                    profilePic.style.display = "none";
                    iconeChargeImage.style.display = null;
                    ajouterPhoto.style.display = null;
                    formatImage.style.display = null;
                })
                genererWorks(works);
                deleteWork(works);
            }
            else {
                works = data;
                genererWorks(works);
                addFilterButton(works);
                genererWorksModal(works);
            }
        })
}

//  GENERE tous LES TRAVAUX en faisant apppel à l'API
function genererWorks(works) {
    console.log(works);
    // Récupération de l'élément du DOM qui accueillera les travaux
    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = '';
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        // Création d’une balise dédiée à un travail : il y en a 11 en tout
        const workElement = document.createElement("article");
        // Création des balises 
        const imageUrlElement = document.createElement("img");
        imageUrlElement.src = work.imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = work.title;
        // On rattache la balise work a la div gallery
        divGallery.appendChild(workElement);
        workElement.appendChild(imageUrlElement);
        workElement.appendChild(titleElement);
    }
};

// GENERE les TRAVAUX dans la modale
function genererWorksModal(works) {
    const divGallery = document.querySelector(".modalWorks");
    divGallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        console.log(work);
        // Création d’une balise dédiée à un travail : il y en a 11 en tout
        const workElement = document.createElement("article");
        workElement.className = "workElement";
        // Création des balises 
        const imageUrlElement = document.createElement("img");
        imageUrlElement.src = work.imageUrl;
        // création du boutton Delete sur chaque image
        const buttonDelete = document.createElement('button');
        buttonDelete.id = "buttonDelete";
        workElement.appendChild(buttonDelete);
        const editer = document.createElement("p");
        editer.innerText = "éditer";
        editer.className = "editer";
        // On rattache la balise work a la div gallery
        divGallery.appendChild(workElement);
        workElement.appendChild(imageUrlElement);
        workElement.appendChild(editer);
    };
};

//pour rafraichir les works de la modale
function refreshModalList() {
    console.log("Bonjour");
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            genererWorksModal(data), deleteWork(works)
        }
        )
};

// SUPPRIMER 1 PROJET 
function deleteWork(works) {
    console.log("deleteWork");
    const iconDeleteWork = document.querySelectorAll('#buttonDelete');
    for (let i = 0; i < iconDeleteWork.length; i++) {
        iconDeleteWork[i].addEventListener('click', function (e) {
            e.preventDefault();
            const workId = works.map(work => work.id);
            console.log(workId);
            const id = workId[i];
            //donne l'id du work dont je clique dessus
            console.log(id);
            const token = localStorage.getItem('token');
            fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "content-Type": "application/json",
                    "accept": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => {
                    console.log(" delete stopPropagation");
                    closeModalApresSup();
                    refreshList()
                })
                .catch(error => console.log(error))
        })
    };
};

//pour rafraichir les works de la page index.html
function refreshList() {
    console.log("refreshList");
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            genererWorks(data), deleteWork(works);
        }
        )
};

//ferme la 2ième modale après ajout d'un projet
function closeModal2ApresAjout() {
    modal2 = document.getElementById('modal2');
    modal2.style.display = "none";
    refreshModalList()
}
//ferme la 1ière modale après suppression d'un projet
function closeModalApresSup() {
    modal = document.getElementById('modal1');
    modal.style.display = "none";
    genererWorks(works)
}

// AJOUTER les BOUTONS de tri dans la page index.html
function addFilterButton(works) {
    const filters = document.querySelector(".filtres");
    const categoryIds = works.map(work => work.categoryId);
    const category = works.map(work => work.category);
    console.log(categoryIds);
    const filtredCategoryIds = Array.from(new Set(categoryIds));
    console.log(filtredCategoryIds);
    const buttonAll = document.createElement('button');
    buttonAll.textContent = 'Tous';
    buttonAll.id = "all";
    buttonAll.setAttribute("category", null);
    buttonAll.addEventListener('click', (e) => {
        console.log(e.target.getAttribute("category"));
        idCategorySelected = e.target.getAttribute("category");
        genererWorks(works);
        colorSelectedButton();
    })
    buttonAll.className = "hover";
    filters.appendChild(buttonAll);
    filtredCategoryIds.forEach(categoryId => {
        const button = document.createElement('button');
        button.className = "filter";
        button.setAttribute("category", categoryId);
        button.textContent = category.find(c => c.id === categoryId).name;
        button.addEventListener('click', (e) => {
            console.log(e.target.getAttribute("category"));
            idCategorySelected = e.target.getAttribute("category");
            genererWorks(works.filter(work => work.categoryId === categoryId));
            colorSelectedButton();
        })
        filters.appendChild(button);
    });
};

//COULEUR des BOUTONS de TRI
function colorSelectedButton() {
    console.log(idCategorySelected);
    if (idCategorySelected !== null) {
        const btn = document.getElementById("all");
        btn.className = "filter";
    }
};

// pour que le bouton vérifier passe au vert quand les 3 champs sont remplis, il reste gris le cas échéant
function verif() {
    let inputFile = document.getElementById("input-file");
    const image = inputFile.files[0];
    const title = document.getElementById("title").value;
    //faut que ce soit entre 1 et 3
    const category = document.getElementById("category").value;
    const valider = document.getElementById('valider');
    // si au moins 1 des champs est  vide : valider est en gris, vert le cas échéant lors
    //du chargement de la modale 2  !!!!
    if (image == undefined || title == '' || category == '') {
        valider.className = "validerGris";
    }
    else {
        valider.className = "valider";
    }
}

fetchWorks();















