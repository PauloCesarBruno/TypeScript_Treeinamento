export enum accessOptions {
    administrator = 'Administrador',
    manager = 'Gerente',
    employee = 'Funcionario',
    undefined = 'Não definido'
  } 
  
  interface IPerson { 
   fullName:  string;
   address?: string[];
  }

  export interface IUser extends IPerson { // Extenção da Interface
   register?: string | number;
   access?: accessOptions;
   active?: boolean;
  }

  