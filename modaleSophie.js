 // pour fermer la boite modale ,on sauvegarde 1 variable qui sera null par défaut:
 //elle permettra de savoir quelle est la boite modale qui est actuellement ouverte
 //puis je sauvegarde ds cette variable la : la cible: modal=target
    let modal = null;


    //la F prend en paramètre l'évenement   preventDefault car on ne veut pas que le clic sur le lien fonctionne convenablement
    //ensuite je dois trouver l'élément qui est cible par rapport à notre lien
    // sur le lien : e.target  je veux récupérer l'atribut href  :  ça va me donner  #modal1
    // je vais utiliser la valeur:e.target.getAttribute('href'  pour sélectionner l'élément
    const openModal= function(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        //maintenant,je dois afficher  cette boite modale, null:pour retirer le display none et dc le displex flex prendra le relay
        // et ma boite modale sera affichée
        target.style.display = null;
        //vu que l'élément est maintenant visible, je dois passer aria-hidden à false
        //target.setAttribute('aria-hidden',false) mais plutot on va écrire ceci :
        // je peux tt simplement supprimer cet attribut la parce que l'élémént est maintenant visible
        target.removeAttribute('aria-hidden');
        //de la meme manière :
        target.setAttribute('aria-modal','true');
        modal=target;
        // pour fermer la modale n'importe ou
        //modal.addEventListener('click',closeModal);
        modal.querySelector('.js-modal-close').addEventListener('click',closeModal)
     };


        //sauvegarde la cible de la modale
       /*modal.target;
        modal.addEventListener('click','closeModal');
        modal.querySelector('js-modal-close').addEventListener('click,clooseModal')
        modal.querySelector('js-modal-stop').addEventListener('click,stopPropagation')
        */
        

// quand on veut fermer la modale n importe ou sur la page
       const closeModal =  function(e){
            if(modal === null)return;
            e.preventDefault;
            //la fonction fera l'inverse de tout le reste : on reprend le code du haut
        //La modale prend la valeur de la cible avec 1 display none pour remasquer la boite modale
        modal.style.display = "none";
     // je remplace target par modal et je rajoute true
        modal.removeAttribute('aria-hidden','true');
        modal.setAttribute('aria-modal');
        // lq je ferme ma boite modal,faut que je pense à supprimer ce listener la
       modalquerySelector('js-modal-close').removeListener('click',closeModal);
       modalquerySelector('js-modal-stop').removeListener('click',stopPropagation);
       modal=null;

        }  


        // arreter la fermeture de la modale en tapant n'importe ou dedans
       /* const stopPropagation = function(e) {
            e.stopPropagation();
        }
            
}  */

// Sélectionne tous les éléments qui ont la classe js-modal et pour chacun de ses éléments la,je vais écouter le click
//et qd on clique sur ce lien, je veux que tu appelles la fonction openModal
    document.querySelectorAll('.js-modal').forEach(a =>{
        a.addEventListener('click',openModal);
    });

    //On doit supporter la fonction du clavier,donc qd on appuie sur échapp,la fenetre modal doit se fermer
   /*
    window.addEventlistener('keydown',function(e)){
        if(e.key==='escape' ||  e.key==='Esc'){
            closeModal(e);
        }
    }
*/

/*import { genererWorks } from "./works.js";

const worksModal = document.querySelector ('.modaleWorks',genererWorks(works));
*/

