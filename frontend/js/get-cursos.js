const divCursos = document.querySelector("#cursos");

async function consultaCursos() {
    const response = await fetch("localhost:3000/cursos/");
    const jsonData = await response.json();
    console.log(jsonData);
}

consultaCursos();