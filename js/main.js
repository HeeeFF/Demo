
window.onload = function() {
	app.searchTab();
	app.searchText();
	app.highLight();
	app.picTab();
    app.Tab();
}
// ---------------------------------------------------------------------------------------------------------------------
tools = {};

tools.$ = function(id) {
	return typeof id === 'string'?document.getElementById(id):id;
}

tools.getByClass = function(id,sClass) {
	var oParent = tools.$(id);
	var aEle = oParent.getElementsByTagName('*');
	var arr = [];
	for (var i=0; i<aEle.length; i++) {
		if( aEle[i].className == sClass ) {
			arr.push(aEle[i]);
		}
	}
	return arr;
}
// ---------------------------------------------------------------------------------------------------------------------
ui = {};
//搜索框文字显示隐藏
ui.TextChange = function(obj,str) {
	obj.onfocus = function() {
		if( this.value == str ) {
			this.value = '';
		}
	}
	obj.onblur = function() {
		if( this.value == '' ) {
			this.value = str;
		}
	}
}
//nav点击效果
ui.SearchTab = function(id,navClass,textClass) {
	var aBtn = tools.getByClass(id,navClass)[0].getElementsByTagName('li');
	for(var i=0; i<aBtn.length; i++) {
		aBtn[i].onclick = function() {
			for(var i=0;i<aBtn.length;i++) {
				aBtn[i].className = '';
			}
			this.className = 'active';
		}
	}
}

//tab效果
ui.Tab = function(id,className,divid) {
    var aBtn = tools.getByClass(id,className)[0].getElementsByTagName('li');
    var aDiv = tools.$(divid).getElementsByTagName('div');
    for (var i=0; i<aBtn.length; i++) {
    	aBtn[i].index = i;
    	aBtn[i].onclick = function() {
            for(var i=0;i<aBtn.length;i++) {
                aBtn[i].className = 'gradient';
                aDiv[i].style.display ='none';
         }
            this.className = 'active';
            aDiv[this.index].style.display = 'block';
        }
    }
}


//焦点图
ui.PicTab = function(id) {
    var index = 0;
    var timer = null;
    var aLi = tools.$(id).getElementsByTagName('ul')[0].getElementsByTagName('li');
    var aTab = tools.$(id).getElementsByTagName('ol')[0].getElementsByTagName('li');
    var oText = tools.$(id).getElementsByTagName('p')[0];
    var arr = ['爸爸去哪了','是的范德萨发的','所谓人为法国']; 
    for(var i=0;i<aLi.length;i++) {
        aTab[i].id = i;
        aTab[i].onmouseover = function() {
            clearInterval(timer);
            changeTab(this.id);
        }
        aTab[i].onmouseout = function() {
            timer = setInterval(auto,2000);
        }
    }

    function auto() {
        index++;
        if(index>=aLi.length) {
            index = 0;
        }
        changeTab(index);
    }
    function changeTab(curIndex) {
        for(var i=0; i<aLi.length; i++) {
            aTab[i].className = '';
            aLi[i].style.display = 'none';
        } 
        oText.innerHTML = arr[curIndex];
        aTab[curIndex].className = 'active';
        aLi[curIndex].style.display = 'block';
        index = curIndex;
    }
}
//高亮显示效果
ui.HighLight = function(id) {
	var aLi = tools.$(id).getElementsByTagName('li');
	var  timer = null;
	for (var i=0; i<aLi.length; i++) {
		aLi[i].onmouseover = function() {
			clearInterval(timer)
			for (var i=0; i<aLi.length; i++){
				aLi[i].className = '';
			}
			this.className = 'active';
		}
	}
	for (var i=0; i<aLi.length; i++) {   
		aLi[i].onmouseout = function() {
			timer = setInterval (function() {
				for (var i=0; i<aLi.length; i++){
					aLi[i].className = '';
				}
				aLi[0].className = 'active';
			},300);
		}
	}
}



// ---------------------------------------------------------------------------------------------------------------------
app = {};

app.searchText = function() {
	var oText = tools.$('searchText');	
	ui.TextChange(oText,oText.value);
}

app.searchTab = function() {
	ui.SearchTab('search','nav','text')
}



app.highLight = function() {
	ui.HighLight('bbs');
}

app.picTab = function() {
	ui.PicTab('picTab');
}

app.Tab = function() {
    ui.Tab('shop','nav','shop');
    ui.Tab('map','nav','map');
    ui.Tab('konw','gradient','con');
    ui.Tab('listTab','gradient','sideCon');
}



