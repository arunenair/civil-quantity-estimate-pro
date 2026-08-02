(function(){
  function install(){
    const page=document.querySelector('.page');
    if(!page || document.querySelector('.project-actions')) return;
    const h=page.querySelector('.pagehead');
    if(!h) return;
    const bar=document.createElement('div');
    bar.className='project-actions';
    bar.innerHTML='<button class="new-project-btn">＋ New Project</button><button class="open-project-btn">📂 Open Project</button><button class="save-project-btn">💾 Save</button><button class="print-project-btn">🖨 Print / PDF</button>';
    h.insertAdjacentElement('afterend',bar);
    bar.querySelector('.new-project-btn').onclick=function(){
      if((window.state&&state.boq&&state.boq.length)&&!confirm('Start a new project? Current project data is saved in this browser.')) return;
      if(window.state){state.project={name:'',client:'',contractor:'',location:'',engineer:'',ref:'',date:new Date().toISOString().slice(0,10)};state.boq=[];state.materials=[];state.steel=[];state.plumbing=[];state.electrical=[];state.page='dashboard';localStorage.setItem('cqepro-v1',JSON.stringify(state));render();setTimeout(()=>document.querySelector('#pname')?.focus(),80);}
    };
    bar.querySelector('.open-project-btn').onclick=function(){alert('Your project is saved on this device. Use Backup/Restore to transfer project data between devices.');};
    bar.querySelector('.save-project-btn').onclick=function(){if(typeof saveProject==='function')saveProject();};
    bar.querySelector('.print-project-btn').onclick=function(){window.print();};
  }
  const oldRender=window.render;
  if(typeof oldRender==='function'){
    window.render=function(){oldRender();setTimeout(install,0);};
    setTimeout(install,0);
  }else setTimeout(install,100);
})();
