export class ObjectConverter {

    static fromJson(obj: Object, data: Object) {
        let name: string;
        for(name in data) {

            let value: string = data[name];
            //primeira letra em upper case
            let field = name.substr(0, 1).toUpperCase() + name.substr(1);
            let method: string = 'set' + field;

            if (obj[method] === undefined) {
                continue;
            }

            obj[method](value);
        }
        return obj;
    }

}
