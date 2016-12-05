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

    function onPhotoDataSuccess(imageURI) { 
            var imgProfile = document.getElementById('smallImage');
            imgProfile.style.display = 'block';
            strImgBase64   = "data:image/jpeg;base64,"+imageURI;
            imgProfile.src = strImgBase64;
            
           // setTimeout(capturaScreen, 1000);
            
    }
     
    function capturePhoto() {
        document.getElementById('botonera').style.display = 'none';
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, 
                                    { quality: 50, 
                                      destinationType: destinationType.DATA_URL,
                                      correctOrientation: true 
                                    });
    }

    function onFail(message) {
      document.getElementById('botonera').style.display = 'block';    
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

    function getRandom(min, max) { 
        return Math.random() * (max - min) + min;
    }