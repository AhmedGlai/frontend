import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, combineLatest, fromEvent, Subject } from 'rxjs';
import { switchMap, tap, map, startWith, timeout, delay, take, takeUntil } from 'rxjs/operators';

import { Message, Chat } from 'src/app/models/chat';
import { ProfileUser } from 'src/app/models/user-profile';
import { PresenceService } from 'src/app/services/presence.service';
import { ChatsService } from 'src/app/services/chats.service';
import { UsersService } from 'src/app/services/users.service';



interface Patient {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  profilePhoto: string;
  appointmentHistory: {
    id: number;
    date: string;
    reason: string;
  }[];
}
type Target = Document | HTMLElement;
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  @ViewChild('endOfChat')
  endOfChat!: ElementRef;
  scrollcounter=0
  user$: Observable<ProfileUser | null>;
  user2$!: Observable<ProfileUser | null>;
  AllmyChats1$!: Observable<Chat[]>;
  messages$: Message[]=[]
  scrollContainer!: HTMLElement;
  @ViewChild('chatArea')
  chatArea!: ElementRef;

  
  searchControl =""
  messageControl = new FormControl('');
  newMessage: string
  scrollPos: number = 0;
  chatListControl: FormControl = new FormControl([""]);
  user!: ProfileUser;
  status$!: string;
  currentChat!:Chat
  suggestedUsers:ProfileUser[]=[]
  loadmsgNumber=15
  incall:string=""
  unsubscribe$ = new Subject<void>();
   userHaveCallID=""
   
  incallIdObserver:Observable<string>
  constructor(
    private elementRef: ElementRef,
    private usersService: UsersService,
    private chatsService: ChatsService,
    private presence: PresenceService,

  ) {
    this.user$ = this.usersService.currentUserProfile$;
    this.newMessage=""
    this.AllmyChats1$=this.chatsService.myChats$
          
    this.incallIdObserver   = new Observable<string> ((observer)=>{
      this.usersService.currentUserProfile$.pipe(map((k)=>{
        this.userHaveCallID=k?.IncallId!
        this.user$.pipe(take(1)).subscribe((user)=>{
          this.chatsService.checkCall(user!)
    
        })
        
        observer.next(this.userHaveCallID)
      })).subscribe()
      
    }) 
    this.incallIdObserver.subscribe((k)=>{
      console.log(this.userHaveCallID);

    })

  }
  ngOnInit(): void {
   this.user$.subscribe((k)=>{
    this.user=k!
   
   })
   this.user$.subscribe((k)=>{
    if(k?.IncallId){
       this.userHaveCallID=k.IncallId
    }
   
  })
   

 
  }

  
  SearchUser(){
   this.usersService.allUsers$.subscribe((k)=>{
    this.suggestedUsers=k
    console.log(this.scrollPos)
   })
  }
  
  createChat(user: ProfileUser) {
    this.chatsService.createChat(user).pipe(  take(1)).subscribe()
  
      
  }
  sendMessage() {

 
    const message = this.newMessage;
    console.log(this.newMessage)
    const selectedChatId = this.currentChat.id
    if (message && selectedChatId) {
      this.chatsService
        .addChatMessage(selectedChatId, message)
        .subscribe(() => {
          this.scrollToBottom()
        });
      this.newMessage="";
    
    }
  
  }
  ngAfterViewInit(): void {
    // Code to run after the view and its child views are initialized
    // Access DOM elements and perform actions here
    if (this.endOfChat) {
      let chatArea: HTMLElement = this.endOfChat.nativeElement;
      this.scrollPos = chatArea.scrollHeight;
      
  }
  }
  scrollToBottom() {
    if (this.endOfChat) {
      let chatArea: HTMLElement = this.endOfChat.nativeElement;
      this.scrollPos = chatArea.scrollHeight;
  }

  }
  scrollToBottommin() {
    if (this.endOfChat) {
      let chatArea: HTMLElement = this.endOfChat.nativeElement;
      this.scrollPos = chatArea.scrollHeight/8;
  }

  }
  sendmsg(){
    const element = this.endOfChat.nativeElement;
    const scrollPosition = element.scrollTop;
   
    if(scrollPosition==0){
      this.scrollToBottommin()
      this.loadmsgNumber+=5
      console.log('Scroll Position:', this.scrollPos);
      
  
        // Code to be executed after the delay
        this.setChat(this.currentChat) 
    
    
    }
  }

  focusSearch() {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    searchInput.focus();
  }
 
  getUserProfilePhoto(chat:Chat){
   
    return  chat.users.find((c)=>c.displayName==chat.chatName)?.photoURL
  }
  getUserName(chat:Chat){
    return  chat.users.find((c)=>c.displayName==chat.chatName)?.displayName
  }
  getUserName1(chat:string[]){
    return "dzad"
  }
  getUserName2(chat:string[]){
    return "dzad"
  }
  formatTime(chat:Chat){
    return "dzad"
  }
  getUserStatus(chat:Chat){
   
   let uid =chat.userIds.find((c)=>c!=this.user.uid)
   
   if(uid){
    
   this.presence.getPresence( uid).subscribe((k)=>{
  
   this.status$=k
    })


   }
   return


  }
  isOwnMessage(message:Message){

  }
  setChat(cht:Chat){
    
  console.log(cht)
  this.currentChat=cht
  this.chatsService.getChatMessages$(cht.id,this.loadmsgNumber).subscribe((k2)=>{
    this.messages$=k2
  })

  this.AllmyChats1$.subscribe((async (k)=>{
    if(k.length>0){
      if(this.messages$.length>10){
        console.log("tttttttttttt")
        const chatArea: HTMLElement = this.endOfChat.nativeElement;
        
      }else{
    
      }
    }else{
    
    console.log('ttt')
   } }))

  }
   openchat(cht:Chat){
    this.setChat(cht)

    of(null).pipe(delay(100)).subscribe(() => {
      // Code to be executed after the delay
      this.scrollToBottom()
    });
 
  }
  async startCall(){

    await this.chatsService.starCall(this.currentChat,this.user)
   
  }

}

