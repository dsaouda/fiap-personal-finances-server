export class ObjectConverter {

    static fromJson(obj: Object, data: Object) {
        for(let name in data) {

            let value: string = data[name];
            let method: string = 'set' + name;

            obj[method](value);
        }
        return obj;
    }

}
