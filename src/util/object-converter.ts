export class ObjectConverter {

    static fromJson(obj: Object, data: Object) {
        let name: string;
        for(name in data) {

            let value: string = data[name];

            //transformando das as primeiras letras em maiúscula
            let field = name.replace('_', ' ');
            field =  ObjectConverter.ucwords(field);
            field =  field.replace(' ', '');

            let method: string = 'set' + field;

            if (obj[method] === undefined) {
                continue;
            }

            obj[method](value);
        }
        return obj;
    }

    private static ucwords(str) {
        return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
            return $1.toUpperCase();
        });
    }

}
