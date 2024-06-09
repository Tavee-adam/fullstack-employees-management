import { Dayjs } from "dayjs";

export type FormInput = {
  id?: string;
  firstname: string;
  lastname: string;
  sex: string;
  birth: string | null;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  idCardExp: Dayjs | string;
};
