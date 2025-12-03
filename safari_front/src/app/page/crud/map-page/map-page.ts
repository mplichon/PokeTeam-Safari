import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MapDto } from '../../../dto/map-dto';
import { Observable } from 'rxjs';
import { MapService } from '../../../service/map-service';
import { NavbarCrud } from '../../../component/navbar-crud/navbar-crud';

@Component({
  selector: 'app-map-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarCrud
  ],
  templateUrl: './map-page.html',
  styleUrl: './map-page.css',
})
export class MapPage implements OnInit {
  protected map: MapDto = new MapDto(0, "", "");
  protected maps$!: Observable<MapDto[]>;
  protected mapForm!: FormGroup;
  protected nomCtrl!: FormControl;
  protected lienImageCtrl!: FormControl;
  protected editingMap!: MapDto | null;

  constructor(private mapService: MapService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.maps$ = this.mapService.findAll();

    this.nomCtrl = new FormControl('', Validators.required);
    this.lienImageCtrl = new FormControl('', Validators.required);

    this.mapForm = this.formBuilder.group({
      nom: this.nomCtrl,
      lienImage: this.lienImageCtrl
    });
  }

  public ajouterModifierMap() {

    if (this.editingMap) {
      this.mapService.save(new MapDto(
        this.editingMap.id, 
        this.nomCtrl.value, 
        this.lienImageCtrl.value
      ));
    }

    else {
      this.mapService.save(new MapDto(
        0, 
        this.nomCtrl.value, 
        this.lienImageCtrl.value
      ));
    }

    this.editingMap = null;
    this.nomCtrl.reset();
    this.lienImageCtrl.reset();
  }

  public editMap(map: MapDto): void {
    // Clone du Map pour l'édition
    this.editingMap = map;
    this.nomCtrl.setValue(map.nom);
    this.lienImageCtrl.setValue(map.lienImage);
  }

  public deleteMap(map: MapDto): void {
    this.mapService.deleteById(map.id);
  }

  public trackMap(index: number, value: MapDto) {
    return value.id;
  }
}
