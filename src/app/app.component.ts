import { NgModule } from '@angular/core';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PostData } from './shared/classes/post-data';
import { ApiCallComponent } from './services/api-call/api-call';
import { NotificationService } from './services/notification.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  postData: PostData[] = [];
  noFilterPostData: PostData[] = [];
  postForm: FormGroup;
  filterForm: FormGroup;
  successMessage$ = this.notificationService.successMessageAction$.pipe(tap(message =>{
    setTimeout(()=>{
      this.notificationService.clearSuccessMessage();
    }, 3000)
    })
  );
  alertMessage$ = this.notificationService.alertMessageAction$.pipe(tap(message =>{
    setTimeout(()=>{
      this.notificationService.clearAlertMessage();
    }, 3000)
    })
  );

  constructor(
    private ApiCallComponent: ApiCallComponent, 
    private notificationService: NotificationService 
    ) {
    this.postForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
    });

    this.filterForm = new FormGroup({
      filterName: new FormControl()
    });
  }
  
  ngOninit(){
  }
  madePost() {
    let data = this.ApiCallComponent.postApi();
    this.postData.push(this.postForm.value)
    this.postForm.reset()
    this.notificationService.setSuccessMessage("Post añadido excitosamente!")
  }

  filter(){
    const keyWord = this.filterForm.value.filterName;
    this.noFilterPostData = this.postData;
    if (keyWord != '') {
      const result = this.postData.filter((filter)=>{
            return filter.name === keyWord
      });
      if (result.length > 0){
        this.postData = result;
      }else {
        this.notificationService.setAlertMessage("No se ha encontrado el nombre ingresado!")
      }
    }else {
      this.notificationService.setAlertMessage("por favor agrege el nombre a buscar!")
    }
  }

  clear() {
    if(this.noFilterPostData.length > 0){
      this.postData = this.noFilterPostData;
    }
  }
}
