const divCursos = document.querySelector(".cursos");

async function consultaCursos() {
    const response = await fetch("http://localhost:3000/cursos");
    const cursos = await response.json();
    preencheTela(cursos);
}

async function consultaCurso(id){
    const response = await fetch("http://localhost:3000/cursos/${id}");
    const curso = await response.json();

    return curso[0];
}

async function removerCurso(id) {
    const response = await fetch('http://localhost:3000/cursos/delete/${id}', {
        method: "DELETE",
    });
    consultaCursos();
}

async function atualizarCurso(id, data) {
    const response = await fetch('http://localhost:3000/cursos/update/${id}', {
        method: "PUT",
        body: JSON.stringify({nome: data.nome, ch: data.ch}),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    consultaCursos();
}


function preencheTela(cursos) {
    cursos.forEach((curso) => {
        const novoCursoHTML = `
        <div class="cursos">
            <button class="btn" onclick="removerCurso(${curso.id})">
                <i class="fa fa-trash"></i>
            </button>
            <button class="btn" onclick="editarCurso(${curso.id})">
                <i class="fa fa-pencil"></i>
            </button>
            <h3>${curso.nome}</h3>
            <p>Carga Horária: ${curso.ch} h</p>
        </div>
    `;
        divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
    });
}

async function editarCurso(id) {
    const curso = await consultaCursos(id);
    const cursoParaEditar = document.querySelector('#curso${id}');

    const novoCursoHTML = `
    <div id="curso${curso.id}.inner" class="cursos">
        <form id="form${curso.id}">
            Nome: <input id="nome" type="text" value="${curso.nome}">
            <br> <br>
            Carga horária: <input id="ch" type="number" value="${curso.ch}">
            <br> <br>
            <button type="button" id="salvar">Salvar</button>
        </form>
      </div>
    `;

    cursoParaEditar.innerHTML = novoCursoHTML;

    const submitForm = document.querySelector('#form${curso.id}');

    submitForm.addEventListener("submit", (event) => {
        event.preventDefault();

        atualizarCurso(curso.id, {
            nome: event.target[0].value,
            ch: event.target[1].value,
        });
    });
}

consultaCursos();