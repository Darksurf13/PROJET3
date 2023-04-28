let works = null;
let idCategorySelected = null;

function fetchWorks() {
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            if (localStorage.getItem('token')) {
                const iconPortrait = document.getElementById('iconPortrait');
                iconPortrait.style.display = null;
                const pIconPortrait = document.getElementById('pIconPortrait');
                pIconPortrait.style.display = null;
                const iconModal = document.getElementById('iconModal');
                iconModal.style.display = null;
                const jsModal = document.getElementById('js-modal');
                jsModal.style.display = null;
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
                const header = document.querySelector("header");
                header.style.marginTop = "38px";
                const login = document.getElementById('login');
                login.innerText = "logout";
                login.href = "";
                login.addEventListener('click', function (e) {
                    e.preventDefault;
                    localStorage.removeItem('token');
                })
                let modal = null;
                let modal2 = null;
                const openModal = function (e) {
                    e.preventDefault();
                    modal = document.querySelector(e.target.getAttribute('href'));
                    modal.style.display = null;
                    modal.removeAttribute('aria-hidden');
                    document.getElementById('js-modal-close').addEventListener('click', closeModal);
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
                document.querySelectorAll('.js-modal').forEach(a => {
                    a.addEventListener('click', openModal);
                });
                const stopPropagation = function (e) {
                    e.stopPropagation()
                }
                const modalWorks = document.querySelector('#modalWorks');
                works = data;
                genererWorksModal(works);
                const openModal2 = function (e) {
                    e.preventDefault();
                    modal2 = document.getElementById('modal2');
                    modal2.style.display = null;
                    modal2.removeAttribute('aria-hidden');
                    modal2.querySelector('.fermerles2').addEventListener('click', fermerLes2);
                    modal2.querySelector('.js-modal2-stop').addEventListener('click', stopPropagation);
                    modal2.querySelector('.js-modal2-close').addEventListener('click', closeModal2);
                    modal2.addEventListener('click', closeModal2);
                    modal2.querySelector('.js-modal2-stop').addEventListener('click', stopPropagation);
                    document.getElementById("myForm").addEventListener("change", verif);
                };
                const closeModal2 = function (e) {
                    if (modal2 === null) return;
                    e.preventDefault;
                    modal2.style.display = "none";
                    modal2.removeAttribute('aria-hidden', 'true');
                    modal2 = null;
                    document.getElementById("myForm").reset();
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
                    modal = null;
                    document.getElementById("myForm").reset();
                    let profilePic = document.getElementById("profile-pic");
                    profilePic.src = "";
                    profilePic.style.display = "none";
                    iconeChargeImage.style.display = null;
                    ajouterPhoto.style.display = null;
                    formatImage.style.display = null;
                    refreshList()
                };
                const ajoutPhoto = document.querySelector('.js-modal2');
                ajoutPhoto.addEventListener('click', openModal2);
                let profilePic = document.getElementById("profile-pic");
                let inputFile = document.getElementById("input-file");
                let iconeChargeImage = document.getElementById('iconeChargeImage');
                let ajouterPhoto = document.getElementById('ajouterPhoto');
                let formatImage = document.getElementById('formatImage');
                inputFile.onchange = function () {
                    profilePic.src = URL.createObjectURL(inputFile.files[0]);
                    console.log("image téléchargée :", profilePic.src);
                    profilePic.style.display = null;
                    iconeChargeImage.style.display = "none";
                    ajouterPhoto.style.display = "none";
                    formatImage.style.display = "none";
                }
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

function genererWorks(works) {
    console.log(works);
    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = '';
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        const workElement = document.createElement("article");
        const imageUrlElement = document.createElement("img");
        imageUrlElement.src = work.imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = work.title;
        divGallery.appendChild(workElement);
        workElement.appendChild(imageUrlElement);
        workElement.appendChild(titleElement);
    }
};

function genererWorksModal(works) {
    const divGallery = document.querySelector(".modalWorks");
    divGallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        console.log(work);
        const workElement = document.createElement("article");
        workElement.className = "workElement";
        const imageUrlElement = document.createElement("img");
        imageUrlElement.src = work.imageUrl;
        const buttonDelete = document.createElement('button');
        buttonDelete.id = "buttonDelete";
        workElement.appendChild(buttonDelete);
        const editer = document.createElement("p");
        editer.innerText = "éditer";
        editer.className = "editer";
        divGallery.appendChild(workElement);
        workElement.appendChild(imageUrlElement);
        workElement.appendChild(editer);
    };
};

function refreshModalList() {
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            genererWorksModal(data), deleteWork(works)
        }
        )
};

function deleteWork(works) {
    const iconDeleteWork = document.querySelectorAll('#buttonDelete');
    for (let i = 0; i < iconDeleteWork.length; i++) {
        iconDeleteWork[i].addEventListener('click', function (e) {
            e.preventDefault();
            const workId = works.map(work => work.id);
            console.log(workId);
            const id = workId[i];
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
                    closeModalApresSup();
                    refreshList()
                })
                .catch(error => console.log(error))
        })
    };
};

function refreshList() {
    console.log("refreshList");
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            genererWorks(data), deleteWork(works);
        }
        )
};

function closeModal2ApresAjout() {
    modal2 = document.getElementById('modal2');
    modal2.style.display = "none";
    refreshModalList()
}

function closeModalApresSup() {
    modal = document.getElementById('modal1');
    modal.style.display = "none";
    genererWorks(works)
}

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

function colorSelectedButton() {
    console.log(idCategorySelected);
    if (idCategorySelected !== null) {
        const btn = document.getElementById("all");
        btn.className = "filter";
    }
};

function verif() {
    let inputFile = document.getElementById("input-file");
    const image = inputFile.files[0];
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const valider = document.getElementById('valider');
    if (image == undefined || title == '' || category == '') {
        valider.className = "validerGris";
    }
    else {
        valider.className = "valider";
    }
}

fetchWorks();















