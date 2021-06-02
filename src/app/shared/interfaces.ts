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

export interface ICase {
  id: number,
  firstname: string,
  lastname: string,
  eventtime: number,
  filenumber: number
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

export interface IImageData {
  label: string,
  value: string
}

export interface ISecurityLabel {
  label: string,
  value: string
}

export interface SelectItemGroup {
  label: string,
  value: string
}

export interface SelectItem {
  label: string,
  value: string
}