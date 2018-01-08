import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

  lista: any[];
  chave: string = "storages";

  constructor(public storage: Storage ) {
    this.storage.ready().then(() => {
      this.storage.get(this.chave).then((registros) => {
        if (registros) {
          this.lista = registros;
        } else {
          this.lista = [];
        }
      });

    });
  }

  //  Vai retornar a lista
  listar() {
    return this.lista;
  }

  // Adicionar o registro á lista, e persistir ela no BD através do método SET
  adicionar(registro: any) {
    this.storage.ready().then(() => {
      this.lista.push(registro);
      this.storage.set(this.chave, this.lista);
    });
  }

  // 1º vai ser o "Storage" que quer atualizar -- 2º os "Dados" que vai chegar do formulário
  // Atualizar determinados registros
  atualizar(storage,dados){
    for(let chave in this.lista){
      if(this.lista[chave] == storage){
        this.lista[chave] = dados;
        this.storage.set(this.chave, this.lista);
      }
    }
  }
 
  // Deletar Storage
  deletar(storage){
    for(let chave in this.lista){
      if(this.lista[chave] == storage){
        this.lista.splice(parseInt(chave),1);
        this.storage.set(this.chave, this.lista);
      }
    }
  }

}
