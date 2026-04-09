#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const root = process.cwd();
const playersFile = path.join(root, 'src/app/data/players.normalized.generated.ts');
const backupFile = playersFile + '.bak.' + Date.now();
const reportFile = path.join(root, 'scripts/fix-generic-players-report.json');

function isGenericName(name){
  if(!name) return true;
  const s = name.trim().toLowerCase();
  if(s.length <= 2) return true;
  return /^(player|unknown|no name|tbd|n\/a|anonymous|athlete)$/i.test(s);
}

function extractArrayText(txt){
  const start = txt.indexOf('[');
  const end = txt.lastIndexOf(']');
  if(start===-1||end===-1) throw new Error('array not found');
  return txt.slice(start+1,end);
}

function splitObjects(arrayText){
  const objs = arrayText.split(/\},\s*\{/g).map((s,i,arr)=>{
    if(i===0) s = s.replace(/^\s*\{/, '{');
    else s = '{' + s;
    if(i===arr.length-1) s = s.replace(/\}\s*$/,'}');
    else s = s + '}';
    return s;
  });
  return objs;
}

async function fetchNumberFromMaxPreps(url){
  try{
    const full = url.startsWith('http')?url:`https://www.maxpreps.com${url}`;
    const resp = await fetch(full, { headers: { 'User-Agent': 'ccshub-bot/1.0 (+https://example.invalid)' } });
    const body = await resp.text();
    const m = body.match(/<script id=\"__NEXT_DATA__\" type=\"application\/json\">([\s\S]*?)<\/script>/i);
    if(m){
      try{
        const j = JSON.parse(m[1]);
        // search for jerseyNumber in object
        const stack = [j];
        while(stack.length){
          const o = stack.pop();
          if(typeof o === 'object' && o !== null){
            for(const k of Object.keys(o)){
              if(/jersey/i.test(k) && (typeof o[k] === 'number' || typeof o[k] === 'string')){
                const v = o[k];
                if(typeof v === 'number' && v>0) return v;
                if(typeof v === 'string' && /\d+/.test(v)) return parseInt(v.match(/\d+/)[0],10);
              }
              if(typeof o[k] === 'object') stack.push(o[k]);
            }
          }
        }
      }catch(e){/* ignore JSON parse error */}
    }
    // fallback regex near name: search for '#123' pattern
    const mm = body.match(/#(\d{1,3})/);
    if(mm) return parseInt(mm[1],10);
  }catch(e){
    return null;
  }
  return null;
}

(async function main(){
  const txt = await fs.readFile(playersFile,'utf8');
  await fs.writeFile(backupFile, txt);
  const arrText = extractArrayText(txt);
  const objs = splitObjects(arrText);

  const candidates = [];
  for(const o of objs){
    const nameM = o.match(/name:\s*['\"]([^'\"]+)['\"]/);
    const numM = o.match(/number:\s*(\d+)/);
    const urlM = o.match(/maxprepsUrl:\s*['\"]([^'\"]+)['\"]/);
    const idM = o.match(/id:\s*['\"]([^'\"]+)['\"]/);
    const name = nameM?nameM[1]:null;
    const num = numM?parseInt(numM[1],10):null;
    const url = urlM?urlM[1]:null;
    const id = idM?idM[1]:null;
    if(num===0 || isGenericName(name)){
      candidates.push({name,num,url,id,raw:o});
    }
  }

  const fixes = [];
  for(const c of candidates){
    let fetched = null;
    if(c.url){
      fetched = await fetchNumberFromMaxPreps(c.url);
    }
    if(fetched && fetched>0 && fetched !== c.num){
      fixes.push({ id: c.id, name: c.name, url: c.url, originalNumber: c.num, newNumber: fetched });
    }
  }

  // apply fixes to file content by replacing number: X with newNumber for matching maxprepsUrl
  let newTxt = txt;
  for(const f of fixes){
    const urlEsc = f.url.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&');
    // find the block containing the url and replace the first number:\s*\d+ with new value
    const re = new RegExp(`(${urlEsc}[\s\S]{0,200}?)number:\s*\d+`);
    const m = newTxt.match(new RegExp(`${urlEsc}[\s\S]{0,200}number:\s*\d+`));
    if(m){
      newTxt = newTxt.replace(new RegExp(`${urlEsc}([\s\S]{0,200}?number:\s*)\d+`),'$1'+f.newNumber);
    } else {
      console.warn('Could not find context for', f.url);
    }
  }

  await fs.writeFile(reportFile, JSON.stringify({ generatedAt: new Date().toISOString(), candidatesCount: candidates.length, fixes }, null, 2));
  if(fixes.length>0){
    await fs.writeFile(playersFile, newTxt);
    console.log('Applied', fixes.length, 'fixes and wrote', playersFile);
  } else {
    console.log('No confident fixes found');
  }
  console.log('Report written to', reportFile);
})();
