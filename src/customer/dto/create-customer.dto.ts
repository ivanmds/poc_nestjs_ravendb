export class CreateCustomerDto {
    companyKey: string;
    documentNumber: string;
    name: string;
    motherName: string;
    email: string;
    birthDate: Date;
    addresses: Address[];
}