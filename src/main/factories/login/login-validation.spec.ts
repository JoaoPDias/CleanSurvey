import {ValidationComposite} from "../../../presentation/helpers/validators/validation-composite";
import {RequiredFieldValidation} from "../../../presentation/helpers/validators/required-field-validation";
import {Validation} from "../../../presentation/helpers/validators/validation";
import {EmailValidation} from "../../../presentation/helpers/validators/email-validation";
import {EmailValidator} from "../../../presentation/protocols/email-validator";
import {makeLoginValidation} from "./login-validation";

const makeEmailValidator = () : EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email : string) : boolean {
            return true;
        }
    }

    return new EmailValidatorStub();
}
jest.mock('../../../presentation/helpers/validators/validation-composite')
describe('LoginValidation', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeLoginValidation()
        const validations : Validation[] = []
        for (const field of ['email', 'password']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new EmailValidation('email', makeEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    });
});