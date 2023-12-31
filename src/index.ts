import { accessOptions, userType } from "./Models";

let content  = document.getElementById('content') as HTMLInputElement;
const button = <HTMLInputElement> document.querySelector('button[id="add"')
const accessRadio = <HTMLElement> document.getElementById('accessRadio');
button.addEventListener('click',addEmployee)

const accessOptionsValues = Object.values(accessOptions)

// Chamar Usuários.
const getUser = async(): Promise <userType[]> => {
  // Função que seta o servidor criado para meu "mock"
  const response: Response = await fetch('http://localhost:5011/users');
  const users: userType[] = await response.json();
  return users;
}

// Montar o Layout.
const updateUserLayout = async (): Promise <void> => {
  const users: userType[] = await getUser();

  users.map((user: userType)=>{
    content.innerHTML += <string>(createLine(user)
      );
  });
};

updateUserLayout();

/* Abaixo exemplos de como posso variar um assertion em Type Script, dou 3 Exemplos:
ou seja um Union atravéz de um pipe-line, um TypeCast e um álias.*/ 
function addEmployee(): void {
 // Abaixo Exemplo de um "Union - usando um pipe-line"
 // let fullName: HTMLInputElement | null = document.querySelector('#fullName') 
 // Abaixo Exemplo de Assertion ,exemplo 01, tipo um TypeCast:
 // let register = <HTMLInputElement> document.querySelector('#register')
 // Abaixo Exemplo de Assertion 02 - usando (HTMLInputElement) como um álias para as variaveis
 // let admin = document.querySelector('input[name="access"]:checked') as HTMLInputElement ;
 // let active = document.querySelector('#active') as HTMLInputElement;
 // let addressHome = document.querySelector('#addressHome') as HTMLInputElement;
 // let addressWork = document.querySelector('#addressWork') as HTMLInputElement;
 // let user: userType;

 // PORÉM ESTPU USNDO TRABALHANDO "Destruturação":
 let formFields = [
  <HTMLInputElement>document.querySelector('#fullName'),
  <HTMLInputElement>document.querySelector('#register'),
  document.querySelector('input[name="access"]:checked') as HTMLInputElement,
  document.querySelector('#active') as HTMLInputElement,
  document.querySelector('#addressHome') as HTMLInputElement,
  document.querySelector('#addressWork') as HTMLInputElement
 ]

  const [fullName, register, admin, active, addressHome, addressWork] = formFields

  let user: userType =  {
    fullName: fullName!.value,
    register: register.value != '' ? register.value : undefined,
    active: active.checked,
    access: <accessOptions>admin.value
  }

  content.innerHTML += <string>createLine(
    user,
    addressHome.value,
    addressWork.value
  );  
  }

  accessOptionsValues.forEach((value: string, i: number) => {
  accessRadio.innerHTML += `
  <div class="form-check">
  <input class="form-check-input" type="radio" name="access" id="accessRadio${i}" value="${value}">
  <label class="form-check-label capitallLetter" for="no">
  ${value}
  </label>
</div> 
`;
});

(<HTMLInputElement>document.getElementById('accessRadio0')).checked = true;

function createLine({
  fullName,
  register = Math.random().toString(36).substring(7).toUpperCase(),
  active = false,
  access = accessOptions.undefined
}: userType, 
  ...address: string []): string {
  return `
  <div class="card mb-1">
    <div class="card-header">
      ${register}
    </div>
    <div class="card-body">
      <h5 class="card-title">${fullName}</h5>
      <a href="#" class="btn btn-primary">${active ? 'Ativo' : 'Inativo'}</a>
    </div>
    ${
      address.length > 0 ?
      `<div class="card-body">
      <h6 class="card-title">${address.join('<br/>')}</h6>     
    </div>` : ''    
    }
    
    <div class="card-footer bg-transparent border-success">
    Acesso: ${access}
    </div>
  </div>`;
}
