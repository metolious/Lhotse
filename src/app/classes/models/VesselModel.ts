import { IFormLabel, init } from "src/app/shared/interfaces";

export class VesselModel {

  // header="Key Parameters"
  sconum: string;
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
  YearMonthBuilt: string;
  KeelLaidDate: string;
  LaunchDate: string;
  InserviceDate: string;
  LaidUpDate: string;
  InactiveDate: string;
  UpdateTimestamp: string;
  AnalystLockTimestamp: string;
  SailedAsDate: string;
  CreatedDateTime: string;
  ModifiedDateTime: string;
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
 
      // header="Key Parameters"
      {label: 'sconum'},
      {label: 'Imo'},
      {label: 'Mmsi'},
      {label: 'CallSign'},
      {label: 'Name'},
      {label: 'Flag'},
      //header="Vessel Engine Parameters"
      {label: 'Speed'},
      {label: 'EngineName'},
      {label: 'EngineModel'},
      {label: 'EngineSerialNumber'},
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
      {label: 'EquipmentCode'},
      {label: 'NaturalGasDomes'},
      {label: 'NaturalGasTanks'},
      //header="Vessel Description"
      {label: 'UpdateVesselStatus'},
      {label: 'VesselFunctionType'},
      {label: 'VesselFunctionTypeCode'},
      {label: 'UpdateVesselImo'},
      {label: 'UpdateVesselType'},
      {label: 'NavalVesselCategory'},
      {label: 'NavalVesselCategoryCode'},
      {label: 'VesselDescription'},
      {label: 'VesselType'},
      {label: 'VesselTypeCode'},
      {label: 'VesselTypeDesignator'},
      {label: 'VesselTypeDesignatorCode'},
      {label: 'VesselClass'},
      //header="Dates"
      {label: 'YearMonthBuilt'},
      {label: 'KeelLaidDate'},
      {label: 'LaunchDate'},
      {label: 'InserviceDate'},
      {label: 'LaidUpDate'},
      {label: 'InactiveDate'},
      {label: 'UpdateTimestamp'},
      {label: 'AnalystLockTimestamp'},
      {label: 'SailedAsDate'},
      {label: 'CreatedDateTime'},
      {label: 'ModifiedDateTime'},
      //header="Vessel Capacities"
      {label: 'CapacityPlan'},
      {label: 'FuelCapacity'},
      {label: 'RefrigeratedCapacity'},
      {label: 'CumulativeLiquidCapacity'},
      {label: 'MaximumLiftCapacity'},
      {label: 'GrainCapacity'},
      {label: 'BaleCapacity'},
      {label: 'DieselFuelCapacity'},
      {label: 'OilCapacity'},
      {label: 'RampCapacity'},
      {label: 'GasCapacity'},
      {label: 'CargoCapacityDwt'},
      {label: 'ContainerCapacityTeu'},
      {label: 'NumberOfContainers'},
      {label: 'NumberOfHolds'},
      {label: 'NumberOfCargoTanks'},
      {label: 'NumberOfRamps'},
      {label: 'NumberOfPumps'},
      {label: 'NumberOfLifts'},
      {label: 'NumberOfHatches'},
      {label: 'NumberOfHatchesAbreast'},
      {label: 'NumberOfAutos'},
      {label: 'PumpRate'},
      {label: 'UnfueledRange'},
      {label: 'DaysToProvision'},
      //header="Dimensional Parameters"
      {label: 'MaximumLaneLength'},
      {label: 'OverallLengthMeters'},
      {label: 'LengthBetweenPerpendiculars'},
      {label: 'LengthOfLargestHatch'},
      {label: 'WidthOfLargestHatch'},
      {label: 'RampLength'},
      {label: 'MaxBeamMeters'},
      {label: 'MaxDraftMeters'},
      {label: 'GrossTons'},
      {label: 'DeadWeightTons'},
      {label: 'DisplacementFull'},
      {label: 'DisplacementLight'},
      {label: 'DeadweightScale'},
      {label: 'RampLocation'},
      {label: 'RampLocationCode'},
      {label: 'DeckSpace'},
      {label: 'UprightSequence'},
      //header="Phone Information"
      {label: 'PhoneNumber'},
      {label: 'ImsiNumber'},
      {label: 'ImeiNumber'},
      {label: 'PhoneBrand'},
      {label: 'PhoneModel'},
      {label: 'PhoneType'},
      {label: 'SimSerialNumber'},
      {label: 'SimManufacturer'},
      {label: 'LocationFound'},
      //header="Primary Image"
      {label: 'PrimaryImageAspect'},
      {label: 'PrimaryImageGuid'},
      {label: 'PrimaryImageUrl'},
      {label: 'PrimaryImageClassification'},
      //header="Hull Features"
      {label: 'DoubleHull'},
      {label: 'HullType'},
      {label: 'HullNumber'},
      {label: 'HullColor'},
      //header="Super Structure" 
      {label: 'SuperStructureColor'},
      {label: 'SuperstructureLocationCode'},
      {label: 'NumberSuperstructures'},
      {label: 'SuperStructureOffCenter'},
      {label: 'SuperStructureLocation'},
      //header="Funnel Parameters"
      {label: 'FunnelColor'},
      {label: 'FunnelLocation'},
      {label: 'FunnelLocationCode'},
      {label: 'FunnelOffCenter'},
      {label: 'TwinAbreastFunnels'},
      //header="Stern Features"
      {label: 'SternType'},
      {label: 'SternTypeCode'},
      {label: 'SternAFrame'},
      {label: 'DoubleSides'},
      {label: 'DoubleBottom'},
      //header="Vessel Identifiers"
      {label: 'DispositionSconum'},
      {label: 'updateId'},
      {label: 'ProcessState'},
      {label: 'Identifier'},
      {label: 'Iir'},
      {label: 'TypeGroup'},
      {label: 'Declassification'},
      {label: 'OpsDesignation'},
      {label: 'SecurityLabel'},
      {label: 'OfficialRegistryNumber'},
      {label: 'ZedRegistryNumber'},
      {label: 'ActiveIndicator'},
      {label: 'ActiveIndicatorCode'},
      //header="Ship Features"
      {label: 'SatelliteAntenna'},
      {label: 'BridgeWings'},
      {label: 'DroppedPoop'},
      {label: 'RaisedForecastle'},
      {label: 'TpcmImmersion'},
      {label: 'WaterWashDownFittings'},
      {label: 'SelfSustaining'},
      {label: 'AircraftFacilitiesType'},
      {label: 'AircraftFacilitiesTypeCode'},
      {label: 'Disposition'},
      {label: 'AnalystLock'},
      {label: 'RejectionReason'},
      {label: 'NavalPennant'},
      {label: 'ControlSet'},
      {label: 'TrawlerType'},
      {label: 'TrawlerTypeCode'},
      {label: 'MerchantPendant'},
      {label: 'GeneralArrangementPlan'},
      {label: 'CrewSize'},
      {label: 'PassengerBerths'},
      {label: 'SailedAsType'},
      {label: 'SailedAsValue'},
      {label: 'Text'},
      {label: 'TextSequence'},
      {label: 'HatchesSameSize'},
      //header="Origin Location Information" (new)
      {label: 'ShipManagerCountry'},
      {label: 'ShipManager'},
      {label: 'RegisteredOwner'},
      {label: 'BeneficialOwner'},
      {label: 'HomePort'},
      {label: 'SiteId'},
      {label: 'CountryBuilt'},
      {label: 'BuilderShipyard'},
      {label: 'CreatedBy'},
      {label: 'ModifiedBy'},
      {label: 'source'},
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
    this.UpdateTimestamp = init.STRING;
    this.ProcessState = init.STRING;
    this.AnalystLock = init.STRING;
    this.AnalystLockTimestamp = init.STRING;
    this.UpdateVesselImo = init.STRING;
    this.UpdateVesselType = init.STRING;
    this.Disposition = init.STRING;
    this.DispositionSconum = init.STRING;
    this.RejectionReason = init.STRING;
    this.sconum = init.STRING;
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
    this.CreatedDateTime = init.STRING;
    this.ModifiedDateTime = init.STRING;
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
  
    this.YearMonthBuilt = init.STRING;
    this.CountryBuilt = init.STRING;
    this.BuilderShipyard = init.STRING;
    this.KeelLaidDate = init.STRING;
    this.LaunchDate = init.STRING;
    this.InserviceDate = init.STRING;
    this.LaidUpDate = init.STRING;
    this.InactiveDate = init.STRING;
  
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
    this.SailedAsDate = init.STRING;
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
//      {label: 'this.formLabels = [
//      {label: 'securityLabel'},
//      {label: 'aspect'},
//      {label: 'imageSource'},
//      {label: 'sconums'},
//      {label: 'iirNumbers'},
//      {label: 'otherSources'},
//      {label: 'imageDate'},
//      {label: 'amidshipsId'},
//      {label: 'primeImage'},
//      {label: 'distribution'},
//      {label: 'pageSize'},
//      {label: 'sortSelect'},
//      {label: 'sortOrder'},
//      {label: 'sortField'},
//      {label: 'valCheck'},
//      {label: 'imoNumber'},
//      {label: 'mmsiNumber'},
//      {label: 'callSign'},
//      {label: 'vesselName'},
//      {label: 'modifiedBy'},
//      {label: 'approvedBy'},
//      {label: 'uploadedBy'},
//      ];
//      this.securityLabel = init.STRING;
//      this.aspect = init.STRING;
//      this.imageSource = init.STRING
//      this.sconums      {label: '= [];
//      this.iirNumbers   = [];
//      this.otherSources = [];
//      this.imageDate = init.STRING;
//      this.amidshipsId  = [];
//      this.primeImage = init.STRING;
//      this.distribution = init.STRING;
//      this.pageSize = init.STRING;
//      this.sortSelect = init.STRING;
//      this.sortOrder = init.STRING;
//      this.sortField = init.STRING;
//      this.valCheck = init.STRING;
//      this.imoNumber    = [];
//      this.mmsiNumber   = [];
//      this.callSign     = [];
//      this.vesselName   = [];
//      this.modifiedBy = init.STRING;
//      this.approvedBy = init.STRING;
//      this.uploadedBy = init.STRING;
//      this.labels = this.formLabels;
//     }
//   }
