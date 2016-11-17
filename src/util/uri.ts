export class Uri {
    private static baseUri: string = process.env.APP_HOST + '/api/v1';

    static base(uri: string): string {
        return `${Uri.baseUri + uri}`
    }

}
