//1. 初始化数据
var hashReset = init();
var keys = hashReset.keys;
var hash = hashReset.hash;

//2.生成键盘
//遍历 keys , 生成 kbd 标签
generateKeyBoard(keys, hash);

//3.监听客户动作，进行页面跳转
listenToUser(hash);

//下面是工具函数
function getFromLocalStorage(name){
  return JSON.parse(localStorage.getItem(name) || 'null');
}

function tag(tagName){
  return document.createElement(tagName);
}

function createKbd(textContent){
  let kbdInsert = tag('kbd');//创建kbd标签
  kbdInsert.textContent = textContent;
  kbdInsert.className = 'key';
  return kbdInsert;
}

function createButton(id){
  let buttonInsert = tag('button');
    buttonInsert.textContent = '编辑';
    //在button标签中添加 id 选择器
    buttonInsert.id = id;
    buttonInsert.onclick = function(random){
      //random['target']就是用户点击的元素
      let buttonMod = random.target;
      let buttonBro = buttonMod.previousSibling;
      let key = buttonMod.id;
      let url = prompt('给我一个网址：')
      hash[key] = url;//hash 变更
      buttonBro.src = 'https://' + url + '/favicon.ico';
      buttonBro.onerror = function(random){
        random.target.src = '//i.loli.net/2019/03/07/5c8076a1384e9.png'
      }
      localStorage.setItem('tub', JSON.stringify(hash));
    }
  return buttonInsert;
}

function createImage(domain){
  let imgInsert = tag('img');
    if(domain){
      imgInsert.src = 'https://' + domain + '/favicon.ico';
    }else{
      imgInsert.src = '//i.loli.net/2019/03/07/5c8076a1384e9.png';
    }
    imgInsert.onerror = function(random){
      random.target.src = '//i.loli.net/2019/03/07/5c8076a1384e9.png';
    }
  return imgInsert;
}

function init(){
  var keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];
  var hash = {
        'q': 'qzone.qq.com',
        'w': 'weibo.com',
        'e': 'ele.com',
        'r': 'c.runoob.com/front-end/55',
        't': 'www.tianya.cn',
        'y': 'youtube.com',
        'u': 'www.uc.cn',
        'i': 'www.iqiyi.com',
        'o': 'opera.com',
        'p': 'pixiv.com',
        'a': 'aliyun.com',
        's': 'www.sohu.com',
        'g': 'google.com',
        'k': 'kfc.com',
        'z': 'zhihu.com',
        'b': 'bilibili.com',
        'm': 'www.mcdonalds.com.cn'
  };
  //取出 localStorage 中的 tub 对应的 hash
  let hashInLocalStorage = getFromLocalStorage('tub');
  if(hashInLocalStorage){
    hash = hashInLocalStorage;
  }
  return {
    'keys': keys,
    'hash': hash
  };
}

function generateKeyBoard(keys, hash){
  for(let firstSub = 0; firstSub < keys.length; firstSub++){
    let divInsert = tag('div');
    divInsert.className = 'row';
    
    mainInsert.appendChild(divInsert);
    for(let secondSub = 0; secondSub < keys[firstSub].length; secondSub++){
      let kbdInsert = createKbd(keys[firstSub][secondSub]);
  
      let buttonInsert = createButton(keys[firstSub][secondSub]);
  
      let imgInsert = createImage(hash[keys[firstSub][secondSub]]);
  
      kbdInsert.appendChild(imgInsert);
      kbdInsert.appendChild(buttonInsert);
  
      divInsert.appendChild(kbdInsert);
    }
  }
}

function listenToUser(hash){
  document.onkeypress = function(random){
    let key = random.key;
    let website = hash[key];
    window.open('https://' + website ,'_blank');
    // console.log(hash);
    //在新标签中打开hash内容
  }
}