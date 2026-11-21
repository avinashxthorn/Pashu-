/// <reference types="vite/client" />

interface Window {
  PashuDevice?: { ready(): void; exportBackup(json: string): void };
  pashuBack?: () => boolean;
}
