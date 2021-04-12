import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HistoryItem } from './history-items';

@Injectable()
export class HistoryService {

  private historyData: HistoryItem[] = [];

  constructor() {

    const savedHistory = JSON.parse(localStorage.getItem('history'));

    if (savedHistory && savedHistory.length > 0) {

      this.historyData = savedHistory;
    }
  }

  getHistory(): HistoryItem[] {

    return this.historyData;
  }

  setHistory(item: HistoryItem) {

    this.historyData.push(item);
    localStorage.setItem('history', JSON.stringify(this.historyData));

  }

  removeFromHistory(item: HistoryItem) {

    this.historyData.forEach((d: HistoryItem, i: number) => {

      if (d.id === item.id) {

        this.historyData.splice(i, 1);
        return;
      }
    });

    localStorage.setItem('history', JSON.stringify(this.historyData));
  }
}
