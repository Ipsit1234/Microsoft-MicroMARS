import { Component } from '@angular/core';


export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
    content: string;
    photoId: string;
    email: string;
    git: string;
  }

@Component({
  selector: 'app-second-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent {  // contains the team details
  tiles: Tile[] = [

      {text: 'Anjali Yadav', cols: 2, rows: 2, color: 'linear-gradient( #ffd48f,#fa9600)',
     content: `I'm Anjali, second-year undergrad, Electrical Engineering, IIT Bombay.
      I find game theory and related fields really fascinating. I'm into fine-arts and designing and enjoy watching sitcoms.
      Reading (especially psychological stuff) is something I have started liking recently.`,
      photoId: 'https://drive.google.com/thumbnail?id=1mcHXapKVgjpvWn_zfq7I6Da-bgATSh5r',
      email:'mailto:anjaliyadavay3008@gmail.com',git:'https://www.github.com/anjaliyadav3008'},

      {text: 'Avyakta Wrat', cols: 2, rows: 2, color: 'linear-gradient( #f19f84,#eb7f52)',
      content: `Hey There! I am Avyakta from Electrical Engineering Department of IIT-Bombay.
      I love exploring around and finding solutions to challenging problems! I enjoy music and books :)`,
      photoId:'https://drive.google.com/thumbnail?id=1WUdk_GejPk76rPJSU_mEbZp38CDUxYxF',
      email:"mailto:avyaktawrat@gmail.com",git:"https://www.github.com/avyaktawrat"},

      {text: 'Mantri Krishna Sri Ipsit', cols: 2, rows: 2, color: 'linear-gradient( #84bcf1,#5299eb)',
      content: 'Howdy! I am Ipsit from Electrical Engineering Department of IIT Bombay. Nice that you are seeing our project :P',
        photoId:'https://drive.google.com/thumbnail?id=1xck_3blWnhI3TblKLcILwugrAy3iquhd',
        email:'mailto:mmkipsit@gmail.com',git:'https://github.com/Ipsit1234'},

     {text: 'Nayan', cols: 2, rows: 2, color: 'linear-gradient( #84c9f1,#52abeb)',
     content: 'Hey! I am Nayan from Electrical Engineering Department of IIT-Bombay. I absolutely love the game Dota 2 and I’ve played a bit too much of it but it never gets boring. ',
      photoId:'https://drive.google.com/thumbnail?id=1-D26ZbQlj8eYTEHLCEEU_Ng5dTy4yLeV',
      email:"mailto:nbarhate151@gmail.com",git:"https://www.github.com/nayan0037"},
  ];
}
