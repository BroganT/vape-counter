// src/App.jsx
import { useState, useMemo } from 'react';
import { DEVICES, COILS } from './data/catalog';
import { getCompatibleCoils } from './utils/compatibility';

export default function App() {
  const [selectedDeviceId, setSelectedDeviceId] = useState(DEVICES[0]?.id ?? '');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter devices based on case-insensitive search input
  const filteredDevices = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return DEVICES;
    return DEVICES.filter((device) =>
      device.name.toLowerCase().includes(normalizedQuery)
    );
  }, [searchQuery]);

  // Resolve active device and evaluate compatible coils via utility engine
  const currentDevice = useMemo(
    () => DEVICES.find((d) => d.id === selectedDeviceId),
    [selectedDeviceId]
  );

  const matchingCoils = useMemo(
    () => getCompatibleCoils(currentDevice, COILS, DEVICES),
    [currentDevice]
  );

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>CounterMatch</h1>
        <p className="app-subtitle">
          Search or select a device to verify coil compatibility and wattage guardrails:
        </p>
      </header>

      {/* Live Search Input + Clear Button */}
      <section className="search-bar" aria-label="Device search">
        <input
          type="search"
          className="search-input"
          placeholder="Type device name (e.g. XROS, OXVA, Luxe, Armour)..."
          aria-label="Search hardware devices"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => setSearchQuery('')}
          >
            Clear
          </button>
        )}
      </section>

      {/* Filtered Device Buttons */}
      <section className="device-grid" aria-label="Available devices">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => {
            const isSelected = selectedDeviceId === device.id;
            return (
              <button
                key={device.id}
                type="button"
                aria-pressed={isSelected}
                className={`device-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedDeviceId(device.id)}
              >
                {device.name} ({device.maxWattage}W)
              </button>
            );
          })
        ) : (
          <p className="empty-state">
            No devices match &ldquo;{searchQuery}&rdquo;
          </p>
        )}
      </section>

      {/* Active Device Info */}
      {currentDevice && (
        <section className="active-device-banner" aria-live="polite">
          <strong>Current Device:</strong> {currentDevice.name} &bull; Max Power:{' '}
          <strong>{currentDevice.maxWattage}W</strong>
        </section>
      )}

      {/* Coil Cards List */}
      <section aria-label="Compatible coils">
        <h2 className="results-heading">
          Compatible Coils ({matchingCoils.length}):
        </h2>

        <div className="coil-list">
          {matchingCoils.map((coil) => (
            <article
              key={coil.id}
              className={`coil-card ${coil.isSafe ? 'safe' : 'warning'}`}
            >
              <h3 className="coil-title">{coil.name}</h3>
              <div className="coil-meta">
                Wattage Range: <strong>{coil.minW}W – {coil.maxW}W</strong>
              </div>
              <div className="coil-meta">
                Recommended E-Liquid: <strong>{coil.bestLiquid}</strong>
              </div>
              <div className="also-fits">
                Also fits: <strong>{coil.compatibleDeviceNames}</strong>
              </div>

              {!coil.isSafe && (
                <div className="safety-alert" role="alert">
                  ⚠️ Device power too low (Max {currentDevice.maxWattage}W, requires {coil.minW}W)
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}