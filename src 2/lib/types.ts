export type VehicleType =
  | 'BACKHOE LOADER'
  | 'BOOM TRUCK'
  | 'BUS'
  | 'COASTER'
  | 'DIESEL TANKER'
  | 'DYNA IPV'
  | 'DYNA TRUCK'
  | 'FLAT BED TRAILER'
  | 'FOOD TRUCK'
  | 'FORKLIFT'
  | 'MINIBUS'
  | 'POTABLE WT'
  | 'SKID STEER LOADER'
  | 'SUV'
  | 'TOW TRUCK'
  | 'WATER TANKER'
  | 'SEDAN'
  | 'MOBILE CRANE'
  | 'CHAIN EXCAVATOR'
  | 'WHEEL EXCAVATOR'
  | 'WHEEL LOADER'
  | 'TELEHANDLER'
  | 'LOW BED TRAILER'
  | 'PICKUP'
  | 'ROLLER COMPACTOR'

export interface HandoverForm {
  handoverDate: Date
  plateNo: string
  vehicleType: VehicleType
  handoverBy: string
  takeoverBy: string
  idNo: number
  odoMeterReading: number
  registrationCard: boolean
  vehicleAuthorization: 'complete' | 'incomplete'
  authorizationRemarks?: string
  contactNo: string
  vehiclePictures: string[]
  accessoriesPictures: string[]
  handoverSignature: string
  takeoverSignature: string
}

export interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: 'user' | 'admin'
}