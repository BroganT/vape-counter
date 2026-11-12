// src/utils/compatibility.js

/**
 * Evaluates physical and electrical compatibility for a selected device.
 * Uses a Map for O(1) device name resolution during reverse-lookup formatting.
 *
 * @param {Object|undefined} device - The currently selected device object
 * @param {Array} coils - Full catalog of coil objects
 * @param {Array} allDevices - Full catalog of device objects
 * @returns {Array} Enriched coil objects with safety status and cross-compatibility labels
 */
export function getCompatibleCoils(device, coils, allDevices) {
  if (!device || !Array.isArray(coils) || !Array.isArray(allDevices)) {
    return [];
  }

  // Pre-index device IDs to names in O(D) time to avoid nested filtering per coil
  const deviceNameMap = new Map(allDevices.map((d) => [d.id, d.name]));

  return coils
    .filter((coil) => Array.isArray(coil.fitsDevices) && coil.fitsDevices.includes(device.id))
    .map((coil) => {
      const isSafe = coil.minW <= device.maxWattage;

      // Resolve all devices sharing this coil platform (excluding or including active device)
      const allCompatibleNames = coil.fitsDevices
        .map((id) => deviceNameMap.get(id))
        .filter(Boolean)
        .join(', ');

      return {
        ...coil,
        isSafe,
        compatibleDeviceNames: allCompatibleNames,
      };
    });
}