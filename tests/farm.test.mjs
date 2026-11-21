import test from 'node:test';
import assert from 'node:assert/strict';
import {demoFarm,emptyFarm,dueList,vaccinated,day,ledger,income} from '../src/farm.ts';
test('demo records all belong to an animal',()=>{const f=demoFarm();const ids=new Set(f.animals.map(a=>a.id));assert.equal(ids.size,12);assert.ok(f.records.every(r=>ids.has(r.aid)));assert.equal(f.animals.filter(a=>vaccinated(f,a)).length,9)});
test('repeat vaccination replaces its due date',()=>{const f=emptyFarm();const base={aid:'a',kind:'Vaccination',vaccine:'Example'};f.records=[{...base,date:day(-20),due:day(-2),uid:'old'},{...base,date:day(),due:day(100),uid:'new'}];assert.deepEqual(dueList(f).map(x=>x.uid),['new']);assert.equal(vaccinated(f,{id:'a'}),true)});
test('recovered condition closes its checkup',()=>{const f=emptyFarm();const base={aid:'a',kind:'Health',diagnosis:'Hoof',due:day(2)};f.records=[{...base,date:day(-2),recovery:'Sick',uid:'first'},{...base,date:day(),recovery:'Healthy',uid:'second'}];assert.equal(dueList(f).length,0)});
test('care and feed costs appear once alongside direct entries',()=>{const rows=ledger(demoFarm().records);assert.equal(rows.filter(x=>!income(x.category)).reduce((s,x)=>s+x.amount,0),1520);assert.equal(rows.filter(x=>income(x.category)).reduce((s,x)=>s+x.amount,0),2640)});
