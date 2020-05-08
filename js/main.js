'use strict';

{
    const name=document.getElementById('name');
    const start=document.getElementById('start');
    const ul=document.getElementById('list');
    const game=document.getElementById('game');
    const input=document.getElementById('input');
    const output=document.getElementById('output');
    const next=document.getElementById('next');

    var members=[];
    var score=[];

    document.querySelector('form').addEventListener('submit',e=>{
        if(!name.value){
            alert('名前を入力してください');
            return;
        }
        e.preventDefault();
        
        const del=document.createElement('button');
        del.textContent='delete';

        const li=document.createElement('li');
        del.addEventListener('click',()=>{
            li.remove();
        });

        li.textContent=name.value;
        li.appendChild(del);
        ul.appendChild(li);
        name.value='';
    });

    
    start.addEventListener('click',()=>{
        if(ul.childElementCount<2){
            alert('メンバーを追加してください');
            return;
        }
        input.classList.add('disable');
        output.classList.remove('disable');

        for(let i=0;i<ul.childElementCount;i++){
            score[i]=[];
            for(let j=0;j<ul.childElementCount;j++)
                if(i==j){
                    score[i][j]=1;
                }else{
                    score[i][j]=0;
                }
        }

        for(let i=0;i<ul.childElementCount;i++){
            const li=document.querySelectorAll('li')[i];
            members.push(li.textContent.split('delete').join(''));
        }
        
        make_game();
    });

    next.addEventListener('click',()=>{
        if(score.every(value=>value>0)){
            alert('ゲーム終了');
            return;
        }

        while( game.firstChild ){
             game.removeChild( game.firstChild );
        }
        make_game();
    });
        
    function make_game(){
        console.log(score);
        

        var members_=shuffle([...members]);

        for(let i=0;i<members_.length/2+1;i+=2){
            score[members.indexOf(members_[i])][members.indexOf(members_[i+1])]=1;
            score[members.indexOf(members_[i+1])][members.indexOf(members_[i])]=1;
            console.log(members.indexOf(members_[i]));
        }
        
        console.log(members_);

        for(let i=0;i<members_.length/2+1;i+=2){
            const li=document.createElement('li');
            li.textContent=`${members_[i]} - ${members_[i+1]}`;
            game.appendChild(li);
            
        
        }
        if(members_.length%2===1){
            const li=document.createElement('li');
            li.textContent=`不戦勝　${members_[members_.length-1]}`;
            game.appendChild(li);
        }
    }

    function shuffle(arr){
        let e=0;
        do{
            for (let i=arr.length-1;i>0;i--) {
                const j=Math.floor(Math.random()*(i+1));
                [arr[j],arr[i]]=[arr[i],arr[j]];
            }
    
            e=0;
            for(let i=0;i<arr.length/2+1;i+=2){
                e+=score[members.indexOf(arr[i])][members.indexOf(arr[i+1])];
            }

        }while(e>0);
        
        return arr;
    }
}