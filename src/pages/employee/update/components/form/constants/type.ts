import { Dayjs } from "dayjs";
export type FormInput = {
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

export interface Props {
  setOpenSuccessNotify: () => void;
  setOpenFailedNotify: () => void;
}
