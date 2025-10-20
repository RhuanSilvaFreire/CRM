export type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days';

export interface FunnelMessage {
  id: string;
  content: string;
  delay: number;
  unit: TimeUnit;
}

export type FunnelConfigurations = {
  [columnId: string]: FunnelMessage[];
};
