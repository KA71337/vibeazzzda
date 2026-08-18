import assert from 'node:assert/strict';

const base=(process.argv[2]||'http://127.0.0.1:3000').replace(/\/$/,'');
const sameOrigin=base;

async function request(path,init={}){
 const response=await fetch(`${base}${path}`,init);
 let body=null;try{body=await response.json()}catch{}
 return {response,body};
}

const status=await request('/api/admin/auth/status');
assert.equal(status.response.status,200);
assert.equal(status.body.authenticated,false);
assert.equal('missing' in status.body,false);
assert.equal('token' in status.body,false);
assert.equal('password' in status.body,false);

const unauthorized=await request('/api/admin/products');
assert.equal(unauthorized.response.status,401);

const invalidSession=await request('/api/admin/products',{headers:{Cookie:'vibe_admin_session=invalid'}});
assert.equal(invalidSession.response.status,401);

const unauthorizedSales=await request('/api/admin/sales');
assert.equal(unauthorizedSales.response.status,401);

const crossOrigin=await request('/api/admin/auth/login',{method:'POST',headers:{Origin:'https://evil.example','Content-Type':'application/json'},body:JSON.stringify({password:'test'})});
assert.equal(crossOrigin.response.status,403);

const malformedLogin=await request('/api/admin/auth/login',{method:'POST',headers:{Origin:sameOrigin,'Content-Type':'application/json'},body:'{"password":'});
assert.equal(malformedLogin.response.status,400);

const mutation=await request('/api/admin/products',{method:'POST',headers:{Origin:sameOrigin,'x-csrf-token':'invalid'},body:new FormData()});
assert.equal(mutation.response.status,403);

const salesMutation=await request('/api/admin/sales',{method:'POST',headers:{Origin:sameOrigin,'Content-Type':'application/json','x-csrf-token':'invalid'},body:JSON.stringify({items:[{productId:1,quantity:1}]})});
assert.equal(salesMutation.response.status,403);

const home=await fetch(`${base}/`);
assert.match(home.headers.get('content-security-policy')||'',/default-src 'self'/);
assert.equal(home.headers.get('x-content-type-options'),'nosniff');
assert.equal(home.headers.get('access-control-allow-origin'),null);

console.log('security smoke: PASS');
