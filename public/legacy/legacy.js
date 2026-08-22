(function(){
  'use strict';

  function ex(id,name,reps,label,equip,kind,step){return{id:id,name:name,reps:reps,label:label,equip:equip,kind:kind,step:step||2.5};}
  var tips={
    press:['Lopatky stáhni k sobě','Chodidla pevně do země','Pohyb veď kontrolovaně'],
    row:['Záda drž rovná','Lokty táhni k bokům','Pohyb dokonči lopatkami'],
    squat:['Kolena ve směru špiček','Zpevni střed těla','Tlač přes celá chodidla'],
    hinge:['Kyčle tlač dozadu','Záda drž neutrálně','Zátěž drž blízko těla'],
    arms:['Lokty drž stabilní','Bez houpání trupem','Využij plný rozsah'],
    core:['Žebra drž dole','Zpevni břicho i hýždě','Dýchej pod kontrolou']
  };
  var workouts=[
    {name:'Vršek A',sub:'Síla · tlak a tah',blocks:[
      {sets:4,a:ex('bench','Benchpress na lavici',8,'8 op.','VELKÁ OSA + LAVICE','press'),b:ex('dbrow','Přítahy jednoručky v předklonu',8,'8 op.','JEDNORUČKY','row')},
      {sets:3,a:ex('incline','Tlaky s jednoručkami na šikmé lavici',10,'10 op.','LAVICE + JEDNORUČKY','press'),b:ex('ezrow','Přítahy EZ osy v předklonu',10,'10 op.','EZ OSA','row')},
      {sets:3,a:ex('skull','Francouzský tlak ležmo s EZ',12,'12 op.','LAVICE + EZ OSA','arms'),b:ex('lateral','Upažování s jednoručkami vestoje',12,'12 op.','JEDNORUČKY','arms',1)},
      {sets:3,a:ex('curl','Bicepsový zdvih s EZ',12,'12 op.','EZ OSA','arms'),b:ex('pushup','Kliky na zemi',12,'12 op.','VLASTNÍ VÁHA','press')}
    ]},
    {name:'Spodek A',sub:'Nohy · plný objem',blocks:[
      {sets:4,a:ex('squat','Zadní dřep s osou',8,'8 op.','VELKÁ OSA','squat'),b:ex('rdl','Rumunský mrtvý tah s jednoručkami',8,'8 op.','JEDNORUČKY','hinge')},
      {sets:3,a:ex('bulgarian','Bulharské dřepy',10,'10 / noha','LAVICE','squat'),b:ex('stepup','Výstupy na stoličku s jednoručkami',10,'10 / noha','STOLIČKA + JEDNORUČKY','squat')},
      {sets:3,a:ex('hip','Hip thrust s osou na lavici',12,'12 op.','LAVICE + OSA','hinge'),b:ex('calf','Výpony na lýtka',12,'12 op.','JEDNORUČKY','squat',1)},
      {sets:3,a:ex('legraise','Přednožování na lavici',12,'12 op.','LAVICE','core'),b:ex('plank','Plank se zátěží',45,'45 s','PODLOŽKA','core',1)}
    ]},
    {name:'Vršek B',sub:'Ramena · záda a paže',blocks:[
      {sets:4,a:ex('ohp','Tlaky nad hlavu vestoje (OHP)',8,'8 op.','VELKÁ OSA','press'),b:ex('invrow','Inverted rows / přítahy obouruč',8,'8 op.','JEDNORUČKA / OSA','row')},
      {sets:3,a:ex('seated','Tlaky s jednoručkami sedmo',10,'10 op.','LAVICE + JEDNORUČKY','press'),b:ex('pullover','Pullover s jednoručkou ležmo',10,'10 op.','LAVICE + JEDNORUČKA','row')},
      {sets:3,a:ex('incurl','Bicepsový zdvih na šikmé lavici',12,'12 op.','LAVICE + JEDNORUČKY','arms'),b:ex('reardelt','Upažování v předklonu',12,'12 op.','JEDNORUČKY','arms',1)},
      {sets:3,a:ex('triover','Tricepsová extenze za hlavou',12,'12 op.','JEDNORUČKA','arms'),b:ex('dips','Kliky / dips mezi židlemi',12,'12 op.','ŽIDLE / ZEM','press')}
    ]},
    {name:'Spodek B',sub:'Síla · nohy a střed těla',blocks:[
      {sets:4,a:ex('deadlift','Mrtvý tah s velkou osou',8,'6–8 op.','VELKÁ OSA','hinge'),b:ex('goblet','Čelní dřep s jednoručkami',8,'6–8 op.','JEDNORUČKY','squat')},
      {sets:3,a:ex('lunge','Výpady vzad s osou / jednoručkami',10,'10 / noha','OSA / JEDNORUČKY','squat'),b:ex('bridge','Glute bridge na zemi',10,'10 op.','PODLOŽKA','hinge')},
      {sets:3,a:ex('situp','Sed-leh na šikmé lavici',15,'15 op.','LAVICE','core'),b:ex('wallsit','Wall sit',45,'45 s','STĚNA','core',1)}
    ]}
  ];

  var app=document.getElementById('app');
  var weekday=new Date().getDay();
  var state={day:weekday>=1&&weekday<=4?weekday-1:0,block:0,set:0,done:{son:false,dad:false},weights:{},reps:{},history:{},rest:null,interval:null,menu:false,help:null,finish:false};

  function load(){try{state.history=JSON.parse(localStorage.getItem('duogym-history')||'{}');state.weights=JSON.parse(localStorage.getItem('duogym-weights')||'{}');}catch(e){state.history={};state.weights={};}}
  function save(){try{localStorage.setItem('duogym-history',JSON.stringify(state.history));localStorage.setItem('duogym-weights',JSON.stringify(state.weights));}catch(e){}}
  function key(person,item){return person+':'+item.id;}
  function fmt(value){return value%1===0?String(value):value.toFixed(1);}
  function last(list){return list&&list.length?list[list.length-1]:null;}
  function current(){var workout=workouts[state.day],block=workout.blocks[state.block],swap=state.set%2===1;return{workout:workout,block:block,son:swap?block.b:block.a,dad:swap?block.a:block.b,swap:swap};}
  function suggested(person,item,sets){var list=state.history[key(person,item)]||[],old=last(list),i,full=true,recent;if(!old){return person==='son'?20:12.5;}recent=list.slice(Math.max(0,list.length-sets));if(recent.length<sets){full=false;}for(i=0;i<recent.length;i++){if(recent[i].reps<item.reps){full=false;}}return full?old.weight+item.step:old.weight;}
  function weight(person,item,sets){var value=state.weights[key(person,item)];return typeof value==='number'?value:suggested(person,item,sets);}
  function reps(person,item){var value=state.reps[key(person,item)];return typeof value==='number'?value:item.reps;}
  function esc(value){return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function dateLabel(){var names=['neděle','pondělí','úterý','středa','čtvrtek','pátek','sobota'];var months=['ledna','února','března','dubna','května','června','července','srpna','září','října','listopadu','prosince'];var d=new Date();return names[d.getDay()]+' '+d.getDate()+'. '+months[d.getMonth()];}
  function totalSets(workout){var n=0,i;for(i=0;i<workout.blocks.length;i++){n+=workout.blocks[i].sets;}return n;}
  function card(person,item,block){var old=last(state.history[key(person,item)]||[]),kg=weight(person,item,block.sets),rr=reps(person,item),isDone=state.done[person],recommend=old&&suggested(person,item,block.sets)>old.weight;return '<article class="card '+person+(isDone?' completed':'')+'"><div class="person"><span class="avatar">'+(person==='son'?'S':'T')+'</span><h2>'+(person==='son'?'Syn':'Táta')+'</h2>'+(isDone?'<span class="ready">Připraven</span>':'')+'</div><section class="exercise"><small class="equip">'+esc(item.equip)+'</small><h3>'+esc(item.name)+'</h3><b class="scheme">'+block.sets+' × '+esc(item.label)+'</b><br><button class="tech-button" data-action="help" data-person="'+person+'">Ukázat provedení</button></section><div class="previous"><small>Minule</small><b>'+(old?fmt(old.weight)+' kg × '+old.reps:'zatím bez záznamu')+'</b>'+(recommend?'<em>Doporučeno +'+fmt(item.step)+' kg</em>':'')+'</div><div class="controls"><div class="control"><span>ZÁTĚŽ</span><div class="stepper"><button data-action="weight-down" data-person="'+person+'" aria-label="Snížit zátěž">−</button><b>'+fmt(kg)+'<small>kg</small></b><button data-action="weight-up" data-person="'+person+'" aria-label="Zvýšit zátěž">+</button></div></div><div class="control"><span>OPAKOVÁNÍ</span><div class="stepper"><button data-action="reps-down" data-person="'+person+'" aria-label="Snížit opakování">−</button><b>'+rr+'</b><button data-action="reps-up" data-person="'+person+'" aria-label="Zvýšit opakování">+</button></div></div></div><button class="done-button" data-action="done" data-person="'+person+'" '+(isDone||state.rest!==null?'disabled':'')+'>'+(isDone?'Série dokončena':'Dokončil jsem sérii')+'</button></article>';}
  function modal(ctx){var html='',i,item,list;if(state.help){item=ctx[state.help];list=tips[item.kind]||tips.press;html='<div class="shade" data-action="close"><div class="modal" data-stop="1"><button class="close" data-action="close">×</button><small>JAK NA TO</small><h2>'+esc(item.name)+'</h2><div class="figure"><i class="floor"></i><div class="body"><i class="head"></i><i class="limb arm-left"></i><i class="limb arm-right"></i><i class="limb leg-left"></i><i class="limb leg-right"></i><i class="barbell"></i></div></div><ul class="tips">';for(i=0;i<list.length;i++){html+='<li><b>'+(i+1)+'</b>'+esc(list[i])+'</li>';}html+='</ul><button class="primary" data-action="close">Jasně, jdu cvičit</button></div></div>';}
    if(state.menu){html='<div class="shade" data-action="close"><div class="modal" data-stop="1"><button class="close" data-action="close">×</button><small>TRÉNINK</small><h2>Vyber den</h2><p class="hint">Pondělí až čtvrtek se správný trénink vybere automaticky.</p><div class="days">';for(i=0;i<workouts.length;i++){html+='<button class="'+(i===state.day?'active':'')+'" data-action="choose" data-index="'+i+'"><span class="day-code">'+['PO','ÚT','ST','ČT'][i]+'</span><span class="day-info"><strong>'+esc(workouts[i].name)+'</strong><small>'+esc(workouts[i].sub)+' · '+totalSets(workouts[i])+' sérií</small></span><b>→</b></button>';}html+='</div><button class="reset" data-action="reset">Smazat historii zařízení</button></div></div>';}
    if(state.finish){html='<div class="shade"><div class="modal finish"><div class="finish-mark">✓</div><small>TRÉNINK DOKONČEN</small><h2>Skvělá společná práce.</h2><p>'+totalSets(ctx.workout)+' sérií na osobu je uloženo. Příště se načtou váhy i doporučení.</p><button class="primary" data-action="next-day">Další trénink →</button><button class="reset" data-action="repeat">Zopakovat den</button></div></div>';}
    return html;
  }
  function render(){var ctx=current(),progress=((state.block+state.set/ctx.block.sets)/ctx.workout.blocks.length)*100,isTraining=weekday>=1&&weekday<=4;app.innerHTML='<div class="app"><header class="topbar"><button class="brand" data-action="menu"><span class="brand-mark">D</span><span class="brand-text">Duo<span>Gym</span></span></button><div class="title"><b>'+esc(ctx.workout.name)+'</b><small>'+esc(dateLabel())+(isTraining?'':' · volno, připraveno pondělí')+'</small></div><button class="settings-button" data-action="menu" aria-label="Nastavení">⚙</button><div class="progress"><i style="width:'+progress+'%"></i></div></header><div class="status"><span>BLOK '+(state.block+1)+' Z '+ctx.workout.blocks.length+'</span><b>Série '+(state.set+1)+' <i>z '+ctx.block.sets+'</i></b><span>'+(ctx.swap?'Stanoviště prohozena':'Začínáme')+'</span></div><section class="grid">'+card('son',ctx.son,ctx.block)+card('dad',ctx.dad,ctx.block)+'</section>'+(state.rest!==null?'<div class="rest"><strong>Odpočinek</strong><span>další série za '+state.rest+' s</span><span class="rest-bar"><i style="width:'+(state.rest/30*100)+'%"></i></span><button data-action="continue">Pokračovat hned</button></div>':'')+modal(ctx)+'</div>';}
  function clearRest(){if(state.interval){clearInterval(state.interval);}state.interval=null;state.rest=null;}
  function resetPosition(day){clearRest();state.day=day;state.block=0;state.set=0;state.done={son:false,dad:false};state.menu=false;state.help=null;state.finish=false;render();}
  function advance(){var ctx=current();state.done={son:false,dad:false};if(state.set+1<ctx.block.sets){state.set++;}else if(state.block+1<ctx.workout.blocks.length){state.block++;state.set=0;}else{state.finish=true;}render();}
  function startRest(){state.rest=30;render();state.interval=setInterval(function(){state.rest--;if(state.rest<=0){clearRest();advance();}else{render();}},1000);}
  function markDone(person){var ctx=current(),item=ctx[person],k=key(person,item),list=state.history[k]||[];if(state.done[person]||state.rest!==null){return;}list.push({weight:weight(person,item,ctx.block.sets),reps:reps(person,item),date:new Date().toISOString()});state.history[k]=list;state.done[person]=true;save();if(state.done.son&&state.done.dad){startRest();}else{render();}}
  function change(action,person){var ctx=current(),item=ctx[person],k=key(person,item),value;if(action.indexOf('weight-')===0){value=weight(person,item,ctx.block.sets)+(action==='weight-up'?item.step:-item.step);state.weights[k]=Math.max(0,value);save();}else{value=reps(person,item)+(action==='reps-up'?1:-1);state.reps[k]=Math.max(0,value);}render();}
  app.onclick=function(event){var el=event.target,action,person,index;while(el&&el!==app&&!el.getAttribute('data-action')){if(el.getAttribute('data-stop')){return;}el=el.parentNode;}if(!el||el===app){return;}action=el.getAttribute('data-action');person=el.getAttribute('data-person');if(action==='menu'){state.menu=true;render();}else if(action==='close'){state.menu=false;state.help=null;render();}else if(action==='help'){state.help=person;render();}else if(action==='done'){markDone(person);}else if(action==='weight-up'||action==='weight-down'||action==='reps-up'||action==='reps-down'){change(action,person);}else if(action==='continue'){clearRest();advance();}else if(action==='choose'){index=parseInt(el.getAttribute('data-index'),10);resetPosition(index);}else if(action==='next-day'){resetPosition((state.day+1)%4);}else if(action==='repeat'){resetPosition(state.day);}else if(action==='reset'){if(window.confirm('Opravdu smazat historii a uložené váhy?')){try{localStorage.removeItem('duogym-history');localStorage.removeItem('duogym-weights');}catch(e){}state.history={};state.weights={};state.reps={};render();}}};
  load();
  render();
}());
