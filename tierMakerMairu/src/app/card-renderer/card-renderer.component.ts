import { Component } from '@angular/core';
enum CardRendererTypeEnum {
  TEXT_FIELD = "textField",
  IMAGE = "image"
}

@Component({
  selector: 'app-card-renderer',
  templateUrl: './card-renderer.component.html',
  styleUrls: ['./card-renderer.component.scss']
})


export class CardRendererComponent {
  cardRendererTypeEnum = CardRendererTypeEnum;
  json: any = {};
  
  constructor() {
    this.json = {
      title: "Título",
      subtitle: "Sub",
      fields: [
        {
          type: this.cardRendererTypeEnum.TEXT_FIELD,
          data: "Texto1",
        },
        {
          type: this.cardRendererTypeEnum.TEXT_FIELD,
          data: "Texto1",
        },
      ],
      buttons: [
        {
          text: "Botón1",
          action: "algo",
        },
        {
          text: "Botón 2",
          action: "algo",
        },
      ],
    }
  }
}
