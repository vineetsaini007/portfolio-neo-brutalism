import {test} from 'node:test';
import assert from 'node:assert/strict';
import {marqueeSpeed, pointerOffset} from '../lib/motionMath.ts';

test('marquee returns to normal at rest, accelerates down and eases up without reversing',()=>{
  assert.equal(marqueeSpeed(0),1);
  assert.ok(marqueeSpeed(700)>1);
  assert.ok(marqueeSpeed(-700)<1);
  for(const velocity of [-100000,-10000,-3500,0,3500,10000,100000]) {
    const speed=marqueeSpeed(velocity);
    assert.ok(speed>=0.7 && speed<=1.8);
  }
});

test('magnetic targets remain bounded on small controls and outside their hit regions',()=>{
  const rect={left:100,top:200,width:200,height:40};
  assert.deepEqual(pointerOffset(200,220,rect,5),{x:0,y:0});
  assert.deepEqual(pointerOffset(100,200,rect,5),{x:-5,y:-5});
  assert.deepEqual(pointerOffset(300,240,rect,5),{x:5,y:5});
  assert.deepEqual(pointerOffset(-1000,2000,rect,5),{x:-5,y:5});
  const zero=pointerOffset(100,200,{...rect,width:0,height:0},5);
  assert.ok(Number.isFinite(zero.x)&&Number.isFinite(zero.y));
});
