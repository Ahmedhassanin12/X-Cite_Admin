import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Order } from '../Models/order';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  sellers: Order[] = [];
  constructor(
    
   private curd: CRUDService
  ) {}
  getAllOrders(): Observable<DocumentChangeAction<Order>[]> {
    return this.curd.getAll('Orders');
  }
}
