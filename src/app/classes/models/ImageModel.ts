import { IFormLabel } from "src/app/shared/interfaces";

export class ImageModel {

    sconums: string[];
    iirNumbers: string[];
    otherSources: string[];
    securityLabel: string;
    aspect: string;
    imageSource: string;
    imageDate: string;
    labels: IFormLabel[];
    
    formLabels: IFormLabel[];
  
    constructor() 
    {  
      this.formLabels = [
        {label: 'securityLabel'},
        {label: 'aspect'},
        {label: 'imageSource'},
        {label: 'sconums'},
        {label: 'iirNumbers'},
        {label: 'otherSources'},
        {label: 'imageDate'}
      ]; 
      this.securityLabel = '';
      this.aspect = '';
      this.imageSource = ''
      this.sconums = [];
      this.iirNumbers = [];
      this.otherSources = [];
      this.imageDate = '';
      this.labels = this.formLabels;
    }
  }