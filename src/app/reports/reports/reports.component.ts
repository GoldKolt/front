import { Component, OnInit } from '@angular/core';
import {ReportService} from '../report.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportService]
})
export class ReportsComponent implements OnInit {

  reportType = 'PDF';
  constructor(private reportService: ReportService, private router: Router) { }

  ngOnInit() {
  }

  CarServiceReport() {
    this.reportService.getCarServiceReport(this.reportType).subscribe(resp => {
      const blob = new Blob([resp], {type: ('application/' + this.reportType.toLowerCase()) });
      const date = new Date();
      const fileName = 'CarServiceReport_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() +
        '_' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '.' + this.reportType.toLowerCase();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  }

  ClientReport() {
    this.reportService.getClientReport(this.reportType).subscribe(resp => {
      const blob = new Blob([resp], {type: ('application/' + this.reportType.toLowerCase()) });
      const date = new Date();
      const fileName = 'ClientReport_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() +
        '_' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '.' + this.reportType.toLowerCase();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  }

  MasterReport() {
    this.reportService.getMasterReport(this.reportType).subscribe(resp => {
      const blob = new Blob([resp], {type: ('application/' + this.reportType.toLowerCase()) });
      const date = new Date();
      const fileName = 'MasterReport_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() +
        '_' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '.' + this.reportType.toLowerCase();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  }

  RequestReport() {
    this.reportService.getRequestReport(this.reportType).subscribe(resp => {
      const blob = new Blob([resp], {type: ('application/' + this.reportType.toLowerCase()) });
      const date = new Date();
      const fileName = 'RequestReport_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() +
        '_' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '.' + this.reportType.toLowerCase();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  }

  SparePartReport() {
    this.reportService.getSparePartReport(this.reportType).subscribe(resp => {
      const blob = new Blob([resp], {type: ('application/' + this.reportType.toLowerCase()) });
      const date = new Date();
      const fileName = 'SparePartReport_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() +
        '_' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '.' + this.reportType.toLowerCase();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  }
}
