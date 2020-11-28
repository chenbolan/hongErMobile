import { type } from "jquery";

export enum LanuageType {
  "en_US"= "en_US",
  "zh_CN"= "zh_CN",
  "ja_JP"= "ja_JP",
  "ru_RU"= "ru_RU",
}

export interface Lanuage {
  [key: string]: string
}

export interface Messages {
  "en_US": Lanuage,
  "zh_CN": Lanuage,
  "ja_JP": Lanuage,
  "ru_RU": Lanuage,
  [key: string]: Lanuage
}
