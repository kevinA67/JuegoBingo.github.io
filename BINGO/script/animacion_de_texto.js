function mostrarLetras() {
    var textos = document.querySelectorAll('.texto');
  
    textos.forEach((texto) => {
      texto.style.opacity = '0'; // Oculta el texto inicialmente
    });
  
    function mostrarTexto(index) {
      if (index < textos.length) {
        var texto = textos[index];
        var contenido = texto.textContent.trim();
        texto.textContent = '';
        var i = 0;
  
        function mostrar() {
          if (i < contenido.length) {
            texto.textContent += contenido.charAt(i);
            i++;
            setTimeout(mostrar, 50); // Velocidad de aparición (en milisegundos)
          } else {
            mostrarTexto(index + 1); // Llamar a la siguiente iteración cuando termine este párrafo
          }
        }
  
        texto.style.opacity = '1'; // Mostrar el texto letra por letra
        mostrar();
      }
    }
  
    mostrarTexto(0); // Comenzar con el primer párrafo
  }
  
  window.onload = mostrarLetras;
  