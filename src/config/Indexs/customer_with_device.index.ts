import { AbstractJavaScriptIndexCreationTask } from "ravendb";

export class CustomerWithDeviceIndex extends AbstractJavaScriptIndexCreationTask {

    constructor() {
        super();
        this.outputReduceToCollection = nameCustomerWithDeviceIndex;

        const indexs = new Set<string>();
        indexs.add(`
            map('Customers', function(c) {
                return {
                    companyKey: c.companyKey,
                    documentNumber: c.documentNumber,
                    name: c.name
                }
            })
        `);

        indexs.add(`
            map('Devices', function(d) {
                return {
                    companyKey: d.companyKey,
                    documentNumber: d.documentNumber,
                    hash: d.hash,
                    pushToken: d.pushToken
                }
            })
        `);
        this.maps = indexs;

        this.additionalSources = {
            "script to device": `function getDevice(d1, d2) {
                if(d2) {
                    return d2;
                } else {
                    return d1;
                }
            }`
        }
        

        this.reduce = `
            groupBy(x => ({ companyKey: x.companyKey, documentNumber: x.documentNumber }))
                .aggregate(g => {
                    return {
                        companyKey: g.key.companyKey,
                        documentNumber: g.key.documentNumber,
                        name: g.values[0].name,
                        // pushToken: g.values.reduce(getDevice).pushToken,
                        // hash: g.values.reduce(getDevice).hash
                    }
                });
        `;
    }
}

export const nameCustomerWithDeviceIndex = "CustomerWithDevice";

export class CustomerWithDeviceResult {
    companyKey: string;
    documentNumber: string;
    name: string;
    deviceHash: string;
    pushToken: string;
}