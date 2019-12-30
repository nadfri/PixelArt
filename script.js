window.onload = () => {

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');

    const tailleCanvas = 600; //taille du canvas
    const tailleBlock = 15; //taille des carrés
    const nombreBlock = tailleCanvas / tailleBlock; //nombre de block par ligne
    let decalage = canvas.getBoundingClientRect();

    canvas.width = tailleCanvas;
    canvas.height = tailleCanvas;
    canvas.style.border = "solid 1px gold";


    let couleur = "rgba(255, 145, 167, 0.5)"; // couleur par defaut
    let btCouleur = document.getElementById("btCouleur");
    let idInputCouleur = document.getElementById("inputCouleur");
    const inputImage = document.getElementById("inputImage");

    const divDownload = document.getElementById("divDownload");
    divDownload.style.display = "none"; //cache le bouton download image


    function loadFile() {
        const image = new Image();
        const reader = new FileReader();
        reader.readAsDataURL(inputImage.files[0]);

        reader.onload = () => image.src = reader.result;
        image.onload = () => context.drawImage(image, 0, 0, tailleCanvas, tailleCanvas);

        setTimeout(quadrillage, 100); // obligatoire sinon le quadrillage sera caché par l'image qui charge plus lentement

        divDownload.style.display = "block"; //affiche le bouton dowload image

    }

    //--------------------Quadrillage----------------------------
    function quadrillage() {
        for (let i = 1; i < nombreBlock; i++) {
            context.strokeStyle = "gray"; //couleur du quadrillage
            context.beginPath();
            context.moveTo(0, tailleBlock * i);
            context.lineTo(tailleCanvas, tailleBlock * i);
            context.stroke();

            context.beginPath();
            context.moveTo(tailleBlock * i, 0);
            context.lineTo(tailleBlock * i, tailleCanvas);
            context.stroke();
        }
    }


    //---------------------------Coloration pixel---------------------
    function colorCarre(event) {

        x = Math.trunc((event.clientX - decalage.left) / tailleBlock) * tailleBlock;
        y = Math.trunc((event.clientY - decalage.top) / tailleBlock) * tailleBlock;

        context.fillStyle = couleur; //couleur du carré
        context.fillRect(x, y, tailleBlock, tailleBlock);
    }

    canvas.addEventListener("click", colorCarre);

    //-----------------------Dessiner de maniere continue------------------
    let debutDessin = false;

    canvas.addEventListener("mousedown", function() {
        debutDessin = true;
    });


    canvas.addEventListener("mousemove", function(event) {

        if (debutDessin == true) colorCarre(event);
    });

    canvas.addEventListener("mouseup", function() {
        debutDessin = false;
    });

    //---------------Choix Couleurs-------------------------------

    function changeCouleur() {
        couleur = idInputCouleur.value;
        if (couleur == "")
            couleur = "black";
    }

    btCouleur.addEventListener("click", changeCouleur);

    //---------------------
    let idRose = document.getElementById("rose");
    idRose.addEventListener("click", function() {
        couleur = "rgba(252,189,245,0.3)";
    });
    //-------------------------


    let idRouge = document.getElementById("rouge");
    idRouge.addEventListener("click", function() {
        couleur = "rgba(255,0,0,0.2)";
    });


    let idBleu = document.getElementById("bleu");
    idBleu.addEventListener("click", function() {
        couleur = "rgba(89,152,234,0.5)";
    });


    let idVert = document.getElementById("vert");
    idVert.addEventListener("click", function() {
        couleur = "rgba(0,255,0,0.2)";
    });


    let idMarron = document.getElementById("marron");
    idMarron.addEventListener("click", function() {
        couleur = "rgba(145,52,15,0.4)";
    });


    let idJaune = document.getElementById("jaune");
    idJaune.addEventListener("click", function() {
        couleur = "rgba(255,245,71,0.4)";
    });

    let idGris = document.getElementById("gris");
    idGris.addEventListener("click", function() {
        couleur = "rgba(165,165,165,0.4)";
    });

    let idOrange = document.getElementById("orange");
    idOrange.addEventListener("click", function() {
        couleur = "rgba(255,138,66,0.4)";
    });
    let idEffacer = document.getElementById("effacer");
    idEffacer.addEventListener("click", function() {
        couleur = "rgba(255,255,255,0.1)";
    });


    let idPeau = document.getElementById("peau");
    idPeau.addEventListener("click", function() {
        couleur = "rgba(238,180,156,0.4)";
    });


    let idNoir = document.getElementById("noir");
    idNoir.addEventListener("click", function() {
        couleur = "rgba(0,0,0,0.4)";
    });



    //-------------Position souris en temps reel--------

    canvas.addEventListener("mousemove", function(event) {

        let idgps = document.getElementById("gps");
        idgps.textContent = `Coordonnées Souris => x:${event.clientX-decalage.left} / y:${event.clientY-decalage.top}`;
    });

    //-------Enregistrement Canvas----------
    const btDownload = document.getElementById("download");

    btDownload.addEventListener("click", function() {
        this.href = canvas.toDataURL("image/jpg");
    });


    //---------Lancement de l'app------------
    inputImage.onchange = loadFile;


}