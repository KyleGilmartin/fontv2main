import { Component, OnInit } from '@angular/core';
import { HistoryItem } from './history-items';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public data: HistoryItem[];
  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.data = this.historyService.getHistory();
  }

  remove(item: HistoryItem) {

    this.historyService.removeFromHistory(item);
  }
}
