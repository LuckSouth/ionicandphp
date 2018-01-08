import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage/storage';

interface IStorage{
  despesa:string;
  valor:string;
}

@IonicPage()
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {

  // Storage
  storage:IStorage = {despesa:'',valor:''};
  storages:IStorage[];
  editando: boolean = false;
  storageEditando: IStorage;
  // Storage

  public form: FormGroup;
  public technologyName: any;
  public technologyDescription: any;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  public recordID: any = null;
  private baseURI: string = "http://earhbstfdjygt.tk/";

  // Initialise module classes
  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController,
    public storageProvider: StorageProvider) {

    // Create form builder validation rules
    this.form = fb.group({
      "name": ["", Validators.required],
      "description": ["", Validators.required]
    });
  }

  // Inicio do Storage
  ionViewDidEnter() {
    this.storages = this.storageProvider.listar();
  }

  adicionar(){
    if(this.storage.despesa != "" && this.storage.valor != ""){
    this.storageProvider.adicionar(this.storage);  
    this.storage = {despesa:'',valor:''}    
    }

  }

  
  editar(storage: IStorage){
    this.storage = {despesa:storage.despesa,valor:storage.valor};
    this.editando = true;
    this.storageEditando = storage;
  }

  
  cancelarEditar(){
    this.storage = {despesa:'',valor:''};
    this.editando = false;
  }

  
  atualizar(){
    if(this.storage.despesa != "" && this.storage.valor != ""){
      this.storageProvider.atualizar(this.storageEditando,this.storage);  
      this.cancelarEditar();
    }  
  }

  
  deletar(storage: IStorage){
    this.storageProvider.deletar(storage);
  }
  // Fim do Storage


  createEntry(name: string, description: string): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "create", "name": name, "description": description },
      url: any = this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user
        this.hideForm = true;
      },
      (error: any) => {
        console.log("erro no createEntry")
      });
  }

  saveEntry(): void {
    let name: string = this.form.controls["name"].value,
      description: string = this.form.controls["description"].value;

    if (this.isEdited) {
      // this.updateEntry(name, description);
    }
    else {
      this.createEntry(name, description);
    }
  }

}
