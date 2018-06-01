import { Component, OnInit, Input } from '@angular/core';

import { EventHandler } from '../../../Services/EventHandler.service'
@Component({
  selector: 'app-userprof',
  templateUrl: './userprof.component.html',
  styleUrls: ['./userprof.component.css']
})
export class UserprofComponent implements OnInit
{
  @Input('projects') projects: any
  @Input('meetings') meetings: any
  @Input('currentUser') currentUser: any
  @Input('userToShow') userToShow: any
  @Input('newsList') newsList: any





  public showContent: any = false
  public isSpanish

  constructor( public events : EventHandler )
  {
    this.isSpanish = this.events.isSpanish
    this.events.language.subscribe( isSpanish => {
      this.isSpanish = isSpanish
      console.log( this.isSpanish )
    })


  }

  ngOnInit()
  {
  }

  ngOnChanges()
  {
    if( this.projects && this.meetings && this.currentUser && this.userToShow && this.newsList )
    {
      this.newsList = this.newsList.filter( (elem, index, self) => self.findIndex( (t) => { return ( t._links.self.href === elem._links.self.href ) } ) === index )

      console.log( this.newsList )

      this.showContent = true
    }
  }


}
