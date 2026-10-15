const fa=n=>Number(n).toLocaleString('fa-IR'),$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const C=[['#335C67','#E09F3E','#FFF3B0'],['#9E2A2B','#FFF3B0','#540B0E'],['#E09F3E','#335C67','#540B0E'],['#540B0E','#E09F3E','#FFF3B0'],['#FFF3B0','#335C67','#9E2A2B'],['#335C67','#9E2A2B','#FFF3B0']];
const BG=['#FBE9A0','#EAD7B8','#D3E0DD','#F3D3C4'];
const P=[
['ارس ۱۲ لیتری','ابتدایی',1290000,0,4.8,36],['پرنیا ضدآب','ضدآب',1890000,2190000,4.6,21],['آریا ارگونومیک','دبیرستان',2450000,0,4.7,48],['نوید کلاسیک','راهنمایی',1650000,0,4.9,12],
['ماهک چرخ‌دار','چرخ‌دار',3200000,0,4.5,19],['کاوه لپ‌تاپی','دبیرستان',2790000,3290000,4.8,27],['سیمرغ مینی','ابتدایی',990000,0,4.4,9],['دنا کوهستان','راهنمایی',2100000,0,4.6,31],
['رها سبک','ابتدایی',1150000,0,4.3,14],['البرز ضدآب','ضدآب',2380000,0,4.7,22],['نگین دخترانه','راهنمایی',1790000,0,4.9,41],['سپند چرخ‌دار','چرخ‌دار',3650000,4560000,4.5,17],
['تیرداد دبیرستان','دبیرستان',2250000,0,4.6,25],['گیلان بارانی','ضدآب',1950000,0,4.4,11],['آوا اول دبستان','ابتدایی',890000,0,4.8,52],['شاهین مدرسه','راهنمایی',1590000,0,4.2,8]
].map((a,i)=>({id:i,n:'کوله '+a[0],c:a[1],p:a[2],o:a[3],r:a[4],v:a[5],col:C[i%6],bg:BG[i%4]}));
const CATS=['همه','ابتدایی','راهنمایی','دبیرستان','چرخ‌دار','ضدآب'];
const bag=c=>`<svg class="bag" viewBox="0 0 120 140" aria-hidden="true"><ellipse cx="60" cy="133" rx="38" ry="4" fill="#000" opacity=".12"/><path d="M45 30c0-15 30-15 30 0" fill="none" stroke="${c[2]}" stroke-width="6" stroke-linecap="round"/><rect x="12" y="62" width="12" height="36" rx="6" fill="${c[1]}"/><rect x="96" y="62" width="12" height="36" rx="6" fill="${c[1]}"/><rect x="22" y="26" width="76" height="104" rx="26" fill="${c[0]}"/><rect x="32" y="76" width="56" height="44" rx="12" fill="${c[1]}"/><path d="M38 92h44" stroke="${c[2]}" stroke-width="3" stroke-linecap="round"/><path d="M60 26v36" stroke="${c[2]}" stroke-width="3" opacity=".7"/><rect x="54" y="56" width="12" height="9" rx="3" fill="${c[2]}"/></svg>`;
const H='<svg viewBox="0 0 24 24"><path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/></svg>';
let cat='همه',view='g',page=1,sort='f',term='';const PER=12;
const wish=new Set(),cart={};
const stars=r=>'★'.repeat(Math.round(r))+'☆'.repeat(5-Math.round(r));
function list(){let l=P.filter(p=>(cat==='همه'||p.c===cat)&&p.n.includes(term.trim()));
 if(sort==='a')l.sort((a,b)=>a.p-b.p);if(sort==='d')l.sort((a,b)=>b.p-a.p);if(sort==='r')l.sort((a,b)=>b.r-a.r);return l}
function render(){const l=list(),pages=Math.max(1,Math.ceil(l.length/PER));page=Math.min(page,pages);
 const s=l.slice((page-1)*PER,page*PER);
 $('#cnt').textContent=l.length?`نمایش ${fa((page-1)*PER+1)}–${fa((page-1)*PER+s.length)} از ${fa(l.length)} نتیجه`:'';
 $('#grid').className='grid'+(view==='l'?' list':'');
 $('#grid').innerHTML=s.length?s.map(p=>`<article class="card"><div class="img" style="background:${p.bg}">${bag(p.col)}${p.o?`<span class="badge">${fa(Math.round((1-p.p/p.o)*100))}٪-</span>`:''}<button class="heart ${wish.has(p.id)?'on':''}" data-w="${p.id}" aria-label="علاقه‌مندی">${H}</button></div>
 <div class="info"><span class="tag">${p.c}</span><h3>${p.n}</h3><div class="rate"><span class="stars">${stars(p.r)}</span>${fa(p.r)} (${fa(p.v)})</div>
 <div class="price">${p.o?`<span class="old">${fa(p.o)}</span>`:''}<span>${fa(p.p)} تومان</span></div><button class="add" data-a="${p.id}">افزودن به سبد</button></div></article>`).join(''):'<p class="empty">کوله‌ای با این مشخصات پیدا نشد. فیلتر یا عبارت جستجو را تغییر دهید.</p>';
 let b=`<button ${page<2?'disabled':''} data-p="${page-1}" aria-label="قبلی">›</button>`;
 for(let i=1;i<=pages;i++)b+=`<button class="${i===page?'on':''}" data-p="${i}">${fa(i)}</button>`;
 $('#pg').innerHTML=pages>1?b+`<button ${page>=pages?'disabled':''} data-p="${page+1}" aria-label="بعدی">‹</button>`:'';
 $('#wc').textContent=wish.size?fa(wish.size):'';
 const n=Object.values(cart).reduce((a,b)=>a+b,0);$('#cc').textContent=n?fa(n):'';}
$('#chips').innerHTML=CATS.map(c=>`<button class="pill ${c==='همه'?'on':''}" data-c="${c}">${c}</button>`).join('');
$('#fcats').innerHTML=CATS.slice(1).map(c=>`<li><button data-cf="${c}">${c}</button></li>`).join('');
function setCat(c){cat=c;page=1;$$('#chips .pill').forEach(b=>b.classList.toggle('on',b.dataset.c===c));render()}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),1800)}
const mini=p=>`<div class="th" style="background:${p.bg}">${bag(p.col)}</div>`;
const V={
about:()=>['درباره ما',`<p>کوله‌بار از سال ۱۳۹۸ با یک هدف شروع شد: کوله‌ای که پشت دانش‌آموز را خسته نکند.</p><div class="facts"><div><b>${fa(16)}</b>مدل فعال</div><div><b>${fa(12)}K+</b>مشتری راضی</div><div><b>${fa(2)} سال</b>گارانتی</div></div><h3>ما به چه چیز اهمیت می‌دهیم</h3><p>پارچه ضدآب و مقاوم، بند شانه‌ی پد‌دار و فاصله‌ی مناسب از کمر. هر مدل قبل از فروش با کتاب‌های واقعی یک روز مدرسه آزموده می‌شود.</p><h3>راهنمای انتخاب</h3><p>وزن کوله پر نباید بیشتر از ۱۰ تا ۱۵ درصد وزن دانش‌آموز باشد.</p>`],
contact:()=>['تماس با ما',`<div class="ci"><span>تلفن</span><b dir="ltr">۰۲۱ ۰۰۰۰ ۰۰۰۰</b></div><div class="ci"><span>ایمیل</span>info@koolebar.example</div><div class="ci"><span>نشانی</span>تهران، خیابان ولیعصر</div><div class="ci"><span>ساعت کار</span>شنبه تا پنجشنبه، ۹ تا ۱۸</div>
<form id="cf"><input required placeholder="نام شما" aria-label="نام"><input type="email" required placeholder="ایمیل" aria-label="ایمیل"><textarea required rows="4" placeholder="پیام شما" aria-label="پیام"></textarea><button>ارسال پیام</button></form>`],
faq:()=>['سوالات متداول',`<h3>ارسال چند روزه است؟</h3><p>داخل تهران ۱ تا ۲ روز، سایر شهرها ۳ تا ۵ روز کاری.</p><h3>امکان تعویض هست؟</h3><p>تا ۷ روز پس از دریافت، به شرط سالم‌بودن کوله.</p><h3>کوله مناسب هر مقطع چیست؟</h3><p>ابتدایی تا ۱۲ لیتر، راهنمایی ۱۵ تا ۲۰ لیتر و دبیرستان ۲۰ تا ۳۰ لیتر.</p>`],
wish:()=>['علاقه‌مندی‌ها',items([...wish].map(id=>[P[id],0]),false)],
cart:()=>['سبد خرید',items(Object.entries(cart).map(([id,q])=>[P[id],q]),true)]};
function items(a,isCart){if(!a.length)return`<p class="empty" style="padding:40px 0">${isCart?'سبد شما خالی است. از کاتالوگ یک کوله اضافه کنید.':'هنوز کوله‌ای را نشان نکرده‌اید. روی قلب هر کوله بزنید.'}</p>`;
 let t=0;const h=a.map(([p,q])=>{t+=p.p*q;return`<div class="it">${mini(p)}<div class="t">${p.n}<br><small>${fa(p.p)} تومان</small></div>${isCart?`<div class="q"><button data-q="${p.id}:1" aria-label="افزودن">+</button>${fa(q)}<button data-q="${p.id}:-1" aria-label="کم‌کردن">−</button></div>`:`<button class="pill" data-a="${p.id}">افزودن به سبد</button>`}</div>`}).join('');
 return h+(isCart?`<div class="tot"><span>جمع کل</span><span>${fa(t)} تومان</span></div><button class="cta" style="width:100%" data-pay>ثبت سفارش</button>`:'')}
let cur=null;
function open(n){cur=n;const[t,h]=V[n]();$('#dt').textContent=t;$('#body').innerHTML=h;$('#dr').classList.add('on');$('#ov').classList.add('on');$('#cl').focus()}
function close(){cur=null;$('#dr').classList.remove('on');$('#ov').classList.remove('on')}
document.addEventListener('click',e=>{const t=e.target.closest('button,a');if(!t)return;const d=t.dataset;
 if(d.open)open(d.open);else if(d.c)setCat(d.c);else if(d.cf){setCat(d.cf);$('#cats').scrollIntoView({behavior:'smooth'})}
 else if(d.v){view=d.v;$$('.vt button').forEach(b=>b.classList.toggle('on',b===t));render()}
 else if(d.p){page=+d.p;render();$('#cats').scrollIntoView({behavior:'smooth'})}
 else if(d.w!==undefined){const i=+d.w;wish.has(i)?wish.delete(i):wish.add(i);render();if(cur==='wish')open('wish')}
 else if(d.a!==undefined){const i=+d.a;cart[i]=(cart[i]||0)+1;render();toast('به سبد اضافه شد');if(cur==='wish')open('wish')}
 else if(d.q){const[i,s]=d.q.split(':').map(Number);cart[i]+=s;if(cart[i]<1)delete cart[i];render();open('cart')}
 else if(d.pay!==undefined){for(const k in cart)delete cart[k];render();open('cart');toast('سفارش شما ثبت شد (نمونه)')}
 else if(t.id==='cl'||t.id==='ov')close();
 else if(t.id==='srch'){$('#q').focus();$('#cats').scrollIntoView({behavior:'smooth'})}
 else if(t.id==='th'){const r=document.documentElement,dk=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=dk?'light':'dark'}});
$('#ov').onclick=close;
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
document.addEventListener('submit',e=>{e.preventDefault();if(e.target.id==='cf'){close();toast('پیام شما ارسال شد (نمونه)')}if(e.target.id==='nf'){e.target.reset();toast('عضویت شما ثبت شد')}});
$('#q').oninput=e=>{term=e.target.value;page=1;render()};
$('#sort').onchange=e=>{sort=e.target.value;page=1;render()};
render();
