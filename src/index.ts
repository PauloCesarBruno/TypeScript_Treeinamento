const button = <HTMLInputElement> document.querySelector('button[id="add"')
const accessRadio = <HTMLElement> document.getElementById('accessRadio');
button.addEventListener('click',addEmployee)

enum accessOptions {
  administrator = "administrador",
  manager = "gerente",
  employee = "funcionario"
}

const accessOptionsValues = Object.values(accessOptions)

accessOptionsValues.forEach((value: string, i: number) => {
  accessRadio.innerHTML += `
  <div class="form-check">
  <input class="form-check-input" type="radio" name="access" id="accessRadio${i}" value="${value}">
  <label class="form-check-label capitallLetter" for="no">
  ${value}
  </label>
</div> 
`
})

/* Abaixo exemplos de como posso variar um assertion em Type Script, dou 3 Exemplos:
ou seja um Union atracéz de um pipe-line, um TypeCast e um álias.*/ 
function addEmployee(): void {
  let content  = document.getElementById('content') as HTMLInputElement;
  
  // Abaixo Exemplo de um "Union - usando um pipe-line"
  let fullName: HTMLInputElement | null = document.querySelector('#fullName') 
  // Abaixo Exemplo de Assertion ,exemplo 01, tipo um TypeCast:
  let register = <HTMLInputElement> document.querySelector('#register')
   // Abaixo Exemplo de Assertion 02 - usando (HTMLInputElement) como um álias para as variaveis
  let admin = document.querySelector('input[name="access"]:checked') as HTMLInputElement ;
  let active = document.querySelector('#active') as HTMLInputElement;

  content.innerHTML += <string>(

  createLine(fullName!.value, register.value, admin.value, active.checked)
  );
}

function createLine(
  fullName: string,
  nrRegister: number | string, // outro Ex. de Union..
  admin: string,
  active: boolean
): string {
    return `
  <div class="card mb-1">
    <div class="card-header">
      ${nrRegister}
    </div>
    <div class="card-body">
      <h5 class="card-title">${fullName}</h5>
      <a href="#" class="btn btn-primary">${active ? 'Ativo' : 'Inativo'}</a>
    </div>
    <div class="card-footer bg-transparent border-success">
    Acesso: ${admin}
    </div>
  </div>
    `;
}
