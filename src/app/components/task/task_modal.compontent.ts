import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BgrpTaskService } from 'src/app/services/task.service';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { FormControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
// import { NzModalSubject } from 'ng-zorro-antd';

@Component({
  selector: 'rp-task-modal',
  template: `
  <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
    <nz-form-item>
      <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="STASKCODE">任务编码</nz-form-label>
      <nz-form-control [nzSm]="14" [nzXs]="24">
        <input nz-input formControlName="STASKCODE" placeholder="请输入任务编码" id="STASKCODE"
          (blur)="onBlurTaskCode()"/>
        <nz-form-explain *ngIf="validateForm.get('STASKCODE').dirty && validateForm.get('STASKCODE').
          errors.required">任务编码不能为空!</nz-form-explain>
        <nz-form-explain *ngIf="validateForm.get('STASKCODE').dirty && validateForm.get('STASKCODE').
        repeat">任务编码已存在!</nz-form-explain>
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSm]="6" [nzXs]="24"  nzRequired nzFor="STASKNAME">任务名称</nz-form-label>
      <nz-form-control [nzSm]="14" [nzXs]="24">
        <input nz-input formControlName="STASKNAME" placeholder="请输入任务名称" id="STASKNAME"/>
        <nz-form-explain *ngIf="validateForm.get('STASKNAME').dirty && validateForm.get('STASKNAME').errors">任务名称不能为空!</nz-form-explain>
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSm]="6" [nzXs]="24"  nzFor="NORDER">排序码</nz-form-label>
      <nz-form-control [nzSm]="14" [nzXs]="24">
        <input nz-input formControlName="NORDER" placeholder="请输入排序号" id="NORDER"/>
        <nz-form-explain *ngIf="validateForm.get('NORDER').dirty && validateForm.get('NORDER').errors">只能输入数字!</nz-form-explain>
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSm]="6" [nzXs]="24"  nzFor="SDES">说明</nz-form-label>
      <nz-form-control [nzSm]="14" [nzXs]="24">
        <textarea row="4" nz-input formControlName="SDES" placeholder="请输入" id="SDES"></textarea>
      </nz-form-control>
    </nz-form-item>
    <div class="ant-modal-footer steps-action">
      <button nz-button nzType="default" (click)="cancelClick()">
        <span>取消</span>
      </button>
      <button nz-button nzType="primary" (click)="okClick()">
        <span>确定</span>
      </button>
    </div>
  </form>
  `,
  styles: [`
  `]
})
export class TaskModalComponent implements OnInit {
    STASKCODE: String ;
    STASKNAME: String;
    NORDER: any;
    SDES: String;
    ID: String;
    validateForm: FormGroup;


    @Input()
    set param(value: any) {
        this.STASKCODE = value.STASKCODE;
        this.STASKNAME = value.STASKNAME;
        this.NORDER = value.NORDER;
        this.SDES = value.SDES;
        this.ID = value.ID;
    }

    constructor(
      private fb: FormBuilder,
      private mainService: BgrpTaskService,
      private modal: NzModalRef,
      private message: NzMessageService ) {
    }

    ngOnInit(): void {
      const this_ = this;
      this.validateForm = this.fb.group({
        STASKCODE: [ {value: this_.STASKCODE, disabled:  this_.STASKCODE === undefined ? false : true}, [ Validators.required ] ],
        STASKNAME: [ this_.STASKNAME, [ Validators.required ] ],
        NORDER: [ this_.NORDER, [ Validators.pattern(/^[0-9]*$/) ] ],
        SDES: [ this_.SDES, [ Validators.nullValidator ] ],
      });
    }

    // numberValidator = (control: FormControl): {[s: string]: boolean } => {
    //   if (!control.value) {
    //     return { error: false };
    //   } else {
    //     const reg = /^[0-9]*$/;
    //     return {error: !reg.test(control.value)} ;
    //   }
    // }
    forbiddenNameValidator(): any {
      console.log(111);
      return {repeat: true};
    }
    submitForm(): void {
    }

    okClick(): void {
      // tslint:disable-next-line:forin
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[ i ].markAsDirty();
        this.validateForm.controls[ i ].updateValueAndValidity();
        if (this.validateForm.controls[ i ].errors !== null) {
          return;
        }
      }
      this.insertOrUpdate();
    }

    cancelClick(): void {
      this.modal.destroy();
    }

    /**
     * 新增修改调用后台接口
     */
    insertOrUpdate() {
      const this_ = this;
      this.validateForm.value.ID = this.ID;
      this.mainService.insertOrUpdate(this.validateForm.value).subscribe(result => {
          if (result.CODE === '0') {
              this_.message.success(result.MSG);
              this_.modal.destroy('refresh');
          } else if (result.CODE === '20001') {
              this_.message.error(result.DATA);
          } else {
              this_.message.error(result.MSG);
          }
      });
  }
  onBlurTaskCode(event): void {
    // const inputTaskCode = this.validateForm.value.STASKCODE;
    // this.validateForm.get('STASKCODE')['repeat'] = true;
    // this.validateForm.get('STASKCODE').setErrors({repeat: true});
  }

}
