import {Controller, HttpRequest, HttpResponse} from "../../presentation/protocols";
import {LogErrorRepository} from "../../data/protocols/log-error-repository";

export class LogControllerDecorator implements Controller {
    private readonly _controller : Controller;
    private readonly _logErrorRepository : LogErrorRepository;

    constructor(controller : Controller, logErrorRepository : LogErrorRepository) {
        this._controller = controller;
        this._logErrorRepository = logErrorRepository;
    }

    async handle(httpRequest : HttpRequest) : Promise<HttpResponse> {
        const httpResponse = await this._controller.handle(httpRequest)
        if (httpResponse.statusCode === 500) {
            await this._logErrorRepository.log(httpResponse.body.stack)
        }
        return httpResponse

    }

}