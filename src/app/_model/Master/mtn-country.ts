export class MtnCountry {
    countryId: string;
    countryName: string;
}

export class MtnCountryResponse {
    status: boolean;
    message: string;
    countryList: MtnCountry[];
}
