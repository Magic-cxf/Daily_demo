var back = $('.back')[0]
var left_circle = $('.left_circle')[0]
var right_circle = $('.right_circle')[0]
var val = $('.mask h1')[0]
var right = 0;
var left = 0;
var change = false

back.onmouseover = function() {
	if (back.timerId2) {
		clearInterval(back.timerId2)
	}
	back.timerId1 = setInterval(function() {
		if (right < 180) {
			right += 1
			right_circle.style['transform'] = "rotate(" + right + "deg)"
			value = parseInt(right / 180 * 50)
			val.innerHTML = value + "%"
		} else {
			if (left < 180) {
				left += 1
				left_circle.style['transform'] = "rotate(" + left + "deg)"
				value = 50 + parseInt(left / 180 * 50)
				val.innerHTML = value + "%"
			} else {
				clearInterval(back.timerId1)
			}
		}
	}, 10)
}
back.onmouseout = function() {
	if (left == 180) {
		return ''
	}
	if (back.timerId1) {
		clearInterval(back.timerId1)
	}
	back.timerId2 = setInterval(() => {
		if (left > 0) {
			left -= 1
			left_circle.style['transform'] = "rotate(" + left + "deg)"
			value = 50 + parseInt(left / 180 * 50)
			val.innerHTML = value + "%"
		} else {
			if (right > 0) {
				right -= 1
				right_circle.style['transform'] = "rotate(" + right + "deg)"
				value = parseInt(right / 180 * 50)
				val.innerHTML = value + "%"
			} else {
				clearInterval(back.timerId2)
			}
		}

	}, 10)
}
