import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  phonePattern = '^[0-9]{3}\-?[0-9]{3}\-?[0-9]{4}$';
  urlPattern = '(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';

  validate(data?: any, form?: any, errors?: any, msgs?: any, fields?: any) {
    if (!form) { return; }
    for (const field in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, field) && (fields.indexOf(field) > -1)) {
        errors[field] = ''; // reset errors
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = msgs[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                errors[field] = `${(messages as {[key: string]: string})[key]}`;
              }
            }
          }
        }
      }
    }
  }

}
