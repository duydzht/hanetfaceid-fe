import io from "socket.io-client";
import { STRAPI_ENDPOINT } from "./constants";

export const CHECKIN_EVENT = "checkin:data";

export const socket = io(STRAPI_ENDPOINT);
