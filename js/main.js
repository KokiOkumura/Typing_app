'use strict'
{

  const typedField = document.getElementById('typed');
  const untypedField = document.getElementById('untyped');
  const start_btn = document.querySelector('.rounded-btn');


  const click_sound_effect = new Audio('audio/click.mp3');
  const miss_sound_effect = new Audio('audio/miss.mp3');
  const finish_sound_effect = new Audio('audio/finish.mp3');

  const strs = [
    'ruby',
    'javascript',
    'php',
    'go',
    'python',
    'java'
  ];

 
  let count = 0;
  let typed = '';
  let untyped = '';


  // ※引数で渡した数値からランダムな整数を生成
  function randomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // ※配列からランダムに文字列を返す
  function nextString() {
    const idx = randomInt(strs.length);
    return strs[idx];
  }

    // ※文字列をHTML側に追加する
    function updateTextField() {
      typedField.textContent = typed;
      untypedField.textContent = untyped;
    }

  
  function next() {
    typed = '';
    untyped = nextString();
    updateTextField();
    count ++;
  }
  


  // ※startを押した時の動作
  start_btn.addEventListener('click',function(e){
    e.preventDefault();
    click_sound_effect.play();
    start_btn.style.cssText = 'display :none;'
    untyped += nextString();
    updateTextField();

    let pre = new Date();
    interval_id = setInterval(function(){
      const now = new Date();
      elapsed += now - pre;
      pre = now;
      updateTime();
      console.log(elapsed);
    }, 10);
  });

  // ※キー入力時の動作
  document.addEventListener('keydown',function(e){
    if(e.key !== untyped.substring(0,1)) {
      miss_sound_effect.play();
      return;
    };
    // ※入力した文字をtypedに渡す
    typed += untyped.substring(0,1);
    click_sound_effect.play();
    // ※インデックス1から終了位置は指定していないので末尾まで取り出す
    untyped = untyped.substring(1);

    updateTextField();
    
    // ※untypedが空になったらnext関数を呼び出す
    if(untyped === ''){
      next();
    }

    if(count === 5){
      clearInterval(interval_id);
      interval_id = null;
      updateTime();
      untypedField.innerHTML = "5回終了! タイムは..."
      finish_sound_effect.play();
      setInterval(function() {
        window.location.href = 'retry.html';
      },3000);
    }
  });

  // 経過時間のミリ秒
  let elapsed = 0;
  let interval_id = null;
  const timeElement = document.getElementById('time');

  function updateTime() {
    const ms = elapsed % 1000;
    const s = Math.floor(elapsed / 1000) % 60;
    const m = Math.floor(elapsed / (1000 * 60)) % 60;
    const h = Math.floor(elapsed / (1000 * 60 * 60));

    // ※padStart...ゼロ埋め処理
    const msStr = ms.toString().padStart(3, '0');
    const sStr = s.toString().padStart(2, '0');
    const mStr = m.toString().padStart(2, '0');
    const hStr = h.toString().padStart(2, '0');

    timeElement.innerHTML = `${hStr}:${mStr}:${sStr}:${msStr}`;
  }

  }





  
