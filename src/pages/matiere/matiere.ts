import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatiereService } from './../../services/matiere.service';


import { LoadingController } from 'ionic-angular';
import { AnimationService, AnimationBuilder } from 'css-animator';

import { AlertController } from 'ionic-angular';
import {Matiere} from "../../entity/Matiere";


@Component({
  selector: 'page-matiere',
  templateUrl: 'matiere.html'
})
export class MatierePage {

      @ViewChild('myElementitem') myitem;

      private animator: AnimationBuilder;
      matieres;
      dorefresh:any;
  searchQuery: string = '';


      constructor (public atrCtrl: AlertController,public navCtrl: NavController, public matiereService: MatiereService,public loadingCtrl: LoadingController, animationService: AnimationService) {
        this.animator = animationService.builder();
       }

      ionViewDidEnter() {
        let loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 1000
        });
        loader.present();
        this.getallmatiere();
      }

  doRefresh(refresher) {
        this.dorefresh=refresher;
        setTimeout(() => {
          this.matiereService.getMatieres().then(data=>{
            this.matieres = data;
          });
          refresher.complete();
        }, 1000);
  }

  doRefreshlist() {
    setTimeout(() => {
      this.matiereService.getMatieres().then(data=>{
        this.matieres = data;
      });
      this.dorefresh.complete();
    }, 1000);
  }


     /******  get All Matiere *******/
      getallmatiere()
      {
            this.matieres=[];
            this.matiereService.getMatieres().then(data=>{
              this.matieres= data;
            });
      }

      animateElem() {
        this.animator.setType('bounceInLeft').show(this.myitem.nativeElement);
      }


      /******  Delete Matiere *******/
      DeleteMatiere(idmat)
      {
          for(let i = 0; i < this.matieres.length; i++)
          if(this.matieres[i].id == idmat){  this.matieres.splice(i, 1);  }

          this.matiereService.removeMatiere(idmat).then(data=>{
            this.matieres=[];
            this.getallmatiere();
          });
      }

      /******  Edit Matiere *******/
      EditMatiere(mat) {
        let alert = this.atrCtrl.create({
          title: 'Add Matiere',
          inputs: [
            {
              name: 'id',
              placeholder: 'id',
              type: 'hidden',
              value:mat.id
            },  {
              name: 'abv',
              placeholder: 'Abréviation',
              type: 'text',
              value:mat.abv
            },
            {
              name: 'nom_salle',
              placeholder: 'name salle',
              type: 'text',
              value:mat.nom_salle
            },
            {
              name: 'nom_matiere',
              placeholder: 'Name Matiere',
              type: 'text',
              value:mat.nom_matiere
            }
          ],
          // subTitle: 'You do not have enough amount in your wallet, Please add more Money!',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Editer',
              handler: data => {
                if (  data.id!=null && data.abv!=null && data.nom_salle!=null && data.nom_matiere!=null ) {


                  let matiere=new Matiere();
                  console.log("data"+data);

                  matiere.id=data.id;
                  matiere.abv=data.abv;
                  matiere.nom_salle= data.nom_salle;
                  matiere.nom_matiere=data.nom_matiere;
                  console.log(matiere);


                  this.matiereService.editMatieres(matiere).then(data=>{

                    console.log(this.matieres);
                  });

                  this.doRefresh(this.dorefresh);
                  // this.matieres.push(matiere);

                } else {
                  // invalid login
                  return false;
                }
              }
            }
          ]
        });
        alert.present();
      }



  /******  ADD Matiere *******/
    AddMatiere() {
        let alert = this.atrCtrl.create({
          title: 'Add Matiere',
          inputs: [
            {
              name: 'abv',
              placeholder: 'Abréviation',
              type: 'text'
            },
            {
              name: 'nom_salle',
              placeholder: 'name salle',
              type: 'text'
            },
            {
              name: 'nom_matiere',
              placeholder: 'Name Matiere',
              type: 'text'
            }
          ],
          // subTitle: 'You do not have enough amount in your wallet, Please add more Money!',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Add',
              handler: data => {
                if (  data.abv!=null && data.nom_salle!=null && data.nom_matiere!=null ) {


                  let matiere=new Matiere();
                  matiere.abv=data.abv;
                  matiere.nom_salle= data.nom_salle;
                  matiere.nom_matiere=data.nom_matiere;
                 // console.log(matiere);

                  this.matiereService.setMatieres(matiere).then(data=>{

                    console.log(this.matieres);
                  });

                  this.doRefresh(this.dorefresh);

                } else {
                  // invalid login
                  return false;
                }
              }
            }
          ]
        });
        alert.present();

      }



  searchmatiere(ev: any) {
    // Reset items back to all of the items
    this.getallmatiere();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {


      this.matiereService.getMatieres().then(data=>{
        this.matieres = data;
        this.matieres =this.matieres.filter((data) => {
          return (data.nom_matiere.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      });

      // alert(this.matieres.length);
      // for(let i = 0; i < this.matieres.length; i++) {
      //   alert(this.matieres[i].nom_matiere);
        // if(this.matieres[i].nom_matiere.toLowerCase().indexOf(val.toLowerCase()) > -1){
        //   this.matieres.splice(i, 1);
        //   alert(this.matieres[i].nom_matiere);
        //   this.matieres=[];
        // }
      // }


    }
  }

}
