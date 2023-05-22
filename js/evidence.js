class Evidence {

    constructor() {
        const zaznamyZeStorage = localStorage.getItem("zaznamy"); // posilame data do storage
        this.zaznamy = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : []; //ternalni operator bud jsou zde zaznamy, nebo prazdne pole
        this.jmenoInput = document.getElementById("jmeno");
        this.prijmeniInput = document.getElementById("prijmeni");
        this.telefonInput = document.getElementById("telefon");
        this.vekInput = document.getElementById("vek");
        this.vlozButton = document.getElementById("vlozit");
        this.vypisUzivatele = document.getElementById("seznam-uzivatelu");

        this._pridej();
    }


    _pridej() {
        this.vlozButton.onclick = () => {
            if (this.prijmeniInput.value == "" || this.jmenoInput.value == "") { //ověřuje zde je nějaký string v hodnotě
                alert("Musíte vyplnit jmeno a prijmeni");
            } else if (this.telefonInput.value.length == 0 || this.vekInput.value.length == 0) { //ověřuje zda je zde číslo, ale nula vyplnit půjde
                alert("Musíte vyplnit vek a telefon a to v ciselnem formatu");
            } else {
                const zaznam = new Zaznam(this.jmenoInput.value, this.prijmeniInput.value, this.telefonInput.value, this.vekInput.value); //nová iinstatnce záznmu (vytvření)
                this.zaznamy.push(zaznam);
                this.ulozZaznam();
                this.vypisZaznamy();
            }
        };
    }


    vypisZaznamy() { //metoda na vypsání záznamu, plus vytovření tlačítka
        this.vypisUzivatele.innerHTML = "";
        for (const zaznam of this.zaznamy) { //projede zaznamy 
            const seznam = document.createElement("tr"); //vytvoření  íTR pro tabulku

            seznam.insertAdjacentHTML("beforeend", `<td>${zaznam.jmeno} ${zaznam.prijmeni}</td><td>${zaznam.telefon}</td><td>${zaznam.vek}</td>`);
            const smazBtnTd = document.createElement("td"); //vytvoření TD pro button
            seznam.appendChild(smazBtnTd);

            const smazBtn = document.createElement("button"); //vytvoření buttonu pro smazání
            smazBtn.onclick = () => {
                if (confirm("Opravdu si přejete tento záznam odstranit?")) {
                    this.zaznamy = this.zaznamy.filter(z => z !== zaznam); // Ponechá vše na co neukazuje tlačítko
                    this.ulozZaznam();
                    this.vypisZaznamy();
                }
            }
            smazBtn.innerText = "Smazat záznam";
            smazBtn.className = "btn btn-light";
            smazBtnTd.appendChild(smazBtn); //přidá do DOMu tlačítko

            seznam.insertAdjacentHTML("beforeend", "</tr>"); //uzavření TR tabulky
            this.vypisUzivatele.appendChild(seznam); //přidá vše ostatní
        }
    }

    ulozZaznam() { //metoda na uložení

        localStorage.setItem("zaznamy", JSON.stringify(this.zaznamy)); //parsování 
    }




}