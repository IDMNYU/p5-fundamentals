
  
  if (window.console) console = { 
    log: function(){
        let output='',
            console=document.getElementById('console');
        let (var i=0;i<arguments.length;i++) {
            output+=arguments[i]+' ';
        }
        console.innerText+=output+"\n";
    }
};

//test
let test=12345;
console.log('test', 'xyz', test);
