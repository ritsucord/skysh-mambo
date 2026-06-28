import { mockSignals } from '../data/mockSignals.js';

export function getAllSignals() {
  // TODO: Replace this mock response with a backend API request.
  // Example: return fetch('/api/signals').then((response) => response.json());
  return Promise.resolve(mockSignals);
}

export function getSignalData(symbol) {
  // TODO: Replace this mock lookup with a backend API request.
  // Example: return fetch(`/api/signals/${encodeURIComponent(symbol)}`).then((response) => response.json());
  const normalizedSymbol = String(symbol || '').trim().toUpperCase();

  return Promise.resolve(
    mockSignals.find((signal) => signal.symbol.toUpperCase() === normalizedSymbol) || null
  );
}
