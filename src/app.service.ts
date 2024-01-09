import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getIndexHtml(): string {
    try {
      return fs.readFileSync('index.html', 'utf-8');
    } catch (error) {
      throw new Error('Error reading HTML file');
    }
  }
}
