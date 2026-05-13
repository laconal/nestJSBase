import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('/metrics')
  async metrics() {
    return this.metricsService.getMetrics();
  }
}