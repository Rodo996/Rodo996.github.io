const template = document.createElement("template");
template.innerHTML = `
  <div>
    <h1>Mascota: <span id='nombreMascota'></span></h1>
  </div>
  <input type='text' id='myInput'>
`;

class MascotaElemento extends HTMLElement {

   constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      
      // Leemos el atributo inicial
      this.name = this.getAttribute("nombre") || "";
      console.log("Nombre inicial: ", this.name);
      
      // Clonamos el template
      const templateContent = template.content.cloneNode(true);
      shadow.append(templateContent);

      // Seteamos el nombre inicial en el Shadow DOM, no en el template global
      this.shadowRoot.querySelector("#nombreMascota").textContent = this.name;
     
      // Escuchamos el input
      this.input = shadow.querySelector("#myInput");
      this.input.addEventListener("input", this.handleInput.bind(this));
   }

   handleInput() {
       console.log("Tecleaste...");
       // Esto dispara el attributeChangedCallback
       this.setAttribute("value", this.input.value);
   }

   static get observedAttributes() {
       return ["value"];
   }

   attributeChangedCallback(name, old, nw) {
       console.log(`Cambio ${name} de ${old} a ${nw}`); 
       if (name === "value"){
           // Actualizamos la vista en el DOM de este componente específico
           this.shadowRoot.querySelector("#nombreMascota").textContent = nw; 
       }
   }
}

customElements.define("mascota-elemento", MascotaElemento);