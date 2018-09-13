import * as os from 'os';

import { BehaviorSubject } from "rxjs";
import { CpuMetric } from "@metrics/CpuMetric";
import { MetricOptions } from "@models/MetricOptions";
import { MetricValue } from "@models/MetricValue";

export class CpuMetricWatcher {
  private os = os;
  private metric: CpuMetric;
  private options: MetricOptions = {
    interval: 1000,
  }

  constructor(options: MetricOptions = new MetricOptions()) {
    this.options.interval = options.interval || this.options.interval;
    this.metric = new CpuMetric(this.os);
  }

  schedule(stream: BehaviorSubject<MetricValue>) {
    setInterval(() => {
      let currentValue: MetricValue = new MetricValue('cpu', this.metric.getCurrentValue());
      stream.next(currentValue);
    }, this.options.interval);
  }
}