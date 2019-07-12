import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MtnCountry, MtnCountryResponse} from '../../_model/Master/mtn-country';
import {MtnCountryService} from '../../_services/master/mtn-country.service';
import { ToastrService } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import {NgbModal, ModalDismissReasons, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  private gridAPI;
  private  gridColumnAPI: any;
  private sortingOrder;
  private columnDefs;
  closeResult: string;
  form: FormGroup;
  loading: boolean;
  modalReference: NgbModalRef;

  mtnCountryResponse: MtnCountryResponse;
  newCountry = new MtnCountryResponse();
    constructor(private _mtnCountryService: MtnCountryService, private countryformBuiler: FormBuilder, private toastr: ToastrService,
      private modalService: NgbModal) {
    this.columnDefs = [
      {headerName: 'Country Id', field: 'countryId' },
      {headerName: 'Country Name', field: 'countryName' }
      ];
    }
  ngOnInit() {
    this.form =  this.countryformBuiler.group({
      countryId: [''],
      countryName: ['',  [Validators.required, Validators.minLength(2)]],
    });

    if (this.mtnCountryResponse == null) {
    console.log('Inside11');
    this.getAllCountries();
  }
  }

  openModal(content) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : true
};
console.log(ngbModalOptions);
console.log('content1');
console.log(content);
console.log('content2');
    this.modalReference = this.modalService.open(content, ngbModalOptions);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  CloseModal() {
    this.modalReference.close();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onGridReady(params) {
        this.gridAPI = params.api;
        this.gridColumnAPI = params.columnapi;
        params.api.setRowData(this.mtnCountryResponse.countryList);
  }

clearForm() {
  this.form.reset();
}

  onSubmit(): void {
    this.loading = true;
    console.log('Authenticating User1');
    this._mtnCountryService.createCountry(this.getCountryModel()).subscribe(
      (data: MtnCountryResponse) => {
        this.loading = false;
        this.newCountry = data;
        console.log( this.mtnCountryResponse.countryList);
        if (this.newCountry.status === true && this.newCountry.countryList != null) {
          this.toastr.success('Record added successfully1!', 'Country Master');
          this.mtnCountryResponse.countryList.push(data.countryList[0]);
          this.gridAPI.setRowData([]);
          this.gridAPI.setRowData(this.mtnCountryResponse.countryList);
          this.CloseModal();
          this.clearForm();
      } else {
        this.toastr.error(data.message, 'Country Master');
      }
    }
    );
   // this.mtnCountryResponse.countryList.push(this.newCountry.countryList[0]);
  }
  displayFieldCss(field: string) {
    // console.log('displayFieldCss');
    // console.log(this.isFieldValid(field));
    // console.log(field);
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
      'form-group is-invalid': this.isFieldValid(field)
    };
}

isFieldValid(field: string) {
  // console.log('isFieldValid');
  // console.log ('Erorrs' + this.form.get(field).errors);
  // console.log ('valid' + this.form.get(field).valid);
  // console.log ('touched' + this.form.get(field).touched);
  // console.log ('dirty' + this.form.get(field).dirty);
  // console.log(this.form.errors && this.form.get(field).valid && this.form.get(field).touched);
  // return !((!this.form.errors) && (this.form.get(field).valid && this.form.get(field).dirty));
    return (this.form.get(field).errors && (this.form.get(field).touched || this.form.get(field).dirty));
}

  getCountryModel(): MtnCountry {

    console.log(this.form.get('countryName').value);
    const countryModel: MtnCountry = {
      countryName: this.form.get('countryName').value,
      countryId: ''
    };
    return countryModel;
  }

  getAllCountries(): void {
    this.loading = true;
    console.log('Getting All Countires');
    this._mtnCountryService.getAllCountries().subscribe(
      (data: MtnCountryResponse) => {
        console.log(data);
        this.loading = false;
        this.mtnCountryResponse = data;
        if (this.mtnCountryResponse.status === true && this.mtnCountryResponse.countryList != null) {
          this.toastr.success('Total ' + this.mtnCountryResponse.countryList.length + ' records.', 'Country Master');
          this.gridAPI.setRowData(this.mtnCountryResponse.countryList);
      }
    }
    );
  }

}


