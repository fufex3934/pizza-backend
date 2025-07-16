import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidPhoneNumber', async: false })
export class IsValidPhoneNumber implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  }
  defaultMessage() {
    return 'Phone number must be in valid international format (e. g., +1234567890';
  }
}
