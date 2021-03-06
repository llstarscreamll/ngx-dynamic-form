import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Control } from './../models/control';
import { ControlConfig } from './../models/control-config';

@Component({
  selector: 'radio-control',
  template: `
    <div
      *ngIf="conf && group"
      class="form-group"
      [formGroup]="group"
      [class.has-success]="group.get(config.name).valid && group.get(config.name).touched"
      [class.has-error]="(!group.get(config.name).valid && group.get(config.name).touched) || (errors[config.name])"
      [ngClass]="wrapperClass">

      <label
        class="control-label"
        [attr.for]="config.name"
        [ngClass]="[config.labelClass || '']">
        {{ config.label }}
      </label>

      <div *ngFor="let option of config.options" class="radio">
        <label>
          <input
            type="radio"
            [checked]="getChecked(option.id)"
            [attr.name]="config.name"
            [attr.value]="option.id"
            [attr.disabled]="disabled === true ? true : null"
            [formControlName]="config.name">
          {{ option.text }}
        </label>
      </div>

    </div>
        `,
  styles: [`:host { display: block; }`]
})
export class RadioControlComponent implements Control, OnInit {
  public config: ControlConfig;
  public group: FormGroup;
  public errors: Object = {};
  public disabled = true;

  public constructor() { }

  public ngOnInit() { }

  public getChecked(value): boolean {
    return this.group.get(this.conf.name).value === value ? true : null;
  }

  get conf() {
    return this.config || null;
  }

  get wrapperClass() {
    return this.conf ? this.conf.mainWrapperClass : null;
  }
}
