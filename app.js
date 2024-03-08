const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
const options = {
    method: 'GET',
        headers: {
        'X-RapidAPI-Key': '518c270132msh356e49a7b5905ecp100570jsn56e62f9565ca',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
};
fetch(url, options)

  .then(response => {
    // Verifica si la respuesta tiene un estado exitoso (200 OK)
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    // Convierte la respuesta a formato JSON y la retorna
    return response.json();
  })
  .then(data => {
    cargarIdiomas(data.data.languages);
  })
  .catch(error => {
    // Captura y maneja errores
    console.error('Error en la solicitud:', error);
  });

function cargarIdiomas(idiomas) {
    let idiomasOrigen = document.querySelector('#languageFrom');
    let idiomasDestino = document.querySelector('#languageTo');

    //idiomas de origen
    idiomas.forEach(idiomas => {
        let option = document.createElement('option');
        option.value = idiomas.code;
        option.textContent = idiomas.name;

        idiomasOrigen.appendChild(option);
    });

    //idiomas de destino
    idiomas.forEach(idiomas => {
        let option = document.createElement('option');
        option.value = idiomas.code;
        option.textContent = idiomas.name;

        idiomasDestino.appendChild(option);
    });
}

function traducirTexto() {
    let idiomaOrigen = document.querySelector('#languageFrom').value;
    let idiomaDestino = document.querySelector('#languageTo').value;
    let textoOriginal = document.querySelector('#originalText').value;
    let textoTraducido;
    let areaTraducido = document.querySelector('#traducedText');
    let estadoTraduciendo = document.querySelector('#mensajeEstado'); 

        
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '518c270132msh356e49a7b5905ecp100570jsn56e62f9565ca',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: new URLSearchParams({
		source_language: idiomaOrigen,
		target_language: idiomaDestino,
		text: textoOriginal
	})
  };

  fetch(url, options)
  .then(response => 
    response.json(),
    estadoTraduciendo.style.display = 'block',
    estadoTraduciendo.innerHTML = `<p>Traduciendo texto...</p>`

  )
  .then(response => {
    textoTraducido = response.data.translatedText;
    areaTraducido.innerHTML = textoTraducido;
    estadoTraduciendo.innerHTML = `<p>Texto traducido ✅</p>`
    setTimeout(() => {
        estadoTraduciendo.style.display = 'none';
    }, 2000)
    
  })
  .catch(err => {
    estadoTraduciendo.innerHTML = `<p>Error ❌ Seleccione ambos idiomas. </p>`
  });
};


