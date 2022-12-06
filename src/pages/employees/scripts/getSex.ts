export const getSex = (sex: string | undefined) =>
    sex ? (sex === "male" ? "Мужской" : "Женский") : "";
