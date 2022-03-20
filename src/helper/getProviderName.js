import { ProviderEnum } from "../enums/ProviderEnum";

const getProviderName = (providerID) => {
    return ProviderEnum[providerID];
};

export default getProviderName;
