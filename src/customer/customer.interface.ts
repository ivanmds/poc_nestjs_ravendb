interface Customer {
    companyKey: string;
    documentNumber: string;
    name: string;
    motherName: string;
    email: string;
    birthDate: Date;
    address: Address;
}

interface Address {
    street: string;
    number: string;
    state: string;
    city: string;
    zipCode: string;
    complement: string;
    country: string;
}
