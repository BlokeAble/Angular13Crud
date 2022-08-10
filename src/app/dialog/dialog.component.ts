import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {

  personForm !: FormGroup;
  actionBtn: string = "Save"
  constructor
  (
    private formBuilder: FormBuilder,
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      personName: ['',Validators.required],
      age: ['', Validators.required],
      birthday: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      bankAccount: ['', Validators.required]
    })

    if(this.editData)
    {
      this.actionBtn = "Update";
      this.personForm.controls['personName'].setValue(this.editData.personName);
      this.personForm.controls['age'].setValue(this.editData.age);
      this.personForm.controls['birthday'].setValue(this.editData.birthday);
      this.personForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.personForm.controls['bankAccount'].setValue(this.editData.bankAccount);
    }
  }

  addProduct(){
    if(!this.editData)
    {
      if(this.personForm.valid)
      this.api.postPerson(this.personForm.value)
      .subscribe({
        next: (res) => {
          alert("Person Added successfully")
          this.personForm.reset();
          this.dialogRef.close('Saved');
        },
        error:()=>{
          alert("Error while adding person")
        }
      })
    }
    else
    {
      this.updatePerson()
    }
  }

  updatePerson()
  {
    this.api.putPerson(this.editData.id, this.personForm.value,)
    .subscribe({
      next: (res) => {
        alert("Person Updated successfully")
        this.personForm.reset();
        this.dialogRef.close('Updated');
        
      },
      error:()=>{
        alert("Error while updating person")
      }
    })
    
  }

}
