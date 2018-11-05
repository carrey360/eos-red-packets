module.exports = function (text,callback) {
	var tipHTML = ''
	var autoHide = true
	var tipBody = ''
	var tipHTML = "<div style='padding:15px 20px;background:rgba(0,0,0,.75);color:#fff;border-radius:4px;text-align:center;min-width:120px;'><p data-label='tip-text' style='font-size: 14px;line-height:20px;margin:0;'>"+text+"</p></div>"
	if (callback) {
		autoHide = false
		//文本加按钮
		tipHTML = "<div style='padding:15px 20px;background:rgba(0,0,0,.75);color:#fff;border-radius:4px;text-align:center;min-width:120px;'><p data-label='tip-text' style='font-size: 14px;line-height:20px;margin:0;'>"+text+"</p><button data-label='tip-ok'>确定,我知道了</button></div>"
	}

	if(tipBody = document.body.querySelector('[data-label="tip"]')) {
		tipBody.querySelector('[data-label="tip-text"]').innerHTML = text
	} else {
		tipBody = document.createElement('div')
		tipBody.className = 'ofo-iff'
		tipBody.setAttribute('data-label', 'tip')
		document.body.appendChild(tipBody)
		tipBody.setAttribute("style", "position:fixed;width:100%;height:100%;z-index:9999999; justify-content:center;align-items:center;display: flex;top:0;left: 0;opacity:0;padding:0 20px;box-sizing:border-box !important;-webkit-transition: opacity 0.2s linear 0s, height 0s linear 0s;")
	}

	tipBody.innerHTML = tipHTML
	setTimeout( function () {
		tipBody.style.opacity = 1
	}, 10)
	if (tipBody.timeoutHandle) {
		clearTimeout(tipBody.timeoutHandle);
	}
	if(autoHide) {
		tipBody.timeoutHandle = setTimeout(function () {
			tipBody.style.opacity = 0
			tipBody.timeoutHandle = setTimeout(function(){document.body.removeChild(tipBody)}, 200)
		}, 1500)
	} else {
		tipBody.querySelector('[data-label="tip-ok"]').onclick = function() {
			tipBody.style.opacity = 0
			setTimeout(function () {
        document.body.removeChild(tipBody)
      }, 200)
			callback()
		}
	}
}
