import { timestampToNativeToLocaleString } from "@helpers/dateHelpers";

export const getBirth = (birthDate: number | undefined) =>
    birthDate ? timestampToNativeToLocaleString(birthDate) : "";
