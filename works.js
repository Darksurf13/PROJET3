let works = null;  // la 1ière valeur est null
let idCategorySelected = null;

// Récupération des travaux de l'architecte
function fetchWorks() {
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())   //retourne la réponse en json
        .then((data) => {
            if (localStorage.getItem('token')) {

                const body = document.querySelector("body");
                const banniereConnected = document.createElement('div');
                banniereConnected.className = "headerConnected";
                body.appendChild(banniereConnected);

                const conteneurHeaderConnected = document.createElement('div');
                conteneurHeaderConnected.className = "conteneurHeaderConnected";
                banniereConnected.appendChild(conteneurHeaderConnected);

                const iconModeEdition = document.createElement('img');
                iconModeEdition.src = "assets/icons/modeEdition.jpg";
                iconModeEdition.style.width = '20px';
                iconModeEdition.className = "modeEdition";
                // iconModeEditionDimension.style.width = '20px';
                conteneurHeaderConnected.appendChild(iconModeEdition);

                const modeEdition = document.createElement('p');
                modeEdition.textContent = "Mode édition";
                modeEdition.className = "modeEditionP";
                conteneurHeaderConnected.appendChild(modeEdition);

                const publierLesChangements = document.createElement('p');
                publierLesChangements.textContent = "publier les changements";
                publierLesChangements.className = "publierLesChangements";
                conteneurHeaderConnected.appendChild(publierLesChangements);

                const header = document.querySelector("header");
                header.style.marginTop = "97px";

                // remplace le login pour logout et changer le lien
                const login = document.getElementById('login');
                login.innerText = "logout";
                login.href = "";

                //je me déconnecte
                login.addEventListener('click', function (e) {
                    e.preventDefault;
                    localStorage.removeItem('token');
                })

                //  code de modale.js /////////////////////////////////////////////////////////////////////////////////////////////////////////
                let modal = null;
                let modal2 = null;
                //////////////////////////////1ière modadle   /////////////////////////////////////////////////////////////////////////////////
                const openModal = function (e) {
                    e.preventDefault();
                    modal = document.querySelector(e.target.getAttribute('href'));
                    modal.style.display = null;
                    modal.removeAttribute('aria-hidden');
                    modal.setAttribute('aria-modal', 'true');
                    document.getElementById('js-modal-close').addEventListener('click', closeModal)
                    //pour fermer la modale en dehors de celle-ci
                    modal.addEventListener('click', closeModal);
                    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
                };

                const closeModal = function (e) {
                    if (modal === null) return;
                    e.preventDefault;
                    document.getElementById('js-modal-close').removeEventListener('click', closeModal);
                    modal.style.display = "none";
                    modal.removeAttribute('aria-hidden', 'true');
                    modal.setAttribute('aria-modal', 'false');
                    modal.querySelector('js-modal-stop').removeListener('click', stopPropagation);
                    modal = null;
                };

                document.querySelectorAll('.js-modal').forEach(a => {
                    a.addEventListener('click', openModal);
                });
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                const stopPropagation = function (e) {
                    e.stopPropagation();
                }

                //////////  créer ou afficher quelque chose dans la modale  /////////////////////////////////////////////////
                const modalWorks = document.querySelector('#modalWorks');
                /*const peuImporte =document.createElement('p');
                 peuImporte.textContent="peu importe";
                 modalWorks.appendChild(peuImporte);*/
                works = data;
                genererWorksModal(works);


                ///////////////////////////////////////////////2ième modal///////////////////////////////////////////
                const openModal2 = function (e) {
                    e.preventDefault();
                    modal2 = document.getElementById('modal2');  // c'est le deuxieme href
                    console.log(modal2);
                    modal2.style.display = null;
                    modal2.removeAttribute('aria-hidden');
                    modal2.setAttribute('aria-modal', 'true');
                    //bouton X à droite pour fermer les 2 modales
                    modal2.querySelector('.fermerles2').addEventListener('click', fermerLes2);
                    modal2.querySelector('.js-modal2-stop').addEventListener('click', stopPropagation);
                    //flèche pour revenir à la 1ière modale
                    modal2.querySelector('.js-modal2-close').addEventListener('click', closeModal2);

                    //pour fermer la modale 2 en dehors de celle-ci
                    modal2.addEventListener('click', closeModal2);
                    modal2.querySelector('.js-modal2-stop').addEventListener('click', stopPropagation);


                    // on réinitialise le formulaire chaque fois qu'on réouvre la modale
                    //  document.getElementById("myForm").reset();

                    // const valider = document.getElementById ('valider');
                    //  changement de la couleur de valider en vert si tous les champs sont remplis
                    document.getElementById("myForm").addEventListener("change", verif);
                    function verif() {
                        let inputFile = document.getElementById("input-file");
                        const image = inputFile.files[0];
                        const title = document.getElementById("title").value;
                        const category = document.getElementById("category").value; //faut que ce soit entre 1 et 3

                        const valider = document.getElementById('valider');
                        // si au moins 1 des champs est  vide : valider est en gris, vert le cas échéant lors
                        //du chargement de la modale 2  !!!!
                        if (image == undefined || title == '' || category == '') {
                            valider.className = "validerGris";
                            //valider.style.backgroundColor = '#A7A7A7';  // gris
                        }
                        else {
                            valider.className = "valider";
                            // valider.style.backgroundColor = '#1D6154';;  //vert
                        }
                    }

                };

                const closeModal2 = function (e) {
                    if (modal2 === null) return;
                    e.preventDefault;
                    modal2.style.display = "none";
                    modal2.removeAttribute('aria-hidden', 'true');
                    modal2.setAttribute('aria-modal', 'false');
                    modal2 = null;
                    document.getElementById("myForm").reset();
                    document.getElementById("profile-pic").reset();
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
                    modal.setAttribute('aria-modal', 'false');
                    modal = null;
                    document.getElementById("myForm").reset();
                };

                // Appuie sur le bouton ajout photo
                const ajoutPhoto = document.querySelector('.js-modal2');
                ajoutPhoto.addEventListener('click', openModal2);


                // télécharger une photo,et qu'elle s'affiche
                let profilePic = document.getElementById("profile-pic");
                let inputFile = document.getElementById("input-file");

                let iconeChargeImage = document.getElementById('iconeChargeImage');
                let ajouterPhoto = document.getElementById('ajouterPhoto');
                let formatImage = document.getElementById('formatImage');

                inputFile.onchange = function () {
                    profilePic.src = URL.createObjectURL(inputFile.files[0]);
                    console.log("image téléchargée :", profilePic.src);  // donne une image blob qui est un objet
                    profilePic.style.display = null;
                    iconeChargeImage.style.display = "none";
                    ajouterPhoto.style.display = "none";
                    formatImage.style.display = "none";
                }
                ////////////////////////////fin 2ième modale////////////////////////////////////////////////////////////
                //////////////////////////////////envoie d4un nouveau projetE//////////////////////////////////////////////////////////////////////////////////////////////
                //const formModale = document.getElementById('formModale');
                const button = document.getElementById('valider');
                button.addEventListener("click", function (e) {
                    e.preventDefault();
                    console.log(inputFile.files[0]);
                    const image = inputFile.files[0]; // document.getElementById("input-file").files[0];  //files[0] : retourne undefined
                    const title = document.getElementById("title").value;
                    const category = document.getElementById("category").value; //faut que ce soit entre 0 et 3
                    console.log("image", image); //ok
                    const imageUrl = JSON.stringify(image);  //imageBlob.map(imageBlob => imageBlob.blob);
                    console.log("image", imageUrl.blob); //  ya les guillements car objet json
                    console.log("title", title); //ok
                    console.log("categoryId", category); //ok
                   // const files = File;

                    //const file = document.querySelector('#image');
                    const formData = new FormData();  // form ou pas dans la parenthèse? sans: il y a que 3 entrées
                    formData.append('image', image);  //.files[0])
                    formData.append('title', title);
                    formData.append('category', category);
                    console.log("formData", formData);
                    const token = localStorage.getItem('token');

                    fetch('http://localhost:5678/api/works', {
                        method: 'POST',
                        body: formData,  //  JSON.stringify(formData) ou  formData :moins probable
                        headers: {
                            // "content-Type" : "multipart/form-data",  //    application/json  pas besoin
                            "accept": "application/json",
                            'Authorization': `Bearer ${token}`
                        },
                    })
                        .then((resp) => resp.json())
                        .then((response) => (console.log(response)))  //  pour voir ce que ça donne
                })
                genererWorks(works);
                deleteWork(works);
            }
            else {
                works = data;
                genererWorks(works);
                addFilterButton(works);
                genererWorksModal(works);
                //retourne la fonction genererWorks
            }
        })
}
/////////////////////////ça c'est juste pour 1 travail  j'utilise une boucle for pour générer tous les travaux///////////////////////////////////////////////
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

function genererWorksModal(works) {
    //const works = await fetch ("http://localhost:5678/api/works")
    console.log(works);
    // Récupération de l'élément du DOM qui accueillera les travaux
    const divGallery = document.querySelector(".modalWorks");
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

function deleteWork(works) {
    const iconDeleteWork = document.querySelectorAll('#buttonDelete');
    //  let id = 0;
    for (let i = 0; i < iconDeleteWork.length; i++) {
        iconDeleteWork[i].addEventListener('click', function (e) {
            e.preventDefault();
            const workId = works.map(work => work.id);
            console.log(workId);  // ok on a que des ids
            const id = workId[i];
            console.log(id);  //donne l'id du work dont je clique dessus
            const token = localStorage.getItem('token');
            fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "content-Type": "application/json",
                    "accept": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => console.log(resp))
                .catch(error => console.log(error));
        })
    }
};

function addFilterButton(works) {
    const filters = document.querySelector(".filtres")
    const categoryIds = works.map(work => work.categoryId)
    const category = works.map(work => work.category)
    console.log(categoryIds);
    const filtredCategoryIds = Array.from(new Set(categoryIds))
    console.log(filtredCategoryIds);  // retourne 3 catégories donc
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
    buttonAll.className = "hover";  // ou  buttonAll.classList.add ('filter')
    filters.appendChild(buttonAll); // rattache le bouton à la classe filtres
    filtredCategoryIds.forEach(categoryId => {  // pour chaque catégorie trouvé, on crée un bouton
        const button = document.createElement('button');
        button.className = "filter";  // ou  button.classList.add ('filter')
        button.setAttribute("category", categoryId);
        button.textContent = category.find(c => c.id === categoryId).name;  // on rajoute le nom au bouton qui est dans la categoryId
        button.addEventListener('click', (e) => {  // les boutons restent appuyés en rouge
            console.log(e.target.getAttribute("category"));
            idCategorySelected = e.target.getAttribute("category");
            genererWorks(works.filter(work => work.categoryId === categoryId));
            colorSelectedButton();
        })
        filters.appendChild(button);
    });
};

function colorSelectedButton() {  // les boutons restent appuyés en rouge
    console.log(idCategorySelected);
    // il faut je supprime les classes sur les autres bouttons : ici je dois rajouter plusieurs lignes de code
    if (idCategorySelected !== null) {
        const btn = document.getElementById("all");  //  all = bouton.id
        btn.className = "filter";  // le 1er bouton = buttonAll reste appuyé rouge
    }
};

fetchWorks();















