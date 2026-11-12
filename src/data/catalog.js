export const DEVICES = [
  { id: 'dev-1', name: 'Vaporesso XROS 4', maxWattage: 30 },
  { id: 'dev-2', name: 'Vaporesso XROS Mini', maxWattage: 16 },
  { id: 'dev-3', name: 'Vaporesso Luxe XR Max', maxWattage: 80 },
  { id: 'dev-4', name: 'Vaporesso Armour G', maxWattage: 80 },
  { id: 'dev-5', name: 'OXVA Xlim Pro 2', maxWattage: 30 },
  { id: 'dev-6', name: 'OXVA Xlim Go', maxWattage: 30 }
];

export const COILS = [
  {
    id: 'c-1',
    name: 'XROS 0.6Ω Mesh Pod',
    minW: 21,
    maxW: 26,
    bestLiquid: '50/50 Nic Salt',
    fitsDevices: ['dev-1', 'dev-2']
  },
  {
    id: 'c-2',
    name: 'XROS 1.2Ω Pod',
    minW: 10,
    maxW: 12,
    bestLiquid: '50/50 Nic Salt',
    fitsDevices: ['dev-1', 'dev-2']
  },
  {
    id: 'c-3',
    name: 'GTX 0.2Ω Mesh Coil',
    minW: 45,
    maxW: 60,
    bestLiquid: '70/30 High VG',
    fitsDevices: ['dev-3', 'dev-4']
  },
  {
    id: 'c-4',
    name: 'GTX 0.4Ω Mesh Coil',
    minW: 26,
    maxW: 32,
    bestLiquid: '50/50 or 70/30',
    fitsDevices: ['dev-3', 'dev-4']
  },
  {
    id: 'c-5',
    name: 'OXVA Xlim 0.6Ω Top-Fill Pod',
    minW: 20,
    maxW: 25,
    bestLiquid: '50/50 Nic Salt',
    fitsDevices: ['dev-5', 'dev-6']
  },
  {
    id: 'c-6',
    name: 'OXVA Xlim 0.8Ω Top-Fill Pod',
    minW: 12,
    maxW: 16,
    bestLiquid: '50/50 Nic Salt',
    fitsDevices: ['dev-5', 'dev-6']
  }
];