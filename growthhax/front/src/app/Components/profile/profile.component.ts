import { Component, OnInit } from '@angular/core';
import { EventHandler } from '../../Services/EventHandler.service'
import { AuthenticationService } from '../../Services/Authentication.service'
import { Router } from '@angular/router'


//Profile data model
import { ProjectService } from '../../Services/Project.service'
import { ExperienceService } from '../../Services/Experience.service'
import { PupilService } from '../../Services/Pupil.service'
import { MeetService } from '../../Services/Meet.service'
import { UserService } from '../../Services/User.service'
import { CompanyUserService } from '../../Services/CompanyUser.service'
import { CalendarUserService } from '../../Services/CalendarUser.service'
import { EventService } from '../../Services/Event.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUser: any
  public userToShow: any


  public userProjects: any
  public mentorExperiences: any
  public enterpriseWorkers: any

  public meetingList: any
  public newsList: any


  public showUserProfile: any = false
  public showMentorProfile: any = false
  public showEnterpriseProfile: any = false

  public isSpanish

  constructor(
    public auth: AuthenticationService,
    public events : EventHandler,
    public router: Router,
    public projectService: ProjectService,
    public experienceService: ExperienceService,
    public pupilService: PupilService,
    public meetService: MeetService,
    public userService: UserService,
    public companyUserService: CompanyUserService,
    public eventService: EventService,
    public calendarUserService: CalendarUserService )
  {


    this.isSpanish = this.events.isSpanish
    this.events.language.subscribe( isSpanish => {
      this.isSpanish = isSpanish
      console.log( this.isSpanish )
    })
    
    if( !localStorage.getItem('currentUser') )
    {
      this.auth.logout()
      this.events.singOut()
      this.router.navigate(['login'])
    }
    else
    {
      this.currentUser = JSON.parse( localStorage.getItem('currentUser') )
      this.events.singIn()

      localStorage.getItem('userToShow') ? this.userToShow = JSON.parse(localStorage.getItem('userToShow')) : this.userToShow = this.currentUser

      console.log( this.userToShow )
      this.meetingList = []
      this.newsList = []


      //User
      if( this.userToShow.role === '1' )
      {
        this.loadUserStuff()

      }
      //Enterprise
      else if( this.userToShow.role === '3' )
      {
        this.loadEnterpriseStuff()
      }
      //Mentor
      else if( this.userToShow.role === '4' )
      {
        this.loadMentorStuff()
      }



    }

    this.events.transmition.subscribe( data => {
      data.userToShow ? this.userToShow = data.userToShow :  console.log("I heard the event, but i'm not have anything to do with it. Im Profile component")
    })
  }

  ngOnInit()
  {
  }


  ngOnDestroy()
  {
    console.log("ME DESTRUYEN!!")
    localStorage.removeItem('userToShow')
  }


  serializeUsers()
  {
    for( let worker of this.enterpriseWorkers )
    {
      this.userService.show( worker.user_id1 ).subscribe( data => {
        worker.user_id1 = data
      })
    }
  }



  loadEnterpriseStuff()
  {
      console.log("LOADING ENTERPRISE STUFF...")
      let userId = this.userToShow.id ? this.userToShow.id.toString() : this.userToShow._links.self.href.split('/')[ ( this.userToShow._links.self.href.split('/').length - 1 ) ]


      this.companyUserService.index().subscribe( data => {
        data = data._embedded.companyusers
        data = data.filter( rel => rel.user_id === userId )
        this.enterpriseWorkers = data
        this.serializeUsers()
        this.loadMeetings( userId )
        this.loadNews( userId )
        this.showEnterpriseProfile = true
      })
  }



  loadMentorStuff()
  {

    console.log("LOADING MENTOR STUFF...")
    let userId = this.userToShow.id ? this.userToShow.id.toString() : this.userToShow._links.self.href.split('/')[ ( this.userToShow._links.self.href.split('/').length - 1 ) ]

    this.experienceService.index().subscribe( experiences => {

      experiences = experiences._embedded.experiences
      experiences = experiences.filter( exp => exp.user_id === userId )

      this.mentorExperiences = experiences
      this.loadMeetings( userId )
      this.loadNews( userId )
      this.showMentorProfile = true
    })
  }


  loadUserStuff()
  {

        console.log("LOADING USER STUFF...")



        let userId = this.userToShow.id ? this.userToShow.id.toString() : this.userToShow._links.self.href.split('/')[ ( this.userToShow._links.self.href.split('/').length - 1 ) ]

        this.projectService.index().subscribe( projects => {

          projects = projects._embedded.projects
          projects = projects.filter( project => project.user_id === userId )

          this.userProjects = projects
          this.loadMeetings( userId )
          this.loadNews( userId )
          this.showUserProfile = true


        })
  }



  loadMeetsUsers()
  {
    for( let meet of this.meetingList )
    {
      this.userService.show( meet.otherUser ).subscribe( user => {
        meet.otherUser = user
      })
    }

  }



  loadMeetings( userId )
  {
        this.pupilService.index().subscribe( pupils => {
          pupils = pupils._embedded.pupils

          pupils = pupils.filter( pupil => pupil.user_id === userId || pupil.user_id1 === userId )


          this.meetService.index().subscribe( meetings => {
            meetings = meetings._embedded.meets

            for( let pupil of pupils )
            {
              let pupilId = pupil._links.self.href.split('/')[ ( pupil._links.self.href.split('/').length - 1 ) ]
              let mymeet = meetings.filter( meet => meet.pupil_id === pupilId )

              let otherUser = parseInt(pupil.user_id) === parseInt(userId) ? pupil.user_id1 : pupil.user_id

              for( let meet of mymeet )
              {
                meet.otherUser = otherUser
              }


              if( mymeet.length >= 1 )
              {
                this.meetingList = this.meetingList.concat(mymeet)
              }

            }


            this.loadMeetsUsers()
            this.loadNews( userId )



          })
        })
  }



  loadNews( userId )
  {

    this.calendarUserService.index().subscribe( calendarUsers => {
      calendarUsers = calendarUsers._embedded.calendarusers

      calendarUsers = calendarUsers.filter( cal => cal.user_id === userId && cal.isowner === '0' )



      if( calendarUsers.length >= 1 )
      {
        for ( let cal of calendarUsers )
        {
          this.eventService.index().subscribe( news => {
            console.log("LOOOOOOOOOOOOOOOOOOG 2")
            news = news._embedded.events
            news = news.filter( newEvent => newEvent.calendar_id === cal.calendar_id )
            this.newsList = this.newsList.concat( news )

            console.log( this.newsList )



          })
        }
      }



    })

  }



}
