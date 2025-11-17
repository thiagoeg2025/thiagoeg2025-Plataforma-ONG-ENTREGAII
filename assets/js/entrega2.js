
document.addEventListener('DOMContentLoaded', function(){
  // set year
  document.querySelectorAll('#ano,#ano2,#ano3').forEach(e=> e.textContent = new Date().getFullYear());

  // hamburger menu toggle
  const btnHamb = document.getElementById('btnHamb');
  const mainMenu = document.getElementById('mainMenu');
  if(btnHamb && mainMenu){
    btnHamb.addEventListener('click', ()=>{
      const expanded = btnHamb.getAttribute('aria-expanded') === 'true';
      btnHamb.setAttribute('aria-expanded', String(!expanded));
      const visible = mainMenu.style.display === 'block';
      mainMenu.style.display = visible ? 'none' : 'block';
    });
  }

  // submenu toggles
  document.querySelectorAll('.has-sub .sub-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const sub = btn.nextElementSibling;
      sub.style.display = expanded ? 'none' : 'block';
    });
  });

  // modal open/close
  function openModal(id){
    const modal = document.getElementById(id);
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(modal){
    modal.setAttribute('aria-hidden','true');
  }
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e)=>{
      const id = btn.getAttribute('data-open-modal');
      openModal(id);
    });
  });
  document.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', ()=> {
    const modal = b.closest('.modal');
    closeModal(modal);
  }));
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', (e)=>{
      if(e.target === m) closeModal(m);
    });
  });

  // simple toast
  const toast = document.getElementById('toast');
  function showToast(message, timeout=3000){
    if(!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(()=>{ toast.style.display='none'; }, timeout);
  }

  // sample donation buttons
  document.querySelectorAll('.donation-options .btn').forEach(b => {
    b.addEventListener('click', ()=> showToast('Doação simulada: ' + b.textContent));
  });

  // newsletter form
  const newsletter = document.getElementById('newsletterForm');
  if(newsletter){
    newsletter.addEventListener('submit', (e)=>{
      e.preventDefault();
      showToast('Obrigado por assinar a newsletter!');
    });
  }

  // form validation and masks for cadastro
  const form = document.getElementById('formCadastro');
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('telefone');
  const cep = document.getElementById('cep');

  function maskCPF(el){
    let v = el.value.replace(/\D/g,'').slice(0,11);
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    el.value = v;
  }
  function maskTel(el){
    let v = el.value.replace(/\D/g,'').slice(0,11);
    v = v.replace(/^(\d{2})(\d)/,'($1) $2');
    if(v.length <= 13) v = v.replace(/(\d{4})(\d)/, '$1-$2');
    else v = v.replace(/(\d{5})(\d)/, '$1-$2');
    el.value = v;
  }
  function maskCEP(el){
    let v = el.value.replace(/\D/g,'').slice(0,8);
    v = v.replace(/^(\d{5})(\d)/, '$1-$2');
    el.value = v;
  }
  if(cpf) cpf.addEventListener('input', (e)=>maskCPF(e.target));
  if(tel) tel.addEventListener('input', (e)=>maskTel(e.target));
  if(cep) cep.addEventListener('input', (e)=>maskCEP(e.target));

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      let valid = form.checkValidity();
      if(!valid){
        const firstInvalid = form.querySelector(':invalid');
        firstInvalid.classList.add('invalid');
        firstInvalid.focus();
        showToast('Corrija os campos obrigatórios.');
      } else {
        showToast('Cadastro enviado (simulação). Obrigado!');
        form.reset();
      }
    });
  }

});
