var currentID = 0

$(document).on('pagebeforeshow', '#index', function(){       
    $('.move').draggable({
        drag: function( event, ui ) {
            $(ui.helper).addClass('moving');
            EditIMG(ui.helper); 
        }
    });
    
    $('.move').on('click',function(){
           EditIMG(this); 
    })
    
    /* $('.ZoomIn').on('mousedown',function(){
            ZoomIn() 
     })
     
     $('.ZoomOut').on('mousedown',function(){
            ZoomOut() 
     })*/
    
}); 


/iPad|iPhone|Android/.test( navigator.userAgent ) && (function( $ ) {

var proto =  $.ui.mouse.prototype,
_mouseInit = proto._mouseInit;

$.extend( proto, {
    _mouseInit: function() {
        this.element
        .bind( "touchstart." + this.widgetName, $.proxy( this, "_touchStart" ) );
        _mouseInit.apply( this, arguments );
    },

    _touchStart: function( event ) {
        /* if ( event.originalEvent.targetTouches.length != 1 ) {
            return false;
        } */

        this.element
        .bind( "touchmove." + this.widgetName, $.proxy( this, "_touchMove" ) )
        .bind( "touchend." + this.widgetName, $.proxy( this, "_touchEnd" ) );

        this._modifyEvent( event );

        $( document ).trigger($.Event("mouseup")); //reset mouseHandled flag in ui.mouse
        this._mouseDown( event );

        //return false;           
    },

    _touchMove: function( event ) {
        this._modifyEvent( event );
        this._mouseMove( event );   
    },

    _touchEnd: function( event ) {
        this.element
        .unbind( "touchmove." + this.widgetName )
        .unbind( "touchend." + this.widgetName );
        this._mouseUp( event ); 
    },

    _modifyEvent: function( event ) {
        event.which = 1;
        var target = event.originalEvent.targetTouches[0];
        event.pageX = target.clientX;
        event.pageY = target.clientY;
    }

});

})( jQuery );

// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

var pictureSource;    
var destinationType;
var strImgBase64
    
    document.addEventListener("deviceready",onDeviceReady,false);
    
    
    function onDeviceReady() {
        pictureSource   = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }

    function createImagen(){
        var ID =  'IMG-'+getRandom(0,999999999999);
        $('#content-area').append('<img id="'+ID+'" style="display:none" class="add-image move"/>');
        return ID;
    }
    
    function onPhotoDataSuccess(imageURI) { 
            var IdElementImg = createImagen();
            var imgProfile = document.getElementById(IdElementImg);
            imgProfile.style.display = 'block';
            strImgBase64   = "data:image/jpeg;base64,"+imageURI;
            imgProfile.src = strImgBase64;
            alert(IdElementImg); 
            jQuery('#'+IdElementImg).draggable({
                    drag: function( event, ui ) {
                        $(ui.helper).addClass('moving');
                        EditIMG(ui.helper); 
                    }
            })
           
            // setTimeout(capturaScreen, 1000);
             
    }
     
    function capturePhoto() {
        // document.getElementById('botonera').style.display = 'none';
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, 
                                    { quality: 50, 
                                      destinationType: destinationType.DATA_URL,
                                      correctOrientation: true 
                                    });
    }

    function onFail(message) {
      // document.getElementById('botonera').style.display = 'block';    
      alert('Failed because: ' + message);
    }

    function capturaScreen(){
        var nameField = 'creandoapp-'+getRandom(1,999999999);
        navigator.screenshot.URI(function(error,res){
        // navigator.screenshot.save(function(error,res){  
          if(error){ 
            alert(error); 
          }else{
              strImgBase64 =  res.URI
              var shareBtn = '<button onclick="capturePhoto();" id="btnCapture">Capture Photo</button><button id="btnShared" onclick="window.plugins.socialsharing.share(\'CreandoApp - Feliz navidad\', \'Esta es tu foto de navidad\', \''+strImgBase64+'\', null)">Compartir</button>';
              
              // document.getElementById('botonera').innerHTML = shareBtn;
              // document.getElementById('botonera').style.display = 'block';
              
          }
        },'jpg',100,nameField);
        
        
    }
    
    function getCid(){
        return $('#'+currentID);
    }
    function getRandom(min, max) { 
       return Math.floor(Math.random()*(max-min+1)+min);
    }

    function ZoomIn(){
            var ele = $(getCid());
            var w = ele.width();
            ele.css({ width : (w+10)});
    }

    function ZoomOut(){
            var ele = $(getCid());
            var w = ele.width();
            ele.css({ width : (w-10)});
    }
    
    function DelElem(){
        $('#'+currentID).remove();
        currentID = 0;
        backMenu()
    }

    function EditIMG(ele){
            $('#btn-grup-1').hide();
            $('#btn-grup-2').show();
            currentID = $(ele).attr('id');
    }

    function backMenu(){
          $('#btn-grup-2').hide();
          $('#btn-grup-1').show();
    }