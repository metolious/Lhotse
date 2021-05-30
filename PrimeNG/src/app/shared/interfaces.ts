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

// export interface City {
//   state: string,
//   city: string
// }

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
  id: number,
  file_subject: string,
  file_location: string,
  file_type_id: number,
  file_detail: string,
  file_origin_id: number,
  case_id: number,
  file_status: number,
  // case_status: number,
  case_status: string,
  author_last_name: string,
  author_first_name: string,
  poc_user: string,
  author: string,
  login_user: string,
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