fetch('data.json').then(function(response) { 
    response.json().then(function(data){ 
        console.log(data);

        document.querySelector("header").innerHTML = '<h1 id="up">CESAR SAE.105</h1>';

        data.forEach((data, numCase) => { 
            document.querySelector('.liste-musiques').innerHTML +=
            //cette fonction permet de créer dans le html les div de chaque musique grâce à un forEach, et va chercher les informations dans un fichiers .json 
                `<div>
                    <img src="img/${data.image}" alt="">
                    <h2>${data.musique}</h2>
                    <p>${data.descriptionMusiques}</p>
                    <audio controls src="${data.audio}" type="audio/mp3"></audio>
                    <br><button type="button" class="playAndPause">⏵</button>
                    <a href="${data.lien}" class="lien" title="visitez le lien youtube">Musique complète sur Youtube</a>
                    <a href="#credit" title="aller au credit">information crédit</a>
                </div>`;
        });

        const musiques = document.querySelectorAll("audio");
        const playAndPause = document.querySelectorAll(".playAndPause");

        playAndPause.forEach((button, counter) => {
            const currentMusic = musiques[counter];

            // Réinitialiser le bouton lorsque la musique se termine
            currentMusic.addEventListener('ended', () => {
                button.innerHTML = "⏵";
            });

            button.addEventListener('click', () => {
                // Permet de faire fonctionner le bouton pour mettre en play/pause les musiques, ainsi qu'interrompre une musique en cours si nous appuyons sur le bouton play d'une autre musique. Il transforme aussi l'intérieur du bouton en fonction de son état
                if (currentMusic.paused) {
                    currentMusic.play();
                    button.innerHTML = "⏸";
                } else {
                    currentMusic.pause();
                    button.innerHTML = "⏵";
                }

                // Pause toutes les autres musiques et réinitialise les boutons correspondants
                musiques.forEach((music, autresMusiques) => {
                    if (autresMusiques !== counter) {
                        music.pause();
                        playAndPause[autresMusiques].innerHTML = "⏵";
                    }
                });
            });
        });


        document.querySelector('.userForm').innerHTML += 
        // cette fonction permet de créer dans le html le formulaire qui permet à l'utilisateur de rajouter une musique
                `<form action="">
                <h2>Formulaire pour ajouter la musique de votre choix :</h2>
                <h3 class="asterisk">Tous les champs avec un astérisque (<span>*</span>) sont obligatoires</h3>
                <label for="email">Email <span>*</span></label>
                <input type="email" id="email" placeholder="exemple@test.com" required>
                <br>
                <label for="titre">Titre de la musisque<span>*</span></label>
                <input type="text" id="titre" required>
                <br>
                <label for="descriptionMusique">Description de la musique <span>*</span></label>
                <input type="text" id="descriptionMusique" required>
                <br>
                <label for="audio">Lien l'audio <span>*</span></label>
                <input type="url" id="audio" placeholder="https://exemple.com/audio.mp3" pattern="https://.*" required />
                <br>
                <label for="image">Lien de l'image <span>*</span></label>
                <input type="url" id="image" placeholder="https://exemple.com/image.png" pattern="https://.*" required />
                <br>
                <label for="lien">Lien youtube vers la musique <span>*</span></label>
                <input type="url" id="lien" placeholder="https://exemple.com" pattern="https://.*" required />
                <br>
                <input class="sendForm" type="button" value="Envoyer">
            </form>`;

            const sendForm = document.querySelector(".sendForm");

        sendForm.addEventListener('click', () => {
        const emailForm = document.getElementById("email").value;
        const titleForm = document.getElementById('titre').value;
        const descriptionForm = document.getElementById('descriptionMusique').value;
        const audioForm = document.getElementById('audio').value;
        const imageForm = document.getElementById('image').value;
        const lien = document.getElementById('lien').value;

        if (!emailForm || !titleForm || !descriptionForm || !audioForm || !imageForm || !lien) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        console.log(emailForm, titleForm, descriptionForm, audioForm, imageForm, lien);

        const url = `https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=cesar&courriel=${emailForm}&message=${titleForm},${descriptionForm},${audioForm},${imageForm},${lien}`;
        
        console.log(url);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Réponse du réseau incorrecte');
                    alert("Réponse du réseau incorrecte");
                }
                return response.json();
            })
            .then(data => {
                console.log("Réponse reçue : ");
                alert("Réponse reçue");
                console.log(data);

                document.querySelector(".resultForm").innerHTML +=  
                `<div class="newMusique">
                    <img src="${imageForm}" alt="Image de la musique">
                    <h2>${titleForm}</h2>
                    <p>${descriptionForm}</p>
                    <audio controls src="${audioForm}" type="audio/mp3"></audio>
                    <br><button type="button" class="playAndPause">⏵</button>
                    <a href="${lien}" class="lien" title="visitez le lien youtube">Musique complète sur Youtube</a>
                    <a href="#credit" title="aller au credit">information crédit</a>
                </div>`;
            })
            .catch(error => {
                console.error("Il y a eu un problème avec l'opération fetch :", error);
            });
        });


        document.querySelector(".credit-musiques").innerHTML =
            // permet de créer dans le html la partie des crédits pour les musiques, en créant une section pour le bouton et des divs pour les credits des musiques
            `<section><button class="credit">CRÉDITS des musiques</button></section>
            <div class="hide">
                <h3>Am I Dreaming CREDIT</h3>
                <p>Interprété par: A$AP Rocky, Metro Boomin, Roisee</p>
                <p>Composé par: MIKE DEAN, Landon Wayne, Peter Lee Johnson, Rakim Mayers, Roisee</p>
                <p>Produit par: Metro Boomin, MIKE DEAN, Landon Wayne, Peter Lee Johnson</p>
                <p>Source: Republic Records, Warner Chappell Music</p>
            </div>
            <div class="hide">
                <h3>Joueur 1 CREDIT</h3>
                <p>Interprété par: Luidji, Tuerie</p>
                <p>Composée par: Luidji Alexis, Paul Nnaze, Ryan Koffi</p>
                <p>Produit par: Ryan Koffi</p>
                <p>Source: Foufoune Palace Bonjour, under exclusive distribution to Island Def Jam, a label of Universal Music France</p>
            </div>
            <div class="hide">
                <h3>Γ. Mosaïque Solitaire CREDIT</h3>
                <p>Interprété par: Damso</p>
                <p>Composé par: Boumidjal X, Damso, Double X, Pirates 8293</p>
                <p>Produit par: Double X, Pirates 8293</p>
                <p>Source: Universal Music Division Carthage Music, Universal Music Publishing</p>
            </div>
            <div class="hide">
                <h3>UNE HISTOIRE ÉTRANGE CREDIT</h3>
                <p>Interprété par: Laylow</p>
                <p>Composé par: Laylow, Selman Faris , Sofiane Pamart</p>
                <p>Produit par: Laylow, Thomas André</p>
                <p>Source: Digitalmundo</p>
            </div>
            <div class="hide">
                <h3>Wolves CREDIT</h3>
                <p>Interprété par Kanye West</p>
                <p>Composé par: KIRBY, MIKE DEAN, Noah Goldstein, Sia Furler, Alan Brinsmead, Christopher Breaux, Elon Rutberg, Kanye West, Lincoln "Sugar" Minott, Magnus Høiberg, Ryan McDermott, Victor Mensah</p>
                <p>Produit par: Kanye West, Cashmere Cat, Sinjin Hawke, MIKE DEAN, Noah Goldstein, Plain Pat, Boi-1da</p>
                <p>Source: Rock the World/IDJ/Kanye LP7, Concord Music Publishing, Sony Music Publishing, Universal Music Publishing, Warner Chappell Music</p>
            </div>`;

        const hide = document.querySelectorAll(".hide");
        const credit = document.querySelector(".credit");

        hide.forEach(element => {
        //cette fonction permet de faire apparaître ou disparaître les credits de chaque musiques en cliquant sur un bouton, et écrit dans le bouton en fonction de son état
        element.hidden = true;
            credit.addEventListener('click', () => {
                if (element.hidden != false) {
                    element.hidden = false;
                    credit.innerHTML= "Réduire les CRÉDITS";
                } else {
                    element.hidden = true;
                    credit.innerHTML= "CRÉDITS des musiques";
                }
            });
        });
        document.querySelector("footer").innerHTML =
        `<div>
            <a href="#up" class="up">revenir en haut de la page</a>
            <input type="button" value="Mentions légales" class="mentionsLegales">
            <div class="hideM">
                <div>
                    <h3>Éditeur du site</h3>
                    <p>Créateur du site : Paul-Emmanuel CESAR</p>
                    <p>Adresse mail du créateur du site: paulemmanuel.cesar@edu.univ-eiffel.fr</p>
                </div>
                <div>
                    <h3>Hébergeur du site</h3>
                    <p>Le site est héberger sur le serveur de l'IUT de Gustave Eiffel</p>
                    <p>Adresse de l'hébergeur: 2 Rue Albert Einstein, 77420 Champs-sur-Marne</p>
                </div>
                <div>
                    <h3>Collecte de vos données</h3>
                    <p>Les données que vous transmettez sur notre site sont stockés sur une base de données pendant 1 ans</p>
                    <p>La personne responsable du traitement de ces données est Monsieur Philippe Gambette et son adresse mail est philippe.gambette@univ-eiffel.fr</p>
                </div>
            </div>
            <br>
            <p class="copyright">© 2025 CESAR, Inc. Tous droits réservés</p>
        </div>`;

        const hideM = document.querySelectorAll(".hideM");
        const mentionsLegales = document.querySelector(".mentionsLegales");

        hideM.forEach(element => {
        //cette fonction permet de faire apparaître ou disparaître les mentions légales
        element.hidden = true;
            mentionsLegales.addEventListener('click', () => {
                if (element.hidden != false) {
                    element.hidden = false;
                    mentionsLegales.innerHTML= "Réduire les mentions légales";
                } else {
                    element.hidden = true;
                    mentionsLegales.innerHTML= "Mentions légales";
                }
            });
        });
        
    }) 
})