export class Customer {
    companyKey: string;
    documentNumber: string;
    name: string;
    motherName: string;
    email: string;
    birthDate: Date;
    address: Address;

    static getId(companyKey: string, documentNumber: string): string{
        return `${companyKey}#${documentNumber}`;
    }

}

export class Address {
    street: string;
    number: string;
    state: string;
    city: string;
    zipCode: string;
    complement: string;
    country: string;
}
