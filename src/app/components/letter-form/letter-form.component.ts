import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';
import {UserService} from '../../services/user/user.service';
import {EncodedLetter, Letter, LetterService} from '../../services/letter/letter.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-letter-form',
  templateUrl: './letter-form.component.html',
  styleUrls: ['./letter-form.component.scss']
})

export class LetterFormComponent implements OnInit {
  config = {
    placeholder: '',
    tabsize: 2,
    height: '400px',
    // uploadImagePath: '/api/upload',
    dialogsInBody: true,
    toolbar: [
        ['misc', ['undo', 'redo']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['picture', 'video']],
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  };


  isSending = false;
  isSaving = false;
  message = '';
  to = '';
  from = '';
  title = '';
  test: any = 'fdfds';
  summernote: any;
  model = 'test text';
  id: string;

  @Input() username: string;
  @Input() email: string;
  @Input() isAuthenticated: boolean;

  items: Observable<any[]>;
  private isAddMode: boolean;

  constructor(private oktaAuth: OktaAuthService, private userservice: UserService,
              private letterService: LetterService, private route: ActivatedRoute) {

    // listen for changes to the user's logged in status
    this.userservice.loggedIn.subscribe(status => this.isAuthenticated = status);
    console.log(this.oktaAuth.getUser().then(d => {console.log(d.time_zone); }));
  }

  async ngOnInit() {
    console.log(`email: ${this.email}`);
    this.id = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
        this.letterService.getLetter(this.id).subscribe(letter => {
          this.to = letter.to;
          this.from = letter.from;
          this.title = letter.title;
          this.username = letter.user;
        });
    
        this.letterService.getLetterContent(this.id).subscribe(content => {
          ($('#summernote') as any).summernote('code', atob(content.content));
        });
    }
    
  }

  async sendMessage() {
    this.isSending = true;
    await delay(5000);
    this.isSending = false;
    this.title = '';
    this.to = '';
    this.from = '';
    ($('#summernote') as any).summernote('code', '');
  }

  async saveLetter() {
      this.isSaving = true;
      const i = ($('#summernote') as any).summernote('code');

      const u = await this.oktaAuth.getUser();

      const b: EncodedLetter = {
        content: btoa(i),
        createdTs: new Date().toISOString(),
        to: this.to,
        from: this.from,
        user: u.email,
        title: this.title
      };

      this.letterService.saveEncodedLetter(b)
        // .pipe(finalize(() => this.isSaving = false))
        .subscribe(d => {
        this.isSaving = false;
      }, error => {
        console.error(error);
        this.isSaving = false;
      });
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

