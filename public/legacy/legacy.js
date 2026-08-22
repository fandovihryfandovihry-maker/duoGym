(function(){
  'use strict';

  function ex(id,name,reps,label,equip,kind,step,dadName,noLoad){return{id:id,name:name,reps:reps,label:label,equip:equip,kind:kind,step:typeof step==='number'?step:2.5,dadName:dadName||'',noLoad:!!noLoad};}
  var tips={
    press:['Lopatky stáhni k sobě','Chodidla pevně do země','Pohyb veď kontrolovaně'],
    row:['Záda drž rovná','Lokty táhni k bokům','Pohyb dokonči lopatkami'],
    squat:['Kolena ve směru špiček','Zpevni střed těla','Tlač přes celá chodidla'],
    hinge:['Kyčle tlač dozadu','Záda drž neutrálně','Zátěž drž blízko těla'],
    arms:['Lokty drž stabilní','Bez houpání trupem','Využij plný rozsah'],
    core:['Žebra drž dole','Zpevni břicho i hýždě','Dýchej pod kontrolou'],
    power:['Každé opakování proveď naplno','Dopad ztlum a drž kolena stabilní','Jakmile zpomalíš, sérii ukonči']
  };
  var unilateral={dbrow:'RUKA',bulgarian:'NOHA',lunge:'NOHA',singlebridge:'NOHA'};
  var startingWeights={bench:35,lateral:5,closebench:30,dbohp:10,incline:10,skull:20,barrow:15,hammer:10,shrug:20,reardelt:5,dbrow:15,curl:20,squat:20,barrdl:20,lunge:10,ohp:20};
  var workouts=[
    {name:'Push',sub:'Hrudník · triceps · ramena',blocks:[
      {sets:4,a:ex('bench','Benchpress na lavici',8,'8 op.','VELKÁ OSA + LAVICE','press'),b:ex('lateral','Upažování vestoje',12,'12 op.','2 JEDNORUČKY','arms',1)},
      {sets:3,a:ex('closebench','Benchpress úzkým úchopem',10,'10 op.','VELKÁ OSA + LAVICE','press'),b:ex('dbohp','Tlaky s jednoručkami nad hlavu vestoje',10,'10 op.','2 JEDNORUČKY','press',1)},
      {sets:3,a:ex('incline','Tlaky s jednoručkami na šikmé lavici',12,'12 op.','LAVICE + 2 JEDNORUČKY','press',1),b:ex('skull','Francouzský tlak s EZ vleže na zemi',12,'12 op.','EZ OSA + PODLOŽKA','arms')}
    ]},
    {name:'Pull',sub:'Záda · biceps',blocks:[
      {sets:4,a:ex('barrow','Přítahy velké osy v předklonu',8,'8 op.','VELKÁ OSA','row'),b:ex('hammer','Kladivové zdvihy',12,'12 op.','2 JEDNORUČKY','arms',1)},
      {sets:3,a:ex('shrug','Krčení ramen s velkou osou',10,'10 op.','VELKÁ OSA','row'),b:ex('reardelt','Upažování v předklonu',12,'12 op.','2 JEDNORUČKY','row',1)},
      {sets:3,a:ex('dbrow','Přítahy jednoručky v předklonu',12,'12 / ruka','2 JEDNORUČKY','row',1),b:ex('curl','Bicepsový zdvih s EZ',12,'12 op.','EZ OSA','arms')}
    ]},
    {name:'Nohy + břicho',sub:'Nohy · břicho',blocks:[
      {sets:4,a:ex('squat','Zadní dřep s osou',8,'8 op.','VELKÁ OSA','squat'),b:ex('legraise','Zvedání nohou vleže',12,'12 op.','PODLOŽKA','core',0,'',true)},
      {sets:3,a:ex('barrdl','Rumunský mrtvý tah s osou',10,'10 op.','VELKÁ OSA','hinge'),b:ex('plank','Plank',30,'30 s','PODLOŽKA','core',0,'',true)},
      {sets:3,a:ex('lunge','Výpady vzad s jednoručkami',12,'12 / noha','2 JEDNORUČKY','squat',1),b:ex('hollow','Hollow hold',30,'30 s','PODLOŽKA','core',0,'',true)}
    ]},
    {name:'Ramena + paže',sub:'Ramena · biceps · triceps',blocks:[
      {sets:4,a:ex('ohp','Tlaky nad hlavu vestoje',8,'8 op.','VELKÁ OSA','press'),b:ex('hammer','Kladivové zdvihy',12,'12 op.','2 JEDNORUČKY','arms',1)},
      {sets:3,a:ex('lateral','Upažování vestoje',12,'12 op.','2 JEDNORUČKY','arms',1),b:ex('curl','Bicepsový zdvih s EZ',10,'10 op.','EZ OSA','arms')},
      {sets:3,a:ex('reardelt','Upažování v předklonu',12,'12 op.','2 JEDNORUČKY','row',1),b:ex('skull','Francouzský tlak s EZ vleže na zemi',12,'12 op.','EZ OSA + PODLOŽKA','arms')}
    ]}
  ];

  var media={
    bench:{files:['exercises/web/bench-1.jpg','exercises/web/bench-2.jpg'],credit:'Everkinetic · wger · CC BY-SA'},
    dbrow:{files:['exercises/web/dumbbell-row-clean.jpg'],credit:'sebk · wger · CC BY-SA'},
    ohp:{files:['exercises/web/ohp-1.jpg','exercises/web/ohp-2.jpg'],credit:'wger · CC BY-SA'},
    dbohp:{files:['exercises/web/ohp-1.jpg','exercises/web/ohp-2.jpg'],credit:'wger · CC BY-SA'},
    reardelt:{files:['exercises/rear-delt.gif'],credit:'Lynn McIntyre · wger · CC BY-SA'},
    curl:{files:['exercises/web/ez-curl-clean-1.jpg','exercises/web/ez-curl-clean-2.jpg'],credit:'wger · CC BY-SA'},
    lateral:{files:['exercises/web/lateral-1.jpg','exercises/web/lateral-2.jpg'],credit:'wger · CC BY-SA'},
    frontraise:{files:['exercises/web/front-raise.jpg'],credit:'philip · wger · CC BY-SA'},
    explosivepushup:{files:['exercises/web/explosive-pushup-original.jpg'],credit:'Originální ilustrace DuoGym'},
    hollow:{files:['exercises/web/hollow.jpg'],credit:'Behrooz · wger · CC0'},
    legraise:{files:['exercises/web/leg-raise-1.jpg','exercises/web/leg-raise-2.jpg'],credit:'Everkinetic · wger · CC BY-SA'},
    barrdl:{files:['exercises/web/bar-rdl-1.jpg','exercises/web/bar-rdl-2.jpg'],credit:'Everkinetic · Wikimedia Commons · CC BY-SA'},
    squat:{files:['exercises/web/squat-1.jpg','exercises/web/squat-2.jpg'],credit:'wger · CC BY-SA'},
    rdl:{files:['exercises/web/rdl.jpg'],credit:'wger · CC BY-SA'},
    jump:{files:['exercises/web/jump.jpg'],credit:'wger · CC BY-SA'},
    highknees:{files:['exercises/web/jump.jpg'],credit:'wger · CC BY-SA'},
    calf:{files:['exercises/web/calf-1.jpg','exercises/web/calf-2.jpg'],credit:'wger · CC BY-SA'},
    lunge:{files:['exercises/web/reverse-lunge.jpg'],credit:'wger · CC BY-SA'},
    hip:{files:['exercises/web/hip-thrust.jpg'],credit:'wger · CC BY-SA'},
    singlebridge:{files:['exercises/web/hip-thrust.jpg'],credit:'wger · CC BY-SA'},
    shouldertap:{files:['exercises/web/shoulder-tap.jpg'],credit:'wger · CC BY-SA'},
    plank:{files:['exercises/web/plank-1.jpg','exercises/web/plank-2.jpg'],credit:'wger · CC BY-SA'},
    pushpress:{files:['exercises/web/push-press.jpg'],credit:'wger · CC BY-SA'},
    incline:{files:['exercises/web/incline-1.jpg','exercises/web/incline-clean-2.jpg'],credit:'Everkinetic · wger · CC BY-SA'},
    ezrow:{files:['exercises/web/ez-row-1.jpg','exercises/web/ez-row-2.jpg'],credit:'Everkinetic · wger · CC BY-SA'},
    barrow:{files:['exercises/web/ez-row-1.jpg','exercises/web/ez-row-2.jpg'],credit:'Everkinetic · wger · CC BY-SA'},
    closebench:{files:['exercises/web/close-bench-1.jpg','exercises/web/close-bench-clean-2.jpg'],credit:'Everkinetic · wger · CC BY-SA'},
    hammer:{files:['exercises/web/hammer-1.jpg','exercises/web/hammer-2.jpg'],credit:'wger · CC BY-SA'},
    skull:{files:['exercises/web/skull-1.jpg','exercises/web/skull-2.jpg'],credit:'wger · CC BY-SA'},
    deadlift:{files:['exercises/web/deadlift.jpg'],credit:'wger · CC BY-SA'},
    goblet:{files:['exercises/web/goblet-1.jpg','exercises/web/goblet-2.jpg'],credit:'wger · CC BY-SA'},
    bulgarian:{files:['exercises/web/bulgarian.jpg'],credit:'wger · CC BY-SA'},
    shrug:{files:['exercises/web/shrug-1.jpg','exercises/web/shrug-2.jpg'],credit:'Everkinetic · wger · CC BY-SA'}
  };

  var app=document.getElementById('app');
  var weekday=new Date().getDay();
  var calendarNow=new Date(),calendarYear=2026,calendarMonth=8;
  if(calendarNow>=new Date(2026,8,1)&&calendarNow<=new Date(2027,5,30,23,59,59)){calendarYear=calendarNow.getFullYear();calendarMonth=calendarNow.getMonth();}
  var state={day:weekday>=1&&weekday<=4?weekday-1:0,block:0,set:0,done:{son:false,dad:false},weights:{},reps:{},history:{},completions:{},rest:null,interval:null,menu:false,calendar:false,calendarYear:calendarYear,calendarMonth:calendarMonth,help:null,finish:false};

  function load(){try{state.history=JSON.parse(localStorage.getItem('duogym-history')||'{}');state.weights=JSON.parse(localStorage.getItem('duogym-weights')||'{}');state.completions=JSON.parse(localStorage.getItem('duogym-completions')||'{}');}catch(e){state.history={};state.weights={};state.completions={};}}
  function save(){try{localStorage.setItem('duogym-history',JSON.stringify(state.history));localStorage.setItem('duogym-weights',JSON.stringify(state.weights));localStorage.setItem('duogym-completions',JSON.stringify(state.completions));}catch(e){}}
  function key(person,item){return person+':'+item.id;}
  function fmt(value){return value%1===0?String(value):value.toFixed(1);}
  function last(list){return list&&list.length?list[list.length-1]:null;}
  function current(){var workout=workouts[state.day],block=workout.blocks[state.block],swap=state.set%2===1;return{workout:workout,block:block,son:swap?block.b:block.a,dad:swap?block.a:block.b,swap:swap};}
  function shownName(person,item){return person==='dad'&&item.dadName?item.dadName:item.name;}
  function suggested(person,item,sets){var list,old,i,full=true,recent,start;if(item.noLoad){return 0;}list=state.history[key(person,item)]||[];old=last(list);start=startingWeights[item.id];if(!old){return typeof start==='number'?start:(person==='son'?20:12.5);}recent=list.slice(Math.max(0,list.length-sets));if(recent.length<sets){full=false;}for(i=0;i<recent.length;i++){if(recent[i].reps<item.reps){full=false;}}return full?old.weight+item.step:old.weight;}
  function weight(person,item,sets){var value;if(item.noLoad){return 0;}value=state.weights[key(person,item)];return typeof value==='number'?value:suggested(person,item,sets);}
  function reps(person,item){var value=state.reps[key(person,item)];return typeof value==='number'?value:item.reps;}
  function esc(value){return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function dateLabel(){var names=['Neděle','Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota'],months=['ledna','února','března','dubna','května','června','července','srpna','září','října','listopadu','prosince'],d=new Date();return names[d.getDay()]+' '+d.getDate()+'. '+months[d.getMonth()];}
  function totalSets(workout){var n=0,i;for(i=0;i<workout.blocks.length;i++){n+=workout.blocks[i].sets*2;}return n;}
  function doneTurns(workout){var n=state.set,i;for(i=0;i<state.block;i++){n+=workout.blocks[i].sets*2;}return n;}
  function demoMedia(item){var data=media[item.id],html,i;if(!data){return '<div class="real-demo missing-demo"><b>Ukázka není dostupná</b></div>';}html='<div class="real-demo'+(data.files.length>1?' two-frame':'')+'" role="img" aria-label="Ukázka provedení cviku '+esc(item.name)+'">';for(i=0;i<data.files.length;i++){html+='<img class="media-frame frame-'+(i+1)+'" src="'+esc(data.files[i])+'" alt="'+esc(item.name)+' – poloha '+(i+1)+'">';}if(data.files.length>1){html+='<span class="motion-label">START <i>→</i> CÍL</span>';}html+='<small class="media-credit">'+esc(data.credit)+'</small></div>';return html;}
  function sideCue(item){var part=unilateral[item.id],right=Math.floor(state.set/2)%2===0,first=right?'PRAVÁ':'LEVÁ',second=right?'levá':'pravá';return part?'<div class="side-cue"><span>ZAČNI</span><b>'+first+' '+part+'</b><i>potom '+second.toLowerCase()+' '+part.toLowerCase()+'</i></div>':'';}
  function pad(value){return value<10?'0'+value:String(value);}
  function dayKey(date){return date.getFullYear()+'-'+pad(date.getMonth()+1)+'-'+pad(date.getDate());}
  function inSchoolYear(date){var start=new Date(2026,8,1),end=new Date(2027,5,30,23,59,59);return date>=start&&date<=end;}
  function markCompletion(){var now=new Date();state.completions[dayKey(now)]=true;save();}
  function calendarHtml(){var monthNames=['Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'],dayNames=['PO','ÚT','ST','ČT','PÁ','SO','NE'],y=state.calendarYear,m=state.calendarMonth,first=new Date(y,m,1),days=new Date(y,m+1,0).getDate(),lead=(first.getDay()+6)%7,today=dayKey(new Date()),prevDisabled=y===2026&&m===8,nextDisabled=y===2027&&m===5,html='<div class="calendar-head"><button data-action="calendar-prev" '+(prevDisabled?'disabled':'')+' aria-label="Předchozí měsíc">‹</button><div><small>ŠKOLNÍ ROK 2026/27</small><h2>'+monthNames[m]+' '+y+'</h2></div><button data-action="calendar-next" '+(nextDisabled?'disabled':'')+' aria-label="Další měsíc">›</button></div><div class="weekdays">',i,d,date,key,classes;
    for(i=0;i<7;i++){html+='<span>'+dayNames[i]+'</span>';}
    html+='</div><div class="calendar-grid">';
    for(i=0;i<lead;i++){html+='<span class="cal-cell empty"></span>';}
    for(d=1;d<=days;d++){date=new Date(y,m,d);key=dayKey(date);classes='cal-cell';if(date.getDay()>=1&&date.getDay()<=4){classes+=' scheduled';}if(state.completions[key]){classes+=' complete';}if(key===today){classes+=' today';}if(!inSchoolYear(date)){classes+=' outside';}html+='<span class="'+classes+'"><b>'+d+'</b>'+(state.completions[key]?'<i>✓</i>':'')+'</span>';}
    html+='</div><div class="calendar-legend"><span><i class="plan-dot"></i> Trénink Po–Čt</span><span><i class="done-dot"></i> Dokončeno</span></div>';
    return html;
  }
  function card(person,item,block){var old=last(state.history[key(person,item)]||[]),kg=weight(person,item,block.sets),rr=reps(person,item),isDone=state.done[person],recommend=!item.noLoad&&old&&suggested(person,item,block.sets)>old.weight,unit=item.label.indexOf('s')!==-1?' s':' op.',previous,loadControl,intent;
    if(old){previous=item.noLoad?'<span>Minule</span><b>'+old.reps+unit+'</b>':'<span>Minule</span><b>'+fmt(old.weight)+' kg × '+old.reps+'</b>'+(recommend?'<em>+ '+fmt(item.step)+' kg příště</em>':'');}else{previous='<span>Minule</span><b>—</b>';}
    if(item.noLoad){intent=item.kind==='power'?'MAX RYCHLOST':'PEVNÝ STŘED';loadControl='<div class="control intent"><span>ZÁMĚR</span><b>'+intent+'</b><small>bez přidané váhy</small></div>';}else{loadControl='<div class="control"><span>VÁHA</span><div class="stepper"><button data-action="weight-down" data-person="'+person+'" aria-label="Snížit váhu">−</button><b>'+fmt(kg)+'<small>kg</small></b><button data-action="weight-up" data-person="'+person+'" aria-label="Zvýšit váhu">+</button></div></div>';}
    return '<article class="card '+person+(isDone?' completed':'')+'"><div class="person"><span class="avatar">'+(person==='son'?'F':'T')+'</span><h2>'+(person==='son'?'Fanda':'Táta')+'</h2>'+(isDone?'<span class="status">PŘIPRAVEN</span>':'')+'</div><section class="exercise"><div class="equipment">'+esc(item.equip)+'</div><h3>'+esc(shownName(person,item))+'</h3>'+sideCue(item)+'<div class="plan-row"><strong>'+block.sets+' × '+esc(item.label)+'</strong><button class="tech-button" data-action="help" data-person="'+person+'">Ukázat provedení</button></div></section><div class="previous">'+previous+'</div><div class="controls">'+loadControl+'<div class="control"><span>OPAKOVÁNÍ / ČAS</span><div class="stepper"><button data-action="reps-down" data-person="'+person+'" aria-label="Snížit opakování">−</button><b>'+rr+'</b><button data-action="reps-up" data-person="'+person+'" aria-label="Zvýšit opakování">+</button></div></div></div><button class="done-button" data-action="done" data-person="'+person+'" '+(isDone||state.rest!==null?'disabled':'')+'>'+(isDone?'Čekám na druhého':'Mám hotovo')+'</button></article>';}
  function modal(ctx){var html='',i,item,list;
    if(state.finish){return '<div class="shade"><div class="modal finish"><div class="finish-mark">✓</div><small>HOTOVO</small><h2>Dnešní trénink je splněný.</h2><p>Den se v kalendáři označil zeleně. Váhy a opakování jsou uložené.</p><button class="primary" data-action="next-day">Další trénink →</button><button class="reset" data-action="repeat">Zopakovat den</button></div></div>';}
    if(state.help){item=ctx[state.help];list=tips[item.kind]||tips.press;html='<div class="shade" data-action="close"><div class="modal technique-modal" data-stop="1"><button class="close" data-action="close">×</button><small>PROVEDENÍ CVIKU</small><h2>'+esc(shownName(state.help,item))+'</h2><div class="modal-demo">'+demoMedia(item)+'</div><ul class="tips">';for(i=0;i<list.length;i++){html+='<li><b>'+(i+1)+'</b>'+esc(list[i])+'</li>';}html+='</ul><button class="primary" data-action="close">Rozumím</button></div></div>';}
    else if(state.calendar){html='<div class="shade" data-action="close"><div class="modal calendar-modal" data-stop="1"><button class="close" data-action="close">×</button>'+calendarHtml()+'</div></div>';}
    else if(state.menu){html='<div class="shade" data-action="close"><div class="modal" data-stop="1"><button class="close" data-action="close">×</button><small>TRÉNINK</small><h2>Vyber den</h2><p class="hint">Pondělí až čtvrtek se správný trénink vybere automaticky.</p><div class="days">';for(i=0;i<workouts.length;i++){html+='<button class="'+(i===state.day?'active':'')+'" data-action="choose" data-index="'+i+'"><span class="day-code">'+['PO','ÚT','ST','ČT'][i]+'</span><span class="day-info"><strong>'+esc(workouts[i].name)+'</strong><small>'+esc(workouts[i].sub)+' · '+totalSets(workouts[i])+' sérií / osoba</small></span><b>→</b></button>';}html+='</div><button class="reset" data-action="reset">Smazat historii zařízení</button></div></div>';}
    return html;
  }
  function render(){var ctx=current(),round=Math.floor(state.set/2)+1,station=state.set%2+1,progress=doneTurns(ctx.workout)/totalSets(ctx.workout)*100;app.innerHTML='<div class="app"><header class="topbar"><button class="brand" data-action="menu" aria-label="Vybrat trénink"><span class="brand-mark">D</span></button><div class="title"><b>'+esc(ctx.workout.name)+'</b><small><span class="actual-date">'+esc(dateLabel())+'</span> &nbsp;·&nbsp; BLOK '+(state.block+1)+'/'+ctx.workout.blocks.length+' &nbsp;·&nbsp; KOLO '+round+'/'+ctx.block.sets+' &nbsp;·&nbsp; STANOVIŠTĚ '+station+'/2</small></div><div class="top-actions"><button class="skip-button" data-action="skip">Přeskočit stanoviště</button><button class="calendar-button" data-action="calendar" aria-label="Kalendář"><span>▦</span><b>Kalendář</b></button><button class="settings-button" data-action="menu" aria-label="Vybrat den">•••</button></div><div class="progress"><i style="width:'+progress+'%"></i></div></header><section class="grid">'+card('son',ctx.son,ctx.block)+card('dad',ctx.dad,ctx.block)+'</section>'+(state.rest!==null?'<div class="rest-overlay"><div class="rest-card"><small>ODPOČINEK</small><div class="rest-orb"><strong>'+state.rest+'</strong><span>s</span></div><div class="rest-line"><i style="width:'+(state.rest/30*100)+'%"></i></div><button data-action="continue">Pokračovat hned</button></div></div>':'')+modal(ctx)+'</div>';}
  function clearRest(){if(state.interval){clearInterval(state.interval);}state.interval=null;state.rest=null;}
  function resetPosition(day){clearRest();state.day=day;state.block=0;state.set=0;state.done={son:false,dad:false};state.menu=false;state.calendar=false;state.help=null;state.finish=false;render();}
  function advance(){var ctx=current();state.done={son:false,dad:false};if(state.set+1<ctx.block.sets*2){state.set++;}else if(state.block+1<ctx.workout.blocks.length){state.block++;state.set=0;}else{markCompletion();state.finish=true;}render();}
  function startRest(){state.rest=30;render();state.interval=setInterval(function(){state.rest--;if(state.rest<=0){clearRest();advance();}else{render();}},1000);}
  function logSet(){var ctx=current(),people=['son','dad'],i,person,item,k,list;for(i=0;i<people.length;i++){person=people[i];item=ctx[person];k=key(person,item);list=state.history[k]||[];list.push({weight:weight(person,item,ctx.block.sets),reps:reps(person,item),date:new Date().toISOString()});state.history[k]=list;}save();}
  function beforeNextBlock(){var ctx=current();return state.set+1>=ctx.block.sets*2&&state.block+1<ctx.workout.blocks.length;}
  function markDone(person){if(state.done[person]||state.rest!==null){return;}state.done[person]=true;if(state.done.son&&state.done.dad){logSet();if(beforeNextBlock()){startRest();}else{advance();}}else{render();}}
  function change(action,person){var ctx=current(),item=ctx[person],k=key(person,item),value;if(action.indexOf('weight-')===0){value=weight(person,item,ctx.block.sets)+(action==='weight-up'?item.step:-item.step);state.weights[k]=Math.max(0,value);save();}else{value=reps(person,item)+(action==='reps-up'?1:-1);state.reps[k]=Math.max(0,value);}render();}
  function moveCalendar(direction){var value=state.calendarYear*12+state.calendarMonth+direction,min=2026*12+8,max=2027*12+5;if(value<min||value>max){return;}state.calendarYear=Math.floor(value/12);state.calendarMonth=value%12;render();}
  app.onclick=function(event){var el=event.target,action,person,index;while(el&&el!==app&&!el.getAttribute('data-action')){if(el.getAttribute('data-stop')){return;}el=el.parentNode;}if(!el||el===app){return;}action=el.getAttribute('data-action');person=el.getAttribute('data-person');if(action==='menu'){state.menu=true;state.calendar=false;render();}else if(action==='calendar'){state.calendar=true;state.menu=false;render();}else if(action==='calendar-prev'){moveCalendar(-1);}else if(action==='calendar-next'){moveCalendar(1);}else if(action==='close'){state.menu=false;state.calendar=false;state.help=null;render();}else if(action==='help'){state.help=person;render();}else if(action==='done'){markDone(person);}else if(action==='skip'){clearRest();state.done={son:false,dad:false};advance();}else if(action==='weight-up'||action==='weight-down'||action==='reps-up'||action==='reps-down'){change(action,person);}else if(action==='continue'){clearRest();advance();}else if(action==='choose'){index=parseInt(el.getAttribute('data-index'),10);resetPosition(index);}else if(action==='next-day'){resetPosition((state.day+1)%4);}else if(action==='repeat'){resetPosition(state.day);}else if(action==='reset'){if(window.confirm('Opravdu smazat historii, váhy a kalendář?')){try{localStorage.removeItem('duogym-history');localStorage.removeItem('duogym-weights');localStorage.removeItem('duogym-completions');}catch(e){}state.history={};state.weights={};state.reps={};state.completions={};render();}}};
  load();
  render();
}());
