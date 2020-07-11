import {InvalidParamError} from "../../errors";
import {CompareFieldsValidation} from "./compare-fields-validation";

const makeSut = () : CompareFieldsValidation => {
    return new CompareFieldsValidation('field', 'fieldToCompare');
}

describe('Compare Fields Validation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({field: 'any_value', fieldToCompare: 'any_values'})
        expect(error).toStrictEqual(new InvalidParamError('fieldToCompare'))
    });
    test('Should not return if validation succeeds', () => {
        const sut = makeSut()
        const error = sut.validate({field: 'any_value', fieldToCompare: 'any_value'})
        expect(error).toBeFalsy()
    });
});