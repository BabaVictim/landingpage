import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(private router: Router){}

  files: Array<any> = []
  openFile: string = ""
  openInMenu: Array<string> = []
  codeContent: string = ""
  lineNumbers: string = ""

  ngOnInit(){
    this.getFiles()
  }

  getFiles(){
    let files = localStorage.getItem('settingsJSON')
    // TODO: Files erstelle
    if(!files){ 
      files = ""
    }
    this.files = JSON.parse(files)
  }

  openFileAction(fileToOpen: string){
    this.openFile = fileToOpen
    if(!this.openInMenu.includes(fileToOpen)){
      this.openInMenu.push(fileToOpen)
    }
    this.getCodeByName(fileToOpen)
  }

  focusFile(fileToFocus: string){
    if(this.openInMenu.includes(fileToFocus)){
      this.openFile = fileToFocus
      this.getCodeByName(fileToFocus)
    }
  }

  closeFile(fileToClose: string){
    this.openInMenu = this.openInMenu.filter(filename => filename != fileToClose)
    if(this.openInMenu.length > 0){
      this.openFile = this.openInMenu[this.openInMenu.length - 1]
      this.getCodeByName(this.openInMenu[this.openInMenu.length - 1])
    }else{
      this.openFile = ''
    }
  }

  getCodeByName(fileName: string){
    try{
      if(this.parseable(this.files.filter(file => file.name == fileName)[0].content)){
        this.codeContent = JSON.stringify(JSON.parse(this.files.filter(file => file.name == fileName)[0].content), null, 2)
      }else{
        this.codeContent = this.files.filter(file => file.name == fileName)[0].content
      }
      this.setLineNumbers()
    }catch{this.codeContent = ''}
  }

  saveChanges(fileName: string){
    // set numbers on change
    this.setLineNumbers()
    // save changes
    const fileIndex = this.files.findIndex(f => f.name === fileName);
    if (fileIndex !== -1) {
      this.files[fileIndex].content = this.codeContent; 
      localStorage.setItem('settingsJSON', JSON.stringify(this.files));
    }
  }

  setLineNumbers(){
    this.lineNumbers = ''
    for(var i = 0; i < ((this.codeContent.match(/\n/g) || '').length + 1); i++){
      this.lineNumbers += (i + 1) + '\n'
    }
  }

  parseable(string: string){
    try {
      JSON.parse(string);
      return true;
    } catch (e) {
      return false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key.toLowerCase() === 's') {
      event.preventDefault(); // Prevent the default browser save action
      this.router.navigateByUrl('/target-route');
    }
  }
}