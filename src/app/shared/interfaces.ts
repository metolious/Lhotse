export interface IImage {
  id?: string;
  name?: string;
  date?: string;
  status?: string;
  activity?: number;
  revoke?: boolean;
  state?: string;
  image?: string;
}

export interface IRoute {
  id?: string,
  name?: string,
  url?: string,
  colon?: string,
  port?: string,
  description?: string,
  data?: string
  isActive?: boolean,
  endpoint?: string,
  method?: string,
}

export interface IBoolean {
  key: string,
  value: boolean
}

export interface IString {
  key: string,
  value: string
}

export interface IUser {
  label: string,
  value: string
}

export interface IIRNumber {
  label: string,
  value: number
}

export interface IImageSource {
  label: string,
  value: string
}

export interface IAspect {
  label: string,
  value: string
}

export interface IFile {
   securityLabel: string,
   aspect: string,
   imageSource: string,
   sconums: string[],
   iirNumbers: string[],
   otherSources: string[],
   imageDate: string,
   labels: IFormLabel[]
}

export interface IFormLabel {
  label: string
}

export interface IFormData {
  label: string,
  value: string
}

export interface IImageData {
  label: string,
  value: string
}

export interface ISecurityLabel {
  label: string,
  value: string
}

export const request = {
	GET:    "get",
	PUT:    "put",
	POST:   "post",
	DELETE: "delete",
}

export const init = {
  STRING: '',
  NUMBER: null,
  DATE: null,
}