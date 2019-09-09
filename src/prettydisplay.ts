import Table = require('cli-table');


export class PrettyDisplay extends Table {
    constructor(data: {[key: string]: any}[]) {
        if (!data || data.length === 0) {
            super();
            this.push(['No data']);
        } else {
            if (!Array.isArray(data)) {
                data = [data];
            }
            const colNames = PrettyDisplay.getHead(data);
            super({
                head: colNames
            });

            this.push(...this.cleanData(data, colNames.indexOf('hash') !== -1));
        }
    }

    public display() {
        console.log(this.toString());
    }

    private cleanData(data: {[key: string]: any}[], truncHash?: boolean) {
        for (const d of data) {
            for (const key in d) {
                if (typeof key !== 'string') {
                    d[key] = JSON.stringify(d[key]);
                }
            }
        }
        return PrettyDisplay.getValues(data, truncHash);
    }

    private static getHead(data: {[key: string]: any}[]) {
        return Object.keys(data[0]);
    }

    private static getValues(data: {[key: string]: any}[], truncHash?: boolean) {
        const dataArray: string[][] = [];
        for (let d of data) {
            const values = Object.keys(d).map(key => {
                if (key === 'hash' && truncHash) {
                    d[key] = d[key].substr(0, 10);
                }
                return d[key]
            });
            dataArray.push(values);
        }
        return dataArray;
    }
}
