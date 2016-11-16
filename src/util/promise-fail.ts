/**
 * Classe tem o objetivo retornar uma promise que falha.
 * A classe será util para utilizar em conjunto com a classe ResponseProvider, na qual espera uma promise e
 * faz alguns tratamentos para a resposta
 */
export class PromiseFail {

    constructor(message: string) {
        return new Promise((resolve, reject) => {
            reject(message);
        });
    }

}
