// AngularJS script for fetching and data bindings
    var app = angular.module('ame-sol', [])
    app.controller('whoAreYou', whoAreYouComtroller )
    app.controller('myPart', myPart )
    app.controller('sendToAfriend', sendToAfriend )

    async function whoAreYouComtroller( $scope, $http )
    {

        $scope.name = ""
        $scope.email = ""

        $scope.send = function() {
        if( $scope.name === ""  )
        {
            alert("Ingrese su nombre")
        }
        else
        {
            console.log( $scope.name)
        }
        if( $scope.email === ""  )
        {
            alert("Ingrese un correo")
        }
        else if( $scope.email === undefined )
        {
            alert("Ingrese bien su correo")
        }
        else
        {
            console.log( $scope.email)
        }

        }

    }


    async function myPart( $scope, $http )
    {

        $scope.contacto = 
        {
            text: '',
            name: '',
            email: '',
            opcion: 'Elige una opcion'
        }

        $scope.options = 
        [ 
            {
                value: 0, 
                content: 'Construir una sociedad multicultural'
            },
            {
                value: 1, 
                content: 'Vane longi'
            },
            {
                value: 2, 
                content: 'Vane bacan'
            }  ,
            {
                value: 3, 
                content: 'Elige una opcion'
            }  
        ]


        $scope.send = function() 
        {
        if( $scope.contacto.text === ""  )
        {
            alert("Ingrese texto")
        }
        else if( $scope.contacto.opcion === 'Elige una opcion' )
        {
            alert("Elige una opcion porfi")
        }
        else if( $scope.contacto.name+$scope.contacto.email === ""  )
        {
           alert("Ingrese su correo")
        }
        else
        {
            console.log("El objeto completo es", $scope.contacto)
        }

        }

    }


    async function sendToAfriend($scope, $http )
    {

        $scope.email = ""

        $scope.send = function() 
        {
        if( $scope.email === ""  )
        {
            alert("Ingrese un correo")
        }
        else if( $scope.email === undefined )
        {
            alert("Ingrese bien su correo")
        }
        else
        {
            console.log( $scope.email)
        }

        }

    }
   

    let twitterShare = document.querySelector('[data-js="twitter-share"]');

    twitterShare.onclick = function(e) {
      e.preventDefault();
      let twitterWindow = window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');
      if(twitterWindow.focus) { twitterWindow.focus(); }
        return false;
      }

    let facebookShare = document.querySelector('[data-js="facebook-share"]');

    facebookShare.onclick = function(e) {
      e.preventDefault();
      let facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.URL, 'facebook-popup', 'height=350,width=600');
      if(facebookWindow.focus) { facebookWindow.focus(); }
        return false;
    }


/*$("#registro").on("submit", function(event){
    event.preventDefault();
    var name, email;
    name = $(this).find('input[name*="nombre"]').val();
    email = $(this).find('input[name*="email"]').val();
    console.log(name, email)
    var valido = true;
    var error = '';
    if(name.length === 0)
    {
        valido = false;
        error += 'Ingrese Nombre.\n';
    }
    if(email.length === 0)
    {
        valido = false;
        error += 'Ingrese Email.\n';
    }else
    {
        var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regExpEmail.test(email))
        {
            valido = false;
            error += 'El Email debe contener el formato correcto.\n';
        }
    }
    if(!valido)
    {
        alert(error)
        return;
    }

})


$("#send-testament").on("submit", function(event){
    event.preventDefault();
    var text;
    text = $(this).find('input[name*="text"]').val();
    console.log(text)
    var valido = true;
    var error = '';
    if(name.length === 0)
    {
        valido = false;
        error += 'Ingrese Nombre.\n';
    }
    if(!valido)
    {
        alert(error)
        return;
    }

})



$("#form-share").on("submit", function(event){
    event.preventDefault();
    var email;
    email = $(this).find('input[name*="email"]').val();
    console.log(email)
    var valido = true;
    var error = '';
    if(email.length === 0)
    {
        valido = false;
        error += 'Ingrese Email.\n';
    }else
    {
        var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regExpEmail.test(email))
        {
            valido = false;
            error += 'El Email debe contener el formato correcto.\n';
        }
    }
    if(!valido)
    {
        alert(error)
        return;
    }

})*/