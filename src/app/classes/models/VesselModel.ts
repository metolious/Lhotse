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
  EquipmentCode: string;
  NaturalGasDomes: number;
  NaturalGasTanks: number;
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
  //header="Dates"
  YearMonthBuilt: Date;
  KeelLaidDate: Date;
  LaunchDate: Date;
  InserviceDate: Date;
  LaidUpDate: Date;
  InactiveDate: Date;
  UpdateTimestamp: Date;
  AnalystLockTimestamp: Date;
  SailedAsDate: Date;
  CreatedDateTime: Date;
  ModifiedDateTime: Date;
  //header="Vessel Capacities"
  CapacityPlan: number;
  FuelCapacity: number;
  RefrigeratedCapacity: number;
  CumulativeLiquidCapacity: number;
  MaximumLiftCapacity: number;
  GrainCapacity: number;
  BaleCapacity: number;
  DieselFuelCapacity: number;
  OilCapacity: number;
  RampCapacity: number;
  GasCapacity: number;
  CargoCapacityDwt: number;
  ContainerCapacityTeu: number;
  NumberOfContainers: number;
  NumberOfHolds: number;
  NumberOfCargoTanks: number;
  NumberOfRamps: number;
  NumberOfPumps: number;
  NumberOfLifts: number;
  NumberOfHatches: number;
  NumberOfHatchesAbreast: number;
  NumberOfAutos: number;
  PumpRate: number;
  UnfueledRange: number;
  DaysToProvision: number;
  //header="Dimensional Parameters"
  MaximumLaneLength: number;
  OverallLengthMeters: number;
  LengthBetweenPerpendiculars: string;
  LengthOfLargestHatch: number;
  WidthOfLargestHatch: number;
  RampLength: number;
  MaxBeamMeters: number;
  MaxDraftMeters: number;
  GrossTons: number;
  DeadWeightTons: number;
  DisplacementFull: number;
  DisplacementLight: number;
  DeadweightScale: string;
  RampLocation: string;
  RampLocationCode: string;
  DeckSpace: number;
  UprightSequence: string;
  //header="Phone Information"
  PhoneNumber: string;
  ImsiNumber: string;
  ImeiNumber: string;
  PhoneBrand: string;
  PhoneModel: string;
  PhoneType: string;
  SimSerialNumber: string;
  SimManufacturer: string;
  LocationFound: string;
  //header="Primary Image"
  PrimaryImageAspect: string;
  PrimaryImageGuid: string;
  PrimaryImageUrl: string;
  PrimaryImageClassification: string;
  //header="Hull Features"
  DoubleHull: string;
  HullType: string;
  HullNumber: string;
  HullColor: string;
  //header="Super Structure" 
  SuperStructureColor: string;
  SuperstructureLocationCode: string;
  NumberSuperstructures: string;
  SuperStructureOffCenter: string;
  SuperStructureLocation: string;
  //header="Funnel Parameters"
  FunnelColor: string;
  FunnelLocation: string;
  FunnelLocationCode: string;
  FunnelOffCenter: string;
  TwinAbreastFunnels: string;
  //header="Stern Features"
  SternType: string;
  SternTypeCode: string;
  SternAFrame: string;
  DoubleSides: string;
  DoubleBottom: string;
  //header="Vessel Identifiers"
  Sconum: string;
  DispositionSconum: string;
  updateId: string;
  ProcessState: string;
  Identifier: string;
  Iir: string;
  TypeGroup: string;
  Declassification: string;
  OpsDesignation: string;
  SecurityLabel: string;
  OfficialRegistryNumber: string;
  ZedRegistryNumber: number;
  ActiveIndicator: string;
  ActiveIndicatorCode: string;
  //header="Ship Features"
  SatelliteAntenna: string;
  BridgeWings: string;
  DroppedPoop: string;
  RaisedForecastle: string;
  TpcmImmersion: number;
  WaterWashDownFittings: string;
  SelfSustaining: string;
  AircraftFacilitiesType: string;
  AircraftFacilitiesTypeCode: string;
  Disposition: string;
  AnalystLock: string;
  RejectionReason: string;
  NavalPennant : string;
  ControlSet: string;
  TrawlerType: string;
  TrawlerTypeCode: string;
  MerchantPendant: string;
  GeneralArrangementPlan: string;
  CrewSize: number;
  PassengerBerths: number;
  SailedAsType: string;
  SailedAsValue: string;
  Text: string;
  TextSequence: string;
  HatchesSameSize: string;
  //header="Origin Location Information" (new)
  ShipManagerCountry: string;
  ShipManager: string;
  RegisteredOwner: string;
  BeneficialOwner: string;
  HomePort: string;
  SiteId: string;
  CountryBuilt: string;
  BuilderShipyard: string;
  CreatedBy: string;
  ModifiedBy: string;
  source: string;

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
      {label: 'UpdateTimestamp'},
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
      {label: 'HomePort'},
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
      {label: 'SiteId'},
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

      {label: 'NumberSuperstructures'},

      {label: 'SuperStructureOffCenter'},
      {label: 'SatelliteAntenna'},
      {label: 'BridgeWings'},
      {label: 'DroppedPoop'},
      {label: 'RaisedForecastle'},
      {label: 'FunnelLocation'},
      {label: 'FunnelLocationCode'},
      {label: 'FunnelOffCenter'},
      {label: 'TwinAbreastFunnels'},
      {label: 'SternType'},
      {label: 'SternTypeCode'},
      {label: 'SternAFrame'},
      {label: 'LengthBetweenPerpendiculars'},
      {label: 'DoubleSides'},
      {label: 'DoubleBottom'},
      {label: 'DoubleHull'},
    
      {label: 'YearMonthBuilt'},
      {label: 'CountryBuilt'},
      {label: 'BuilderShipyard'},
      {label: 'KeelLaidDate'},
      {label: 'LaunchDate'},
      {label: 'InserviceDate'},
      {label: 'LaidUpDate'},
      {label: 'InactiveDate'},
    
      {label: 'DisplacementFull'},
      {label: 'DisplacementLight'},
      {label: 'TpcmImmersion'},
      {label: 'NumberOfHolds'},
      {label: 'NumberOfCargoTanks'},
      {label: 'NumberOfRamps'},
      {label: 'RampLocation'},
      {label: 'RampLocationCode'},
      {label: 'MaximumLaneLength'},
      {label: 'NumberOfPumps'},
      {label: 'NumberOfLifts'},
      {label: 'NumberOfHatches'},
      {label: 'NumberOfHatchesAbreast'},
      {label: 'LengthOfLargestHatch'},
      {label: 'WidthOfLargestHatch'},
      {label: 'WaterWashDownFittings'},
      {label: 'SelfSustaining'},
      {label: 'AircraftFacilitiesType'},
      {label: 'AircraftFacilitiesTypeCode'},
      {label: 'DaysToProvision'},
      {label: 'HatchesSameSize'},
      {label: 'CapacityPlan'},
      {label: 'NaturalGasTanks'},
      {label: 'GeneralArrangementPlan'},
      {label: 'NaturalGasDomes'},
      {label: 'DeadweightScale'},
      {label: 'RampLength'},
    
      {label: 'MaximumLiftCapacity'},
      {label: 'CargoCapacityDwt'},
      {label: 'UnfueledRange'},
      {label: 'CrewSize'},
      {label: 'PassengerBerths'},
      {label: 'GrainCapacity'},
      {label: 'BaleCapacity'},
      {label: 'ContainerCapacityTeu'},
      {label: 'NumberOfContainers'},
      {label: 'RampCapacity'},
      {label: 'CumulativeLiquidCapacity'},
      {label: 'GasCapacity'},
      {label: 'RefrigeratedCapacity'},
      {label: 'PumpRate'},
      {label: 'NumberOfAutos'},
      {label: 'DeckSpace'},
      {label: 'DieselFuelCapacity'},
      {label: 'OilCapacity'},
    
      {label: 'SailedAsType'},
      {label: 'SailedAsValue'},
      {label: 'SailedAsDate'},
      {label: 'Text'},
      {label: 'TextSequence'},
    
      {label: 'PhoneNumber'},
      {label: 'ImsiNumber'},
      {label: 'ImeiNumber'},
      {label: 'PhoneBrand'},
      {label: 'PhoneModel'},
      {label: 'PhoneType'},
      {label: 'SimSerialNumber'},
      {label: 'SimManufacturer'},
      {label: 'LocationFound'},
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
    this.UpdateTimestamp = init.NUMBER;
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
    this.SiteId = init.STRING;
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

    this.SuperStructureOffCenter = init.STRING;
    this.SatelliteAntenna = init.STRING;
    this.BridgeWings = init.STRING;
    this.DroppedPoop = init.STRING;
    this.RaisedForecastle = init.STRING;
    this.FunnelLocation = init.STRING;
    this.FunnelLocationCode = init.STRING;
    this.FunnelOffCenter = init.STRING;
    this.TwinAbreastFunnels = init.STRING;
    this.SternType = init.STRING;
    this.SternTypeCode = init.STRING;
    this.SternAFrame = init.STRING;
    this.LengthBetweenPerpendiculars = init.STRING;
    this.DoubleSides = init.STRING;
    this.DoubleBottom = init.STRING;
    this.DoubleHull = init.STRING;
  
    this.YearMonthBuilt = init.NUMBER;
    this.CountryBuilt = init.STRING;
    this.BuilderShipyard = init.STRING;
    this.KeelLaidDate = init.DATE;
    this.LaunchDate = init.DATE;
    this.InserviceDate = init.DATE;
    this.LaidUpDate = init.DATE;
    this.InactiveDate = init.DATE;
  
    this.DisplacementFull = init.NUMBER;
    this.DisplacementLight = init.NUMBER;
    this.TpcmImmersion = init.NUMBER;
    this.NumberOfHolds = init.NUMBER;
    this.NumberOfCargoTanks = init.NUMBER;
    this.NumberOfRamps = init.NUMBER;
    this.RampLocation = init.STRING;
    this.RampLocationCode = init.STRING;
    this.MaximumLaneLength = init.NUMBER;
    this.NumberOfPumps = init.NUMBER;
    this.NumberOfLifts = init.NUMBER;
    this.NumberOfHatches = init.NUMBER;
    this.NumberOfHatchesAbreast = init.NUMBER;
    this.LengthOfLargestHatch = init.NUMBER;
    this.WidthOfLargestHatch = init.NUMBER;
    this.WaterWashDownFittings = init.STRING;
    this.SelfSustaining = init.STRING;
    this.AircraftFacilitiesType = init.STRING;
    this.AircraftFacilitiesTypeCode = init.STRING;
    this.DaysToProvision = init.NUMBER;
    this.HatchesSameSize = init.STRING;
    this.CapacityPlan = init.NUMBER;
    this.NaturalGasTanks = init.NUMBER;
    this.GeneralArrangementPlan = init.STRING;
    this.NaturalGasDomes = init.NUMBER;
    this.DeadweightScale = init.STRING;
    this.RampLength = init.NUMBER;
  
    this.MaximumLiftCapacity = init.NUMBER;
    this.CargoCapacityDwt = init.NUMBER;
    this.UnfueledRange = init.NUMBER;
    this.CrewSize = init.NUMBER;
    this.PassengerBerths = init.NUMBER;
    this.GrainCapacity = init.NUMBER;
    this.BaleCapacity = init.NUMBER;
    this.ContainerCapacityTeu = init.NUMBER;
    this.NumberOfContainers = init.NUMBER;
    this.RampCapacity = init.NUMBER;
    this.CumulativeLiquidCapacity = init.NUMBER;
    this.GasCapacity = init.NUMBER;
    this.RefrigeratedCapacity = init.NUMBER;
    this.NumberOfAutos = init.NUMBER;
    this.DieselFuelCapacity = init.NUMBER;
    this.OilCapacity = init.NUMBER;
  
    this.DeckSpace = init.NUMBER;
    this.PumpRate = init.NUMBER;
    this.SailedAsType = init.STRING;
    this.SailedAsValue = init.STRING;
    this.SailedAsDate = init.DATE;
    this.Text = init.STRING;
    this.TextSequence = init.STRING;
  
    this.PhoneNumber = init.STRING;
    this.ImsiNumber = init.STRING;
    this.ImeiNumber = init.STRING;
    this.PhoneBrand = init.STRING;
    this.PhoneModel = init.STRING;
    this.PhoneType = init.STRING;
    this.SimSerialNumber = init.STRING;
    this.SimManufacturer = init.STRING;
    this.LocationFound = init.STRING;

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
//      {label: ' this.formLabels = [
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
