'use strict';

{
    //const add=document.getElementById('add');
    const name=document.getElementById('name');
    const start=document.getElementById('start');
    const ul=document.getElementById('list');
    const game=document.getElementById('game');
    const input=document.getElementById('input');
    const output=document.getElementById('output');
    const next=document.getElementById('next');

    //const del=document.createElement('button');

    document.querySelector('form').addEventListener('submit',e=>{
        e.preventDefault();

        //members.push(name.value);
        //console.log(members);
        
        const del=document.createElement('button');
        del.textContent='delete';

        const li=document.createElement('li');
        del.addEventListener('click',()=>{
            console.log('OK');
            li.remove();
        });
        li.textContent=name.value;
        li.appendChild(del);
        ul.appendChild(li);

        name.value='';
    });

    
    start.addEventListener('click',()=>{
        input.classList.add('disable');
        output.classList.remove('disable');
        
        make_game();
    });

    next.addEventListener('click',()=>{
         while( game.firstChild ){
             game.removeChild( game.firstChild );
           }
        make_game();
    });
        
    function make_game(){
        var members=[];
        
        //console.log(members);
        for(let i=0;i<ul.childElementCount;i++){
            const li=document.querySelectorAll('li')[i];
            // li.del.remove();
            members.push(li.textContent.split('delete').join(''));
        }
        shuffle(members);
        console.log(members);

        for(let i=0;i<members.length/2;i+=2){
            const li=document.createElement('li');
            li.textContent=`${members[i]} - ${members[i+1]}`;
            game.appendChild(li);
            
        
        }
        if(members.length%2===1){
            const li=document.createElement('li');
            li.textContent=`不戦勝　${members[members.length-1]}`;
            game.appendChild(li);
        }
    }

    function shuffle(arr){
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
          }
        return arr;
    }
}