import {Controller, HttpRequest, HttpResponse, Validation} from "./add-survey-controller-protocols";
import {badRequest} from "../../../helpers/http/http-helper";

export class AddSurveyController implements Controller {
    constructor(private readonly _validation : Validation) {
    }

    async handle(httpRequest : HttpRequest) : Promise<HttpResponse> {

        const error = this._validation.validate(httpRequest.body)
        if (error) {
            return badRequest(error)
        }
        return Promise.resolve(null);
    }

}