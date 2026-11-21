export type Values = Record<string,string>;
export type Animal = Values & {id:string,name:string,type:string};
export type Entry = Values & {uid:string,aid:string,kind:string,date:string};
export type Farm = {animals:Animal[],records:Entry[],profile:Values,alerts:boolean};
export const kinds=['Health','Vaccination','Breeding','Milk','Feed','Money','Growth'];
export const species=['Cow','Buffalo','Goat','Sheep','Dog','Poultry','Other'];
export const states=['Healthy','Sick','Recovering'];
export const costs=['Treatment','Vaccination','Feed','Breeding','Other expense','Milk sale','Animal sale'];
export const income=(s:string)=>['Milk sale','Animal sale'].includes(s);
export function day(delta=0){const d=new Date();d.setDate(d.getDate()+delta);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
export function dateLabel(s:string,hi=false){return s?new Date(s+'T12:00:00').toLocaleDateString(hi?'hi-IN':'en-IN',{day:'numeric',month:'short'}):'—'}
export function id(){return crypto.randomUUID?.()??Date.now().toString(36)+Math.random().toString(36).slice(2)}
export function emptyFarm(name='',village=''):Farm{return {animals:[],records:[],profile:{name,village,role:'Livestock owner'},alerts:true}}
export function demoFarm(){
 const farm=emptyFarm('Meera Patel','Rampur');
 const names=['Gauri','Kali','Moti','Champa','Lakshmi','Rani','Bholi','Heera','Tara','Pari','Gulab','Badal'];
 const types=['Cow','Buffalo','Cow','Goat','Cow','Buffalo','Goat','Buffalo','Sheep','Cow','Sheep','Dog'];
 farm.animals=names.map((name,i)=>({id:'PS-'+String(101+i),name,type:types[i],breed:({'Cow':'Gir','Buffalo':'Murrah','Goat':'Barbari','Sheep':'Deccani','Dog':'Indie'} as Values)[types[i]],sex:[2,11].includes(i)?'Male':'Female',weight:String([380,490,370,32,410,520,29,460,38,350,42,18][i]),age:String(2+i%5),tag:'RP-'+(801+i),status:i===2?'Sick':i===8?'Recovering':'Healthy',owner:i%4===3?'Ravi Yadav':'Meera Patel',village:i%4===3?'Sonpur':'Rampur',color:['Brown','Black','White'][i%3],milk:[0,1,4,5,7,9].includes(i)?'Yes':'No'}));
 const add=(n:number,kind:string,days:number,v:Values)=>farm.records.push({uid:id(),aid:farm.animals[n].id,kind,date:day(days),...v});
 for(let n=0;n<30;n++)for(const k of [0,1,4,5,7,9])add(k,'Milk',-n,{litres:(6+((k*3+n*7)%19)/4).toFixed(1),feedNote:n%3?'':'Green fodder'});
 [0,1,3,4,5,6,7,9,10].forEach((k,i)=>add(k,'Vaccination',-40-i,{vaccine:'Routine vaccination',vet:'Dr Kavita Rao',due:day(i===0?1:i+15)}));
 add(2,'Health',-2,{diagnosis:'Hoof injury',symptoms:'Limping',treatment:'Hoof examination',vet:'Dr Kavita Rao',due:day(2),recovery:'Sick'});
 add(8,'Health',-3,{diagnosis:'Skin irritation',symptoms:'Itching',vet:'Dr Kavita Rao',recovery:'Recovering',due:day(5)});
 [1,3].forEach((n,i)=>add(n,'Breeding',-50-i,{pregnancy:'Pregnant',service:day(-60-i),delivery:day(80+i*12)}));
 add(0,'Growth',-60,{weight:'365'});add(0,'Growth',-30,{weight:'372'});add(0,'Growth',0,{weight:'380'});
 for(let n=0;n<8;n++)add(0,'Feed',-n,{feed:'Green fodder',schedule:'Morning and evening',quantity:'18',cost:'90'});
 add(0,'Money',-1,{category:'Milk sale',amount:'2640'});add(2,'Money',-2,{category:'Treatment',amount:'350'});add(3,'Money',-3,{category:'Breeding',amount:'450'});
 return farm;
}
export function recent(records:Entry[]){return [...records].reverse().sort((a,b)=>b.date.localeCompare(a.date))}
export function latest(records:Entry[],aid:string,kind:string){return recent(records.filter(r=>r.aid===aid&&r.kind===kind))[0]}
export function dueList(f:Farm){
 const map=new Map<string,Entry>();
 for(const r of recent(f.records)){if(!['Health','Vaccination','Breeding'].includes(r.kind))continue;
 const key=[r.aid,r.kind,r.kind==='Vaccination'?r.vaccine.trim().toLowerCase():r.kind==='Health'?(r.diagnosis||'').trim().toLowerCase():''].join('|');
 if(!map.has(key))map.set(key,r)}
 return [...map.values()].map((r):Entry & {when:string}=>({...r,when:r.kind==='Breeding'&&r.pregnancy==='Pregnant'?r.delivery:r.kind==='Breeding'?'':r.due})).filter(r=>r.when&&!(r.kind==='Health'&&r.recovery==='Healthy')).sort((a,b)=>a.when.localeCompare(b.when));
}
export function vaccinated(f:Farm,a:Animal){const vaccines=new Map<string,Entry>();for(const r of recent(f.records.filter(r=>r.aid===a.id&&r.kind==='Vaccination')))if(!vaccines.has(r.vaccine.toLowerCase()))vaccines.set(r.vaccine.toLowerCase(),r);return vaccines.size>0&&[...vaccines.values()].every(r=>!r.due||r.due>=day())}
export function totals(rows:Entry[],val:string){return rows.reduce((a,r)=>a+(Number(r[val])||0),0)}
export type Field={key:string,label:string,type?:string,options?:string[],optionLabels?:Values,required?:boolean};
export const field=(key:string,label:string,type='text',required=false,options?:string[]):Field=>({key,label,type,required,options});
const select=(key:string,label:string,options:string[],required=false)=>field(key,label,'select',required,options);
export const animalSteps:Field[][]=[
 [field('name','Animal name','text',true),select('type','Animal type',species,true),field('id','Animal ID','text',true),field('tag','Tag number'),field('breed','Breed'),select('sex','Sex',['Female','Male','Unknown']),field('dob','Date of birth','past'),field('age','Age in years','number'),field('weight','Weight (kg)','positive'),field('color','Colour'),select('status','Health status',states,true),select('milk','Producing milk',['No','Yes']),field('photo','Animal photo','photo')],
 [field('owner','Owner name','text',true),field('mobile','Mobile number','tel'),field('village','Village','text',true),field('address','Address','area')],
 [field('purchase','Purchase date','past'),field('cost','Purchase cost (₹)','number'),field('notes','Notes','area')]];
const dateF=field('date','Record date','past',true), vet=field('vet','Veterinarian'),notes=field('notes','Notes','area'), cost=field('cost','Cost (₹)','number');
export const schemas:Record<string,Field[]>={
 Health:[dateF,field('diagnosis','Diagnosis / condition','text',true),field('symptoms','Symptoms','area'),field('history','Disease history','area'),field('treatment','Treatment'),field('medicine','Medicine'),field('dose','Prescribed dosage'),vet,field('due','Follow-up date','date'),select('recovery','Recovery status',states,true),cost,notes],
 Vaccination:[field('vaccine','Vaccine name','text',true),field('date','Date given','past',true),field('due','Next due date','date'),vet,cost,field('notes','Remarks','area')],
 Breeding:[dateF,select('pregnancy','Pregnancy status',['Pregnant','Not pregnant','Delivered','Unknown'],true),field('service','Insemination / mating date','past'),field('delivery','Expected delivery','date'),field('birth','Last birth date','past'),field('history','Breeding and birth history','area'),field('offspring','Offspring details','area'),cost,notes],
 Milk:[dateF,field('litres','Milk yield (L)','number',true),select('session','Milking session',['Daily total','Morning','Evening'],true),field('feedNote','Feed observations','area'),notes],
 Feed:[dateF,field('feed','Feed type','text',true),field('schedule','Feeding schedule'),field('quantity','Daily quantity (kg)','positive',true),cost,field('notes','Nutrition notes','area')],
 Money:[dateF,select('category','Category',costs,true),field('amount','Amount (₹)','positive',true),notes],
 Growth:[dateF,field('weight','Weight (kg)','positive',true),notes]};
export const formatNum=(n:number)=>new Intl.NumberFormat('en-IN',{maximumFractionDigits:1}).format(n);
export function ledger(records:Entry[]){return records.flatMap(r=>r.kind==='Money'?[{category:r.category,amount:Number(r.amount),r}]:Number(r.cost)>0?[{category:r.kind==='Health'?'Treatment':r.kind,amount:Number(r.cost),r}]:[])}
