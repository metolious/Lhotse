import { IFormLabel, init } from "src/app/shared/interfaces";

export class VesselModel {

  // header="Candidate Matching Parameters"
  Imo: string;
  Mmsi: string;
  CallSign: string;
  Name: string;
  Flag: string;

  //header="Vessel Engine Parameters"
  Speed: number;
  EngineName: string;
  EngineModel: string;
  EngineSerialNumber: string;
  FuelCapacity: number;
  FuelConsumptionRate: number;
  EngineType: string;
  EngineTypeCode: string;
  EngineCylinders: number;
  NumberOfEngines: number;
  PropellorHorsePower: number;
  ShaftRpm: number;
  ScrewsType: string;
  ScrewsTypeCode: string;
  NumberOfScrews: number;
  BladesPerScrew: number;
  NumberOfThrusters: number;
  GeneratorKilowatts: number;
  ElectricalFrequency: number;
  ElectricalVoltage: number;
  ElectricalCurrentType: string;
  NumberOfGenerators: number;

  //header="Vessel Description"
  UpdateVesselStatus: string;
  VesselFunctionType: string;
  VesselFunctionTypeCode: string;
  UpdateVesselImo: string;
  UpdateVesselType: string;
  NavalVesselCategory: string;
  NavalVesselCategoryCode: string;
  VesselDescription: string;
  VesselType: string;
  VesselTypeCode: string;
  VesselTypeDesignator: string;
  VesselTypeDesignatorCode: string;
  VesselClass: string;

  TypeGroup: string;
  Iir: string;
  source: string;
  updateId: string;
  UpdateTimstamp: Date;
  ProcessState: string;
  AnalystLock: string;
  AnalystLockTimestamp: Date;
  Disposition: string;
  DispositionSconum: string;
  RejectionReason: string;
  Sconum: string;
  ActiveIndicator: string;
  ActiveIndicatorCode: string;
  HomePort: string;
  
  OpsDesignation: string;
  HullNumber: string;
  EquipmentCode: string;
  NavalPennant : string;
  PrimaryImageAspect: string;
  PrimaryImageGuid: string;
  PrimaryImageUrl: string;
  PrimaryImageClassification: string;
  GrossTons: number;
  DeadWeightTons: number;
  OverallLengthMeters: number;
  MaxBeamMeters: number;
  MaxDraftMeters: number;
  HullType: string;
  UprightSequence: string;
  SuperStructureLocation: string;
  Identifier: string;
  CreatedDateTime: Date;
  ModifiedDateTime: Date;
  CreatedBy: string;
  ModifiedBy: string;
  SecurityLabel: string;
  ControlSet: string;
  Declassification: string;
  Site_ID: string;
  ShipManager: string;
  ShipManagerCountry: string;
  RegisteredOwner: string;
  BeneficialOwner: string;
  
  OfficialRegistryNumber: string;
  ZedRegistryNumber: number;
  TrawlerType: string;
  TrawlerTypeCode: string;
  MerchantPendant: string;
  HullColor: string;
  FunnelColor: string;
  SuperStructureColor: string;
  SuperstructureLocationCode: string;
  NumberSuperstructures: string;

  labels: IFormLabel[];
  formLabels: IFormLabel[];

  constructor()
  {
    this.formLabels = [
    
      {label: 'Imo'},
      {label: 'Mmsi'},
      {label: 'CallSign'},
      {label: 'Name'},
      {label: 'Flag'},

      {label: 'Speed'},
      {label: 'EngineName'},
      {label: 'EngineModel'},
      {label: 'EngineSerialNumber'},
      {label: 'FuelCapacity'},
      {label: 'FuelConsumptionRate'},
      {label: 'EngineType'},
      {label: 'EngineTypeCode'},
      {label: 'EngineCylinders'},
      {label: 'NumberOfEngines'},
      {label: 'PropellorHorsePower'},
      {label: 'ShaftRpm'},
      {label: 'ScrewsType'},
      {label: 'ScrewsTypeCode'},
      {label: 'NumberOfScrews'},
      {label: 'BladesPerScrew'},
      {label: 'NumberOfThrusters'},
      {label: 'GeneratorKilowatts'},
      {label: 'ElectricalFrequency'},
      {label: 'ElectricalVoltage'},
      {label: 'ElectricalCurrentType'},
      {label: 'NumberOfGenerators'},

      {label: 'UpdateVesselStatus'},
      {label: 'VesselFunctionType'},
      {label: 'VesselFunctionTypeCode'},
      {label: 'NavalVesselCategory'},
      {label: 'NavalVesselCategoryCode'},
      {label: 'VesselDescription'},
      {label: 'VesselType'},
      {label: 'VesselTypeCode'},
      {label: 'VesselTypeDesignator'},
      {label: 'VesselTypeDesignatorCode'},
      {label: 'VesselClass'},

      {label: 'TypeGroup'},
      {label: 'Iir'},
      {label: 'source'},
      {label: 'updateId'},
      {label: 'UpdateTimstamp'},
      {label: 'ProcessState'},
      {label: 'AnalystLock'},
      {label: 'AnalystLockTimestamp'},
      {label: 'UpdateVesselImo'},
      {label: 'UpdateVesselType'},
      {label: 'Disposition'},
      {label: 'DispositionSconum'},
      {label: 'RejectionReason'},
      {label: 'Sconum'},
      {label: 'ActiveIndicator'},
      {label: 'ActiveIndicatorCode'},
      {label: 'HomePort'},,
      {label: 'OpsDesignation'},
      {label: 'HullNumber'},
      {label: 'EquipmentCode'},
      {label: 'NavalPennant '},
      {label: 'PrimaryImageAspect'},
      {label: 'PrimaryImageGuid'},
      {label: 'PrimaryImageUrl'},
      {label: 'PrimaryImageClassification'},
      {label: 'GrossTons'},
      {label: 'DeadWeightTons'},
      {label: 'OverallLengthMeters'},
      {label: 'MaxBeamMeters'},
      {label: 'MaxDraftMeters'},
      {label: 'HullType'},
      {label: 'UprightSequence'},
      {label: 'SuperStructureLocation'},
      {label: 'Identifier'},
      {label: 'CreatedDateTime'},
      {label: 'ModifiedDateTime'},
      {label: 'CreatedBy'},
      {label: 'ModifiedBy'},
      {label: 'SecurityLabel'},
      {label: 'ControlSet'},
      {label: 'Declassification'},
      {label: 'Site_ID'},
      {label: 'ShipManager'},
      {label: 'ShipManagerCountry'},
      {label: 'RegisteredOwner'},
      {label: 'BeneficialOwner'},
      {label: 'OfficialRegistryNumber'},
      {label: 'ZedRegistryNumber'},
      {label: 'TrawlerType'},
      {label: 'TrawlerTypeCode'},
      {label: 'MerchantPendant'},
      {label: 'HullColor'},
      {label: 'FunnelColor'},
      {label: 'SuperStructureColor'},
      {label: 'SuperstructureLocationCode'},
      {label: 'NumberSuperstructures'}
    ];
    this.Imo = init.STRING;
    this.Mmsi = init.STRING;
    this.Name = init.STRING;
    this.CallSign = init.STRING;
    this.Flag = init.STRING;
   
    this.Speed = init.NUMBER;
    this.EngineName = init.STRING;
    this.EngineModel = init.STRING;
    this.EngineSerialNumber = init.STRING;
    this.FuelCapacity = init.NUMBER;
    this.FuelConsumptionRate = init.NUMBER;
    this.EngineType = init.STRING;
    this.EngineTypeCode = init.STRING;
    this.EngineCylinders = init.NUMBER;
    this.NumberOfEngines = init.NUMBER;
    this.PropellorHorsePower = init.NUMBER;
    this.ShaftRpm = init.NUMBER;
    this.ScrewsType = init.STRING;
    this.ScrewsTypeCode = init.STRING;
    this.NumberOfScrews = init.NUMBER;
    this.BladesPerScrew = init.NUMBER;
    this.NumberOfThrusters = init.NUMBER;
    this.GeneratorKilowatts = init.NUMBER;
    this.ElectricalFrequency = init.NUMBER;
    this.ElectricalVoltage = init.NUMBER;
    this.ElectricalCurrentType = init.STRING;
    this.NumberOfGenerators = init.NUMBER;

    this.UpdateVesselStatus = init.STRING;
    this.VesselFunctionType = init.STRING;
    this.VesselFunctionTypeCode = init.STRING;
    this.NavalVesselCategory = init.STRING;
    this.NavalVesselCategoryCode = init.STRING;
    this.VesselDescription = init.STRING;
    this.VesselType = init.STRING;
    this.VesselTypeCode = init.STRING;
    this.VesselTypeDesignator = init.STRING;
    this.VesselTypeDesignatorCode = init.STRING;
    this.VesselClass = init.STRING;

    this.Iir = init.STRING;
    this.source = init.STRING;
    this.updateId = init.STRING;
    this.UpdateTimstamp = init.NUMBER;
    this.ProcessState = init.STRING;
    this.AnalystLock = init.STRING;
    this.AnalystLockTimestamp = init.NUMBER;
    this.UpdateVesselImo = init.STRING;
    this.UpdateVesselType = init.STRING;
    this.Disposition = init.STRING;
    this.DispositionSconum = init.STRING;
    this.RejectionReason = init.STRING;
    this.Sconum = init.STRING;
    this.ActiveIndicator = init.STRING;
    this.ActiveIndicatorCode = init.STRING;
    this.HomePort = init.STRING;
    this.TypeGroup = init.STRING;

    this.OpsDesignation = init.STRING;
    this.HullNumber = init.STRING;
    this.EquipmentCode = init.STRING;
    this.NavalPennant  = init.STRING;
    this.PrimaryImageAspect = init.STRING;
    this.PrimaryImageGuid = init.STRING;
    this.PrimaryImageUrl = init.STRING;
    this.PrimaryImageClassification = init.STRING;
    this.GrossTons = init.NUMBER;
    this.DeadWeightTons = init.NUMBER;
    this.OverallLengthMeters = init.NUMBER;
    this.MaxBeamMeters = init.NUMBER;
    this.MaxDraftMeters = init.NUMBER;
    this.HullType = init.STRING;
    this.UprightSequence = init.STRING;
    this.SuperStructureLocation = init.STRING;
    this.Identifier = init.STRING;
    this.CreatedDateTime = init.NUMBER;
    this.ModifiedDateTime = init.NUMBER;
    this.CreatedBy = init.STRING;
    this.ModifiedBy = init.STRING;
    this.SecurityLabel = init.STRING;
    this.ControlSet = init.STRING;
    this.Declassification = init.STRING;
    this.Site_ID = init.STRING;
    this.ShipManager = init.STRING;
    this.ShipManagerCountry = init.STRING;
    this.RegisteredOwner = init.STRING;
    this.BeneficialOwner = init.NUMBER;
   
    this.OfficialRegistryNumber = init.STRING;
    this.ZedRegistryNumber = init.NUMBER;
    this.TrawlerType = init.STRING;
    this.TrawlerTypeCode = init.STRING;
    this.MerchantPendant = init.STRING;
    this.HullColor = init.STRING;
    this.FunnelColor = init.STRING;
    this.SuperStructureColor = init.STRING;
    this.SuperstructureLocationCode = init.STRING;
    this.NumberSuperstructures = init.STRING;

    this.labels = this.formLabels;
  }
}
// export class VesselModel {

//     formLabels: IFormLabel[];
//     securityLabel: string;
//     aspect: string;
//     imageSource: string;
//     sconums: string[];
//     amidshipsId: string[];
//     iirNumbers: string[];
//     otherSources: string[];
//     labels: IFormLabel[];
//     imageDate: string;
//     primeImage: string;
//     distribution: string;
//     pageSize: string;
//     sortSelect: string;
//     sortOrder: string;
//     sortField: string;
//     valCheck: string;
//     imoNumber: string[];
//     mmsiNumber: string[];
//     callSign: string[];
//     vesselName: string[];
//     modifiedBy: string;
//     approvedBy: string;
//     uploadedBy: string;
  
//     constructor()
//     {
//       this.formLabels = [
//         {label: 'securityLabel'},
//         {label: 'aspect'},
//         {label: 'imageSource'},
//         {label: 'sconums'},
//         {label: 'iirNumbers'},
//         {label: 'otherSources'},
//         {label: 'imageDate'},
//         {label: 'amidshipsId'},
//         {label: 'primeImage'},
//         {label: 'distribution'},
//         {label: 'pageSize'},
//         {label: 'sortSelect'},
//         {label: 'sortOrder'},
//         {label: 'sortField'},
//         {label: 'valCheck'},
//         {label: 'imoNumber'},
//         {label: 'mmsiNumber'},
//         {label: 'callSign'},
//         {label: 'vesselName'},
//         {label: 'modifiedBy'},
//         {label: 'approvedBy'},
//         {label: 'uploadedBy'},
//       ];
//       this.securityLabel = init.STRING;
//       this.aspect = init.STRING;
//       this.imageSource = init.STRING
//       this.sconums      = [];
//       this.iirNumbers   = [];
//       this.otherSources = [];
//       this.imageDate = init.STRING;
//       this.amidshipsId  = [];
//       this.primeImage = init.STRING;
//       this.distribution = init.STRING;
//       this.pageSize = init.STRING;
//       this.sortSelect = init.STRING;
//       this.sortOrder = init.STRING;
//       this.sortField = init.STRING;
//       this.valCheck = init.STRING;
//       this.imoNumber    = [];
//       this.mmsiNumber   = [];
//       this.callSign     = [];
//       this.vesselName   = [];
//       this.modifiedBy = init.STRING;
//       this.approvedBy = init.STRING;
//       this.uploadedBy = init.STRING;
//       this.labels = this.formLabels;
//     }
//   }
