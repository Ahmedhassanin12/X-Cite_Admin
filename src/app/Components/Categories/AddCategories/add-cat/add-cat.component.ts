import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../Models/category';
import { CategoriesService } from '../../../../Services/category.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.scss']
})
export class AddCatComponent implements OnInit {
  userFormGroup : FormGroup;
  Attributes : FormGroup;
  uploadUpdateImg : FormGroup;
  category : Category = {} as Category;
  submitted = false
  categories: Category[]=[] as Category[];
  currentCat?: Category;
  currentCategoryUpdate : Category = {
    id: '',
    name : '',
    img:'',
    discount : 0,
    subcollections:[]
  }  
   // Get ID To Update Item
  gotId: string =''

  // Get Data To Show it in Input
  discount:string = ''
  newName:string = ''
  newnameAR:string = ''
  newDiscount:number = 0
  selectedCatID:number=0;
  constructor(private formBulider : FormBuilder,private catService:CategoriesService, private fs:AngularFirestore, private router :Router) {

  this.userFormGroup = this.formBulider.group({
    name:['',[Validators.required]],
    nameAR:['',[Validators.required]],
    discount:[''],
    img:['',[Validators.required]],
    // imgUrl:[''],
    subcollections:formBulider.array([formBulider.group({
      EN:['',[Validators.required]],
      AR:['',[Validators.required]]
    } 
      ),])
  })
//////////////////////////////////////////////////////////////////////////////////////
  this.Attributes = this.formBulider.group({
    Newid:['',[Validators.required]],
    newCatName:['',[Validators.required]],
    newDocID:['',[Validators.required]],
    attributes:formBulider.array([formBulider.control('')],[Validators.required]),
    attributesAr:formBulider.array([formBulider.control('')],[Validators.required]),
  })
//////////////////////////////////////////////////////////////////////////////////////
  this.uploadUpdateImg = this.formBulider.group({
    updateImg:['',[Validators.required]],
  })
}
get name(){
  return this.userFormGroup.get('name')
}
get nameAR(){
  return this.userFormGroup.get('nameAR')
}
get discont(){
  return this.userFormGroup.get('discount')
}
get img(){
  return this.userFormGroup.get('img')
}
get updateImg(){
  return this.uploadUpdateImg.get('updateImg')
}
get subcollections(){
  return this.userFormGroup.get('subcollections') as FormArray
}

get Newid(){
  return this.Attributes.get('Newid') 
}
get newCatName(){
  return this.Attributes.get('newCatName') 
}
get newDocID(){
  return this.Attributes.get('newDocID') 
}
get attributes(){
  return this.Attributes.get('attributes') as FormArray
}
get attributesAr(){
  return this.Attributes.get('attributesAr') as FormArray
}

addSub(){
  this.subcollections.push(
    this.formBulider.group({
    EN:['',[Validators.required]],
    AR:['',[Validators.required]]}
    ));
}
RemoveSub(){
  this.subcollections.removeAt(1);
}
addAttributes(){
  this.attributes.push(this.formBulider.control(''));
}
RemoveAttributes(){
  this.attributes.removeAt(1);
}
addAttributesAr(){
  this.attributesAr.push(this.formBulider.control(''));
}
RemoveAttributesAr(){
  this.attributesAr.removeAt(1);
}
toOwnProducts(catId:string, subCats:string[])
  {
    console.log(catId, subCats)
    this.router.navigate(['/Products',{state: JSON.stringify(subCats)}])
  }

  sendId(id:any,name:string,nameAR:string, discount:number, subcollections:any){
    this.gotId = id
    this.newName = name
    this.newnameAR = nameAR
    this.newDiscount = discount
    this.userFormGroup.value.subcollections = subcollections
    
    for(let i=0; i<subcollections.length-1;i++){
      this.addSub()
    }
    this.userFormGroup.patchValue({
      subcollections : subcollections
    })
  }

//////////////////////////////////////////////////////////////////////////////////////
deleteTutorial(id:any): void {
    if (id) {
      this.catService.delete(id)
        .then(() => {
        })
        .catch(err => console.log(err));
    }
  }
//////////////////////////////////////////////////////////////////////////////////////
  retrieveCats():void{
    this.catService.getAllCat().snapshotChanges().pipe(
      map(changes =>{
        console.log(changes)
        return changes.map(c =>({
            ...c.payload.doc.data(),
            id : c.payload.doc.id,
            name: c.payload.doc.id,
      })
        )}
      )
    )
    .subscribe(data => {
      this.categories = data as Category[]
      console.log(this.categories[0].subcollections)
    })
  }
/////////////////////////////////////////////////////////////////////////////////

  saveCat(){
    return this.catService.addToCategory(
      'Categories', 
        this.userFormGroup.value.name, 
        {
          name:this.userFormGroup.value.name,
          nameAR:this.userFormGroup.value.nameAR,
          discount:this.userFormGroup.value.discount,
          subcollections:this.userFormGroup.value.subcollections,
          img:((document.getElementById('addImg') as HTMLInputElement)?.files as FileList)[0]
        }
    )
    .then(()=>{
        this.submitted = true
        this.userFormGroup.reset(); 
        this.router.navigate(['Categories'])
      })    
  }
  addCollectionInDoc(){
    return this.catService.addCollectionInDoc(
      'Categories',
      this.Attributes.value.Newid,
      this.Attributes.value.newCatName,
      this.Attributes.value.newDocID,
      {attributes:this.Attributes.value.attributes,attributesAr:this.Attributes.value.attributesAr}
      )
      .then(()=>{
        this.Attributes.reset(); 
      })
  }

  newCat(){
    this.submitted = false
    // this.category = new Category()
    this.category = {} as Category;
  }
/////////////////////////////////////////////////////////////////////////////////



ngOnInit(): void {
  this.retrieveCats()
}  
}
