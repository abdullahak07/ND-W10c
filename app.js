const $$=(s,c=document)=>[...c.querySelectorAll(s)]; const $=s=>document.querySelector(s);
$$('[data-jump]').forEach(b=>b.onclick=()=>$(b.dataset.jump)?.scrollIntoView({behavior:'smooth'}));
$$('.flip').forEach(card=>card.onclick=()=>{card.classList.toggle('flipped');card.setAttribute('aria-pressed',card.classList.contains('flipped'))});
let allFlipped=false;$('#flipAll').onclick=()=>{allFlipped=!allFlipped;$$('.flip').forEach(c=>c.classList.toggle('flipped',allFlipped));$('#flipAll').textContent=allFlipped?'Show card fronts':'Flip all detail cards'};

// quick quizzes
$$('.quiz').forEach(q=>{const ans=+q.dataset.answer,bs=$$('button',q),fb=q.querySelector('small');bs.forEach((b,i)=>b.onclick=()=>{if(q.dataset.done)return;q.dataset.done='1';bs.forEach(x=>x.disabled=true);if(i===ans){b.classList.add('correct');fb.textContent='Correct.'}else{b.classList.add('wrong');bs[ans].classList.add('correct');fb.textContent='Correct answer highlighted.'}})});

// Service responsibility lab
const serviceModes=[
  {name:'SaaS',provider:85,customer:15,text:'SaaS: provider operates the application and cloud infrastructure. Customer mainly manages users, data choices and correct use of the service.'},
  {name:'PaaS',provider:65,customer:35,text:'PaaS: provider runs the platform, runtimes and infrastructure. Customer deploys and secures the applications and data they build on top.'},
  {name:'IaaS',provider:45,customer:55,text:'IaaS: provider runs the physical cloud infrastructure. Customer has more control over operating systems, applications and some network configuration — so customer security work increases.'}
];
const $serviceRange=$('#serviceRange');
function renderService(){const m=serviceModes[+$serviceRange.value];$('#providerPct').textContent=m.provider+'%';$('#customerPct').textContent=m.customer+'%';$('#serviceReadout').innerHTML='<b>'+m.name+'</b> — '+m.text}
$serviceRange.oninput=renderService;renderService();

// Deployment game
const deployRounds=[
  {s:'A startup wants the lowest cost and very high scalability for a public web application.',a:'PUBLIC',why:'Public cloud fits cost-sensitive workloads that benefit from large shared scale.'},
  {s:'A defence organisation wants dedicated infrastructure and tight control over data location.',a:'PRIVATE',why:'Private cloud gives one organisation stronger control and isolation.'},
  {s:'Several hospitals need restricted shared infrastructure with similar privacy requirements.',a:'COMMUNITY',why:'Community cloud is shared by organisations with common requirements.'},
  {s:'A business keeps sensitive customer data privately but bursts less-sensitive analytics workloads into public cloud.',a:'HYBRID',why:'Hybrid combines two or more clouds while keeping them distinct.'}
];let di=0;
function renderDeploy(){const r=deployRounds[di];$('#deployScenario').textContent=r.s;$('#deployFeedback').textContent='Scenario '+(di+1)+' of '+deployRounds.length;$$('[data-deploy]').forEach(b=>{b.disabled=false;b.classList.remove('correct','wrong')})}
$$('[data-deploy]').forEach(b=>b.onclick=()=>{const r=deployRounds[di];$$('[data-deploy]').forEach(x=>x.disabled=true);if(b.dataset.deploy===r.a){b.classList.add('correct');$('#deployFeedback').textContent='Correct. '+r.why}else{b.classList.add('wrong');$('[data-deploy="'+r.a+'"]').classList.add('correct');$('#deployFeedback').textContent=r.why}setTimeout(()=>{di=(di+1)%deployRounds.length;renderDeploy()},1100)});
renderDeploy();

// Actor game
const actorRounds=[
  {s:'I use the cloud service and maintain the business relationship with the provider.',a:'Customer'},
  {s:'I make the cloud service available to customers.',a:'Provider'},
  {s:'I independently assess security, operations and performance.',a:'Auditor'},
  {s:'I negotiate and manage the use and delivery of services between consumer and provider.',a:'Broker'},
  {s:'I provide connectivity and transport of cloud services.',a:'Carrier'}
];
const actorLabels=['Customer','Provider','Auditor','Broker','Carrier'];let ai=0;
function renderActor(){const r=actorRounds[ai];$('#actorScenario').textContent=r.s;const host=$('#actorChoices');host.innerHTML='';actorLabels.forEach(label=>{const b=document.createElement('button');b.textContent=label;b.dataset.value=label;b.onclick=()=>{if(host.dataset.locked)return;host.dataset.locked='1';const all=$$('button',host);if(label===r.a){b.classList.add('correct');$('#actorFeedback').textContent='Correct.'}else{b.classList.add('wrong');all.find(x=>x.dataset.value===r.a).classList.add('correct');$('#actorFeedback').textContent='Correct role: '+r.a}setTimeout(()=>{ai=(ai+1)%actorRounds.length;host.dataset.locked='';renderActor()},900)};host.appendChild(b)});$('#actorFeedback').textContent='Round '+(ai+1)+' of '+actorRounds.length}
renderActor();

// STRIDE game
const strideRounds=[
  {s:'An attacker logs in using someone else\'s stolen username and password.',a:'Spoofing'},
  {s:'A malicious user changes values in a database without permission.',a:'Tampering'},
  {s:'A user performs an action, then denies doing it and there is no proof.',a:'Repudiation'},
  {s:'An unauthorised person reads confidential cloud data.',a:'Information disclosure'},
  {s:'An attacker makes the cloud application unavailable to valid users.',a:'Denial of service'},
  {s:'A normal user obtains administrator privileges.',a:'Elevation of privilege'}
];
const strideLabels=['Spoofing','Tampering','Repudiation','Information disclosure','Denial of service','Elevation of privilege'];let si=0;
function renderStride(){const r=strideRounds[si];$('#strideScenario').textContent=r.s;const host=$('#strideChoices');host.innerHTML='';strideLabels.forEach(label=>{const b=document.createElement('button');b.textContent=label;b.dataset.value=label;b.onclick=()=>{if(host.dataset.locked)return;host.dataset.locked='1';const all=$$('button',host);if(label===r.a){b.classList.add('correct');$('#strideFeedback').textContent='Correct.'}else{b.classList.add('wrong');all.find(x=>x.dataset.value===r.a).classList.add('correct');$('#strideFeedback').textContent='Correct STRIDE category: '+r.a}setTimeout(()=>{si=(si+1)%strideRounds.length;host.dataset.locked='';renderStride()},1000)};host.appendChild(b)});$('#strideFeedback').textContent='Round '+(si+1)+' of '+strideRounds.length}
renderStride();

// Breach controls game
const breachRounds=[
  {s:'A cloud administrator account is stolen because the same password was reused across services.',choices:['Two-factor authentication','More storage','Public cloud migration'],a:'Two-factor authentication'},
  {s:'A management API allows sensitive actions with weak authentication over an insecure connection.',choices:['Strong auth + encrypted transmission','Add more VMs','Disable backups'],a:'Strong auth + encrypted transmission'},
  {s:'A software flaw in a shared cloud platform has a known patch, but the organisation has not applied it.',choices:['Patch management','Remove audit logs','Increase bandwidth'],a:'Patch management'},
  {s:'The customer accidentally deletes cloud data and all cloud copies are lost.',choices:['Regular redundant backups','Change DNS','Use a public API'],a:'Regular redundant backups'}
];let bi=0;
function renderBreach(){const r=breachRounds[bi];$('#breachScenario').textContent=r.s;const host=$('#breachChoices');host.innerHTML='';r.choices.forEach(label=>{const b=document.createElement('button');b.textContent=label;b.dataset.value=label;b.onclick=()=>{if(host.dataset.locked)return;host.dataset.locked='1';const all=$$('button',host);if(label===r.a){b.classList.add('correct');$('#breachFeedback').textContent='Correct.'}else{b.classList.add('wrong');all.find(x=>x.dataset.value===r.a).classList.add('correct');$('#breachFeedback').textContent='Best first control highlighted.'}setTimeout(()=>{bi=(bi+1)%breachRounds.length;host.dataset.locked='';renderBreach()},1000)};host.appendChild(b)});$('#breachFeedback').textContent='Round '+(bi+1)+' of '+breachRounds.length}
renderBreach();

// SecaaS game
const secaasRounds=[
  {s:'You need cloud-delivered protection for users visiting malicious websites.',a:'Web security'},
  {s:'You need to aggregate and correlate cloud and on-premise security logs.',a:'SIEM'},
  {s:'You need to monitor sensitive data at rest, in motion and in use.',a:'DLP'},
  {s:'You need resilient backups, failover and disaster recovery across locations.',a:'BC/DR'},
  {s:'You need to detect and block unauthorised access attempts.',a:'Intrusion management'}
];
const secaasLabels=['Web security','SIEM','DLP','BC/DR','Intrusion management'];let sci=0;
function renderSecaas(){const r=secaasRounds[sci];$('#secaasScenario').textContent=r.s;const host=$('#secaasChoices');host.innerHTML='';secaasLabels.forEach(label=>{const b=document.createElement('button');b.textContent=label;b.dataset.value=label;b.onclick=()=>{if(host.dataset.locked)return;host.dataset.locked='1';const all=$$('button',host);if(label===r.a){b.classList.add('correct');$('#secaasFeedback').textContent='Correct.'}else{b.classList.add('wrong');all.find(x=>x.dataset.value===r.a).classList.add('correct');$('#secaasFeedback').textContent='Best match: '+r.a}setTimeout(()=>{sci=(sci+1)%secaasRounds.length;host.dataset.locked='';renderSecaas()},900)};host.appendChild(b)});$('#secaasFeedback').textContent='Round '+(sci+1)+' of '+secaasRounds.length}
renderSecaas();

// Keystone interactive
const keyText={identity:'Identity: authenticates user information and supports role-based access control. It can use username/password, LDAP or external authentication.',token:'Token: issued after authentication and used for access control. Other OpenStack services can query Keystone about the token.',catalog:'Service catalog: stores registered service endpoints so a client can discover where to send a request.',policy:'Policies: define what different users are allowed to do with OpenStack resources such as APIs, volumes and VM instances.'};
$$('[data-key]').forEach(b=>b.onclick=()=>{$$('[data-key]').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#keyReadout').textContent=keyText[b.dataset.key]});

// Order board helper
function shuffled(a){return [...a].sort(()=>Math.random()-.5)}
const vmItems=[{id:1,label:'Authenticate user with Keystone'},{id:2,label:'Receive access token'},{id:3,label:'Use service catalog to find endpoint'},{id:4,label:'Apply policy / authorization'},{id:5,label:'Nova provisions the VM'}];
let vmList=shuffled(vmItems);
function drawVm(){const host=$('#vmOrder');host.innerHTML='';vmList.forEach((item,index)=>{const row=document.createElement('div');row.className='order-item';row.innerHTML='<span>'+String(index+1).padStart(2,'0')+'</span><b>'+item.label+'</b><div><button>↑</button><button>↓</button></div>';const [u,d]=$$('button',row);u.disabled=index===0;d.disabled=index===vmList.length-1;u.onclick=()=>{[vmList[index-1],vmList[index]]=[vmList[index],vmList[index-1]];drawVm()};d.onclick=()=>{[vmList[index+1],vmList[index]]=[vmList[index],vmList[index+1]];drawVm()};host.appendChild(row)})}
drawVm();
$('#shuffleVm').onclick=()=>{vmList=shuffled(vmItems);drawVm();$('#vmFeedback').textContent='Shuffled.'};
$('#checkVm').onclick=()=>{$('#vmFeedback').textContent=vmList.map(x=>x.id).join(',')==='1,2,3,4,5'?'Correct: authenticate → token → endpoint → policy → provision.':'Not yet. Start with identity and authentication.'};

// final quiz
const finalQuestions=[
 ['Which cloud characteristic means resources can be quickly added and released?',['Measured service','Rapid elasticity','Resource pooling'],1],
 ['Which service model gives the customer the most control over operating systems?',['SaaS','PaaS','IaaS'],2],
 ['Which deployment model combines two or more distinct clouds?',['Public','Hybrid','Community'],1],
 ['Which NIST actor independently assesses cloud security and performance?',['Cloud auditor','Cloud broker','Cloud carrier'],0],
 ['In STRIDE, stolen credentials used to impersonate another user are what category?',['Tampering','Spoofing','Repudiation'],1],
 ['Which control is strongly recommended against account hijacking?',['Two-factor authentication','Disable monitoring','Share credentials'],0],
 ['Which SecaaS category aggregates and correlates log/event data?',['SIEM','DLP','Web security'],0],
 ['What does Keystone issue after successful authentication?',['VM image','Token','Backup archive'],1]
];
const host=$('#finalQuiz');let answered=0,score=0;
finalQuestions.forEach((q,i)=>{const card=document.createElement('article');card.className='final-q';card.innerHTML='<h3>'+(i+1)+'. '+q[0]+'</h3>';q[1].forEach((opt,j)=>{const b=document.createElement('button');b.textContent=opt;b.onclick=()=>{if(card.dataset.done)return;card.dataset.done='1';answered++;const bs=$$('button',card);bs.forEach(x=>x.disabled=true);if(j===q[2]){score++;b.classList.add('correct')}else{b.classList.add('wrong');bs[q[2]].classList.add('correct')}updateFinal()};card.appendChild(b)});host.appendChild(card)});
const result=document.createElement('div');result.className='final-result';result.textContent='Complete all 8 questions to reveal your score.';host.appendChild(result);
function updateFinal(){if(answered<finalQuestions.length){result.textContent=answered+'/8 complete · current score '+score;return}const pct=Math.round(score/finalQuestions.length*100);result.innerHTML='Final score: '+score+'/8 ('+pct+'%)<br><span style="font-weight:600">'+(pct>=88?'Excellent — strong Week 10 cloud-security understanding.':pct>=63?'Good foundation — revisit the highlighted answers.':'Review the atlas zones and replay the games, then try again.')+'</span>'}

// nav + progress
const zones=$$('.zone'),links=$$('nav a');
addEventListener('scroll',()=>{const root=document.documentElement,max=root.scrollHeight-root.clientHeight;$('#progress').style.width=(max?root.scrollTop/max*100:0)+'%';let active='';zones.forEach(z=>{if(scrollY>=z.offsetTop-120)active=z.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+active))},{passive:true});