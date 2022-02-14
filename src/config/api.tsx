
import { url } from "@/const";
import { client } from "./environment";

export const getEmployees = function (): Promise<any> {
    return client(url, 'GET');
  };