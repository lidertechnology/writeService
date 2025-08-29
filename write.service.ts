import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { firestore } from '../firebase-config';
import { addDoc, collection, CollectionReference, doc, DocumentData, updateDoc, deleteDoc } from 'firebase/firestore';
import { StatesService } from '../../states/states.service';
import { StatesEnum } from '../../states/states.enum';

@Injectable({
  providedIn: 'root'
})
export class WriteService<T extends DocumentData> {

  private statesService = inject(StatesService);
  
  public states = this.statesService.states;
  public statesEnum = StatesEnum;

  constructor() { }

  public async crearDocumento(collectionName: string, data: T): Promise<string> {
    try {
      this.statesService.setLoading();
      const colRef = collection(firestore, collectionName) as CollectionReference<T>;
      const docRef = await addDoc(colRef, data);
      this.statesService.setSuccess();
      return docRef.id;
    } catch (error: any) {
      this.statesService.setError(error.message);
      throw new Error(`Error al crear el documento: ${error.message}`);
    }
  }

  public async actualizarDocumento(collectionName: string, docId: string, data: Partial<T>): Promise<void> {
    try {
      this.statesService.setLoading();
      const docRef = doc(firestore, collectionName, docId);
      await updateDoc(docRef, data);
      this.statesService.setSuccess();
    } catch (error: any) {
      this.statesService.setError(error.message);
      throw new Error(`Error al actualizar el documento: ${error.message}`);
    }
  }

  public async borrarDocumento(collectionName: string, docId: string): Promise<void> {
    try {
      this.statesService.setLoading();
      const docRef = doc(firestore, collectionName, docId);
      await deleteDoc(docRef);
      this.statesService.setSuccess();
    } catch (error: any) {
      this.statesService.setError(error.message);
      throw new Error(`Error al borrar el documento: ${error.message}`);
    }
  }
}
