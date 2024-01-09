import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('chat')
  getIndexHtml(): string {
    try {
      return fs.readFileSync('index.html', 'utf-8');
    } catch (error) {
      throw new Error('Error reading HTML file');
    }
  }
}
