  let works = null;  // la 1ière valeur est null
  let idCategorySelected = null;

  // Récupération des travaux de l'architecte
function fetchWorks() {
    fetch("http://localhost:5678/api/works")
       .then((response) => response.json())   //retourne la réponse en json
            .then((data) =>{if(localStorage.getItem('token')){
                const header =document.querySelector("header");
                const navDisparition = document.querySelector("nav");
                navDisparition.innerHTML = '';
                const h1Disparition = document.querySelector("h1");
                h1Disparition.innerHTML = '';
                const headerConnected = document.querySelector("header");
                headerConnected.className="headerConnected";

                const modeEdition = document.createElement('p');
                modeEdition.textContent = "mode édition";
                modeEdition.className="modeEdition";
                header.appendChild(modeEdition);
               /* modeEdition.className="headerConnected";*/

               const publierLesChangements = document.createElement('article');
               publierLesChangements.textContent = "publier les changements";
               publierLesChangements.className="publierLesChangements";
                header.appendChild(publierLesChangements);
               /* modeEdition.className="headerConnected";*/


// création de la modale //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const h2 =document.querySelector("h2");
const modifier = document.createElement("button");
modifier.id ="myBtn";
modifier.textContent = "modifier";
h2.appendChild(modifier);
        


// la modale
    const myModal = document.createElement("div");
               modifier.appendChild(myModal);
               myModal.className = "modal";
    // Le contenu de la modale
                   const modalContent = document.createElement("div");
                   myModal.appendChild(modalContent);
                   myModal.className = "modal-content";

                       const close = document.createElement("span");
                       modalContent.appendChild(close);
                       close.className = "close";

                       const texte = document.createElement("p");
                       modalContent.appendChild(texte);
                       close.className = "";




               // Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}



            }
            else{
                works = data
                genererWorks(works)
                addFilterButton(works)
  //retourne la fonction genererWorks
        }})
}


/////////////////////////ça c'est juste pour 1 travail  j'utilise une boucle for pour générer tous les travaux///////////////////////////////////////////////
function genererWorks(works) {
//const works = await fetch ("http://localhost:5678/api/works")
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
}



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
    buttonAll.setAttribute("category",null);
    buttonAll.addEventListener('click',(e)=> {
        console.log(e.target.getAttribute("category"));
        idCategorySelected = e.target.getAttribute("category");
        genererWorks(works);
        colorSelectedButton();
    })
    buttonAll.className = "hover";  // ou  buttonAll.classList.add ('filter')
filters.appendChild(buttonAll)  // rattache le bouton à la classe filtres



filtredCategoryIds.forEach(categoryId => {  // pour chaque catégorie trouvé, on crée un bouton
    const button = document.createElement('button');
    button.className = "filter";  // ou  button.classList.add ('filter')
    button.setAttribute("category",categoryId);  
    button.textContent = category.find(c=>c.id===categoryId).name;  // on rajoute le nom au bouton qui est dans la categoryId
    button.addEventListener('click',(e) =>{  // les boutons restent appuyés en rouge
        console.log(e.target.getAttribute("category"));
        idCategorySelected = e.target.getAttribute("category");
        genererWorks(works.filter(work=>work.categoryId===categoryId));
        colorSelectedButton();
    })
    filters.appendChild(button);
});

}



function colorSelectedButton (){  // les boutons restent appuyés en rouge
    console.log(idCategorySelected);
    // il faut je supprime les classes sur les autres bouttons : ici je dois rajouter plusieurs lignes de code
    if(idCategorySelected !==null) { 
        const btn = document.getElementById("all");  //  all = bouton.id
        btn.className = "filter";  // le 1er bouton = buttonAll reste appuyé rouge
    }
    /*else {
        const otherButton = document.querySelector('[category="'+idCategorySelected+'"]')  // sélectionne les buttonAll
        otherButton.className = "red";   // les autres boutons = button restent appuyé rouge
        btn.className.remove("red)")
    }*/
}


fetchWorks();


 /*je fais disparaitre le h1 et la nav du header que je redimensionne et replace en y ajoutant : icon mode édition et publier les changements
    je fais disparaitre les boutons crées que je remplace par edit
    je rajute icon et mode édit à droite de mes projets*/
  /* const h1 = document.queySelector('h1');
    const nav = document.querySelectorAll('nav');
    const filters = document.querySelector(".filtres");

    // fonction modification du header
    function headerConnected () {
      const header = document.queySelector('header');
      header.innerHTML=""
      header.className='headerConnected';
      const icon = document.createElement('img');
      const modeEdition = document.createElement('p');
      modeEdition.textContent = "mode édition";
      const publierChgmConteneur = document.createElement('div');
      const publierChgm = document.createElement('p');
      publierChgm.textContent = "publier les changements";

      header.appendChild('icon');
      header.appendChild('modeEdition');
      header.appendChild('publierChgmConteneur');
      publierChgmConteneur.appendChild('publierChgm');
    }

    // fonction  rajout du mode edit dans le h2
    function h2Connected() {
      const icon = document.createElement('img');
      const modifier = document.createElement('p');
      modifier.textContent = "modifier";
      modifier.addeventListener {
      }
    }



/* 
// Afficher tous les projets ///////categoryId=2 ///// categoryName=objets//////////////categoryId ===1///////////////////////////////////////////////
const boutontoutLesProjets = document.querySelector(".btn-tousLesProjets");
boutontoutLesProjets.addEventListener("click", function()  {
  
   
      genererWorks(works)

})



// afficher les travaux par catégorie en une liste
const boutonFilter = document.querySelector(".btn-filter");
const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

const category = {
    id:'',
   name:'',
};
const categoryId = category.id;
const categoryName = category.name;

//boutonFilter.addEventListener("click", () => {
    const worksFilter = works.map (work=> [work.categoryId,work.category.name]);
 // console.log(worksFilter);

 

  // Lors du click sur le bouton,j'efface la galerie avant le filtrage
 // const divGallery = document.querySelector(".gallery");
  //divGallery.innerHTML = '';

  //Création de la liste des catégories
  //const categoryElements = document.createElement('ul');
  //Ajout de chaque categorie à la liste

//for(let i=0; i < works.length ; i++){
   //  const nomCategory = document.createElement('li');
   //  nomCategory.innerText = worksFilter[i];
   //  categoryElements.appendChild(nomCategory);
  //}
  // Ajout de l'en-tête puis de la liste au bloc résultats filtres
  //document.querySelector('.category')
   //  .appendChild(categoryElements);

//});





// Afficher les travaux par objets ///////categoryId=2 ///// categoryName=objets//////////////categoryId ===1///////////////////////////////////////////////
const boutonFilterObjets = document.querySelector(".btn-filterObjets");
boutonFilterObjets.addEventListener("click", function()  {
  
      const worksObjets = works.filter(function(work) {

       return work.categoryId === 1
        
      });
      console.log(worksObjets)
      genererWorks(worksObjets)

})



// Afficher les travaux par appartements ///////categoryId=2 ///// categoryName=objets//////////////categoryId ===1///////////////////////////////////////////////
const boutonFilterAppartements = document.querySelector(".btn-filterAppartements");
boutonFilterAppartements.addEventListener("click", function()  {
  
      const worksAppartements = works.filter(function(work) {

       return work.categoryId === 2
        
      });
      console.log(worksAppartements)
      genererWorks(worksAppartements)

})




// Afficher les travaux par appartements ///////categoryId=2 ///// categoryName=objets//////////////categoryId ===1///////////////////////////////////////////////
const boutonFilterHotels = document.querySelector(".btn-filterHotels");
boutonFilterHotels.addEventListener("click", function()  {
  
      const worksHotels = works.filter(function(work) {

       return work.categoryId === 3
        
      });
      console.log(worksHotels)
      genererWorks(worksHotels)

})
*/








