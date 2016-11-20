
export class DateConverter {

        static toDate(date: string): Date {

            if (!date.match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/)) {
                throw new Error('Não é uma data válida');
            }

            let datePart: Array<string> = date.split('-', 3);
            let year: number = Number(datePart[0]);
            let month: number = Number(datePart[1]);
            let day: number = Number(datePart[2]);

            return new Date(year, month, day);
        }

        static toIsoDate(date): string {

            if (date instanceof Date) {
                return `${date.getFullYear()}-${DateConverter.pad(date.getMonth()+1)}-${DateConverter.pad(date.getDate())}`;
            }

            return date;
        }

        private static pad(n){
            return n<10 ? '0'+n : n
        }
}
